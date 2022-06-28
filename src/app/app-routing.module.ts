import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./modules/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: '',
                    component: AppMainComponent,
                    children: [
                        { path: '', component: DashboardComponent },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    'src/app/examples/uikit/uikit.module'
                                ).then((m) => m.UIKitModule),
                        },
                        { path: 'pages/crud', component: CrudComponent },
                        {
                            path: 'pages/timeline',
                            component: TimelineComponent,
                        },
                        { path: 'pages/empty', component: EmptyComponent },
                        { path: 'icons', component: IconsComponent },
                        { path: 'blocks', component: BlocksComponent },
                        {
                            path: 'documentation',
                            component: DocumentationComponent,
                        },
                    ],
                },
                { path: 'pages/landing', component: LandingComponent },
                { path: 'pages/login', component: LoginComponent },
                { path: 'pages/error', component: ErrorComponent },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: 'pages/access', component: AccessComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
