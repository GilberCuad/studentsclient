import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  Student = {
    name: '',
    apellido: '',
    attend: false
  };
  submitted = false;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {}

  saveStudent(): void {
    const data = {
      name: this.Student.name,
      apellido: this.Student.apellido
    };


    this.studentService.create(data)
      .subscribe(
        respose => {
          console.log(respose);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

  }

  newStudent(): void {
    this.submitted = false;
    this.Student = {
      name: '',
      apellido: '',
      attend: false
    };
  }

}
