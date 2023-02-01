import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intervention, Ticket } from '../../models/ticket.model';
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
    const ref = this.route.snapshot.paramMap.get('ref');
    if (ref) {
      this.ticketsService
        .httpGetTicketDetails(ref!)
        .subscribe({ next: this.handleResponse.bind(this) });
    }
  }

  urlHandler(): void {
    window.open(this.ticket.materiel.modele.url, '_blank');
  }

  addInterventionHandler(): void {}

  private handleResponse(response: Ticket): void {
    this.ticket = response;
    this.interventions = this.ticket.intervention;
    console.log(this.ticket);
  }
}
