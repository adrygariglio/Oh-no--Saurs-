import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'viewthesauros',
  templateUrl: './viewsauros.component.html',
  styleUrls: ['./app.component.css']
})
export class ViewSaurosComponent implements OnInit {
  private dinosaursays: FirebaseObjectObservable<any[]>;
  private sendUrl: string;
  private dinosaursid: string;
  private style = {
      size: 10,
      font: "ilieticamedium"
  };

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}


  ngOnInit() {
    this.dinosaursid = this.route.snapshot.params['id'];
    this.dinosaursays = this.db.object('items' + '/' + this.dinosaursid);
  }

}
