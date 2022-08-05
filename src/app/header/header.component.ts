import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
    @ViewChild('recipesRef', { static: false }) recipesLink: ElementRef;
    @ViewChild('shoppingRef', { static: false }) shoppingLink: ElementRef;

    @Output() page = new EventEmitter<string>();

    dropdownOpen:boolean = false;
    
    changePage(newPage: string) {
        this.page.emit(newPage);
        if (newPage === 'recipes') {
            this.recipesLink.nativeElement.classList.add('active');
            this.shoppingLink.nativeElement.classList.remove('active');
        } else {
            this.recipesLink.nativeElement.classList.remove('active');
            this.shoppingLink.nativeElement.classList.add('active');

        }
        console.log(this.recipesLink.nativeElement.classList);
    }
}