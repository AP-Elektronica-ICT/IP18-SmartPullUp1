#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial Bluetooth (7,8); // RX and TX Pins
const size_t bufferSize = JSON_OBJECT_SIZE(3);
String output;
int button;
float Timerino;
int state = 0;
boolean first = true;
long lastDebounce = 0;

void BufferCreator(){
  if (first){          // this is the initial package which is only sent once
    DynamicJsonBuffer jsonBuffer(bufferSize);
    JsonObject& root = jsonBuffer.createObject();
    root["type"] = "Initial";
    root["machine_ID"] = 1;
    root["weight"] = 85.5;
    root.printTo(output);

    first = false;
    sendData();
  } 
  
  else{                         // after the initial package button press will send pull-up data
    DynamicJsonBuffer jsonBuffer(bufferSize);
    JsonObject& root = jsonBuffer.createObject();
    root["type"] = "Measurement";
    root["start"] = Timerino/1000;
    root["up"] = Timerino/1000 + random(1,2); // this just randomises the down time so there is slight variation. don't press the button too fast or otherwize
    root.printTo(output);                       // the downtime might be later than the beginning of the next pull up 
  }
}

void sendData() {
  Bluetooth.print(output);
  Serial.println(output);
  output="";
}

void setup() {
  Bluetooth.begin(9600);
  Serial.begin(9600);
  pinMode(4,INPUT_PULLUP); // this enables Arduino's internal pull up resistor so you don't need to get an external resistor to your button circuit
  
  BufferCreator();
}


void loop() {
   
      
      Timerino = millis();
      button = digitalRead(4);
      
      if(button == HIGH && millis() - lastDebounce > 200) {
        lastDebounce = millis();
        BufferCreator();
        sendData();
      }
      
   
}
