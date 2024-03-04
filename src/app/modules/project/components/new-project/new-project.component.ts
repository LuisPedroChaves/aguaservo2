import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { IProject } from '../../../../core/models/project/project.model';
import { ProjectStore } from '../../store/project.reducer';
import { CLOSE_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from '../../store/project.actions';
import { ICompany } from '../../../../core/models/project/company.model';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { cannotContainSpace } from '../../../../core/validators/custom.validators';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss',
})
export class NewProjectComponent implements OnInit, OnDestroy {
  newProject = new FormGroup({
    code: new FormControl('', [Validators.required, cannotContainSpace]),
    name: new FormControl('', Validators.required),
    fee: new FormControl<number>(null, Validators.required),
    isActive: new FormControl<boolean>(true, Validators.required),
  });

  projectStoreSubscription = new Subscription();
  project: IProject = null;

  companyStoreSubscription = new Subscription();
  company: ICompany = null;

  constructor(
    private projectStore: Store<ProjectStore>,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.projectStoreSubscription = this.projectStore
      .select('project')
      .subscribe((state) => {
        this.setProject(state.project);
      });

    this.companyStoreSubscription = this.projectStore
      .select('company')
      .subscribe((state) => {
        this.company = state.company;
      });
  }

  ngOnDestroy(): void {
    this.projectStoreSubscription?.unsubscribe();
    this.companyStoreSubscription?.unsubscribe();
  }

  closeDrawer1(): void {
    this.projectStore.dispatch(CLOSE_DRAWER1());
  }

  resetNewProject(): void {
    this.newProject.reset({
      isActive: true,
    });
  }

  setProject(project: IProject): void {
    if (project) {
      this.project = project;

      this.newProject.controls['code'].setValue(project.code);
      this.newProject.controls['name'].setValue(project.name);
      this.newProject.controls['fee'].setValue(project.fee);
      this.newProject.controls['isActive'].setValue(project.isActive);
      return;
    }

    this.project = null!;
    this.resetNewProject();
  }

  deleteProject(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '375px',
        panelClass: 'custom',
        data: {
          title: `Eliminar Proyecto`,
          description: `¿Está seguro que desea eliminar el proyecto: ${this.project.name}?`,
          confirmation: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.projectStore.dispatch(
            DELETE_PROJECT({ idProject: this.project._id })
          );
          this.closeDrawer1();
        }
      });
  }

  onSubmit(): void {
    if (this.newProject.invalid) {
      return;
    }

    if (!this.company) {
      this.snackBarService.show(
        'ERROR',
        'No se ha podido cargar la empresa',
        2500
      );
      return;
    }

    const { code, name, fee, isActive } = this.newProject.value;

    if (this.project) {
      this.project = {
        ...this.project,
        code,
        name,
        fee,
        isActive,
      };

      this.projectStore.dispatch(UPDATE_PROJECT({ project: this.project }));
      this.closeDrawer1();

      return;
    }

    const project: IProject = {
      _company: this.company,
      _well: null!,
      code,
      name,
      fee,
      isActive,
    };

    this.projectStore.dispatch(CREATE_PROJECT({ project }));
    this.resetNewProject();
  }
}
