import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

import { Statut, Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  statuts!: Statut[];

  constructor(private http: HttpClient, private pag: PaginationService) {}

  httpGetTickets(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/tickets?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  httpGetTicketStatutsList(): void {
    this.http
      .get<any>(`${environment.baseUrl}/tickets/statuts`)
      .pipe(
        tap((response) => {
          this.statuts = response.data;
        })
      )
      .subscribe();
  }

  httpGetTicketDetails(ticketRef: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${environment.baseUrl}/tickets/details/${ticketRef}`
    );
  }
  /*
  httpGetTicketByRef(ticketRef: string): Observable<Ticket> {} */

  setStatutLabel(code: number): string {
    return this.statuts.find((statut) => statut.code === code)!.label;
  }
}
