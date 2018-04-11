import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

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
}