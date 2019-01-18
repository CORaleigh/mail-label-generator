import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule, MatToolbarModule, MatSelectModule, MatIconModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { LabelMakerComponent } from './label-maker/label-maker.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    LabelMakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
