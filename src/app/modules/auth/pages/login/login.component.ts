import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

// import { DarkThemeService } from '@core/theme/dark-theme.service';
// import { AlertService } from '@services/alert.service';
// import { AuthService } from '@services/auth-service.service';
// import { AvailabilityService } from '@services/availability.service';
import { User } from '../../models';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    userData: User;
    loading = false;
    submitted = false;
    isDev = !environment.production;
    config: AppConfig;

    showPassword = false;
    subscriptions: Subscription[] = [];

    constructor(
        private authService: AuthService,
        public configService: ConfigService // private alertService: AlertService, // public availService: AvailabilityService, // public darkThemeService: DarkThemeService,
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.current_user) {
        //   this.authenticationService.redirect();
        // }
    }

    ngOnInit() {
        this.userData = new User();
        this.config = this.configService.config;
        this.subscriptions.push(
            this.configService.configUpdate$.subscribe((config) => {
                this.config = config;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.authService.login(this.userData).subscribe({
            next: () => {
                // this.authService.redirect(this.returnUrl, () => {
                //     this.loading = false;
                // });
            },
            error: (error) => {
                // this.alertService.error('Erro na autenticação');
                this.loading = false;
                // if (error['error'].non_field_errors) {
                //     this.err_msg = error['error'].non_field_errors[0];
                // } else {
                //     this.err_msg = error['name'] + '\n' + error['statusText'];
                //     switch (error.status) {
                //         case 0:
                //             this.err_msg =
                //                 'Servidor de autenticação indisponível';
                //     }
                // }
            },
        });
    }
}
