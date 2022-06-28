import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { InputComponent } from './components/input/input.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { ListComponent } from './components/list/list.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { PanelsComponent } from './components/panels/panels.component';
import { TableComponent } from './components/table/table.component';
import { TreeComponent } from './components/tree/tree.component';

const routes: Routes = [
    { path: 'formlayout', component: FormLayoutComponent },
    { path: 'input', component: InputComponent },
    { path: 'floatlabel', component: FloatLabelComponent },
    { path: 'invalidstate', component: InvalidStateComponent },
    { path: 'button', component: ButtonComponent },
    { path: 'table', component: TableComponent },
    { path: 'list', component: ListComponent },
    { path: 'tree', component: TreeComponent },
    { path: 'panel', component: PanelsComponent },
    { path: 'overlay', component: OverlaysComponent },
    { path: 'media', component: MediaComponent },
    {
        path: 'menu',
        loadChildren: () =>
            import('src/app/components/menus/menus.module').then(
                (m) => m.MenusModule
            ),
    },
    { path: 'message', component: MessagesComponent },
    { path: 'misc', component: MiscComponent },
    { path: 'charts', component: ChartsComponent },
    { path: 'file', component: FileComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UIKitRoutingModule {}
