import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the ProgressSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress-session',
  templateUrl: 'progress-session.html',
})
export class ProgressSessionPage {
  
  @ViewChild('lineCanvas') lineCanvas;

  sessionId = 0;
  sessionDate;
  lineChart:any;
  
  chartLabels= [];

  first = "Monday";
  second = "Tuesday";
  third = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.sessionId = navParams.get("ClickedSession");
    console.log(navParams.data)
    this.sessionDate = new Date((this.sessionId * 1000)).toDateString();
    console.log(this.sessionDate);
    this.third = new Date((this.sessionId * 1000)).toDateString()
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressSessionPage');
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
      type: 'line',
      data: {
          labels: [],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.2,
                  backgroundColor: "rgba(52,74,247,0.5)",
                  borderColor: "rgba(52,74,247,0.5)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(52,74,247,0.5)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(52,74,247,0.5)",
                  pointHoverBorderColor: "rgba(52,74,247,0.5)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40,34,54,45,65],
                  spanGaps: false,
              }
          ]
      }

  });
  this.SetupChart();
  }


  public SetupChart(){
    this.chartLabels = [this.first, this.second, this.third]
      this.lineChart.labels = this.chartLabels;


  }

}
