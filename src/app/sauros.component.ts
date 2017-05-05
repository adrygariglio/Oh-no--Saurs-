import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'thesauros',
  templateUrl: './sauros.component.html',
  styleUrls: ['./app.component.css']
})
export class SaurosComponent implements OnInit {
  dinosaursays: string;
  appUrl = "http://localhost:4200/";
  imageUrl: string;

  constructor(private route: ActivatedRoute) {
    this.dinosaursays = route.snapshot.params['id'];
    this.imageUrl = this.appUrl + route.snapshot.params['id'];
  }

  shareUrl() {
      alert('Copy this URL and send it to whoever you feel like:' + ' ' + this.appUrl + this.dinosaursays);
  }

  ngOnInit() {}

}
