import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { JwtService } from "../jwt.service";

@Component({
  selector: "app-posts-trend-list",
  templateUrl: "./posts-trend-list.component.html",
  styleUrls: ["./posts-trend-list.component.scss"],
})
export class PostsTrendListComponent implements OnInit {
  videoGame;
  APIKEY: string = "2be47f3b2b1448b395fa5f780887a524";
  posts: any[];

  constructor(
    private http: HttpClient,
    public router: Router,
    public routerActivate: ActivatedRoute,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    const gameId = this.routerActivate.snapshot.params.trendGame;
    const options = this.jwtService.loggedIn();

    this.http
      .get(`https://api.rawg.io/api/games/${gameId}?key=${this.APIKEY}`)
      .subscribe((response) => {
        this.videoGame = response;
        if (this.videoGame) {
          this.getPostOfTrend(options);
        }
      });
  }

  getPostOfTrend(options) {
    const trend = `${this.videoGame.slug}`;
    this.http
      .get(`http://localhost:8000/api/trends?trendGame=${trend}`, options)
      .subscribe(
        (response) => {
          return (this.posts = response["posts"]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToPost(postId) {
    return this.router.navigate([`/post/${postId}`]);
  }
}
