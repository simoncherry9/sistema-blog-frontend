import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (!this.user.username || !this.user.password || !this.user.nombre || !this.user.apellido || !this.user.email || !this.user.telefono) {
      this.snack.open('Todos los campos son obligatorios', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.snack.open('El formato del correo electrónico no es válido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 500 && error.error && error.error.message) {
          if (error.error.message.includes('could not execute statement; SQL [n/a]; constraint [usuarios.email_UNIQUE]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement')) {
            Swal.fire('Error', 'El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.', 'error');
          } else if (error.error.message.includes('El usuario ya esta presente')) {
            Swal.fire('Error', 'Ya existe un usuario con ese nombre. Por favor, elige otro nombre de usuario.', 'error');
          }
        } else {
          this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
            duration: 3000
          });
        }
      }
    );
  }
}