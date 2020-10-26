import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";

export interface Post {
  allPosts: [
    {
      Posts: {
        userId: Number;
        content: String;
        createdAt: String;
      };
      avatar: string;
      username: string;
    }
  ];
}

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  posts: any[];
  numberLikesOfPost: number;
  userConnected = {
    id: parseInt(localStorage.getItem("id")),
    username: localStorage.getItem("username"),
    avatar: localStorage.getItem("avatar"),
  };
  post: string;
  message: string;

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService,
    private glitchService: GlitchService
  ) {}

  ngOnInit(): void {
    console.log(this.userConnected);

    const options = this.jwtService.loggedIn();
    this.glitchService
      .getAllPosts(options)
      .then((response) => {
        this.posts = response["allPosts"];
        console.log(this.posts);
        this.sortPosts(this.posts);
      })
      .catch((error) => {
        console.log(error);
        this.router.navigate(["/"]);
      });
  }

  sortPosts(posts) {
    return posts.sort((a, b) => {
      return (
        <any>new Date(b.Posts.createdAt) - <any>new Date(a.Posts.createdAt)
      );
    });
  }

  async toggleLike(id) {
    const options = this.jwtService.loggedIn();
    await this.glitchService.postLike(id, options);
  }

  goToPost(postId) {
    return this.router.navigate([`/post/${postId}`]);
  }

  addPost() {
    const options = this.jwtService.loggedIn();
    this.http
      .post(
        "http://localhost:8000/api/posts",
        {
          content: this.post,
        },
        options
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
          this.message = error.error.error;
        }
      );
  }
}
