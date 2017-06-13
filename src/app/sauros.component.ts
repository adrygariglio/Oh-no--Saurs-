import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'thesauros',
  templateUrl: './sauros.component.html',
  styleUrls: ['./app.component.css']
})
export class SaurosComponent implements OnInit {
  private newdinosaursays: string;
  private ultimodinosaurssays: FirebaseListObservable<any[]>;
  private appUrl = "http://localhost:4200/";
  // private appUrl = "http://ohnosaurs.altervista.org/";
  private items: FirebaseListObservable<any[]>;
  size: number;
  fontfamily: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  addAndShareItem(newSentence: string) {
    // this.items.push({ text: newSentence, fontfamily: this.fontfamily });
    this.db.list('items').push({ text: newSentence, fontfamily: this.fontfamily });
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
    this.items = this.db.list('/items');
    this.fontfamily = 'myscriptfontmedium';
  }

}
