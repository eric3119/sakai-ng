import { NgModule } from '@angular/core';
import { PrimeNGUtilsModule } from 'src/app/primeng-utils.module';
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
import { UIKitRoutingModule } from './uikit-routing.module';

@NgModule({
    declarations: [
        FormLayoutComponent,
        InputComponent,
        FloatLabelComponent,
        InvalidStateComponent,
        ButtonComponent,
        TableComponent,
        ListComponent,
        TreeComponent,
        PanelsComponent,
        OverlaysComponent,
        MediaComponent,
        MessagesComponent,
        MiscComponent,
        ChartsComponent,
        FileComponent,
    ],
    imports: [PrimeNGUtilsModule, UIKitRoutingModule],
})
export class UIKitModule {}
