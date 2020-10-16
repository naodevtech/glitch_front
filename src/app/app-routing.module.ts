import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposePostComponent } from './compose-post/compose-post.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
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
	{
		path: 'compose/post',
		component: ComposePostComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'profile/:id',
		component: ProfileComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'post/:id',
		component: PostComponent,
		pathMatch: 'prefix',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
