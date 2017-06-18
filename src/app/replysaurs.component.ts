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
  olddinosaursay: any[];
  replyid: string;
  private ultimodinosaurssays: FirebaseListObservable<any[]>;
  private appUrl = "http://localhost:4200/";
  // private appUrl = "http://ohnosaurs.altervista.org/";
  private items: FirebaseListObservable<any[]>;
  size: number;
  fontfamily: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  addAndShareItem(newSentence: string) {
    // this.items.push({ text: newSentence, fontfamily: this.fontfamily });
    this.db.list('items').push({ text: newSentence, fontfamily: this.fontfamily, replyid: this.replyid});
    // leggimi l'ultimo record
    this.ultimodinosaurssays = this.db.list('items', {
      query: {
      orderByChild: 'text',
      equalTo: newSentence,
      limitToFirst: 1
      }
    });
  }

  ngOnInit() {
    this.dinosaursid = this.route.snapshot.params['id'];
    this.replyid = this.dinosaursid;
    this.fontfamily = 'myscriptfontmedium';
    this.items = this.db.list('/items');
    return this.db.object('items/' + this.dinosaursid)
        .subscribe((all) => {
          this.olddinosaursay = all;
          console.log(this.replyid);
        });
  }

}
