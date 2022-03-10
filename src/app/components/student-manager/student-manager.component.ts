import { StudentService } from './../../services/student.service';
import { IStudent } from './../../models/iStudent';
import { Component, OnInit } from '@angular/core';
import { ISchool } from 'src/app/models/iSchool';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {
  public loading :boolean=false;
  public students:IStudent[]=[];
  public errorMessage:string|null=null;
  public schoolLogos:string[]=[];
  public student:IStudent={}as IStudent;

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.loading=true;
    this.studentService.getAllStudents().subscribe((data:IStudent[])=>{
      this.students=data;
      this.loading=false;

      data.forEach(student => {
        this.studentService.getSchool(student).subscribe((school:ISchool)=>{
          if(school.logo)
          this.schoolLogos.push(school.logo);
          else
          this.schoolLogos.push("");
        }
        );
      });

    }, (error)=>{
      this.errorMessage=error;
      this.loading=false;
    }
    );
  }

}
