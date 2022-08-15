import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { StorageService } from 'src/app/shared/storage.service';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipes.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  public refreshRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    /*   new Recipe(
      'Fritada',
      'This is a typical ecuadorian food.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/indian-10f0c14.jpg',
      [
        new Ingredient('Apples', 4),
        new Ingredient('Carrots', 2),
        new Ingredient('Corns', 6),
      ]
    ),
    new Recipe(
      'test2',
      'test2',

      'https://images.immediate.co.uk/production/volatile/sites/30/2022/03/summer-budget-85da682.jpg?quality=90&resize=504%2C458',
      [
        new Ingredient('Bananas', 5),
        new Ingredient('Watermelon', 1),
        new Ingredient('Pinapple', 3),
        new Ingredient('Grapes', 20),
        new Ingredient('Peach', 3),
      ]
    ), */
  ];

  constructor(
    private _shoppingListService: ShoppingListService,
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.refreshRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.refreshRecipes.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    this.recipes = this.recipes.filter((recipe, i) => i != index);
    console.log(this.recipes);
    this.refreshRecipes.next(this.recipes.slice());
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this._shoppingListService.ingredientsToList(ingredients);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.refreshRecipes.next(this.recipes.slice());
  }
}
