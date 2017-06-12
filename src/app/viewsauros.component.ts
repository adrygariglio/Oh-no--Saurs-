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
    this.getPreviousMessagesId();
    // this.dinosaursays = this.db.object('items' + '/' + this.dinosaursid);
    this.db.object('items/' + this.dinosaursid)
        .subscribe((all) => {
          this.dinosaursays = all;
          console.log('Nuovo messaggio id: ', this.dinosaursid);
          // console.log(this.dinosaursays);
        });
  }

  getPreviousMessagesId() {
    if (this.dinosaursid!=null) {
      this.db.object('items/' + this.dinosaursid + '/replyid')
        .subscribe((all) => {
          this.previousMessagesId = all.$value;
          if (this.previousMessagesId!=null) {
            this.getPreviousMessages(this.previousMessagesId);
            console.log("Precedente id: ", this.previousMessagesId);
          }
        });
    }
  }

  getPreviousMessages(id: string) {
    return this.db.object('items/' + id)
        .subscribe((all) => {
          this.previousMessages = all;
          console.log("Messaggio precedente", this.previousMessages);
        });
  }

}
