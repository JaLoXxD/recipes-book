import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}
  public id: number;
  public editMode: boolean = false;
  public routeSubscriber: Subscription;

  ngOnInit(): void {
    this.routeSubscriber = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (!isNaN(this.id)) {
        console.log('edit mode');
        this.editMode = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscriber.unsubscribe();
  }
}
