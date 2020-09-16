import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { CallbackDialogComponent } from '../dialog/callback-dialog/callback-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Build, Slider, Contact } from '../interfaces';

@Injectable({providedIn: 'root'})

export class OtherService {

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) { }


  openCallback() {
    this.dialog.open(CallbackDialogComponent, {
      width: '100%',
      maxWidth: '600px'
    })
  }

  getSlider(): Observable<Slider[]> {
    return this.http.get<Slider[]>('/api/slider')
  }

  getBuild(): Observable<Build> {
    return this.http.get<Build>('/api/build')
  }

  getVerify(): Observable<Slider[]> {
    return this.http.get<Slider[]>('/api/verify')
  }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>('/api/contact')
  }



}