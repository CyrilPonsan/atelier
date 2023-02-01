import { Component, Input } from '@angular/core';
import { Intervention } from '../../models/ticket.model';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss'],
})
export class InterventionComponent {
  @Input() intervention!: Intervention;
  htmlItems: any = {
    date: 'Date',
    conseiller: 'Conseiller',
    description: 'Description',
    reponse: 'Réponse',
  };
}
