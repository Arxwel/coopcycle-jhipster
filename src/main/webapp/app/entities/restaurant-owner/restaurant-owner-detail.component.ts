import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';

@Component({
  selector: 'jhi-restaurant-owner-detail',
  templateUrl: './restaurant-owner-detail.component.html'
})
export class RestaurantOwnerDetailComponent implements OnInit {
  restaurantOwner: IRestaurantOwner | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantOwner }) => (this.restaurantOwner = restaurantOwner));
  }

  previousState(): void {
    window.history.back();
  }
}
