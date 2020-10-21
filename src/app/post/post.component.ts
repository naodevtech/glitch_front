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
	comment: string;
	message: string = 'Commenter ce post...';

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
					this.sortComments(this.comments);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	returnToBackPage() {
		return this.router.navigate(['/feed']);
	}

	addComment() {
		const options = this.jwtService.loggedIn();
		const postId = this.routerActivate.snapshot.params.id;
		this.http
			.post(
				`http://localhost:8000/api/posts/${postId}/comments`,
				{
					content: this.comment,
				},
				options
			)
			.subscribe(
				(response) => {
					console.log(response);
					this.ngOnInit();
					this.comment = '';
				},
				(error) => {
					console.log(error);
					this.message = error.error.error;
				}
			);
	}

	sortComments(comments) {
		return comments.sort((a, b) => {
			return (
				<any>new Date(b.Comments.createdAt) -
				<any>new Date(a.Comments.createdAt)
			);
		});
	}

	goToProfile(idProfile: string) {
		return this.router.navigate([`/profile/${idProfile}`]);
	}
}
