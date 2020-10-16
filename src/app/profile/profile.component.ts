import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	user;
	posts;
	constructor(
		public router: Router,
		private routerActivate: ActivatedRoute,
		private http: HttpClient,
		private jwtService: JwtService
	) {}

	ngOnInit(): void {
		const options = this.jwtService.loggedIn();
		const id = this.routerActivate.snapshot.params.id;

		this.http.get(`http://localhost:8000/api/users/${id}`, options).subscribe(
			(response) => {
				console.log(response);
				this.user = response;
			},
			(error) => {
				console.log(error);
			}
		);

		this.http
			.get(`http://localhost:8000/api/users/${id}/posts`, options)
			.subscribe(
				(response) => {
					console.log(response);
					this.posts = response['posts'];
				},
				(error) => {
					console.log(error);
				}
			);
	}

	goToPost(postId) {
		return this.router.navigate([`/post/${postId}`]);
	}
}
