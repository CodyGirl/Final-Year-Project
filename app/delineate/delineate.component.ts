import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, twitterId, UserToken } from '../auth.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delineate',
  templateUrl: './delineate.component.html',
  styleUrls: ['./delineate.component.scss']
})

export class DelineateComponent implements OnInit {
  @ViewChild('baseChartO') chartO: BaseChartDirective;
  @ViewChild('baseChartC') chartC: BaseChartDirective;
  @ViewChild('baseChartE') chartE: BaseChartDirective;
  @ViewChild('baseChartA') chartA: BaseChartDirective;
  @ViewChild('baseChartN') chartN: BaseChartDirective;

  val: any=20;
  loadingOverlayComponent;
  loadingOverlayComponentParams;
  ColorsO = [
    {
      backgroundColor: '#66CCFF',
      borderColor: '#6699FF',
      pointBackgroundColor: '#6699FF',
      pointBorderColor: '#6699FF',
      pointHoverBackgroundColor: '#6699FF',
      pointHoverBorderColor: '#6699FF'
    }
    // ...colors for additional data sets
  ];
  ColorsC = [
    {
      backgroundColor: '#D0D0D0',
      borderColor: '#C0C0C0',
      pointBackgroundColor: '#C0C0C0',
      pointBorderColor: '#C0C0C0',
      pointHoverBackgroundColor: '#C0C0C0',
      pointHoverBorderColor: '#C0C0C0'
    }
    // ...colors for additional data sets
  ];
  ColorsE = [
    {
      backgroundColor: '#800000',
      borderColor: '#900000',
      pointBackgroundColor: '#900000',
      pointBorderColor: '#900000',
      pointHoverBackgroundColor: '#900000',
      pointHoverBorderColor: '#900000'
    }
    // ...colors for additional data sets
  ];
  ColorsA = [
    {
      backgroundColor: '#339933',
      borderColor: '#336633',
      pointBackgroundColor: '#336633',
      pointBorderColor: '#336633',
      pointHoverBackgroundColor: '#336633',
      pointHoverBorderColor: '#336633'
    }
    // ...colors for additional data sets
  ];
  ColorsN = [
    {
      backgroundColor: '#484848',
      borderColor: '#303030',
      pointBackgroundColor: '#303030',
      pointBorderColor: '#303030',
      pointHoverBackgroundColor: '#303030',
      pointHoverBorderColor: '#303030'
    }
    // ...colors for additional data sets
  ];
  panelOpenState = false;
  template: string =
    `<img class="custom-spinner-template" src="assets/img/loader2.gif">`;
  heading: string = "Personality Delineate";
  chartComponent: DelineateComponent;
  items: any;
  percentO: number;
  open: any;

  percentC: number;
  conscientious: string[];

  percentE: number;
  extraversion: string[];

  percentA: number;
  agreeable: string[];

  percentN: number;
  neuroticism: string[];

  title = 'Personality Delineate';
  i: number;
  credentials: twitterId = {
    id: ''
  }
  credentials2: UserToken = {
    token: ''
  }
  public tempArray = [];
  token: string;
  constructor(public dialog: MatDialog, private router: Router, private _authService: AuthService, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
  }
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartLabelsO = ['Adventure', 'Artistic-Interests', 'Emotionality', 'Imagination', 'Intellect', 'Authority-challenging']
  public barChartDataO = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Openness' }
  ];

  public barChartLabelsC = ['Achievement-Striving', 'Cautiousness', 'Dutifulness', 'Orderliness', 'Self-discipline', 'Self-efficacy']
  public barChartDataC = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Conscientiousness' }
  ];
  public barChartLabelsE = ['Activity-Level', 'Assertiveness', 'Cheerfulness', 'Excitement-seeking', 'Outgoing', 'Gregariousness']
  public barChartDataE = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Extraversion' }
  ];
  public barChartLabelsA = ['Altruism', 'Cooperation', 'Modesty', 'Uncompromising', 'Sympathy', 'Trust']
  public barChartDataA = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Agreeableness' }
  ];
  public barChartLabelsN = ['Fiery', 'Prone to worry', 'Melancholy', 'Immoderation', 'Self-consciousness', 'Susceptible to stress']
  public barChartDataN = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Neuroticism' }
  ];
  // public lineChartColors:Array<any> = [
  //   {
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   }
  // ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              display: false,
          },
          ticks: {
            fontColor: "white", // this here
          },
      }],
      yAxes: [{
        gridLines: {
            display: false,
        },
        ticks: {
          fontColor: "white", // this here
        },
    }]
    }
  };

  ngOnInit() {
    this.credentials2.token = this._authService.getToken()
    this.ng4LoadingSpinnerService.show();
    this._authService.Delineate(this.credentials2).subscribe((persons) => {
      this.items = persons;
      this.ng4LoadingSpinnerService.hide();
      this.setBarChart();
    },
    err => {
      // window.alert("Something really went wrong !");
      this.ng4LoadingSpinnerService.hide();
      this.openTwitterDialog();
      //this.router.navigateByUrl('/error');
    });
  }
  getDelineateTableData() {
    this.ng4LoadingSpinnerService.show();
    this._authService.postDelineateTwitterID(this.credentials).subscribe((persons) => {
      if(persons.result === 'false') {
        //window.alert("Please enter valid twitter id")

        this.ng4LoadingSpinnerService.hide();
        this.openServerDialog();
      }
      else {
        this.items = persons;
        this.ng4LoadingSpinnerService.hide();
        this.heading = "Personality Delineate" + this.credentials.id;
        this.setBarChart();
        }
    },
    err => {
      // window.alert("Something really went wrong !");
      // this.router.navigateByUrl('/error');

      this.ng4LoadingSpinnerService.hide();
       this.openServerDialog();
    });
  }
  setBarChart() {
    this.percentO = this.items['Openness'];
    this.percentC = this.items['Conscientiousness'];
    this.percentE = this.items['Extraversion'];
    this.percentA = this.items['Agreeableness'];
    this.percentN = this.items['Emotional range'];
    this.getO();
    this.getC();
    this.getE();
    this.getA();
    this.getN();
    this.setTableReportData();
    this.chartO.chart.update();
    this.chartC.chart.update();
    this.chartE.chart.update();
    this.chartA.chart.update();
    this.chartN.chart.update();
  }
  setChart(label: any, data: any) {
    this.tempArray = [];
    for (this.i = 0; this.i < label.length; this.i++) {
      this.tempArray.push(this.items[label[this.i]]);
    }
    for (this.i = 0; this.i < label.length; this.i++) {
      data[0]["data"][this.i] = this.items[label[this.i]];
    }
  }
  getO() {
    this.setChart(this.barChartLabelsO, this.barChartDataO)
  }
  getC() {
    this.setChart(this.barChartLabelsC, this.barChartDataC)
  }
  getE() {
    this.setChart(this.barChartLabelsE, this.barChartDataE)
  }
  getA() {
    this.setChart(this.barChartLabelsA, this.barChartDataA)
  }
  getN() {
    this.setChart(this.barChartLabelsN, this.barChartDataN)
  }
  setTableReportData() {
    if(this.percentO < 50) {
      this.open = ['Dislike Changes', 'Doesn\'t enjoy new things', 'Resists new ideas', 'Not very imaginative', 'Dislikes abstract or theoretical concepts']
    }
    else {
      this.open = ['Very Creative', 'Open to trying new things', 'Focused on tackling new challenges', 'Happy to think about abstract concepts']
    }
    if(this.percentC < 50) {
      this.conscientious= ['Dislikes structure and schedules', 'Fails to return things or put them back where they belong', 'Procrastinates important tasks', 'Fails to complete necessary or assigned tasks', 'Makes messes and doesn\'t take care of things', 'Fails to complete necessary or assigned tasks']
    }
    else {
      this.conscientious = ['Spends time preparing', 'Pays attention to detail, Finishes important tasks right away', 'Enjoys having a set schedule']
    }
    console.log(this.percentE)
    if(this.percentE < 50) {
      this.extraversion = ['Prefers solitude','Feels exhausted when having to socialize a lot','Finds it difficult to start conversations','Dislikes making small talk','Carefully thinks things through before speaking', 'Dislikes being the center of attention']
    }
    else {
      this.extraversion = ['Enjoys being the center of attention','Likes to start conversations','Enjoys meeting new people','Has a wide social circle of friends and acquaintances','Finds it easy to make new friends', 'Feels energized when around other people', 'Say things before thinking about them']
    }
    if(this.percentA < 50) {
      this.agreeable = ['Takes little interest in others','Doesn\'t care about how other people feel','Has little interest in other people\'s problems','Insults and belittles others','Manipulates others to get what they want']
    }
    else {
      this.agreeable = ['Has a great deal of interest in other people','Cares about others','Feels empathy and concern for other people','Enjoys helping and contributing to the happiness of other people','Assists others who are in need of help']
    }
    if(this.percentN < 50) {
      this.neuroticism = ['Emotionally stable', 'Deals well with stress', 'Rarely feels sad or depressed', 'Doesn\'t worry much', 'Relaxed']
    }
    else {
      this.neuroticism = ['Experiences a lot of stress', 'Struggles to bounce back after stressful events', 'Worries about many different things', 'Gets upset easily', 'Experiences dramatic shifts in mood','Feels anxious']
    }
  }

  openServerDialog(): void {
    const dialogRef = this.dialog.open(DelineateAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTwitterDialog(): void {
    const dialogRef = this.dialog.open(DelineateTwitterAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./popup.component.scss']
})
export class DelineateAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<DelineateAlert>, private myRoute: Router) {
      this.serverError = "We are sorry. Server is down..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["delineate"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./popup.component.scss']
})
export class DelineateTwitterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<DelineateTwitterAlert>, private myRoute: Router) {
      this.serverError = "Please enter valid twitter Id..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["delineate"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}
