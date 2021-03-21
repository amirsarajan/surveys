import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublicModule } from './public/public.module';
import { AuthorizedModule } from './authorized/authorized.module';
import { IdentityService } from './services/identity.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModule,
    AuthorizedModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(identityService:IdentityService){
    console.log('environment settings:',environment);
    identityService.restore();
  }
 }
