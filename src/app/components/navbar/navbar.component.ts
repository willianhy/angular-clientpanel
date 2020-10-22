import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggerIn?: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggerIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggerIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out', {
      cssClass: 'alert-success', timetout: 4000
    });
    this.router.navigate(['/login']);
  }

}
