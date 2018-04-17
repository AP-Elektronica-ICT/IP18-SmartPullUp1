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

    public insertPullupSession(id: string, amount : number, timestamp: number, duration: number, avgspeed: number, weight: number, completion: number, goal: number ){
        let data = {
            'userid' : id,
            'timestamp' : String(timestamp),
            'amount' : String(amount),
            'duration' : String(duration),
            'avgspeed' : String(avgspeed),
            'weight' : String(weight),
            'completion' : String(completion),
            'goal' : String(goal)
        }
        this._http.post('http://ec2-54-77-199-101.eu-west-1.compute.amazonaws.com/pullups/', data);
    }
}