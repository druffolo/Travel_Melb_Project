import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import {HttpProvider} from '../../providers/http-provider';
import PvtApi from '../../PtvApiService';
import { StopList } from '../pages/stopslist/stopslist';

@Component({
  selector: 'page-routelist',
  templateUrl: 'routelist.html'
})

export class RouteList {

  routeData: any;
  loading: any;
  ptvApi = new PvtApi();

  constructor(public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController, private http: Http) {
    this.getJsonData();
    this.getdata();
        this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner ></ion-spinner>`
    });
  }

  getJsonData(){
    var test = this.navParams.get('url');
      return this.http.get(test).map(res => res.json());
    }

  getdata(){
    //this.loading.present();
    this.getJsonData().subscribe(
      result => {
        this.routeData=result.routes;
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        this.loading.dismiss();
        console.log('getData completed');
      }
    );
  }

  // http://timetableapi.ptv.vic.gov.au/v3/stops/route/1/route_type/0?devid=3000198&signature=9E3A4197F534E8F3A3F484F882CE7990F2C0BFD6

clickedRouteBus() {
    let route = this.ptvApi.getStopsUrl(1, 0);
    let data = {
      url: route,
      title: 'test'
    };

    this.navCtrl.push(StopList, data);
  }


  
}
  
 
  
