import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  public newIngredient = new EventEmitter<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 4),
    new Ingredient('Carrots', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ingredientsToList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
