import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private _http: HttpClient, private _coreService: CoreService) {}
  URIJsonServer = 'http://localhost:3000/employees';
  URIFirebase =
    'https://employees-app-d0372-default-rtdb.europe-west1.firebasedatabase.app/employees';

  // EMPLOYEES FIREBASE SERVER
  addEmployee(data: any): Observable<any> {
    this._coreService.showLoading();
    return this._http.post(`${this.URIFirebase}.json`, data).pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  updateEmployee(id: any, data: any): Observable<any> {
    this._coreService.showLoading();
    return this._http.put(`${this.URIFirebase}/${id}.json`, data).pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  getEmployee(id: any): Observable<any> {
    this._coreService.showLoading();
    return this._http.get(`${this.URIFirebase}/${id}.json`).pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  getEmployeeList(): Observable<any> {
    this._coreService.showLoading();
    return this._http.get(`${this.URIFirebase}.json`).pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  deleteEmployee(id: any): Observable<any> {
    this._coreService.showLoading();
    return this._http.delete(`${this.URIFirebase}/${id}.json`).pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  // EMPLOYEES JSON SERVER
  // addEmployee(data: any): Observable<any> {
  //   return this._http.post(`${this.URIJsonServer}`, data);
  // }
  // updateEmployee(id: number, data: any): Observable<any> {
  //   return this._http.put(`${this.URIJsonServer}/${id}`, data);
  // }

  // getEmployee(id: number): Observable<any> {
  //   return this._http.get(`${this.URIJsonServer}/${id}`);
  // }

  // getEmployeeList(): Observable<any> {
  //   return this._http.get(`${this.URIJsonServer}`);
  // }

  // deleteEmployee(id: number): Observable<any> {
  //   return this._http.delete(`${this.URIJsonServer}/${id}`);
  // }
}
