import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public currentRecipe: Recipe;
  public id: number;
  private routeSubscriber: Subscription;

  constructor(
    private _recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscriber = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.currentRecipe = this._recipesService.getRecipe(this.id);
    });
  }

  addIngredients() {
    this._recipesService.addIngredientsToList(this.currentRecipe.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onRemoveRecipe(index: number) {
    console.log(index);
    this._recipesService.removeRecipe(index);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    this.routeSubscriber.unsubscribe();
  }
}
