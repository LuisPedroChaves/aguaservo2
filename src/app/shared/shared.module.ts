import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Npm Modules
import { SimplebarAngularModule } from 'simplebar-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // Angular Material
  MatSidenavModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTooltipModule,
  MatMenuModule,
  MatListModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSnackBarModule,
  // Npm Modules
  SimplebarAngularModule,
  FlexLayoutModule,
  // Directives
];

@NgModule({
  declarations: [FilterPipe],
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [
    FilterPipe,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
})
export class SharedModule {}
