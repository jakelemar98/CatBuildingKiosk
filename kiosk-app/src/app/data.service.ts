import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getClasses() {
    return this.http.get('http://localhost:5001/classes')
  }

  getUser(data){
    console.log(data)
    this.http.post("http://127.0.0.1:5001/users",data)
    .subscribe(
    data  => {
      console.log("POST Request is successful ", data);
    },
    error  => {
      console.log("Error", error);
    }

    );
  }
}
