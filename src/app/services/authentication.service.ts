import { Injectable } from '@angular/core';
import { User, AppUser } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User[]=[];
  authenticatedUser!: AppUser;
  constructor() { 
    this.user.push({userId : UUID.UUID(), username: 'admin', password: '1234', role: ['ADMIN']});
    this.user.push({userId : UUID.UUID(), username: 'user2', password: '1234', role: ['USER']});
    this.user.push({userId : UUID.UUID(), username: 'user1', password: '1234', role: ['USER']});
  }
public login(username: string, password: string): Observable<AppUser> {
    let appUser = this.user.find(u => u.username === username);
    if(!appUser) return throwError(() => new Error('Invalid credentials'));
    if(appUser.password !== password) {return throwError(() => new Error('Invalid password'));
    }
    return of(appUser);
  }

  public authenticateUser(appUser: AppUser): Observable<boolean> {
    this.authenticatedUser=appUser;
    localStorage.setItem("authUser", JSON.stringify({username:appUser.username, role:appUser.role, jwt:"JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role: string): boolean {
    return this.authenticatedUser?.role.includes(role);
  } 

  public isAuthenticated(): boolean {
    return this.authenticatedUser !=undefined;
  }
}
