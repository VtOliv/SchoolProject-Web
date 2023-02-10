import { Component, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Filter } from 'src/app/Models/Filter';
import { Student } from 'src/app/Models/Student';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnChanges {
  ngOnChanges() {
  }

  foods: Filter[] = [
    {value: 'classId', viewType: 'Turma'},
    {value: 'studentId', viewType: 'Matricula'},
    {value: 'studentName', viewType: 'Nome'}
  ];

  field: String = "";
  filter: String = "";
  pageEvent: PageEvent | undefined;
  length = 50;
  pageSize = 20;
  pageIndex = 0;
  itens: any;
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'classId',
    'birthday',
    'delete'
  ];
  dataSource: Student[] = [];

  constructor(private api: HttpService) {
    this.api.getStudents(this.pageIndex).subscribe((data) => {
      this.itens = data;
      this.length = this.itens.totalElements;
      this.pageIndex = this.itens.number;
      this.dataSource = this.itens.content;
    });
  }

  buscar() {
  if (this.filter == '' || this.field == '') {
      this.api.getStudents(this.pageIndex).subscribe((data) => {
        this.itens = data;
        this.length = this.itens.totalElements;
        this.pageIndex = this.itens.number;
        this.dataSource = this.itens.content;
      });
    } else {
      this.api
        .getStudentsFiltered(this.field, this.filter)
        .subscribe((data) => {
          this.itens = data;
          this.length = this.itens.totalElements;
          this.pageIndex = this.itens.number;
          this.dataSource = this.itens.content;
        });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.buscar();
  }

  teste() {
    console.log(this.filter)
    console.log(this.field)
  }
}
