import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
// import { AlertService } from '@services/alert.service';
// import { formattedError, goTop } from '@helpers/functions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                const error =
                    err.message || err.error.message || err.statusText;
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    // this.authenticationService.logout();
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Sessão',
                        detail: 'Sessão expirada',
                    });
                    //   goTop();
                } else {
                    if (err.status !== 403 || !request.url.includes('check')) {
                        // this.alert.error(formattedError(err) || error);
                        // goTop();
                    } else {
                        // this.alert.error(formattedError(err) || 'Ocorreu um erro');
                        console.error(err);
                        // goTop();
                    }
                }

                return throwError(err);
            })
        );
    }
}
