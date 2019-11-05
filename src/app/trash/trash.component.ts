import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../Email.service';
import { Email } from '../Email';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  public emailList: Email[];
  public emailDetails: Email;
  
  constructor(
    private api: EmailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.GetEmailTrash()
  }

  GetEmailTrash(): void {
    //debugger;
    let userId = +this.route.snapshot.paramMap.get('userId');

    this.api.GetEmailTrash(userId)
      .subscribe(hero => this.emailList = hero);
  }
}


