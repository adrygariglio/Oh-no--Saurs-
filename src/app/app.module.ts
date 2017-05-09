import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { SaurosComponent } from './sauros.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

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
    SaurosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
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
        component: SaurosComponent,
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
