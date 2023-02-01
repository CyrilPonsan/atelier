import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/shared/animations/animations';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets-home',
  templateUrl: './tickets-home.component.html',
  styleUrls: ['./tickets-home.component.scss'],
  animations: [fade],
})
export class TicketsHomeComponent implements OnInit {
  ticketsList!: any[];
  constructor(
    public pagination: PaginationService,
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagination.page = 0;

    if (!this.ticketsService.statuts) {
      this.ticketsService.httpGetTicketStatutsList();
    }
    this.getTickets();
  }

  nextClickHandler(): void {
    this.pagination.page++;
    this.getTickets();
  }

  previousClickHandler(): void {
    this.pagination.page--;
    this.getTickets();
  }

  searchSubmitHandler(value: string): void {
    this.router.navigate(['/tickets/details', value]);
  }

  setMax(value: number): void {
    this.pagination.page = 0;
    this.pagination.max = value;
    this.getTickets();
  }

  private handleResponse(response: any) {
    this.ticketsList = response.data;
    this.pagination.total = response.total;
    this.pagination.setButtonsStyle(this.ticketsList.length);
    console.log(this.ticketsList.length);

    this.pagination.setPagesMax(response.total);
  }

  private getTickets(): void {
    this.ticketsService.httpGetTickets().subscribe({
      next: this.handleResponse.bind(this),
    });
  }
}
