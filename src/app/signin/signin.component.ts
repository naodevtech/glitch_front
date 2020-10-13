import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
	email: string;
	password: string;
	message: string;
	constructor(public router: Router, private JwtService: JwtService) {}

	ngOnInit(): void {}

	signin() {
		const credentials = {
			email: this.email,
			password: this.password,
		};
		this.JwtService.login(credentials).subscribe((response) => {
			const token = response['token'];
			const link = ['feed'];
			localStorage.setItem('token', token);
			this.router.navigate(link);
		});
	}
}
