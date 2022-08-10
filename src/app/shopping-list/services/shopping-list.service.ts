import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  public updatedIngredients = new Subject<Ingredient[]>();
  public newIngredient = new Subject<Ingredient>();
  public startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 4),
    new Ingredient('Carrots', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngr: Ingredient) {
    this.ingredients[index] = newIngr;
    this.updatedIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    if (index === null) return;
    this.updatedIngredients.next(this.ingredients.splice(index, 1));
  }

  onNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ingredientsToList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
