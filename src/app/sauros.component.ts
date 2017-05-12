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
  private newdinosaursays: string;
  private ultimodinosaurssays: FirebaseListObservable<any[]>;
  private appUrl = "http://localhost:4200/";
  private items: FirebaseListObservable<any[]>;
  private sendUrl: string;
  private dinosaursid: string;
  size: number;
  fontfamily: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.size = 50;
    this.fontfamily = '';
  }

  previewItem(preview: string) {
    this.newdinosaursays = preview;
  }

  cleanItem(preview: string) {
    this.newdinosaursays = '';
    this.dinosaursays = undefined;
  }

  addAndShareItem(newSentence: string) {
    this.items.push({ text: newSentence, fontsize: this.size, fontfamily: this.fontfamily });
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
    this.dinosaursays = this.db.object('items' + '/' + this.dinosaursid);
    this.items = this.db.list('/items');
  }

}
