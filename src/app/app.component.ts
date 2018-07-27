import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadFeature = 'recipe';
  onNavigate(feature:string){
      this.loadFeature = feature;
  }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyChWygc6KYib6Rvp9GROKARZMxh9eHt-R0",
      authDomain: "snackrecipebook.firebaseapp.com",
  
    });
  }
  
}
