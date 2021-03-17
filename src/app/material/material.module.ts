import { NgModule } from '@angular/core';
import {MatSidenavModule, MatToolbarModule, MatButtonModule, MatListModule,
        MatCardModule, MatSelectModule, MatInputModule, MatTableModule,
        MatIconModule, MatDialogModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

const materialComponents = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  FormsModule
];
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
