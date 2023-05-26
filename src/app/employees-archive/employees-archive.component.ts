import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { DataStorageService } from '../services/data-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ProjAddEditComponent } from '../proj-add-edit/proj-add-edit.component';

@Component({
  selector: 'app-employees-archive',
  templateUrl: './employees-archive.component.html',
  styleUrls: ['./employees-archive.component.scss'],
})
export class EmployeesArchiveComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  // crea una interface employee con un model dopo (da mettere al posto di any)
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  @ViewChild('exampleModal') modal: ElementRef;

  constructor(
    private _dialog: MatDialog,
    private _dataStorage: DataStorageService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.onGetEmployeeList();
  }

  openAddEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      // se this._dialogRef.close(true);  ------> (EmpAddEditComponent)
      // quindi se il MatDialogRef si è chiuso e non ci sono stati errori viene ricaricata la lista degli employees
      next: (val) => {
        if (val) {
          this.onGetEmployeeList();
        }
      },
    });
  }

  openAddProjForm() {
    const modalEl = this.modal.nativeElement;
    modalEl.modal('show');
    // const dialogRef = this._dialog.open(ProjAddEditComponent);
  }

  onGetEmployeeList() {
    this._dataStorage.getEmployeeList().subscribe({
      next: (res) => {
        // ############ FIREBASE ############

        const employeeArray = Object.values(res);
        this.dataSource = new MatTableDataSource(employeeArray);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //
        //
        //
        // ############ JSON SERVER ############
        // this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onDeleteEmployee(employee: any) {
    const dialogConfirm = this._dialog.open(DialogComponent, {
      data: {
        employee: employee,
        message: `Are you sure to delete ${employee.firstName} ${employee.lastName}?`,
        action: 'Delete',
        type: 'warning',
      },
    });

    dialogConfirm.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this._dataStorage.deleteEmployee(employee.id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar(
              'Employee deleted Succefully',
              'done'
            );
            this.onGetEmployeeList();
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
  }

  openEditEmpForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.onGetEmployeeList();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log(event);
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getToDoTaskCount(tasks: any[]): number {
    const toDoTasks = tasks.filter((task) => task.state === 'To do');
    return toDoTasks.length;
  }
}
