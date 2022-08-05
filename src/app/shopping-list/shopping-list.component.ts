import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 4),
    new Ingredient('Carrots', 1),
  ];

  constructor() {}

  onNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnInit(): void {}
}
