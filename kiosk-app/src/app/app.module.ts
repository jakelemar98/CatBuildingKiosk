import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ClassesComponent } from './classes/classes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassTableComponent } from './class-table/class-table.component';
import { MatTableModule } from '@angular/material';
import { EditClassComponent } from './edit-class/edit-class.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherTableComponent } from './teacher-table/teacher-table.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { ClassroomTableComponent } from './classroom-table/classroom-table.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ViewClassComponent } from './view-class/view-class.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';

library.add(fas, far);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClassesComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AddClassComponent,
    ClassTableComponent,
    EditClassComponent,
    AddTeacherComponent,
    TeacherTableComponent,
    EditTeacherComponent,
    AddClassroomComponent,
    EditClassroomComponent,
    ClassroomTableComponent,
    ViewClassComponent,
    ViewTeacherComponent,
    ViewClassroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    SweetAlert2Module.forRoot(),
    MatSelectModule,
    FontAwesomeModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
                    AddClassComponent,
                    ClassTableComponent,
                    EditClassComponent,
                    AddTeacherComponent,
                    TeacherTableComponent,
                    EditTeacherComponent,
                    AddClassroomComponent,
                    AddClassroomComponent,
                    EditClassroomComponent,
                    ClassroomTableComponent,
                    ViewClassComponent,
                    ViewClassroomComponent,
                    ViewTeacherComponent
                  ]

})
export class AppModule { }
