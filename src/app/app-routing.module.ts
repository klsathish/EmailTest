import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';

 import { SentMailComponent } from './sent-mail/sent-mail.component';
 import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DraftComponent } from './draft/draft.component';
import { TrashComponent } from './trash/trash.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EmailmainComponent } from './emailmain/emailmain.component';


const routes: Routes = [
  { path: '',component: EmailmainComponent , pathMatch: 'full',canActivate: [AuthGuard] }, //redirectTo: '/emailmain'
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
  // { path: 'compose', component: ComposeComponent },
  // { path: 'inbox',  component: InboxComponent },
  //{ path: '/:userId',  component: InboxComponent },
  // { path: 'sentMail',  component: SentMailComponent },
  // { path: 'draft',  component: DraftComponent },
  // { path: 'trash',  component: TrashComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'emailmain', component: EmailmainComponent },
  { path: 'emailmain', component: EmailmainComponent },
  // { path: 'app-inbox/:id',      component: InboxComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: 'inbox',
  //   pathMatch: 'full'
  // }
   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/