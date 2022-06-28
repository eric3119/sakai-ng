import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

export type PortaisRotas = {
    Colaborador: string;
    Administrador: string;
    Coordenador: string;
    'Fundação - Administração': string;
    'Fundação - Administrador': string;
    'Fundação - Gestor': string;
    'Projetos - Administrador': string;
    'Projetos - Coordenador': string;
    Gestor: string;
};

@Injectable({
    providedIn: 'root',
})
export class PortalService {
    private current_role: keyof PortaisRotas | undefined;
    private permissions: Array<keyof PortaisRotas> | undefined;
    private rotas: PortaisRotas = {
        Colaborador: '/',
        Administrador: '/administrador',
        Coordenador: '/coordenador',
        'Fundação - Administração': '/fundacao-administrador',
        'Fundação - Administrador': '/fundacao-administrador',
        'Fundação - Gestor': '/fundacao-gestor',
        'Projetos - Administrador': '/projetos-administrador',
        'Projetos - Coordenador': '/projetos-coordenador',
        Gestor: '/gestor',
    };

    private _loading = new BehaviorSubject<boolean>(false);
    get loading() {
        return this._loading.asObservable();
    }

    constructor(private toastr: ToastrService, private router: Router) {}

    setRole(role: keyof PortaisRotas) {
        this.current_role = role;

        // if (role === 'Colaborador') {
        //     if (this.current_user) {
        //         this.apiColaboradorService.setColaboradorDados(
        //             this.current_user
        //         );
        //     } else {
        //         this.getCurrentColaborador().subscribe((res) => {
        //             this.apiColaboradorService
        //                 .colaboradorDados(res.id_colaborador)
        //                 .subscribe((res) => {
        //                     this.current_user = res;
        //                 });
        //         });
        //     }
        // }
    }

    getRole() {
        return this.current_role;
    }

    isRole(role: keyof PortaisRotas | (keyof PortaisRotas)[]) {
        if (!this.current_role) {
            this.toastr.info('Papel não definido');
            return false;
        }
        if (Array.isArray(role)) {
            return role.includes(this.current_role);
        }
        return this.current_role === role;
    }

    getRoleRoute(): string {
        const role = this.getRole();
        if (role) return this.rotas[role];
        else return undefined;
    }

    getPermissions() {
        return this.permissions;
    }

    checkPermissionPortal(absolutePath: string) {
        const basePathParsed = absolutePath.startsWith('/')
            ? `/${absolutePath.split('/')[1]}`
            : `/${absolutePath.split('/')[0]}`;
        return this.basePathPortais?.includes(basePathParsed) || false;
    }

    get basePathPortais() {
        return this.getPermissions()?.map(
            (permission) => this.rotas[permission]
        );
    }

    redirect(goTo?: string, callback?: () => void) {
        const finishNotifier = new Subject<void>();

        const redirecionaFn = (isLoading: boolean) => {
            if (isLoading) return;
            finishNotifier.next();

            if (callback) callback();

            const acessoPermitido = goTo && this.checkPermissionPortal(goTo);
            const naoPossuiPermissao = this.getPermissions()?.length === 0;
            const rotaAleatoriaQueOUsuarioTemAcesso =
                this.basePathPortais && this.basePathPortais.length !== 0
                    ? this.basePathPortais[0]
                    : '/';

            if (acessoPermitido) this.router.navigateByUrl(goTo);
            else if (naoPossuiPermissao) this.router.navigateByUrl('/404');
            else this.router.navigateByUrl(rotaAleatoriaQueOUsuarioTemAcesso);
        };

        this._loading
            .asObservable()
            .pipe(takeUntil(finishNotifier))
            .subscribe(redirecionaFn);
    }
}
