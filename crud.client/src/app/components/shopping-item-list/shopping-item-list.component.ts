import { Component, OnInit } from '@angular/core';
import { ShoppingItemService } from '../../services/shopping-item.service';
import { ShoppingItem } from '../../models/shopping-item';

@Component({
  selector: 'app-shopping-item-list',
  templateUrl: './shopping-item-list.component.html',
  styleUrls: ['./shopping-item-list.component.css']
})
export class ShoppingItemListComponent implements OnInit {

  shoppingItems: ShoppingItem[] = [];

  constructor(private shoppingItemService: ShoppingItemService) { }

  ngOnInit(): void {
    this.getShoppingItems();
  }

  getShoppingItems(): void {
    this.shoppingItemService.getShoppingItems().subscribe(items => {
      this.shoppingItems = items;
    });
  }

  deleteShoppingItem(id: number): void {
    this.shoppingItemService.deleteShoppingItem(id).subscribe(() => {
      this.getShoppingItems();  // Recarregar a lista após a exclusão
    });
  }
}
