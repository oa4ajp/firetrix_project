import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { BaseChartDirective }   from 'ng2-charts/ng2-charts';

import { AuthService } from '../core/service/auth.service';
import { SocialNetworkService } from './services/social-network.service';
import { TrafficService } from './services/traffic.service';
import { SalesService } from './services/sales.service';

import { SocialNetwork } from './models/social-network';
import { IUser } from '../core/models/interface-user';
import { Traffic } from './models/traffic';
import { SalesTraffic } from './models/sales-traffic';
import { SalesByDay } from './models/sales-by-day';
import { SalesByGender } from './models/sales-by-gender';
import { SalesByOrigin } from './models/sales-by-origin';
import { Product }       from './models/product'
import { RandomDataService } from '../core/service/random-data.service';
import { IRandomData } from '../core/models/interface-random-data';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  public brandPrimary:string =  '#20a8d8';
  public brandSuccess:string =  '#4dbd74';
  public brandInfo:string =   '#67c2ef';
  public brandWarning:string =  '#f8cb00';
  public brandDanger:string =   '#f86c6b';
  public onlineUsers = 0;
  private socNetSubscription: ISubscription;
  public faceBook: SocialNetwork;
  public googlePlus: SocialNetwork;
  public linkedIn: SocialNetwork;
  public tweeter: SocialNetwork;  
  private usersSubscription: ISubscription;
  private trafficSubscription: ISubscription;
  private dailyTrafficSubscription: ISubscription;
  private salesTrafficSubscription: ISubscription;
  private salesByDaySubscription: ISubscription;
  private salesByGenderSubscription: ISubscription;
  private salesByOriginSubscription: ISubscription;
  private productsSubscription: ISubscription;
  public usersList: IUser[];
  public traffic: Traffic;
  public mainChartElements:number = 27;
  public mainChartData1:Array<number> = [];
  public mainChartData2:Array<number> = [];
  public mainChartData3:Array<number> = [];
  public salesTrafficList: SalesTraffic[];
  public salesByDayList: SalesByDay[];
  public salesByOriginList: SalesByOrigin[];
  public salesByGender: SalesByGender;
  public productsList: Product[];
  
  public newClientsValue: string = '0';
  public recClientsValue: string = '0';
  public pageViewsValue: string = '0';
  public organicsValue: string = '0';
  public ctrValue: string = '0';
  public bounceRateValue: string = '0';

  public mainChartData:Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];  

  // get the element with the #chessCanvas on it
  @ViewChild("trafficCanvas") trafficCanvas: BaseChartDirective; 

  public subscriptionRandomData: Subscription;
  //public subscriptionAnonymousRandData: Subscription;
  public randomData: IRandomData;
  public subscriptionUser: Subscription;
  public loggedUser: IUser;

  constructor( 
    private router: Router, 
    private authService: AuthService ,
    private socialNetworkService: SocialNetworkService,
    private trafficService: TrafficService,
    private salesService: SalesService,
    private randDataService: RandomDataService
  ) { 
    this.faceBook = new SocialNetwork();
    this.googlePlus = new  SocialNetwork();
    this.linkedIn = new  SocialNetwork();
    this.tweeter = new  SocialNetwork(); 
    this.usersList = [];
    this.traffic = new Traffic();
    this.salesTrafficList = [];
    this.salesByGender = new SalesByGender();
    this.productsList = [];
    this.randomData = {numberList: [], dateList: [], booleanList: []};
    this.loggedUser = {} as IUser;
  }

  ngOnInit(): void {
    //generate random values for mainChart
    
    this.subscriptionUser = this.authService.user.first().subscribe(user => {
      if(user){ 

          this.loggedUser = user;

          this.subscriptionRandomData = this.randDataService.randomData.subscribe(data => {            

            if(user.email == null){    
              //Anonymous User
              const anonymousData: IRandomData = {
                  numberList: data.numberList.slice(0,1),
                  dateList: data.dateList.slice(0,1),
                  booleanList: data.booleanList.slice(0,1)        
              };  
              this.randomData = anonymousData;
            }else{
              //Logged User    
              this.randomData = data;
            }            
          });
      }
    });

    for (var i = 0; i <= this.mainChartElements; i++) {
      //this.mainChartData1.push(this.random(50,200));
      this.mainChartData2.push(this.random(80,100));
      this.mainChartData3.push(65);
    }
    
    this.authService.getUsersOnline().subscribe( userList => {
      let usersList = userList;
      this.onlineUsers = usersList.length;
    });

    this.socNetSubscription = this.socialNetworkService.getSocialNetworks().subscribe( socNetList => {
      //console.log(socNet);
      if(socNetList){
        socNetList.forEach( socNet => {
          switch (socNet.code){
            case 'FB':
              this.faceBook = socNet;
              break;
            case 'TW':
              this.tweeter = socNet;
              break;
            case 'LI':
              this.linkedIn = socNet;
              break;
            case 'GP':
               this.googlePlus = socNet;
              break;                                    
          }
        });
      }
    });

    this.usersSubscription = this.authService.getUsers().subscribe( users => {
      if(users){
        this.usersList = users;
      }      
    });

    this.trafficSubscription = this.trafficService.getTraffic().subscribe( oTraffic => {
      if(oTraffic){
        this.traffic = oTraffic;
      }      
    });

    this.dailyTrafficSubscription = this.trafficService.getDailyTraffic().subscribe( oDailyTrafficList => {
      if(oDailyTrafficList){
          let tmpMainChartData1 = [];
          
          oDailyTrafficList.forEach( dailyTraffic => {
            tmpMainChartData1.push(Number(dailyTraffic.value));
          });

          this.mainChartData[0].data = tmpMainChartData1;

          //Redraw Canvas
          if(this.trafficCanvas !== undefined){
                this.trafficCanvas.ngOnDestroy();
                this.trafficCanvas.chart = this.trafficCanvas.getChartBuilder(this.trafficCanvas.ctx);
          }
      }
    });

    this.salesTrafficSubscription = this.salesService.getSalesTraffic().subscribe( trafficList => {
      if(trafficList){
        //this.salesTrafficList = trafficList;
        trafficList.forEach( salesTraffic => {
          switch (salesTraffic.code){
            case 'BR':
              this.bounceRateValue = salesTraffic.value;
              break;
            case 'CT':
              this.ctrValue = salesTraffic.value;
              break;
            case 'NC':
              this.newClientsValue = salesTraffic.value;
              break;
            case 'OR':
              this.organicsValue = salesTraffic.value;
              break;   
            case 'PV':
              this.pageViewsValue = salesTraffic.value;
              break;  
            case 'RC':
              this.recClientsValue = salesTraffic.value;
              break;                                                               
          }
        });
      }
    });

    this.salesByDaySubscription = this.salesService.getSalesByDay().subscribe( salesByDayList => {
      if(salesByDayList){        
        this.salesByDayList = this.sortArray(salesByDayList);
      }
    });        

    this.salesByGenderSubscription = this.salesService.getSalesByGender().subscribe( salesByGender => {
      if(salesByGender){
        this.salesByGender = salesByGender;
      }
    });

    this.salesByOriginSubscription = this.salesService.getSalesByOrigin().subscribe( salesByOriginList => {
      if(salesByOriginList){        
        this.salesByOriginList = this.sortArray(salesByOriginList);
      }
    });

    //productList
    this.productsSubscription = this.salesService.getProducts().subscribe( productsList => {
      if(productsList){        
        this.productsList = this.sortArray(productsList);
      }
    });    

  }

  private sortArray(array: any[]){
    return array.sort((obj1, obj2) => {
        if (obj1.position > obj2.position) {
            return 1;
        }

        if (obj1.position < obj2.position) {
            return -1;
        }

        return 0;
    });
  }

  ngOnDestroy() {
    this.socNetSubscription.unsubscribe();
    this.trafficSubscription.unsubscribe();
    this.dailyTrafficSubscription.unsubscribe();
    this.salesByDaySubscription.unsubscribe();
    this.salesByGenderSubscription.unsubscribe();
    this.salesByOriginSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
    this.subscriptionRandomData.unsubscribe();
  }  

  //convert Hex to RGBA
  public convertHex(hex:string,opacity:number){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return rgba;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // lineChart1
  public lineChart1Data:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend:boolean = false;
  public lineChart1Type:string = 'line';

  // lineChart2
  public lineChart2Data:Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend:boolean = false;
  public lineChart2Type:string = 'line';


  // lineChart3
  public lineChart3Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend:boolean = false;
  public lineChart3Type:string = 'line';


  // barChart1
  public barChart1Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend:boolean = false;
  public barChart1Type:string = 'bar';

  // mainChart

  public random(min:number, max:number) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }


  public mainChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public mainChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value:any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours:Array<any> = [
    { //brandInfo
      backgroundColor: this.convertHex(this.brandInfo,10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend:boolean = false;
  public mainChartType:string = 'line';

  // social box charts

  public socialChartData1:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2:Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public socialChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public socialChartColours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend:boolean = false;
  public socialChartType:string = 'line';

  // sparkline charts

  public sparklineChartData1:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public sparklineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public sparklineChartDefault:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];


  public sparklineChartLegend:boolean = false;
  public sparklineChartType:string = 'line';

  public getWidthPercentageStyle(percentage){
    const styles = {
        'width': percentage + '%'
    };
    return styles;
  }

  public updateRandomData(){    
    this.authService.updateButtonClicks(this.loggedUser);
    this.randDataService.generateRandomData();
  }

}
