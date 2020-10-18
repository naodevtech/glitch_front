import { map, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlitchService {
	constructor(private http: HttpClient) {}

	getAllPosts(options): Promise<any> {
		return this.http
			.get('http://localhost:8000/api/posts', options)
			.toPromise()
			.then((response) => {
				return response;
			});
	}
}
