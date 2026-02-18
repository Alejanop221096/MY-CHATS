import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginServices } from '../../Services/login-services';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-inicio-page-component',
  imports: [FormsModule,CommonModule],
  templateUrl: './inicio-page-component.html',
  styleUrl: './inicio-page-component.css',
})
export class InicioPageComponent {
  email: string = '';
  password: string = '';
 mensajeError: string = '';
  

  constructor(private authService: LoginServices, private router: Router){}

  ingresar(){
     this.mensajeError='';
  const credentials = { email:this.email, password:this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log(res.token);
        localStorage.setItem("x-auth-token",res.token);
        localStorage.setItem("user", JSON.stringify(res.usuario));

        console.log('¡Bienvenido!');
        this.router.navigate(['/panelChat']); // Redirigir al entrar
      },
      error: (err) => {
        if (err.status === 400 && err.error && err.error.msg) {
          this.mensajeError = err.error.msg;
        } else {
          this.mensajeError = 'Error de conexión con el servidor';
        }
        console.error('Detalle del error:', err);
      }
    });
  }
  
}
