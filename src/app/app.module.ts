import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { SaurosComponent } from './sauros.component';
import { ViewSaurosComponent } from './viewsauros.component';
import { ReplySaurosComponent } from './replysaurs.component';

import { AdminComponent } from './admin.component';
import { ExperimentComponent } from './experiment.component';
import { DataService } from './experiment.service';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDTLm1ZJcRMjMgVqihQ3CCSur707fG7sxE',
    authDomain: 'oh-no-saurs.firebaseapp.com',
    databaseURL: 'https://oh-no-saurs.firebaseio.com',
    projectId: 'oh-no-saurs',
    storageBucket: 'oh-no-saurs.appspot.com',
    messagingSenderId: '134314735984'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SaurosComponent,
    ViewSaurosComponent,
    ReplySaurosComponent,
    AdminComponent,
    ExperimentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SaurosComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: ViewSaurosComponent,
      },
      {
        path: 'reply/:id',
        component: ReplySaurosComponent,
      },
      {
        path: 'admin/ad',
        component: AdminComponent,
      },
      {
        path: 'lab/lab',
        component: ExperimentComponent,
      }
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
