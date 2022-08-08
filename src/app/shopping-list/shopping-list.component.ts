import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [];

  constructor(private _shoppingListService: ShoppingListService) {
    this.ingredients = _shoppingListService.getIngredients();
    _shoppingListService.newIngredient.subscribe((ingredient) => {
      this._shoppingListService.onNewIngredient(ingredient);
      this.ingredients = _shoppingListService.getIngredients();
    });
  }

  ngOnInit(): void {}
}
