import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";


@Injectable()
export class BluetoothService {

      constructor(private bluetooth: BluetoothSerial){
      }

}