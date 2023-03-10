import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsHomeComponent } from './components/tickets-home/tickets-home.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { InterventionComponent } from './components/intervention/intervention.component';

@NgModule({
  declarations: [TicketsHomeComponent, TicketDetailComponent, TicketComponent, InterventionComponent],
  imports: [CommonModule, TicketsRoutingModule],
})
export class TicketsModule {}
