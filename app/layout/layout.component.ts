import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  message: any = 'Smart';
  words: any = [
    'Advanced',
    'Breakthrough',
    'One of its kind',
    'Smart'
    ];

    i: any = -1;
  ngOnInit() {
    setInterval(() => {this.refreshData(); } , 1000);
  }
  refreshData() {
    // console.log(this.words[(this.i + 1) % this.words.length]);
    this.i = this.i + 1;
    return this.message = this.words[(this.i) % this.words.length];
  }
}
