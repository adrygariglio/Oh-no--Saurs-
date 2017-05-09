import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'thesauros',
  templateUrl: './sauros.component.html',
  styleUrls: ['./app.component.css']
})
export class SaurosComponent implements OnInit {
  private dinosaursays: FirebaseObjectObservable<any[]>;
  private appUrl = "http://localhost:4200/";
  private items: FirebaseListObservable<any[]>;
  private sendUrl: string;
  private dinosaursid: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    // this.dinosaursays = route.snapshot.params['id'];
    // this.imageUrl = this.appUrl + route.snapshot.params['id'];
  }

  shareUrl(share) {
      this.sendUrl = this.appUrl + share;
      console.log(this.sendUrl)
  }

  updateSentence(updatesentence) {
      this.dinosaursays = this.db.object('items' + '/' + updatesentence);
      this.sendUrl = this.appUrl + updatesentence;
      console.log(this.sendUrl);
  }

  addItem(newSentence: string) {
    this.items.push({ text: newSentence });
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  ngOnInit() {
    // this.dinosaursays = 'megaciaone';
    this.dinosaursid = this.route.snapshot.params['id'];
    this.dinosaursays = this.db.object('items' + '/' + this.dinosaursid);
    this.items = this.db.list('/items');
  }

}
