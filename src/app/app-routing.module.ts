import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComposePostComponent } from "./compose-post/compose-post.component";
import { FeedComponent } from "./feed/feed.component";
import { FollowersComponent } from "./followers/followers.component";
import { FollowingsComponent } from "./followings/followings.component";
import { LikesComponent } from "./likes/likes.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PostComponent } from "./post/post.component";
import { ProfileComponent } from "./profile/profile.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { TrendsComponent } from "./trends/trends.component";

const routes: Routes = [
  {
    path: "",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: "prefix",
  },
  {
    path: "feed",
    component: FeedComponent,
    pathMatch: "prefix",
  },
  {
    path: "compose/post",
    component: ComposePostComponent,
    pathMatch: "prefix",
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    pathMatch: "prefix",
  },
  {
    path: "post/:id",
    component: PostComponent,
    pathMatch: "prefix",
  },
  {
    path: "post/:id/likes",
    component: LikesComponent,
    pathMatch: "prefix",
  },
  {
    path: "profile/:id/notifications",
    component: NotificationsComponent,
    pathMatch: "prefix",
  },
  {
    path: "profile/:id/followers",
    component: FollowersComponent,
    pathMatch: "prefix",
  },
  {
    path: "profile/:id/followings",
    component: FollowingsComponent,
    pathMatch: "prefix",
  },
  {
    path: "trends",
    component: TrendsComponent,
    pathMatch: "prefix",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
