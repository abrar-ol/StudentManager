import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchool } from 'src/app/models/iSchool';
import { IStudent } from 'src/app/models/iStudent';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public loading :boolean=false;
  public studentId:string|null=null;
  public student:IStudent={}as IStudent;
  public errorMessage:string|null=null;
  public schools:ISchool[]=[] as ISchool[];


  constructor(private activatedRoute:ActivatedRoute,
    private studentService:StudentService,private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.studentId=param.get('studentId');
    });

    if(this.studentId){
      this.studentService.getStudent(this.studentId).subscribe(
        (data:IStudent)=>{
          this.student=data;
          this.loading=false;
          this.studentService.getAllSchool().subscribe(
            (data)=>{
              this.schools=data;
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
submit()
  {
    if(this.studentId){
      this.studentService.updateStudent(this.student,this.studentId).subscribe(
        (data)=>{
          console.log("updated school: "+data.name+":"+data.schoolId);
          this.studentService.getAllSchool().subscribe(
            (data)=>{
              this.schools=data;
               this.router.navigate(['/']).then();

            }
          );

        },
        (error)=>{
          this.errorMessage=error;
          this.router.navigate([`/students/edit/${this.studentId}`]).then();
        }
      );
    }

  }

}
