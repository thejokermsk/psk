import { Component, OnInit } from '@angular/core';
import { OtherService } from 'src/app/services/other.service';

@Component({
  selector: 'app-additional-page',
  templateUrl: './additional-page.component.html',
  styleUrls: ['./additional-page.component.scss']
})
export class AdditionalPageComponent implements OnInit {

  constructor(
    public otherService: OtherService
  ) { }

  ngOnInit(): void {
  }

}
