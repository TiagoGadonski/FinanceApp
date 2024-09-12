import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 5000,            // Tempo de exibição (em milissegundos)
      positionClass: 'toast-top-right', // Posição do toast
      closeButton: true,        // Exibir botão de fechar
      progressBar: true,        // Exibir barra de progresso
      toastClass: 'ngx-toastr custom-toast' // Classe CSS personalizada
    });
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
  timeOut: 5000,            // Tempo de exibição (em milissegundos)
  positionClass: 'toast-top-right', // Posição do toast
  closeButton: true,        // Exibir botão de fechar
  progressBar: true,        // Exibir barra de progresso
  toastClass: 'ngx-toastr custom-toast' // Classe CSS personalizada
});
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
  timeOut: 5000,            // Tempo de exibição (em milissegundos)
  positionClass: 'toast-top-right', // Posição do toast
  closeButton: true,        // Exibir botão de fechar
  progressBar: true,        // Exibir barra de progresso
  toastClass: 'ngx-toastr custom-toast' // Classe CSS personalizada
});
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
  timeOut: 5000,            // Tempo de exibição (em milissegundos)
  positionClass: 'toast-top-right', // Posição do toast
  closeButton: true,        // Exibir botão de fechar
  progressBar: true,        // Exibir barra de progresso
  toastClass: 'ngx-toastr custom-toast' // Classe CSS personalizada
});
  }
}
