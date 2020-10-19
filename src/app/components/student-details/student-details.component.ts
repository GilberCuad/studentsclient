import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent = null;
  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getStudent(this.route.snapshot.paramMap.get('id'));
  }
  getStudent(id): void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(attend): void {
    const data = {
      name: this.currentStudent.name,
      apellido: this.currentStudent.apellido,
      attend: true
    };

    this.studentService.update(this.currentStudent.id, data)
      .subscribe(
        response => {
          this.currentStudent.attend = true;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateStudent(): void {
    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El estudiante fue actualizado con exito!';
        },
        error => {
          console.log(error);
        });
  }

  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/students']);
        },
        error => {
          console.log(error);
        });
  }
}


