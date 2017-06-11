import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DataService } from './experiment.service';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./app.component.css']
})

export class ExperimentComponent implements OnInit {
  allMessages: any[];
  theMessage: any[];
  idMessage: string;

  constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private heroService: DataService) {}

  ngOnInit() {
    this.idMessage = this.route.snapshot.params['id'];
    return this.af.list('messages/')
        .subscribe((all) => {
          this.allMessages = all;
          this.showTheMessage();
          console.log(this.idMessage)
          console.log(this.allMessages)
          console.log(this.theMessage)
        });
  }

  showTheMessage() {
    return this.af.object('messages/' + this.idMessage)
        .subscribe((all) => {
          this.theMessage = all;
        });
  }


}
