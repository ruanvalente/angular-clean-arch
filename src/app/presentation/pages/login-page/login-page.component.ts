import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  email = signal<string>('');
  password = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private router: Router) {}

  handleLogin() {
    this.errorMessage.set('');

    if (!this.email() || !this.password()) {
      this.errorMessage.set('Por favor, preencha todos os campos');
      return;
    }

    this.isLoading.set(true);

    // Simular chamada à API
    setTimeout(() => {
      this.isLoading.set(false);
      // Redirecionar para tarefas após login bem-sucedido
      this.router.navigate(['/tasks']);
    }, 1000);
  }

  handleSignup() {
    // Aqui você pode redirecionar para página de cadastro ou abrir um modal
    alert('Funcionalidade de cadastro será implementada');
  }
}
