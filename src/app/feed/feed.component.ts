import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

export interface Post {
	allPosts: [
		{
			Posts: {
				userId: Number;
				content: String;
				createdAt: String;
			};
			avatar: string;
			username: string;
		}
	];
}

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
	posts: Post;
	userConnected;

	constructor(
		public router: Router,
		private http: HttpClient,
		private JwtService: JwtService
	) {}

	ngOnInit(): void {
		this.userConnected = {
			id: localStorage.getItem('id'),
			firstname: localStorage.getItem('firstname'),
			avatar: localStorage.getItem('avatar'),
		};
		const options = this.JwtService.loggedIn();
		console.log(options);
		this.http.get('http://localhost:8000/api/posts', options).subscribe(
			(response) => {
				this.posts = response['allPosts'].reverse();
				console.log(this.posts);
			},
			(error) => {
				console.log(error);
				this.router.navigate(['/']);
			}
		);
	}
}
