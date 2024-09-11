import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      if (response && '$values' in response) {
        // Força o TypeScript a entender que estamos acessando o $values
        this.categories = (response as any)['$values'] as Category[];  // Corrigido o tipo
      } else {
        this.categories = response as Category[];  // Fallback se já for um array
      }
      console.log('Categorias carregadas com sucesso:', this.categories);
    }, error => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();  // Recarregar a lista após a exclusão
    });
  }
}
