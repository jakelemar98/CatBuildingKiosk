import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Classes } from './class';
import { Teacher } from './teacher';
import { Classroom } from './classroom';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUser(data): Observable<User[]>{
    return this.http.post<User[]>("http://127.0.0.1:5001/users",data)
  }

  checkUser(data): Observable<User[]>{
    return this.http.post<User[]>("http://127.0.0.1:5001/users/verify",data)
  }

  addClass(data): Observable<Classes[]>{
    return this.http.post<Classes[]>("http://127.0.0.1:5001/class",data)
  }

  getClasses() {
    return this.http.get('http://localhost:5001/classes')
  }

  updateClass(data, id): Observable<Classes[]>{
    return this.http.put<Classes[]>("http://127.0.0.1:5001/class/"+id,data)
  }

  deleteClass(id): Observable<Classes[]>{
    return this.http.delete<Classes[]>("http://127.0.0.1:5001/class/"+id)
  }

  getClass(id): Observable<Classes[]>{
    return this.http.get<Classes[]>("http://127.0.0.1:5001/class/"+id)
  }

  getClassesByTeacher(data): Observable<Classes[]>{
    console.log(data)
    return this.http.post<Classes[]>("http://127.0.0.1:5001/classes", data)
  }

  addTeacher(data): Observable<Teacher[]>{
    return this.http.post<Teacher[]>("http://127.0.0.1:5001/teachers", data)
  }

  getTeachers():Observable<Teacher[]>{
    return this.http.get<Teacher[]>("http://127.0.0.1:5001/teachers")
  }

  updateTeacher(data, id):Observable<Teacher[]>{
    return this.http.put<Teacher[]>("http://127.0.0.1:5001/teacher/"+id, data)
  }

  deleteTeacher(id): Observable<Teacher[]>{
    return this.http.delete<Teacher[]>("http://127.0.0.1:5001/teacher/"+id)
  }

  addClassroom(data): Observable<Classroom[]>{
    return this.http.post<Classroom[]>("http://127.0.0.1:5001/classrooms", data)
  }

  getClassrooms(): Observable<Classroom[]>{
    return this.http.get<Classroom[]>("http://127.0.0.1:5001/classrooms")
  }

  updateClassroom(data, id): Observable<Classroom[]>{
    return this.http.put<Classroom[]>("http://127.0.0.1:5001/classrooms/"+id, data)
  }

  deleteClassroom(id): Observable<Classroom[]>{
    return this.http.delete<Classroom[]>("http://127.0.0.1:5001/classrooms/"+id)
  }
}
