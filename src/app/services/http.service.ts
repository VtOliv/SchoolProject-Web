import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../Models/Student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getStudents(value: Number) {
    let url = this.http.get<Student[]>(`http://localhost:8097/students?page=${value}`);
    return url.pipe(map((data) => data));
  }

  getStudentsFiltered(field: String, value: any) {
    let url = this.http.get<any[]>(
      `http://localhost:8097/students?${field}=${value}`
    );
    return url.pipe(map((data) => data));
  }

  createStudent(newStudent: any): Observable<any> {
    let url = this.http.post(`http://localhost:8097/students`, newStudent);

    return url.pipe(map((data) => data));
  }
}
