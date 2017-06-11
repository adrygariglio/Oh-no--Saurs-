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
  private previousMessages: any[];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}


  ngOnInit() {
    this.dinosaursid = this.route.snapshot.params['id'];
    // this.dinosaursays = this.db.object('items' + '/' + this.dinosaursid);
    return this.db.object('items/' + this.dinosaursid)
        .subscribe((all) => {
          this.dinosaursays = all;
          this.getPreviousMessagesId();
          this.getPreviousMessages();
          console.log('Nuovo messaggio id: ' + this.dinosaursid);
          // console.log(this.dinosaursays);
        });
  }

  getPreviousMessagesId() {
    return this.db.object('items/' + this.dinosaursid + '/replyid')
        .subscribe((all) => {
          this.previousMessagesId = all.$value;
          console.log(this.previousMessagesId);
        });
  }

  getPreviousMessages() {
    return this.db.object('items/' + this.previousMessagesId)
        .subscribe((all) => {
          this.previousMessages = all;
          console.log(this.previousMessages);
        });
  }

}
