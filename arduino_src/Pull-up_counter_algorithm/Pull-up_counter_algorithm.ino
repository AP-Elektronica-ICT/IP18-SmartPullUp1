#include <MedianFilter.h>
#include <MsTimer2.h>

MedianFilter median(5, 460);

double sampling = 5; 
int oldInput = 0;
int input=0;
double sampleTime = 0;
int filteredOutput=0;
int output;
int i = 0;
float average = 0.0;
float feedback = 0.0;
int old_func_value = 0;
boolean Flag = true;
int Count = 0;
double Start = 0;
int oldout = 0;
int newValue[10];
int oldValue[7];

void setup() {
Serial.begin(38400);
MsTimer2::set(sampling,measure);
MsTimer2::start();
pinMode(A0,INPUT);
}


void measure(){

  for(i = 0; i < 30; i++)
    {
      input = analogRead(A0);
      median.in(input);
      input = median.out();
      average = average + input;
    }
  average = average / 30.0;
  feedback = feedback * 0.8 + 0.2 * average;
  sampleTime += sampling / 1000;
  output = feedback;
  
  


  if(oldout > output * 0.7 && sampleTime > 30)
    {
      if(Start==0)
      {
        Start = sampleTime;
      }  
      if(sampleTime - Start > 1000)
      {
        Counter(output);
      }
    }
   
Serial.print(Start);
Serial.print("\t");
Serial.print(output);
Serial.print("\t");
Serial.print(oldout);
Serial.print("\t");
Serial.println(sampleTime);
//Serial.print("\t");
//Serial.println(Count);



}
int Counter(int value){
  
  if(value > old_func_value * 1.2)
  {
    Flag=true;
    old_func_value = value;
    return;
  }
  
  else
  {
    if(Flag==true)
    {
      if(value < old_func_value * 0,8)
      {
        Count++;
        Flag = false;
        old_func_value = value;
        return;
      }
      else
      {
        old_func_value = value;
        return;
      }
    }
    else
    {
      old_func_value = value;
      return;
    }
  }
  old_func_value = value;
  return;
}

void ref_measure(){
  for(int n = 0; n < 10; n++)
  {
    for(i = 0; i < 30; i++)
      {
        input = analogRead(A0);
        median.in(input);
        input = median.out();
        average = average + input;
      }
    average = average / 30.0;
    feedback = feedback * 0.8 + 0.2 * average;
//    ref_array[n] = feedback;
//    muuttuja += ref_array[n];
  }
}
void loop() {
}
