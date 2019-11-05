import { NgModule } from '@angular/core';

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {MatFormFieldModule,MatInputModule,MatListModule,MatToolbarModule,MatIconModule,
  MatCardModule,MatButtonModule,MatProgressSpinnerModule  } from '@angular/material';
 import { SentMailComponent } from './sent-mail/sent-mail.component';
 import { DraftComponent } from './draft/draft.component';
 import { TrashComponent } from './trash/trash.component';
 import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
 import { HttpClientModule }    from '@angular/common/http';
 import { EmailService } from './Email.service';
import { LoginComponent } from './login/login.component';
import { EmailmainComponent } from './emailmain/emailmain.component';
import { ViewMailComponent } from './view-mail/view-mail.component'

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    ComposeComponent,
     SentMailComponent,
     DraftComponent,
     TrashComponent,
     PageNotFoundComponent,
     LoginComponent,
     EmailmainComponent,
     ViewMailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,MatIconModule,MatCardModule,MatButtonModule,MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    //{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
