import { Component, OnInit } from '@angular/core';
import { StreamingService } from '../streaming.service';

@Component({
  selector: 'app-screen-sharing-button',
  templateUrl: './screen-sharing-button.component.html',
  styleUrls: ['./screen-sharing-button.component.css']
})
export class ScreenSharingButtonComponent implements OnInit {

  constructor(public streamingService: StreamingService) { }

  ngOnInit(): void {
  }

  startSharing() {
    this.streamingService.start();
  }

  stopSharing() {
    this.streamingService.stop();
  }
}
