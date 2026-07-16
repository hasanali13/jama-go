import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminLoginComponent } from './pages/admin/login/admin-login.component';
import { AdminLayoutComponent } from './pages/admin/layout/admin-layout.component';
import { AdminStaffComponent } from './pages/admin/staff/admin-staff.component';
import { AdminContactsComponent } from './pages/admin/contacts/admin-contacts.component';
import { adminGuard, guestGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Jama Go Security — Protecting What Matters Most' },
  { path: 'contact', component: ContactComponent, title: 'Contact Us — Jama Go Security' },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [guestGuard],
    title: 'Admin Login — Jama Go Security',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'staff', pathMatch: 'full' },
      { path: 'staff', component: AdminStaffComponent, title: 'Manage Staff — Jama Go Admin' },
      { path: 'contacts', component: AdminContactsComponent, title: 'Contact Submissions — Jama Go Admin' },
    ],
  },
  { path: '**', redirectTo: '' },
];
