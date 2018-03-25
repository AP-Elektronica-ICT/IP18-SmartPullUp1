import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    constructor(private _http: HttpClient) { }

    // public getUserById() {
    //     return Observable.create(observer => {
    //         observer.next(this._http.get<IUser>(`http://api.rubennemes.dvm/user/hjkdh32jhjfshjdsfk`));
    //       });
    // }
    public getUserById(id: string)
    {
        return new Promise(resolve => {
            this._http.get('http://api.rubennemes.dvm/user/hjkdh32jhjfshjdsfk')
              .subscribe(data => {
                resolve(data);
              });
        });
    }

    // public getUserById(id: string) {
    //     return new Promise(resolve => {
    //         this._http.get('http://api.rubennemes.dvm/user/hjkdh32jhjfshjdsfk').subscribe(data => {
    //           resolve(data);
    //         }, err => {
    //           console.log(err);
    //         });
    //     });
    // }
}

 export interface IUser {
     userid: string;
     name: string;
     age: number;
     weight: number;
//     pullups: JSON;
 }