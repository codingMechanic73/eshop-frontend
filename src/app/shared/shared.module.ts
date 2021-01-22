import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninModalComponent } from './signin-modal/signin-modal.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from '../home/home.module';
import { FooterComponent } from './footer/footer.component';
import { CustomInterceptorService } from '../service/custom-interceptor.service';

@NgModule({
  declarations: [NavBarComponent, SigninModalComponent, SigninComponent, SignupComponent, FooterComponent],
  imports: [
    // built in modules
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // third party modules
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptorService,
    multi: true
  }],
  exports: [NavBarComponent, FooterComponent]
})
export class SharedModule { }
