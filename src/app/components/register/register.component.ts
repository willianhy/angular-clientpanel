import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
    .then(res => {
      this.flashMessagesService.show('You are now registered and logged in', {cssClas: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessagesService.show(err.message, {cssClas: 'alert-danger', timeout: 4000});
    });
  }

}
