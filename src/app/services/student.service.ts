import { ISchool } from './../models/iSchool';
import { IStudent } from './../models/iStudent';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private serverUrl:string='http://localhost:9000';
  public schools:ISchool[]=[] as ISchool[];

  constructor(private http:HttpClient) { }

  public getAllStudents():Observable<IStudent[]>{
    let dataURL:string=`${this.serverUrl}/students`;
    return this.http.get<IStudent[]>(dataURL).pipe(catchError(this.handelError));
  }

  public getStudent(studentId:string):Observable<IStudent>{
    let dataURL:string=`${this.serverUrl}/students/${studentId}`;
    return this.http.get<IStudent>(dataURL).pipe(catchError(this.handelError));
  }

  public createStudent(student:IStudent):Observable<IStudent>{
    let dataURL:string=`${this.serverUrl}/students`;
    return this.http.post<IStudent>(dataURL,student).pipe(catchError(this.handelError));
  }

  public updateStudent(student:IStudent,studentId:string):Observable<IStudent>{
    let dataURL:string=`${this.serverUrl}/students/${studentId}`;
    return this.http.put<IStudent>(dataURL,student).pipe(catchError(this.handelError));
  }

  public deleteStudent(studentId:string):Observable<{}>{
    let dataURL:string=`${this.serverUrl}/students/${studentId}`;
    return this.http.delete<{}>(dataURL).pipe(catchError(this.handelError));
  }

  public getAllSchool():Observable<ISchool[]>{
    let dataURL:string=`${this.serverUrl}/schools`;
    return this.http.get<ISchool[]>(dataURL).pipe(catchError(this.handelError));
  }


  public getSchool(student:IStudent):Observable<ISchool>{
    let dataURL:string=`${this.serverUrl}/schools/${student.schoolId}`;
    return this.http.get<ISchool>(dataURL).pipe(catchError(this.handelError));
  }


  public handelError(error:HttpErrorResponse){
    let errorMessage:string ='';
    if(error.error instanceof ErrorEvent){
      errorMessage=`Error: ${error.error.message}`
    }
    else{
      errorMessage=`Status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }


}
