import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MdGridListModule } from '@angular/material';
import { MdProgressBarModule, MdDialogModule, MdButtonModule } from '@angular/material';
import { MdCardModule, MdTooltipModule, MdInputModule, MdSelectModule } from '@angular/material'
import 'hammerjs';
import { MdTabsModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesktopAppComponent } from './desktop/desktop-app/desktop-app.component';
import { Resource } from './app.resource';
import { ProjectComponent } from './desktop/project/project.component'
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AboutComponent } from './desktop/about/about.component';
import { MyShowFrontPipePipe } from './my-show-front-pipe.pipe';
import { MdSliderModule } from '@angular/material';
import { ContactComponent } from './desktop/contact/contact.component';
import { AlertDialog } from "./healper/alert.dialog/alert.dialog.component";
import { HireMeComponent } from './desktop/hire-me/hire-me.component';
import { HealperComponent } from './healper/healper/healper.component'
import { AuthProviderService } from './providers/auth-provider.service';
import { LoginComponent } from './desktop/login/login.component';
import { ClientFeedbackComponent } from './desktop/client-feedback/client-feedback.component';
import { ChatComponent } from './desktop/chat/chat.component';
import { ProjectDetailComponent } from './desktop/project-detail/project-detail.component';
import { MobileAppComponent } from './mobile/mobile-app/mobile-app.component';
import { MobileHomeComponent } from './mobile/mobile-home/mobile-home.component';
import { PostFeedbackComponent } from './desktop/client-feedback/post-feedback/post-feedback.component';
import { ProjectTileComponent } from './desktop/project/project-tile/project-tile.component'

const appRoutes: Routes = [

    {
        path: '',
        component: ProjectComponent
    },
    {
        path: 'home',
        component: ProjectComponent
    },
    {
        path: 'hire',
        component: HireMeComponent
    }, {
        path: 'about',
        component: AboutComponent
    }, {
        path: 'contact',
        component: ContactComponent
    }, {

        path: 'client_feedback',
        component: ClientFeedbackComponent

    },
    {
        path: 'work',
        component: ProjectComponent
    },
    {
        path: 'workDetailsInner/:id',
        component: ProjectDetailComponent
    },
     {
        path: 'post-project-feedback',
        component: PostFeedbackComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    }

];

const appRoutesMobile: Routes = [

    {
        path: '',
        component: MobileHomeComponent
    }
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });




@NgModule({
    declarations: [

        AlertDialog,
        AppComponent,
        DesktopAppComponent,
        ProjectComponent,
        AboutComponent,
        MyShowFrontPipePipe,
        ContactComponent,
        HireMeComponent,
        HealperComponent,
        LoginComponent,
        ClientFeedbackComponent,
        ChatComponent,
        ProjectDetailComponent,
        MobileAppComponent,
        MobileHomeComponent,
        PostFeedbackComponent,
        ProjectTileComponent
    ],
    imports: [
        MdInputModule,
        MdTabsModule,
        HttpModule,
        FormsModule,
        MdMenuModule,
        MdButtonModule,
        ReactiveFormsModule,
        MdDialogModule,
        MdSliderModule,
        MdGridListModule,
        routing,
        BrowserModule,
        MdSelectModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        MdCardModule,
        MdTooltipModule,
        MdProgressBarModule,
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule,
    ],
    providers: [Resource, AuthProviderService, appRoutingProviders, HealperComponent],
    bootstrap: [AppComponent],
    entryComponents: [AlertDialog]
})

export class AppModule { }
