import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/animations/animations';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets-home',
  templateUrl: './tickets-home.component.html',
  styleUrls: ['./tickets-home.component.scss'],
  animations: [fade],
})
export class TicketsHomeComponent implements OnInit {
  ticketsList!: any[];
  showModal = true;
  modal = {
    titre: 'Erreur',
    message: 'Problème coté serveur, allez dormir !',
    rightBtn: 'fermer',
  };

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    if (!this.ticketsService.statuts) {
      this.ticketsService.httpGetTicketStatutsList();
    }

    this.ticketsService.httpGetTickets().subscribe({
      next: this.handleResponse.bind(this),
    });
  }

  modalRightClickHandler(): void {
    this.showModal = false;
  }

  private handleResponse(response: any) {
    this.ticketsList = response.data;
  }
}
