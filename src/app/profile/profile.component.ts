import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user;
  posts;
  displayBtn: boolean;
  followValue: string;
  followers: any[];
  followings: any[];

  constructor(
    public router: Router,
    private routerActivate: ActivatedRoute,
    private http: HttpClient,
    private jwtService: JwtService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const id: string = this.routerActivate.snapshot.params.id;

    this.displayingBtn();

    this.followValue = "Follow";

    this.http.get(`http://localhost:8000/api/users/${id}`, options).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.getFollowersByUserId(id, options);

    this.http
      .get(`http://localhost:8000/api/users/${id}/posts`, options)
      .subscribe(
        (response) => {
          console.log(response);
          this.posts = response["posts"];
        },
        (error) => {
          console.log(error);
          this.router.navigate(["/"]);
        }
      );
  }

  goToPost(postId) {
    return this.router.navigate([`/post/${postId}`]);
  }

  toggleFollow() {
    const options = this.jwtService.loggedIn();
    const userId = this.routerActivate.snapshot.params.id;
    this.http
      .post(`http://localhost:8000/api/users/${userId}/follows`, {}, options)
      .subscribe(
        (response) => {
          console.log(response);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  displayingBtn() {
    const id = localStorage.getItem("id");
    const profileId = this.routerActivate.snapshot.params.id;
    if (id == profileId) {
      this.displayBtn = true;
    } else {
      this.displayBtn = false;
    }
  }

  getFollowersByUserId(userId, options) {
    return this.http
      .get(`http://localhost:8000/api/users/${userId}/followers`, options)
      .subscribe((followers) => {
        console.log(followers);
        this.followers = followers["followers"];
        if (this.followers.length > 0) {
          this.followers.map((follower) => {
            console.log(follower.followerId);
            if (follower.followerId == localStorage.getItem("id")) {
              this.followValue = "Unfollow";
              console.log(this.followValue);
            }
          });
        }
      });
  }

  returnToBackPage() {
    return this._location.back();
  }

  showFollowersUser(userId: number) {
    return this.router.navigate([`/profile/${userId}/followers`]);
  }

  showFollowingsUser(userId: number) {
    return this.router.navigate([`/profile/${userId}/followings`]);
  }

  goToUpdateProfile(userId: number) {
    return this.router.navigate([`/profile/${userId}/update`]);
  }
}
