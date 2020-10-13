import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
	constructor(public router: Router, private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get('http://localhost:8000/api/posts').subscribe(
			(response) => {
				console.log(response);
			},
			(error) => {
				this.router.navigate(['/']);
			}
		);
	}
}
