import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GoingLiveComponent } from './components/going-live/going-live.component';
import { CountdownModule } from 'ngx-countdown';
import { DatePipe } from './pipes/date.pipe';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule} from '@angular/material/table';
import { TicketComponent } from './components/ticket/ticket.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import {MatCardModule} from '@angular/material/card'
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    ForbiddenComponent,
    ForgotPasswordComponent,
    GoingLiveComponent,
    InvoiceComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    DatePipe,
    InfoComponent,
    TicketComponent,
    
  ],
  entryComponents:[TicketComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CountdownModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    NgxSpinnerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
