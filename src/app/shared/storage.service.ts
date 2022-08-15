import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipes.model';
import { exhaustMap, map, Subscription, take, tap } from 'rxjs';
import { RecipesService } from '../recipes/services/recipes.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private authSub: Subscription;

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
    private _recipesService: RecipesService
  ) {}

  saveRecipes() {
    const recipes = this._recipesService.getRecipes();
    this.http
      .put(
        'https://recipes-angular-c528d-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipes-angular-c528d-default-rtdb.firebaseio.com/recipes.json',
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this._recipesService.setRecipes(recipes);
        })
      );
  }
}
