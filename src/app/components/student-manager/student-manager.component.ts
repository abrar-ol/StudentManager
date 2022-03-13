import { ISchool } from 'src/app/models/iSchool';
import { StudentService } from './../../services/student.service';
import { IStudent } from './../../models/iStudent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {
  public loading :boolean=false;
  public students:IStudent[]=[];
  public errorMessage:string|null=null;
  public student:IStudent={}as IStudent;
  public logos: string[]=[];
  searchText!: string;


  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent(){
    this.loading=true;
    this.studentService.getAllStudents().subscribe((data:IStudent[])=>{
      this.students=data;
      this.loading=false;

      data.forEach((s,i)=>{

        this.studentService.getSchool(s).subscribe((data:ISchool)=>{
          if(data.logo)
          this.logos[i]=(data.logo);
         }, (error)=>{
          this.errorMessage=error;
          this.loading=false;
        });

      })

    }, (error)=>{
      this.errorMessage=error;
      this.loading=false;
    }
    );
  }


  delete(studentId: string){
    if(studentId){
      this.studentService.deleteStudent(studentId).subscribe(data=>{
        this.getAllStudent();

      },error=>{
        this.errorMessage=error;

      });
    }

  }

}
