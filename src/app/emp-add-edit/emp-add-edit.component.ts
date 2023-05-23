import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dataStorage: DataStorageService,
    private _dialogFormRef: MatDialogRef<EmpAddEditComponent>,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],
      tasks: this._fb.array([]), // Aggiungi un form array per i task
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    if (this.data && this.data.tasks) {
      // UPDATE MODE
      const tasksArray = this.empForm.get('tasks') as FormArray;
      this.data.tasks.forEach((task: any) => {
        tasksArray.push(
          this._fb.group({
            task: task.task,
            state: task.state,
          })
        );
      });
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const employeeData = { ...this.empForm.value };
      employeeData.tasks = employeeData.tasks.map((task: any) => ({
        task: task.task,
        state: task.state,
      }));

      if (this.data) {
        const dialogConfirm = this._dialog.open(DialogComponent, {
          data: {
            employee: employeeData,
            message: `Are you sure to update ${employeeData.firstName} ${employeeData.lastName}?`,
            action: 'Update',
            type: 'warning',
          },
        });

        dialogConfirm.afterClosed().subscribe((confirm) => {
          if (confirm) {
            this._dataStorage
              .updateEmployee(this.data.id, this.empForm.value)
              .subscribe({
                next: (val: any) => {
                  this._coreService.openSnackBar(
                    'Employee UPDATED succefully!'
                  );
                  this._dialogFormRef.close(true);
                },
                error: (err: any) => {
                  this._dialog.open(DialogComponent, {
                    data: {
                      message: err.message,
                      action: 'Ok',
                      type: 'error',
                    },
                  });
                },
              });
          }
        });
      } else {
        this._dataStorage.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee ADDED succefully!');
            this._dialogFormRef.close(true);
          },
          error: (err: any) => {
            this._dialog.open(DialogComponent, {
              data: {
                message: err.message,
                action: 'Ok',
                type: 'Error',
              },
            });
          },
        });
      }
    } else {
      this._dialog.open(DialogComponent, {
        data: {
          message: 'Fill in the missing fields',
          action: 'Continue',
          type: 'error',
        },
      });
    }
  }
}