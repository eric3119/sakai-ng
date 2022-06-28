import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DadosColaborador } from '../model/dados-colaborador.model';
import { DadosLogin } from '../model/dados-login.model';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtHelperService = new JwtHelperService();
    private url: string = environment.apiUrl;
    private token: any;
    private userauthenticated: boolean;
    private dadosLogin = new BehaviorSubject<DadosLogin>(undefined);

    loading = new BehaviorSubject<boolean>(true);

    constructor(
        private http: HttpClient,
        public router: Router,
        private messageService: MessageService
    ) {
        this.token = localStorage.getItem('token');
        try {
            this.userauthenticated = !this.jwtHelperService.isTokenExpired(
                this.token
            );
        } catch (err) {
            this.userauthenticated = false;
            //   this.toastrService.error(formattedError(err));
        }
    }

    login(user: User) {
        const requisicaoLogin = this.http
            .post<any>(`${this.url}api-token-auth/`, user)
            .pipe(tap(this.armazenaToken));

        return concat(requisicaoLogin, this.getDadosLogin().pipe(first()));
    }

    private armazenaToken = (res: { token: string | null }) => {
        this.token = res.token;
        this.userauthenticated = !!this.token;
        if (!this.token) return;
        localStorage.setItem('token', this.token);

        const tokenExpirationDate =
            this.jwtHelperService.getTokenExpirationDate(this.token);
        if (!tokenExpirationDate) {
            this.messageService.add({
                severity: 'error',
                summary: 'JWT Token',
                detail: 'Não foi possível decodificar o token',
            });
        } else {
            localStorage.setItem(
                'expiration_time',
                tokenExpirationDate.getTime().toString()
            );
        }
    };

    getDadosLogin(reload = false): Observable<DadosLogin | Error> {
        if (this.dadosLogin.value && !reload) {
            return this.dadosLogin.asObservable();
        } else {
            return this.http
                .get<DadosLogin>(`${this.url}colaboradores/dadoslogin/`)
                .pipe(
                    // map(
                    //     this
                    //         .adicionaOLinkDoPortalDeCadaGrupoQueOUsuarioTemAcesso
                    // ),
                    tap(
                        (res) => {
                            this.dadosLogin.next(res);
                            // this.permissions = <Array<keyof PortaisRotas>>(
                            //     res.grupos.map(
                            //         (grupo) =>
                            //             grupo.id_grupo_usuario.grupo_usuario
                            //     )
                            // );
                            this.loading.next(false);
                        },
                        (err) =>
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro na API',
                                detail: err,
                            })
                    ),
                    catchError(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Autenticação',
                            detail: 'Erro ao autenticar o usuário',
                        });
                        this.logout();
                        return of(new Error('Erro nos dados de login'));
                    })
                );
        }
    }

    // private adicionaOLinkDoPortalDeCadaGrupoQueOUsuarioTemAcesso = (
    //     res: DadosLogin
    // ): DadosLogin => {
    //     const gruposComLinksDePortal: DadosLogin['grupos'] = res.grupos.map(
    //         (el) => ({
    //             id_grupo_usuario: {
    //                 ...el.id_grupo_usuario,
    //                 link: this.rotas[el.id_grupo_usuario.grupo_usuario], // Link do portal
    //             },
    //         })
    //     );
    //     return { ...res, grupos: gruposComLinksDePortal };
    // };

    public async refreshToken(): Promise<boolean> {
        try {
            await this.refreshTokenRequest().toPromise();
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(false);
        }
    }

    private refreshTokenRequest() {
        return this.http
            .post<any>(`${this.url}refresh-token/`, { token: this.token })
            .pipe(tap(this.armazenaToken));
    }

    public isLogged() {
        return this.userauthenticated;
    }

    public clearVariables() {
        this.dadosLogin = undefined;
    }

    public logout() {
        this.userauthenticated = false;
        localStorage.clear();
        this.clearVariables();
        this.router.navigate(['/login'], { replaceUrl: true });
    }

    /**
     * function to obtain the data of actual user
     */
    public getCurrentColaborador(): Observable<DadosColaborador> {
        if (this.dadosLogin) {
            return of(this.dadosLogin['dados']);
        } else {
            return this.http
                .get<DadosColaborador[]>(
                    this.url + 'colaboradoresdadosbasicos/'
                )
                .pipe(map((res) => res[0]));
        }
    }
}
