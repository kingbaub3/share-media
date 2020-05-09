import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StreamingService } from '../share-screen';

export interface RoomSettings {
  isUserStreaming: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService implements OnDestroy {
  private settings: BehaviorSubject<RoomSettings> = new BehaviorSubject({
    isUserStreaming: false
  });

  private subscription: Subscription;

  constructor(private streamingService: StreamingService) {
    this.subscription = this.streamingService.getStream().subscribe(() => {
      this.settings.next({
        ...this.settings,
        isUserStreaming: this.streamingService.isStreaming()
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.settings.complete();
  }

  getSettings(): BehaviorSubject<RoomSettings> {
    return this.settings;
  }
}
