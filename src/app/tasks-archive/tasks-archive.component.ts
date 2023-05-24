import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-tasks-archive',
  templateUrl: './tasks-archive.component.html',
  styleUrls: ['./tasks-archive.component.scss'],
})
export class TasksArchiveComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedStatus: string = 'All';
  constructor(private _dataStorage: DataStorageService) {}

  ngOnInit(): void {
    this._dataStorage.getEmployeeList().subscribe((employees) => {
      this.employees = employees;
      this.filteredEmployees = [...employees];
    });
  }

  filterByEmployee(event: any): void {
    const filterValue = event.toLowerCase();
    this.filteredEmployees = this.employees.filter((employee: any) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      return fullName.includes(filterValue);
    });
  }

  filterByStatus(status: string): void {
    if (this.selectedStatus !== status) {
      this.selectedStatus = status;
      if (status !== 'All') {
        this.filteredEmployees = this.employees
          .map((employee: any) => {
            if (employee.tasks && employee.tasks.length > 0) {
              const filteredTasks = employee.tasks.filter(
                (task: any) => task.state === status
              );
              return { ...employee, tasks: filteredTasks };
            } else {
              return employee;
            }
          })
          .filter(
            (employee: any) => employee.tasks && employee.tasks.length > 0
          );
      } else {
        this.filteredEmployees = [...this.employees];
      }
    } else {
      this.selectedStatus = 'All';
      this.filteredEmployees = [...this.employees];
    }
  }
}
