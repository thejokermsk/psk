import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallbackDialogComponent } from 'src/app/dialog/callback-dialog/callback-dialog.component';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { OtherService } from 'src/app/services/other.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(
    public otherService: OtherService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  isBrowser = isPlatformBrowser(this.platformId);

  oSub: Subscription

  contact: Contact = null

  ngOnInit(): void {

    if (this.isBrowser) { 
      this.oSub = this.otherService.getContact().subscribe(item => {
        this.contact = item
      })
    }
  }

  ngOnDestroy(): void {
    if (this.oSub) this.oSub.unsubscribe()
  }
  
}
