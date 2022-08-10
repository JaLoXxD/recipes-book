import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _recipesService: RecipesService
  ) {}
  public id: number;
  public currentRecipe: Recipe;
  public editMode: boolean = false;
  public routeSubscriber: Subscription;
  public recipesForm: FormGroup;

  ngOnInit(): void {
    this.routeSubscriber = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (!isNaN(this.id)) {
        this.editMode = true;
        this.currentRecipe = this._recipesService.getRecipe(this.id);
      }
    });
    this.createForm();
  }

  createForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImage = '';
    let recipeIngredients = [];
    if (this.editMode) {
      const ingredients = [];
      this.currentRecipe.ingredients.forEach((ingredient) => {
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      });
      recipeName = this.currentRecipe.name;
      recipeDescription = this.currentRecipe.description;
      recipeImage = this.currentRecipe.imagePath;
      recipeIngredients = ingredients;
    }
    this.recipesForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      ingredients: new FormArray(recipeIngredients),
    });
  }

  addIngredient() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
    (<FormArray>this.recipesForm.get('ingredients')).push(control);
  }

  getIngredients() {
    return (<FormArray>this.recipesForm.get('ingredients')).controls;
  }

  cancelForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.recipesForm.reset();
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipesForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    console.log(this.recipesForm);
    if (!this.recipesForm.valid) return;

    if (this.editMode) {
      this._recipesService.updateRecipe(this.id, this.recipesForm.value);
    } else {
      this._recipesService.addRecipe(this.recipesForm.value);
      this.recipesForm.reset();
    }
    this.router.navigate(['../'], { relativeTo: this.route });

    return;
  }

  ngOnDestroy(): void {
    this.routeSubscriber.unsubscribe();
  }
}
