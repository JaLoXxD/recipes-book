import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];
  private newIngredientSubject: Subscription;
  private updatedIngredientsSubject: Subscription;

  constructor(private _shoppingListService: ShoppingListService) {
    this.ingredients = _shoppingListService.getIngredients();

    this.newIngredientSubject = _shoppingListService.newIngredient.subscribe(
      (ingredient) => {
        this._shoppingListService.onNewIngredient(ingredient);
        this.ingredients = _shoppingListService.getIngredients();
      }
    );

    this.updatedIngredientsSubject =
      this._shoppingListService.updatedIngredients.subscribe((ingredients) => {
        this.ingredients = _shoppingListService.getIngredients();
      });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.newIngredientSubject.unsubscribe();
  }

  onEditItem(id: number) {
    this._shoppingListService.startedEditing.next(id);
  }
}
