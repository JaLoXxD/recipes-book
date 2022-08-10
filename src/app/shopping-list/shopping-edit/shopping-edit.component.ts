import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInput: ElementRef;

  constructor(private _shoppingListService: ShoppingListService) {}

  addIngredient() {
    const name: string = this.nameInput.nativeElement.value;
    const amount: number = this.amountInput.nativeElement.value;
    this._shoppingListService.newIngredient.next({ name, amount });
  }

  ngOnInit(): void {}
}
