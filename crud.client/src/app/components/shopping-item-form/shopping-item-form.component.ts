import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingItemService } from '../../services/shopping-item.service';
import { ShoppingItem } from '../../models/shopping-item';

@Component({
  selector: 'app-shopping-item-form',
  templateUrl: './shopping-item-form.component.html',
  styleUrls: ['./shopping-item-form.component.css']
})
export class ShoppingItemFormComponent implements OnInit {

  shoppingItem: ShoppingItem = {
    itemId: 0,
    name: '',
    quantity: 0,
    price: 0,
    isPurchased: false,
    link: '',
    image: '',
    priority: ''
  };
  isEditMode = false;

  constructor(
    private shoppingItemService: ShoppingItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.shoppingItemService.getShoppingItem(+id).subscribe(item => {
        this.shoppingItem = item;
      });
    }
  }

  saveShoppingItem(): void {
    if (this.isEditMode) {
      this.shoppingItemService.updateShoppingItem(this.shoppingItem.itemId, this.shoppingItem).subscribe(() => {
        this.router.navigate(['/shoppingitems']);
      });
    } else {
      this.shoppingItemService.createShoppingItem(this.shoppingItem).subscribe(() => {
        this.router.navigate(['/shoppingitems']);
      });
    }
  }
}
