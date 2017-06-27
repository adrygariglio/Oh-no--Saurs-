import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'viewthesauros',
  templateUrl: './viewsauros.component.html',
  styleUrls: ['./app.component.css']
})
export class ViewSaurosComponent implements OnInit {
  private dinosaursays: any[];
  private dinosaursid: string;
  private previousMessagesId: string;
  private previousMessages: any[] = [];
  // private lastdinosaursid: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}


  ngOnInit() {
    this.dinosaursid = this.route.snapshot.params['id'];
    // this.lastdinosaursid = this.dinosaursid;
    this.db.object('items/' + this.dinosaursid)
        .subscribe((all) => {
          this.dinosaursays = all;
          console.log('Nuovo messaggio id: ', this.dinosaursid);
          this.getPreviousMessageOf(this.dinosaursid);
        });
  }

  getPreviousMessageOf(dinosaursid) {
    console.log("Look for previous messages for id: ", dinosaursid);
    this.db.object('items/' + dinosaursid + '/replyid')
      .subscribe((all) => {
        let previousMessagesId = all.$value;
        if (previousMessagesId!=null) {
          this.loadMessage(previousMessagesId);
        } else {
          console.log("No previous message");
        }
      });
  }

  loadMessage(dinosaursid) {
    console.log("Load message for id: ", dinosaursid);
    this.db.object('items/' + dinosaursid)
        .subscribe((all) => {
          console.log("Loaded message:", all);
          if (all!=null) {
            this.previousMessages.unshift(all);
            this.getPreviousMessageOf(dinosaursid);
          }
        });
  }

}
