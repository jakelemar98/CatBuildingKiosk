import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Classes } from './class';

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
  getClasses() {
    return this.http.get('http://localhost:5001/classes')
  }

  getUser(data): Observable<User[]>{
    return this.http.post<User[]>("http://127.0.0.1:5001/users",data)
  }

  checkUser(data): Observable<User[]>{
    return this.http.post<User[]>("http://127.0.0.1:5001/users/verify",data)
  }

  addClass(data): Observable<classes[]>{
    return this.http.post<Classes[]>("http://127.0.0.1:5001/class",data)
  }
}
