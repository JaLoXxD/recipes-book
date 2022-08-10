import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private recipesSub: Subscription;

  constructor(
    private _recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipes = this._recipesService.getRecipes();
  }

  ngOnInit(): void {
    this.recipesSub = this._recipesService.refreshRecipes.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
