import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { ExpenseType } from '../../models/ExpenseType';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  transaction: Transaction = {
    transactionId: 0,
    date: new Date(),
    amount: 0,
    description: '',
    categoryId: 0,
    transactionType: '',
    paymentMethod: '',
    receiptImage: '',
    totalInstallments: 0,
    installmentsPaid: 0,
    installmentAmount: 0,
    endDate: new Date(),
    expenseType: ExpenseType.Fixed
  };

  categories: Category[] = [];  // Lista de categorias

  isEditMode = false;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Carregar as categorias
    this.categoryService.getCategories().subscribe(response => {
      if (response && '$values' in response) {
        // Se o objeto tem a propriedade $values, extrai as categorias
        this.categories = (response as any)['$values'] as Category[];
      } else {
        this.categories = response as Category[];
      }
      console.log('Categorias carregadas:', this.categories);
    }, error => {
      console.error('Erro ao carregar categorias:', error);
    });

    // Se estiver no modo de edição, buscar a transação existente
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.transactionService.getTransaction(+id).subscribe(transaction => {
        this.transaction = transaction;
      });
    }
  }

  saveTransaction(): void {
    console.log('Dados da transação a serem enviados:', this.transaction);  // Verifique os valores antes de enviar

    if (this.isEditMode) {
      this.transactionService.updateTransaction(this.transaction.transactionId, this.transaction).subscribe(() => {
        this.router.navigate(['/transactions']);
      });
    } else {
      this.transactionService.createTransaction(this.transaction).subscribe(() => {
        this.router.navigate(['/transactions']);
      });
    }
  }
}
