import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IndexComponent } from './pages/index/index.component';
import { ProjectRoutes } from './project.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProjectReducer } from './store/project.reducer';
import { ProjectEffects } from './store/project.effects';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoutes),
    SharedModule,
    // ngrx
    StoreModule.forFeature('project', ProjectReducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
})
export class ProjectModule {}
