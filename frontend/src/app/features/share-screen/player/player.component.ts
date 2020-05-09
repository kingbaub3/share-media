import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StreamingService } from '../streaming.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public streamingService: StreamingService) { }

  ngOnInit(): void {
  }
}
