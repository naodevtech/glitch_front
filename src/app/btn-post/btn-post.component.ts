import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-btn-post',
	templateUrl: './btn-post.component.html',
	styleUrls: ['./btn-post.component.scss'],
})
export class BtnPostComponent implements OnInit {
	constructor(public router: Router, jwtService: JwtService) {}

	ngOnInit(): void {}

	composePost() {
		return this.router.navigate(['/compose/post']);
	}
}
