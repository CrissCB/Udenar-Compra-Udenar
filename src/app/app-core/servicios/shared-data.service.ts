import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// shared-data.service.ts
@Injectable({ providedIn: 'root' })
export class SharedDataService {
 
  private usuarioSubject = new BehaviorSubject<any>(null);
  private idUserSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private rolesSubject = new BehaviorSubject<string[]>([]);

  usuario$: Observable<any> = this.usuarioSubject.asObservable();
  idUser$: Observable<string | null> = this.idUserSubject.asObservable();
  username$: Observable<string | null> = this.usernameSubject.asObservable();
  role$: Observable<string | null> = this.roleSubject.asObservable();
  roles$: Observable<string[]> = this.rolesSubject.asObservable();

  setUsuario(usuario: any): void {
    this.usuarioSubject.next(usuario);
  }

  setIdUser(idUser: string): void {
    this.idUserSubject.next(idUser);
  }

  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  setRole(role: string): void {
    this.roleSubject.next(role);
  }

  setRoles(roles: string[]): void {
    this.rolesSubject.next(roles);
  }

  getRol(): string | null {
    return this.roleSubject.getValue();
  }

  // Método para limpiar todos los datos al hacer logout
  clearUserData(): void {
    this.usuarioSubject.next(null);
    this.idUserSubject.next(null);
    this.usernameSubject.next(null);
    this.roleSubject.next(null);
    this.rolesSubject.next([]);
  }
}