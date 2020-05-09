import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeerToPeerService } from './connection/peer-to-peer.service';

const displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: true
};

@Injectable({
  providedIn: 'root'
})
export class StreamingService implements OnDestroy {
  private stream: BehaviorSubject<MediaStream | null> = new BehaviorSubject(null);

  constructor(private peerToPeerService: PeerToPeerService) { }

  ngOnDestroy() {
    this.stream.complete();
  }

  async start() {
    try {
      // @ts-ignore
      const mediaStream: MediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      this.stream.next(mediaStream);
      this.dumpStreamInfo();

      this.establishPeerConnection();
    } catch (err) {
      console.error("Error: " + err);
    }
  }

  stop() {
    const tracks = this.stream.value.getTracks();

    for (const track of tracks) {
      track.stop();
    }

    this.closePeerConnection();
    this.stream.next(null);
  }

  getStream(): BehaviorSubject<MediaStream | null> {
    return this.stream;
  }

  isStreaming(): boolean {
    return this.stream.value !== null;
  }

  private dumpStreamInfo() {
    const track = this.stream.value.getTracks()[0];

    console.log("Track settings:");
    console.log(JSON.stringify(track.getSettings(), null, 2));
    console.log("Track constraints:");
    console.log(JSON.stringify(track.getConstraints(), null, 2));

    console.log("MediaStream:", this.stream);
  }

  private establishPeerConnection() {
    this.peerToPeerService.makeCall();
  }

  private closePeerConnection() {
    this.peerToPeerService.closeCall();
  }
}
