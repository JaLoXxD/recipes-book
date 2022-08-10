import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) ingredientForm: NgForm;

  currentEditIndex: number;
  editMode: boolean = false;
  editingSubscription: Subscription;
  editedItem: Ingredient;
  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editingSubscription =
      this._shoppingListService.startedEditing.subscribe((value) => {
        this.currentEditIndex = value;
        this.editMode = true;
        this.editedItem = this._shoppingListService.getIngredient(value);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      });
  }

  onAddItem(form: NgForm) {
    console.log(form);
    if (form.valid) {
      const name = form.value.name;
      const amount = form.value.amount;
      if (this.editMode) {
        this._shoppingListService.updateIngredient(this.currentEditIndex, {
          name,
          amount,
        });
        return;
      }
      this._shoppingListService.newIngredient.next({ name, amount });
    }
  }

  clearForm() {
    this.currentEditIndex = null;
    this.editMode = false;
    this.editedItem = null;
    this.ingredientForm.reset();
  }

  onDeleteItem() {
    this._shoppingListService.deleteIngredient(this.currentEditIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
}
