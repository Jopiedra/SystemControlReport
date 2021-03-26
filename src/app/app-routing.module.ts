import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guards';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/homepage/home.component';
import { AppDirectoryComponent } from './components/appdirectory/appdirectory.component';
import { RolesComponent } from './components/roles/roles.component';
import { AppUsersComponent } from './components/appusers/appusers.component';
import { AppUsersHistoryComponent } from './components/appusers/history.component';
import { ComputersComponent } from './components/computers/computers.component';
import { ServersComponent } from './components/servers/servers.component';
import { EmailDirectoryComponent } from './components/emaildirectory/emaildirectory.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { SharedFoldersComponent } from './components/sharedfolders/sharedfolders.component';
import { SourcePathComponent } from './components/sourcepath/sourcepath.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsUpsertComponent } from './components/reports/upsert.component';
import { DistributionListComponent } from './components/distributionlist/distributionlist.component';

const routes: Routes = [

  //Private Routes
  { path: '', component: LoginComponent },
  { path: 'Home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'AppDirectory', component: AppDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'AppDirectory/Index', component: AppDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'Roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'Roles/Index', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'AppUsers', component: AppUsersComponent, canActivate: [AuthGuard] },
  { path: 'AppUsers/Index', component: AppUsersComponent, canActivate: [AuthGuard] },
  { path: 'AppUsers/History/:UserID', component: AppUsersHistoryComponent, canActivate: [AuthGuard] },
  { path: 'Computers', component: ComputersComponent, canActivate: [AuthGuard] },
  { path: 'Computers/Index', component: ComputersComponent, canActivate: [AuthGuard] },
  { path: 'Servers', component: ServersComponent, canActivate: [AuthGuard] },
  { path: 'Servers/Index', component: ServersComponent, canActivate: [AuthGuard] },
  { path: 'EmailDirectory', component: EmailDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'EmailDirectory/Index', component: EmailDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'Departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'Departments/Index', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'SFolders', component: SharedFoldersComponent, canActivate: [AuthGuard] },
  { path: 'SFolders/Index', component: SharedFoldersComponent, canActivate: [AuthGuard] },
  { path: 'Reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'Reports/Index', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'Reports/:Type', component: ReportsUpsertComponent, canActivate: [AuthGuard] },
  { path: 'Reports/:Type/:RPTID', component: ReportsUpsertComponent, canActivate: [AuthGuard] },
  { path: 'DLs', component: DistributionListComponent, canActivate: [AuthGuard] },
  { path: 'DLs/Index', component: DistributionListComponent, canActivate: [AuthGuard] },
  { path: 'Triggers', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'Triggers/Index', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'SourcePaths', component: SourcePathComponent, canActivate: [AuthGuard] },
  { path: 'SourcePaths/Index', component: SourcePathComponent, canActivate: [AuthGuard] },
  { path: 'MHeadcount', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MHeadcount/Index', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MPartners', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MPartners/Index', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MGoals/Agents', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MGoals/Departments', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MGoals/Partners', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'MGoals/PODs', component: HomePageComponent, canActivate: [AuthGuard] },

  //{ path:'Error', component: ErrorComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
