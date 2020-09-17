import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';
import { ActivatedRoute } from '@angular/router';
import { Categories, Products } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-additional-page',
  templateUrl: './additional-page.component.html',
  styleUrls: ['./additional-page.component.scss']
})
export class AdditionalPageComponent implements OnInit, OnDestroy {

  constructor(
    public otherService: OtherService,
    private route: ActivatedRoute
  ) { }

  categories: Categories[] = []
  products: Products[] = []

  oSub: Subscription

  category: Categories = null

  ngOnInit(): void {
    this.oSub = this.route.params.subscribe(params => {

      this.oSub = this.otherService.getCategories().subscribe(item => {
        this.categories = item
        console.log(item)

        const candidate = item.find(item => item.id === +params.id)

        this.category = candidate
      })

      

      this.oSub = this.otherService.getProducts(params.id).subscribe(item => {
        this.products = item
      })
    })
  }

  ngOnDestroy(): void {}
}
