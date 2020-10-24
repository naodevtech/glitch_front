import { map, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlitchService {
	constructor(private http: HttpClient) {}

	async getAllPosts(options): Promise<any> {
		return this.http
			.get('http://localhost:8000/api/posts', options)
			.toPromise()
			.then((response) => {
				return response;
			});
	}

	async postLike(id, options): Promise<any> {
		return this.http
			.post(`http://localhost:8000/api/post/${id}/likes`, {}, options)
			.toPromise()
			.then((response) => {
				console.log(response);
			}).catch((error) => {
				console.log(error);
			})
	}
	
}
