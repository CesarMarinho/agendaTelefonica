import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Phone } from '../../model/phone';


@Component({
  selector: 'app-phones-list',
  templateUrl: './phones-list.component.html',
  styleUrls: ['./phones-list.component.scss'],
})
export class PhonesListComponent {

  @Input() phones: Phone[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() favorite = new EventEmitter(false);
  @Output() click = new EventEmitter(false);

  readonly displayedColumns = ['name','mobile','phone', 'email', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(phone: Phone){
    this.edit.emit(phone);
  }

  onFavorite(phone: Phone){
    this.favorite.emit(phone);
  }

  onDelete(phone: Phone){
    this.remove.emit(phone);
  }

  onClick(phone: Phone){
    this.click.emit(phone);
  }

}
