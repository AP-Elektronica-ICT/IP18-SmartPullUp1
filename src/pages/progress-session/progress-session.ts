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
  pullupsamount=[];
  charLabelsReverse =[];
  date; 






  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.sessionId = navParams.get("ClickedSession");
    console.log("in Session")
    console.log(navParams.data.ClickedSession.amount);
    navParams.data.userData.pullups.forEach(element => {
      if(element.amount){
      this.pullupsamount.push(element.amount);
      this.date = new Date(element.timestamp * 1000).toDateString();
      this.date = (this.date + "").substring(0,10);
      this.chartLabels.push(this.date)
      }      
    });
    console.log(this.chartLabels.reverse);

    this.sessionDate = new Date((this.sessionId * 1000)).toDateString();
    console.log(this.sessionDate);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressSessionPage');
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Pull-ups",
            fill: false,
            lineTension: 0.2,
            backgroundColor: "rgba(52,74,247,0.5)",
            borderColor: "rgba(52,74,247,0.5)",
            borderCapStyle: 'butt',
            borderDash: [],
            chartLabels: [],
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
            data: this.pullupsamount,
            spanGaps: false,
          }
        ]
      }
    });
  }
}


