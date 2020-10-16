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
	posts: any[];
	userConnected;
	numberLikesOfPost: number;

	constructor(
		public router: Router,
		private http: HttpClient,
		private JwtService: JwtService
	) {}

	ngOnInit(): void {
		const options = this.JwtService.loggedIn();
		console.log(options);
		this.http.get('http://localhost:8000/api/posts', options).subscribe(
			(response) => {
				this.posts = response['allPosts'];
				console.log(this.posts);
				this.sortPosts(this.posts);
			},
			(error) => {
				console.log(error);
				this.router.navigate(['/']);
			}
		);
	}

	sortPosts(posts) {
		return posts.sort((a, b) => {
			return (
				<any>new Date(b.Posts.createdAt) - <any>new Date(a.Posts.createdAt)
			);
		});
	}

	async toggleLike(id) {
		const options = this.JwtService.loggedIn();
		console.log(options);
		await this.http
			.post(`http://localhost:8000/api/post/${id}/likes`, {}, options)
			.subscribe(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
	}
}
