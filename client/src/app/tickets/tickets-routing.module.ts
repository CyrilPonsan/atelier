import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketsHomeComponent } from './components/tickets-home/tickets-home.component';

const routes: Routes = [
  {
    path: 'tickets/details/:ref',
    component: TicketDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tickets',
    component: TicketsHomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
