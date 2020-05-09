import { Injectable, OnDestroy } from '@angular/core';
import { connect } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PeerToPeerService implements OnDestroy {
  private socket: SocketIOClient.Socket;

  constructor() { }

  ngOnDestroy() {
    if (this.isSocketConnected()) {
      this.cleanUpSocket();
    }
  }

  async makeCall() {
    if (this.isSocketConnected()) {
      this.cleanUpSocket();
    }

    this.socket = connect("http://localhost:4200");

    const configuration = {};
    const peerConnection = new RTCPeerConnection(configuration);
    /* signalingChannel.addEventListener('message', async message => {
      if (message.answer) {
        const remoteDesc = new RTCSessionDescription(message.answer);
        await peerConnection.setRemoteDescription(remoteDesc);
      }
    }); */
    const offer = await peerConnection.createOffer();

    console.log(offer);
    await peerConnection.setLocalDescription(offer);
    this.socket.emit('offer', offer);
  }

  closeCall() {
    if (this.isSocketConnected()) {
      this.cleanUpSocket();
    }
  }

  private cleanUpSocket() {
      this.socket.disconnect();
      this.socket = null;
  }

  private isSocketConnected() {
    return this.socket && this.socket.connected;
  }
}
