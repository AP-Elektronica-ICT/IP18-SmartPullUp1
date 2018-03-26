
import { Injectable } from "@angular/core";

//import * as data from '../../../json/pullup.json';


@Injectable()
export class JsonService {

    // jsonString = '{ "array": [ { "Type": "Measurement", "up": 1.9, "down": 3.1 }, { "Type": "Measurement", "up": 4.9, "down": 6.1 }, { "Type": "Measurement", "up": 1.9, "down": 8.5 }, { "Type": "Measurement", "up": 8.4, "down": 9.3 }, { "Type": "Measurement", "up": 11.7, "down": 12.9 }, { "Type": "Measurement", "up": 18.4, "down": 19 },{ "Type": "Measurement", "up": 19.9, "down": 23.1 } ] }';
    jsonString = '{ "array": [ { "Type": "Measurement", "up": 1.9, "down": 3.1 }] }';

    DummyArray: DummyData;

    constructor() {
        this.getData();
    }


    getData() {
        this.DummyArray = JSON.parse(this.jsonString);
        return this.DummyArray;
    }
}

export interface IPullUp {
    Type: string;
    up: number;
    down: number;
}

export interface DummyData {
    array: IPullUp[];
}
