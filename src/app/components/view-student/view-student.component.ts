import { ISchool } from './../../models/iSchool';
import { IStudent } from './../../models/iStudent';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  public loading:boolean=false;
  public studentId:string|null=null;
  public student:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public school:ISchool={}as ISchool;

  constructor(private activatedRoute:ActivatedRoute,
              private studentService:StudentService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.studentId=param.get('studentId');
    });
    if(this.studentId){
      this.loading=true;
      this.studentService.getStudent(this.studentId).subscribe(
        (data:IStudent)=>{
          this.student=data;
          this.loading=false;
          this.studentService.getSchool(data).subscribe(
            (data:ISchool)=>{
              this.school=data;
            }
          );

        },
        (error)=>{
          this.errorMessage=error;
          this.loading=false;
        }
      );
    }

  }

  public isNotEmpty(){
    return Object.keys(this.student).length>0 && Object.keys(this.school).length>0 ;
  }

}
