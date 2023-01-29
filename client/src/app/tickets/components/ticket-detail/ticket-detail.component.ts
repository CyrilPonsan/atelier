import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intervention } from '../../models/intervention.model';
import { Ticket } from '../../models/ticket.model';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  interventions!: Intervention[];

  constructor(
    private ticketsService: TicketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketsService
        .httpGetTicketDetails(id!)
        .subscribe({ next: this.handleResponse.bind(this) });
    }
  }

  urlHandler(): void {
    window.open(this.ticket.materiel.url, '_blank');
  }

  private handleResponse(response: Ticket): void {
    this.ticket = response;
    this.interventions = this.ticket.intervention;
    console.log(this.ticket);
  }
}
