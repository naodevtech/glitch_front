import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	avatar: string;

	constructor(
		private location: Location,
		private JwtService: JwtService,
		public router: Router
	) {}

	ngOnInit(): void {
		this.avatar = localStorage.getItem('avatar');
		console.log(location.pathname);
	}

	disconnect() {
		const link = ['/'];
		this.JwtService.logout();
		this.router.navigate(link);
	}
}
