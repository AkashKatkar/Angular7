import { NgModule } from '@angular/core';
import {MatSidenavModule, MatToolbarModule, MatButtonModule, MatListModule,
        MatCardModule, MatSelectModule, MatInputModule, MatTableModule,
        MatIconModule} from '@angular/material';

const materialComponents = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatIconModule
];
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
