import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from 'src/app/Models/Student';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  student = {
    address: '',
    birthday: '',
    cep: null,
    city: '',
    classId: null,
    neighborhood: '',
    studentEmail: '',
    studentName: '',
    studentTelephone: null,
  };

  message = 'Aluno cadastrado com sucesso!';
  action = 'Fechar';

  product = {
    name: '',
    quantityOwned: null,
    quantitySold: 0,
    price: null,
    image: '',
    descriptionText: '',
  };

  constructor(
    private api: HttpService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  cadastrar() {
    this.api.createStudent(this.student).subscribe(() => {
      this._snackBar.open(this.message, '', {
        duration: 5000,
      });

      this.route.navigate(['/students']);
    });
  }

  teste() {
    this._snackBar.open(this.message, '', {
      duration: 5000,
    });

    setTimeout(() => {
      this.route.navigate(['/students']);
    }, 6000);
  }
}
