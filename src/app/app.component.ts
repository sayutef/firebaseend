import { Component } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core'; // Método inject de Angular 14+

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase';

  private firestore = inject(Firestore); // Inyectar Firestore

  constructor() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    getDocs(usuariosRef).then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      });
    });
  }

  altaUsuario() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, {
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 30
    }).then(() => {
      alert('Usuario agregado');
    }).catch((err: any) => {
      alert('Error al agregar usuario: ' + err);
    });
  }

  // Función para actualizar los datos de un usuario
  // Se activa cuando el botón 'actualizarUsuario' es presionado
  // async actualizarUsuario() {
  //   try {
  //     const usuarioActualizado = {
  //       id: 1,
  //       nombre: 'Juan Pérez',
  //       edad: 31,
  //       email: 'juanperez@correo.com'
  //     };
  //     console.log('Actualizando usuario:', usuarioActualizado);
  //     // Llamada a un servicio para actualizar el usuario
  //     await this.usuarioService.actualizarUsuario(usuarioActualizado);
  //     alert('Usuario actualizado correctamente');
  //   } catch (error) {
  //     console.error('Error al actualizar el usuario:', error);
  //   }
  // }
}
