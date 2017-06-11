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
  allSaurs: any[];
  personasid;

  constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private heroService: DataService) {}

  ngOnInit() {
    this.af.object('items/')
        .subscribe((all) => {
          this.allSaurs = all;
        });
    console.log(this.allSaurs);
  }

}
