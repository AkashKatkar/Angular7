import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule, MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


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
