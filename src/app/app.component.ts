import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the-basics-project';
  currentPage = 'recipes'
  onPageEmitted(page: string): void {
    this.currentPage = page
    console.log(this.currentPage);
  }
}
