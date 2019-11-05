import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Email } from '../Email';
import { User } from '../user';
import { EmailService } from '../Email.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-emailmain',
  templateUrl: './emailmain.component.html',
  styleUrls: ['./emailmain.component.css']
})
export class EmailmainComponent implements OnInit {

  public emailList: Email[];
  public emailDetails: Email;
  currentUser: User;

  currentEmailId:number;
  
  
  isVisibleInbox:boolean=true;
  isVisibleCompose:boolean=false;
  isVisibleDraft:boolean=false;
  isVisibleSentMail:boolean=false;
  isVisibleTrash:boolean=false;
  isVisibleViewMail:boolean=false;

  constructor(
    private api: EmailService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        //this.router.navigate(['/']);
      }else{
        this.router.navigate(['/login']);
      }
    //debugger;
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentEmailId = this.api.getEmailId();

  }

  ngOnInit() {
    //debugger;
    //let isViewMail =+this.api.getEmailId();//+this.route.snapshot.paramMap.get('id');
    let isViewMail = this.api.getEmailId();
    //debugger;
    if(isViewMail>0){
      this.viewMail();
    }
  }

  btnCompose(){
    this.isVisibleCompose=true;
    this.isVisibleDraft = this.isVisibleInbox=this.isVisibleSentMail=this.isVisibleTrash=this.isVisibleViewMail = false;
  }
  btnInbox(){
    this.isVisibleInbox=true;
    this.isVisibleDraft = this.isVisibleCompose=this.isVisibleSentMail=this.isVisibleTrash=this.isVisibleViewMail = false;
  }
  btnSentMail(){
    this.isVisibleSentMail=true;
    this.isVisibleDraft = this.isVisibleCompose=this.isVisibleInbox=this.isVisibleTrash=this.isVisibleViewMail = false;
  }
  btnDraft(){
    this.isVisibleDraft=true;
    this.isVisibleSentMail = this.isVisibleCompose=this.isVisibleInbox=this.isVisibleTrash=this.isVisibleViewMail = false;
  }
  btnTrash(){
    this.isVisibleTrash=true;
    this.isVisibleSentMail = this.isVisibleCompose=this.isVisibleInbox=this.isVisibleDraft=this.isVisibleViewMail = false;
  }

  viewMail(){
    this.isVisibleViewMail=true;
    this.isVisibleDraft = this.isVisibleInbox=this.isVisibleSentMail=this.isVisibleTrash=this.isVisibleCompose = false;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
