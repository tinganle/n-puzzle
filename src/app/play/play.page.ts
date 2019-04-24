import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  x: any;
  y: any;

  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.x = this.route.snapshot.paramMap.get('x');
    this.y = this.route.snapshot.paramMap.get('y');
    console.log('x, y:' + this.x + ', ' + this.y);
  }
}
