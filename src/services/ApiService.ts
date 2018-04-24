import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class ApiService {
    constructor(private _http: HttpClient) { }

    public getUserById(id: string)
    {
        return new Promise(resolve => {
            this._http.get('http://ec2-54-77-199-101.eu-west-1.compute.amazonaws.com/user/' + id)
              .subscribe(data => {
                resolve(data);
              });
        });
    }

    public updateUserById(){
      let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

      return new Promise((resolve, reject) => {
          this._http.post('http://ec2-54-77-199-101.eu-west-1.compute.amazonaws.com/updateuser', JSON.stringify(data),options)
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });      
    }

    public insertPullupSession(data){
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return new Promise((resolve, reject) => {
            this._http.post('http://ec2-54-77-199-101.eu-west-1.compute.amazonaws.com/pullups', JSON.stringify(data),options)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }

    public insertEvent(data){
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return new Promise((resolve, reject) => {
            this._http.post('http://ec2-54-77-199-101.eu-west-1.compute.amazonaws.com/events', JSON.stringify(data),options)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }
}