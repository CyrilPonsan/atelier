import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  page = 0;
  max = 5;
  totalPages!: number;
  total!: number;
  next!: string;
  previous!: string;
  constructor() {}

  /**
   * initialise les propriétés servant a appliquer le style inline
   * @param value boolean : résultats des méthodes setPrevious() et
   * setNext()
   * @returns string : style à appliquer aux boutons du système de pagination
   */
  private testButtons(value: boolean): string {
    return value ? 'visible' : 'hidden';
  }

  /**
   *
   * @returns string : visible ou hidden, définit le style à appliquer aux
   * boutons du système de pagination
   */
  setPrevious(): string {
    let tmp: boolean = this.page > 0;
    return this.testButtons(tmp);
  }

  /**
   *
   * @returns string : visible ou hidden, définit le style à appliquer aux
   * boutons du système de pagination
   */
  setNext(size: number, total: number) {
    let tmp: boolean = size >= this.max && size * (this.page + 1) !== total;

    return this.testButtons(tmp);
  }

  /**
   * calcul le nombre max de pages enfonction du nbre total de courriers
   * trouvés et du nbre d'enregistrements affichés à l'écran
   * @param value valeur retournée par le backend correspondant au nombre
   * toral de courriers trouvés après filtrage
   */
  setPagesMax(value: number): void {
    let result;
    if (value % this.max !== 0) {
      result = value / this.max + 1;
    } else {
      result = value / this.max;
    }
    this.totalPages =
      value % this.max !== 0
        ? Math.trunc(value / this.max) + 1
        : value / this.max;
  }

  /**
   * appele les méthodes qui vont définir le style des boutons du
   * système de pagination
   */
  setButtonsStyle(size: number): void {
    this.previous = this.setPrevious();
    this.next = this.setNext(size, this.total);
  }
}
