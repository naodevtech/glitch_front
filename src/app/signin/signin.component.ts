import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
	email: string;
	password: string;
	message: string;

	constructor(public router: Router, private http: HttpClient) {}

	ngOnInit(): void {}

	login() {
		this.http
			.post(`${environment.apiUrl}api/signin`, {
				email: this.email,
				password: this.password,
			})
			.subscribe(
				(response) => {
					console.log(response);
					this.router.navigate(['/feed']);
				},
				(err) => {
					console.log(err);
					this.message = err.error.error;
				}
			);
	}
}
