import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category = {
    categoryId: 0,
    name: '',
    description: ''
  };
  isEditMode = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryService.getCategory(+id).subscribe(category => {
        this.category = category;
      });
    }
  }

  saveCategory(): void {
    if (this.isEditMode) {
      this.categoryService.updateCategory(this.category.categoryId, this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoryService.createCategory(this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
