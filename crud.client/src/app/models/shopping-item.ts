export interface ShoppingItem {
  itemId: number;
  name?: string;
  quantity: number;
  price: number;
  isPurchased: boolean;
  link?: string;
  image?: string;
  priority?: string;
}
