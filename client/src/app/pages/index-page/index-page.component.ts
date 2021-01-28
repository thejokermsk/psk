import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';
import { Subscription } from 'rxjs';
import { Build, Slider, Contact, Categories } from 'src/app/interfaces';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy{

  constructor(
    public otherService: OtherService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  isBrowser = isPlatformBrowser(this.platformId);
  oSub: Subscription

  build: Build = null
  slider: Slider[] = []
  verify: Slider[] = []
  contact: Contact = null
  categories: Categories[] = []

  ngOnInit(): void {
    if (this.isBrowser) {
      this.oSub = this.otherService.getSlider().subscribe(items => {
        this.slider = items
      })

      this.oSub = this.otherService.getVerify().subscribe(items => {
        this.verify = items


        if (this.verify.length === 0) {
          document.querySelector('a[href="#verify"]').style.display = 'none'
        }
      })

      this.oSub = this.otherService.getBuild().subscribe(item => {
        this.build = item

        if (!this.build) {
          document.querySelector('a[href="#build"]').style.display = 'none'
        }
      })


      this.oSub = this.otherService.getContact().subscribe(item => {
        this.contact = item

        if (!this.contact) {
          document.querySelector('a[href="#callback"]').style.display = 'none'
        }
      })


      this.oSub = this.otherService.getCategories().subscribe(item => {
        this.categories = item
      })
    }
  }

  owlOptions = {
    items: 1,
    dots: true,
    margin: 15,
    loop: true,
  };


  owlVerifyOption = {
    ...this.owlOptions,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },

      1170: {
        items: 3
      }
    }
  }

  ngOnDestroy(): void {
    if (this.oSub) this.oSub.unsubscribe()
  }
}
