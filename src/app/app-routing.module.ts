import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AppComponent } from './app.component';
import { EmployeesArchiveComponent } from './employees-archive/employees-archive.component';
import { TasksArchiveComponent } from './tasks-archive/tasks-archive.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesArchiveComponent,
  },
  {
    path: 'employees/:id',
    component: EmployeeComponent,
  },

  {
    path: 'tasks',
    component: TasksArchiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
