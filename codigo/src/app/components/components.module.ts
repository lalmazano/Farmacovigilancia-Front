import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';

import { ProjectLegendComponent } from './others/project-legend/project-legend.component';
import { TitleComponent } from './others/title/title.component';

import { EcoFabSpeedDialComponent } from '@ecodev/fab-speed-dial';
import { EcoFabSpeedDialTriggerComponent } from '@ecodev/fab-speed-dial';
import { EcoFabSpeedDialActionsComponent } from '@ecodev/fab-speed-dial';
import { ChunkPipe } from './pipes/chunk.pipe';
import { SpinnerComponent } from './others/spinner/spinner.component';


@NgModule({ declarations: [
        ProjectLegendComponent,
        TitleComponent,
        ChunkPipe,
        SpinnerComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ProjectLegendComponent,
        TitleComponent,
        NgxExtendedPdfViewerModule,
        SpinnerComponent,
    ], imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        EcoFabSpeedDialComponent,
        EcoFabSpeedDialTriggerComponent,
        EcoFabSpeedDialActionsComponent,
        MaterialDesignModule,
    ], providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-GT' },        
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class ComponentsModule { }
