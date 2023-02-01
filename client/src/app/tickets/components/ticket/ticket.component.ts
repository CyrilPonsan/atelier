import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() ticket!: any;

  constructor(public ticketService: TicketsService, private router: Router) {}

  ticketClickHandler(): void {
    this.router.navigate(['/tickets/details', this.ticket.ref]);
  }
}
