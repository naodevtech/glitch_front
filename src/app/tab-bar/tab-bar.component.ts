import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tab-bar',
	templateUrl: './tab-bar.component.html',
	styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {
	avatar: string;
	id: string;

	constructor(public router: Router) {}

	ngOnInit(): void {
		this.avatar = localStorage.getItem('avatar');
	}

	goToProfile() {
		// debug route on all pages
		this.id = localStorage.getItem('id');
		console.log(this.id);
		this.router.navigate([`/profile/${this.id}`]);
	}

	goToFeed() {
		return this.router.navigate(['/feed']);
	}
}
