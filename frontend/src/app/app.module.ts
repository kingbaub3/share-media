import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenSharingButtonComponent } from './features/share-screen/screen-sharing-button';
import { HomePageComponent } from './pages/home-page';
import { PlayerComponent } from './features/share-screen/player';

@NgModule({
  declarations: [AppComponent, ScreenSharingButtonComponent, HomePageComponent, PlayerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
