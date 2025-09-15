import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ComponentsModule } from './components/components.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { JwtInterceptor } from './services/utils/jwt.interceptor';
import {  QuillModule } from 'ngx-quill';
import { NgxEditorModule } from 'ngx-editor';
@NgModule({ declarations: [
        AppComponent,

    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        LayoutModule,
        AppRoutingModule,
        NgxExtendedPdfViewerModule,
        ComponentsModule,
        QuillModule.forRoot({
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline',],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                ]
            },
            theme: 'snow',
        }),
        NgxEditorModule.forRoot({
            locals: {
                bold: 'Bold',
                italic: 'Italic',
                code: 'Code',
                underline: 'Underline',
                // ... 
            },
        })], providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
