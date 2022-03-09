import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentManagerComponent } from './components/student-manager/student-manager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'students/admin',pathMatch:'full'},
  {path:'students/admin', component:StudentManagerComponent},
  {path:'students/add', component:AddStudentComponent},
  {path:'students/edit/:studentId', component:EditStudentComponent},
  {path:'students/view/:studentId', component:ViewStudentComponent},
  {path:'**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
