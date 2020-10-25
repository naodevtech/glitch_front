import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { FeedComponent } from "./feed/feed.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { TabBarComponent } from "./tab-bar/tab-bar.component";
import { BtnPostComponent } from "./btn-post/btn-post.component";
import { ComposePostComponent } from "./compose-post/compose-post.component";
import { ProfileComponent } from "./profile/profile.component";
import { PostComponent } from "./post/post.component";
import { GlitchService } from "./_services/glitch.service";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { LikesComponent } from "./likes/likes.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    FeedComponent,
    NavigationComponent,
    SearchBarComponent,
    TabBarComponent,
    BtnPostComponent,
    ComposePostComponent,
    ProfileComponent,
    PostComponent,
    SideBarComponent,
    LikesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [GlitchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
