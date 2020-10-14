import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class JwtService {
	constructor(public router: Router, private http: HttpClient) {}

	login(credentials) {
		console.log(credentials);
		return this.http.post(`${environment.apiUrl}api/signin`, credentials);
	}

	loggedIn() {
		const token = localStorage.getItem('token');
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: token,
		});
		let options = { headers: headers };
		return options;
	}

	logout() {
		return localStorage.removeItem('token');
	}
}
