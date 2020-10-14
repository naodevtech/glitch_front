import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FeedComponent } from './feed/feed.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
	declarations: [AppComponent, SignupComponent, SigninComponent, FeedComponent, NavigationComponent, SearchBarComponent, TabBarComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		// JwtModule.forRoot({
		// 	config: {
		// 		tokenGetter: () => {
		// 			return localStorage.getItem('access_token');
		// 		},
		// 		allowedDomains: ['localhost:4200'],
		// 		disallowedRoutes: ['http://example.com/examplebadroute/'],
		// 	},
		// }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
