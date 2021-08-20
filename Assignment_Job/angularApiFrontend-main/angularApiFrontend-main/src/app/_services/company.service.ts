import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ICompany } from '../_models/_interfaces/ICompany';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private _http:HttpClient) { }

  getAllCompaines():Observable<ICompany[]> {
    let url = `${environment.apiUrl}/api/company`;
    return this._http.get<ICompany[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCompanyById(id:number):Observable<ICompany>{
    let url = `${environment.apiUrl}/api/company/${id}`;
    return this._http.get<ICompany>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewCompany(newcompany:ICompany):Observable<ICompany>{
    let url = `${environment.apiUrl}/api/company`;
    return this._http.post<ICompany>(url, newcompany)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateCompany(id:number, companyToUpdate:ICompany):Observable<ICompany>{
    let url = `${environment.apiUrl}/api/company/${id}`;
    return this._http.put<ICompany>(url, companyToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  deleteCompany(id:number):Observable<any>{
    let url = `${environment.apiUrl}/api/company/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCompinesCount():Observable<number>{
    let url = `${environment.apiUrl}/api/company/count`;
    return this._http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCompainesByPage(pageSize:number, pageNumber:number):Observable<ICompany[]>{
    let url = `${environment.apiUrl}/api/company/${pageSize}/${pageNumber}`;
    return this._http.get<ICompany[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
