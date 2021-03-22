import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublicModule } from './public/public.module';
import { AuthorizedModule } from './authorized/authorized.module';
import { IdentityService } from './services/identity.service';
import { environment } from '../environments/environment';
import { ProgressComponent } from './components/progress/progress.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MaterialImportModule } from './material-import.module';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModule,
    AuthorizedModule,
    MaterialImportModule,
    
  ],
  entryComponents:[MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(identityService:IdentityService){
    console.log('environment settings:',environment);
    identityService.restore();
  }
 }
