import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'replysauros',
  templateUrl: './replysaurs.component.html',
  styleUrls: ['./app.component.css']
})
export class ReplySaurosComponent implements OnInit {
  private dinosaursid: string;
  private dinosaursays: any[];
  private previousMessagesId: string;
  private previousMessages: any[] = [];
  private olddinosaursay: any[];
  private ultimodinosaurssays: FirebaseListObservable<any[]>;
  private appUrl = "http://localhost:4200/";
  // private appUrl = "http://ohnosaurs.altervista.org/";
  private items: FirebaseListObservable<any[]>;
  size: number;
  fontfamily: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.fontfamily = 'myscriptfontmedium';
    this.dinosaursid = this.route.snapshot.params['id'];
    this.items = this.db.list('/items');
    this.db.object('items/' + this.dinosaursid)
        .subscribe((all) => {
          this.olddinosaursay = all;
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

  addAndShareItem(newSentence: string) {
    // this.items.push({ text: newSentence, fontfamily: this.fontfamily });
    this.db.list('items').push({ text: newSentence, fontfamily: this.fontfamily, replyid: this.dinosaursid});
    // leggimi l'ultimo record
    this.ultimodinosaurssays = this.db.list('items', {
      query: {
      orderByChild: 'text',
      equalTo: newSentence,
      limitToFirst: 1
      }
    });
  }



}
