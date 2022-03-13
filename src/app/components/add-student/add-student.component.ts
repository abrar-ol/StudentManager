import { ISchool } from './../../models/iSchool';
import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/models/iStudent';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public loading :boolean=false;
  public student:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public schools:ISchool[]=[] as ISchool[];


  constructor(private studentService:StudentService,private router:Router) { }

  ngOnInit(): void {
    this.studentService.getAllSchool().subscribe((data:ISchool[])=>{
      this.schools=data;
    }, (error)=>{
      this.errorMessage=error;
    }

    );
  }

  submit()
  {
    this.studentService.createStudent(this.student).subscribe(
      (data)=>{
        this.studentService.getAllSchool().subscribe(  (data)=>{
          this.schools=data;
        });
        this.router.navigate(['/']).then();

      },
      (error)=>{
        this.errorMessage=error;
        this.router.navigate(['/students/add']).then();

      }
    );
  }

}
