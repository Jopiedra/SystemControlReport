import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserIdleModule } from 'angular-user-idle';

/*Angular Material*/
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/*NG Zorro*/
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { MainHeaderComponent } from './components/header/header.component';
import { MainFooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/homepage/home.component';
import { SideMenuComponent } from './components/sidemenu/sidemenu.component';
import { AppDirectoryComponent } from './components/appdirectory/appdirectory.component';
import { AppDirectoryUpsertComponent } from "./components/appdirectory/upsert.component";
import { RolesComponent } from './components/roles/roles.component';
import { RolesRightsComponent } from './components/roles/rights.component';
import { RolesCreateComponent } from './components/roles/create.component';
import { AppUsersComponent } from './components/appusers/appusers.component';
import { AppUsersUpsertComponent } from './components/appusers/upsert.component';
import { AppUsersHistoryComponent } from './components/appusers/history.component';
import { AppUsersActivityDetailComponent } from './components/appusers/activitydetail.component';
import { ComputersComponent } from './components/computers/computers.component';
import { ComputerUpsertComponent } from './components/computers/upsert.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServerUpsertComponent } from './components/servers/upsert.component';
import { EmailDirectoryComponent } from './components/emaildirectory/emaildirectory.component';
import { EmailDirectoryUpsertComponent } from './components/emaildirectory/upsert.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentUpsertComponent } from './components/departments/upsert.component';
import { SharedFoldersComponent } from './components/sharedfolders/sharedfolders.component';
import { SharedFolderUpsertComponent } from './components/sharedfolders/upsert.component';
import { SourcePathComponent } from './components/sourcepath/sourcepath.component';
import { SourcePathUpsertComponent } from './components/sourcepath/upsert.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsUpsertComponent } from './components/reports/upsert.component';

const antDesignIcons = AllIcons as { [key: string]: IconDefinition; };
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
    , MainHeaderComponent
    , MainFooterComponent
    , LoadingComponent
    , LoginComponent
    , HomePageComponent
    , SideMenuComponent
    , AppDirectoryComponent
    , AppDirectoryUpsertComponent
    , RolesComponent
    , RolesRightsComponent
    , RolesCreateComponent
    , AppUsersComponent
    , AppUsersUpsertComponent
    , AppUsersHistoryComponent
    , AppUsersActivityDetailComponent
    , ComputersComponent
    , ComputerUpsertComponent
    , ServersComponent
    , ServerUpsertComponent
    , EmailDirectoryComponent
    , EmailDirectoryUpsertComponent
    , DepartmentsComponent
    , DepartmentUpsertComponent
    , SharedFoldersComponent
    , SharedFolderUpsertComponent
    , SourcePathComponent
    , SourcePathUpsertComponent
    , ReportsComponent
    , ReportsUpsertComponent
  ],
  imports: [
    ReactiveFormsModule
    , FormsModule
    , BrowserModule
    , AppRoutingModule
    , UserIdleModule.forRoot({ idle: 3600, timeout: 300})
    , HttpClientModule
    , BrowserAnimationsModule
    , MatFormFieldModule
    , ClipboardModule
    , MatMenuModule
    , MatSidenavModule
    , MatCheckboxModule
    , MatDatepickerModule
    , MatNativeDateModule
    , MatSelectModule
    , MatInputModule
    , NzIconModule
    , NzMenuModule
    , NzMessageModule
    , NzModalModule
    , NzBreadCrumbModule
    , NzCardModule
    , NzToolTipModule
    , NzPopoverModule
    , NgbModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [
    ReportsUpsertComponent
  ],  
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    , { provide: NZ_I18N, useValue: en_US }
    , { provide: NZ_ICONS, useValue: icons }
    , { provide: LOCALE_ID, useValue: 'EN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
