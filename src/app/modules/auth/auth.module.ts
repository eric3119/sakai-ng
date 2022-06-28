import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { PrimeNGUtilsModule } from 'src/app/primeng-utils.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNGUtilsModule,
  ],
  providers: [
  ],
})
export class AuthModule {}
