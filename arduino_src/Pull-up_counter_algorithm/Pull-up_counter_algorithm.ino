#include <MedianFilter.h>
#include <MsTimer2.h>

MedianFilter median(5, 460);

double sampling = 20; 
double sampleTime = 0;
double Start = 0;

float average = 0.0;
float feedback = 0.0;

int oldInput = 0;
int input=0;
int filteredOutput=0;
int output;
int i = 0;
int Count = 0;
int old_func_value = 0;
long int ref_rest_avg = 0;
long int ref_hang_avg = 0;

boolean Flag = true;
int oldout = 0;

void filter()
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
output = feedback;  
}

void measure(){

filter();

sampleTime += sampling / 1000;
  
if(output < ref_rest_avg - 50)
  {
    if(Start==0)
      {
        Start = sampleTime;
      }  
      if(sampleTime - Start > 1)
        {
          for(int n = 0; n < 100; n++)
            {
              filter();
              ref_hang_avg += feedback;
            }
          ref_hang_avg /= 100;
          
          if(output < ref_hang_avg - 15)
            {
              Serial.println("lähetetään");
              Count++;
              //Counter(output);
            }
        }
  }
      else
      Start = 0;
     
Serial.print(Start);
Serial.print("\t");
Serial.print(output);
Serial.print("\t");
Serial.print(ref_hang_avg);
Serial.print("\t");
Serial.print(sampleTime);
Serial.print("\t");
Serial.println(Count);

  }

  
int Counter(int value){

  Count++;
  
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


void setup() {
Serial.begin(38400);

for(int n=0; n<150; n++)
{
  filter();
  ref_rest_avg += feedback;

}
ref_rest_avg = ref_rest_avg / 150;
MsTimer2::set(sampling,measure);
MsTimer2::start();
pinMode(A0,INPUT);
}

void loop() {
}
