import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../_models/_interfaces/IEmployee';
import { IEmployeeVM } from '../_models/_interfaces/IEmployeeVM';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  getAllEmployees(): Observable<IEmployeeVM[]> {
    let url = `${environment.apiUrl}/api/employee`;
    return this._http.get<IEmployeeVM[]>(url).pipe(catchError((err) => {

      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));

  }


  getEmployeeById(id: number): Observable<IEmployeeVM> {
    let url = `${environment.apiUrl}/api/employee/${id}`;
    return this._http.get<IEmployeeVM>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  addNewEmployee(newEmployee: IEmployee): Observable<IEmployee> {
    let url = `${environment.apiUrl}/api/employee`;
    return this._http.post<IEmployee>(url, newEmployee)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  updateEmployee(id: number, employeeToUpdate: IEmployee): Observable<IEmployee> {
    let url = `${environment.apiUrl}/api/employee/${id}`;
    return this._http.put<IEmployee>(url, employeeToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  deletEemployee(id: number): Observable<any> {
    let url = `${environment.apiUrl}/api/employee/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getEmployeesCount(companyId:number = 0): Observable<number> {
    let url = `${environment.apiUrl}/api/employee/count`;
    if(companyId != 0){
      url = `${environment.apiUrl}/api/employee/count?companyId=${companyId}`;
    }

    return this._http.get<number>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getEmployeesByPage(pageSize: number, pageNumber: number): Observable<IEmployeeVM[]> {
    let url = `${environment.apiUrl}/api/employee/${pageSize}/${pageNumber}`;
    return this._http.get<IEmployeeVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }




}
