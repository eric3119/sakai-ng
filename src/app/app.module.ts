import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { BlockViewer } from './components/blockviewer/blockviewer.component';

import { AppCodeModule } from './components/app-code/app.code.component';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenusComponent } from './components/menus/menus.component';
import { EmptyComponent } from './components/empty/empty.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CrudComponent } from './components/crud/crud.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { PaymentComponent } from './components/menus/payment.component';
import { ConfirmationComponent } from './components/menus/confirmation.component';
import { PersonalComponent } from './components/menus/personal.component';
import { SeatComponent } from './components/menus/seat.component';
import { LandingComponent } from './components/landing/landing.component';

import { EventService } from './service/eventservice';
import { IconService } from './service/iconservice';
import { PhotoService } from './service/photoservice';
import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { CountryService } from './examples/uikit/services/countryservice';
import { CustomerService } from './examples/uikit/services/customerservice';
import { NodeService } from './examples/uikit/services/nodeservice';
import { ProductService } from './examples/uikit/services/productservice';
import { PrimeNGUtilsModule } from './primeng-utils.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppCodeModule,
        PrimeNGUtilsModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        DashboardComponent,
        MenusComponent,
        EmptyComponent,
        IconsComponent,
        DocumentationComponent,
        CrudComponent,
        TimelineComponent,
        BlocksComponent,
        BlockViewer,
        PaymentComponent,
        ConfirmationComponent,
        PersonalComponent,
        SeatComponent,
        LandingComponent,
        LoginComponent,
        ErrorComponent,
        NotfoundComponent,
        AccessComponent,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MenuService,
        ConfigService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
