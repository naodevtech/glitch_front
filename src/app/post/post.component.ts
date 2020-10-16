import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
	post;
	comments;
	constructor(
		public router: Router,
		private http: HttpClient,
		private jwtService: JwtService,
		private routerActivate: ActivatedRoute
	) {}

	ngOnInit(): void {
		const options = this.jwtService.loggedIn();
		const postId = this.routerActivate.snapshot.params.id;
		this.http
			.get(`http://localhost:8000/api/posts/${postId}`, options)
			.subscribe(
				(response) => {
					console.log(response);
					this.post = response;
				},
				(error) => {
					console.log(error);
				}
			);
		this.http
			.get(`http://localhost:8000/api/posts/${postId}/comments`, options)
			.subscribe(
				(response) => {
					console.log(response);
					this.comments = response['comments'];
				},
				(error) => {
					console.log(error);
				}
			);
	}

	returnToBackPage() {
		return this.router.navigate(['/feed']);
	}
}
