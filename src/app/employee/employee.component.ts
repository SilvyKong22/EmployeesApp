import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeID: number;
  employee: any = {};
  tasksForm: FormGroup;
  states = ['To do', 'In progress', 'Completed'];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataStorage: DataStorageService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.employeeID = this.route.snapshot.params['id'];
    this._dataStorage.getEmployee(this.employeeID).subscribe((employee) => {
      this.employee = employee;
    });
    this.initForm();
  }

  addTask() {
    const tasks = this.tasksForm.get('tasks') as FormArray;
    tasks.push(
      new FormGroup({
        task: new FormControl(''),
        state: new FormControl('To do'),
      })
    );
  }

  removeTask(index: number) {
    const tasks = this.tasksForm.get('tasks') as FormArray;
    tasks.removeAt(index);
  }

  saveTasks() {
    // Recupera i task dal form
    const tasks = this.tasksForm.value.tasks;

    // Aggiungi i task all'oggetto employee
    this.employee.tasks = tasks;
    // Effettua le operazioni di salvataggio
    // ...
    this._dataStorage
      .updateEmployee(this.employee.id, this.employee)
      .subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee tasks UPDATED succefully!');
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.tasksForm.get('tasks')).controls;
  }

  private initForm() {
    this.tasksForm = new FormGroup({
      tasks: new FormArray([]),
    });

    this._dataStorage.getEmployee(this.employeeID).subscribe((employee) => {
      this.employee = employee;
      if (this.employee.tasks) {
        const employeeTasks = this.tasksForm.get('tasks') as FormArray;
        this.employee.tasks.forEach((task: any) => {
          employeeTasks.push(
            new FormGroup({
              task: new FormControl(task.task),
              state: new FormControl(task.state),
            })
          );
        });
      }
    });
  }
}
