import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

	constructor(public router: Router, private http: HttpClient) {}

	ngOnInit(): void {
		const token = 'Bearer ' + localStorage.getItem('token');
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: token,
		});
		let options = { headers: headers };
		this.http.get('http://localhost:8000/api/posts', options).subscribe(
			(response) => {
				this.posts = response['allPosts'];
				console.log(this.posts);
			},
			(error) => {
				console.log(error);
				this.router.navigate(['/']);
			}
		);
	}
}
