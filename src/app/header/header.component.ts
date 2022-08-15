import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Subscription } from 'rxjs';
import { StorageService } from '../shared/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub: Subscription;

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onSaveAll() {
    this._storageService.saveRecipes();
  }

  onFetchAll() {
    this._storageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
