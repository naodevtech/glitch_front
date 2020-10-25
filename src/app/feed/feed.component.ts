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

  constructor(
    public router: Router,
    private http: HttpClient,
    private JwtService: JwtService,
    private glitchService: GlitchService
  ) {}

  ngOnInit(): void {
    const options = this.JwtService.loggedIn();
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
    const options = this.JwtService.loggedIn();
    await this.glitchService.postLike(id, options);
  }

  goToPost(postId) {
    return this.router.navigate([`/post/${postId}`]);
  }

  getLikesOfPostById() {
    const options = this.JwtService.loggedIn();
  }
}
