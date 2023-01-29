import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets-home',
  templateUrl: './tickets-home.component.html',
  styleUrls: ['./tickets-home.component.scss'],
})
export class TicketsHomeComponent implements OnInit {
  ticketsList!: any[];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    if (!this.ticketsService.statuts) {
      this.ticketsService.httpGetTicketStatutsList();
    }

    this.ticketsService.httpGetTickets().subscribe({
      next: this.handleResponse.bind(this),
    });
  }

  private handleResponse(response: any) {
    this.ticketsList = response.data;
  }
}
