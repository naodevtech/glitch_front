import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
	{
		path: '',
		component: SigninComponent,
	},
	{
		path: 'signup',
		component: SignupComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'feed',
		component: FeedComponent,
		pathMatch: 'prefix',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
