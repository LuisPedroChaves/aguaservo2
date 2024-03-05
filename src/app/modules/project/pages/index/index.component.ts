import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProject } from '../../../../core/models/project/project.model';
import { Store } from '@ngrx/store';
import { ProjectStore } from '../../store/project.reducer';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import {
  DELETE_PROJECT,
  READ_PROJECTS,
  SET_PROJECT,
} from '../../store/project.actions';
import { OPEN_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { ICompany } from '../../../../core/models/project/company.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit, OnDestroy {
  companyStoreSubscription = new Subscription();

  projectStoreSubscription = new Subscription();
  projects: IProject[] = [];
  filterProjects: IProject[] = [];

  constructor(
    private projectStore: Store<ProjectStore>,
    private filterPipe: FilterPipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companyStoreSubscription = this.projectStore
      .select('company')
      .subscribe((state) => {
        if (state.company) {
          this.filterProjects = [];
          this.projectStore.dispatch(
            READ_PROJECTS({ idCompany: state.company._id })
          );
        }
      });

    this.projectStoreSubscription = this.projectStore
      .select('project')
      .subscribe((state) => {
        this.projects = state.projects;
        this.filterProjects = state.projects;
      });
  }

  ngOnDestroy(): void {
    this.projectStoreSubscription?.unsubscribe();
    this.companyStoreSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, project: IProject): void {
    this.projectStore.dispatch(SET_PROJECT({ project }));
    this.projectStore.dispatch(OPEN_DRAWER1({ width1, component1 }));
  }

  applyFilter(event: Event): void {
    const FILTER_VALUE = (event.target as HTMLInputElement).value;
    const TEXT = FILTER_VALUE.trim().toLowerCase();

    if (TEXT.length > 0) {
      this.filterProjects = this.filterPipe.transform(this.projects, TEXT, [
        'code',
        'name',
      ]);
      return;
    }

    this.filterProjects = this.projects;
    return;
  }

  resetFilter(value: string) {
    if (value === '') {
      this.filterProjects = this.projects;
    }
  }

  deleteProject(project: IProject): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '375px',
        panelClass: 'custom',
        data: {
          title: `Eliminar Proyecto`,
          description: `¿Está seguro que desea eliminar el proyecto: ${project.name}?`,
          confirmation: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.projectStore.dispatch(
            DELETE_PROJECT({ idProject: project._id })
          );
        }
      });
  }
}
