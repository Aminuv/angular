import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.scss'
})
export class AdminTemplateComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: (data: boolean) => {
        this.router.navigate(['/login']);
        // Handle successful logout
      },
      error: (error: any) => {
        console.error('Logout failed:', error);
      }
    });
  }
}

