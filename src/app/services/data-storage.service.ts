import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private _http: HttpClient) {}

  // EMPLOYEES
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployee(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/employees/${id}`);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  // PROJECTS
  addProject(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/projects', data);
  }
  updateProject(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/projects/${id}`, data);
  }

  getProject(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/projects/${id}`);
  }

  getProjectList(): Observable<any> {
    return this._http.get('http://localhost:3000/projects');
  }

  deleteProject(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/projects/${id}`);
  }
}
