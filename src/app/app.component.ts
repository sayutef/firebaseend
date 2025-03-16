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

  // Función para eliminar un usuario
  // Se activa cuando el botón 'eliminarUsuario' es presionado
  // async eliminarUsuario() {
  //   try {
  //     const usuarioId = 1; // ID del usuario a eliminar
  //     console.log('Eliminando usuario con ID:', usuarioId);
  //     // Llamada a un servicio para eliminar el usuario
  //     await this.usuarioService.eliminarUsuario(usuarioId);
  //     alert('Usuario eliminado correctamente');
  //   } catch (error) {
  //     console.error('Error al eliminar al usuario:', error);
  //   }
  // }

  
}
