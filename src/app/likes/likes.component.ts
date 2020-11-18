import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-likes",
  templateUrl: "./likes.component.html",
  styleUrls: ["./likes.component.scss"],
})
export class LikesComponent implements OnInit {
  usersLikedPost: any[];

  constructor(
    public router: Router,
    private routerActivate: ActivatedRoute,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const postId: string = this.routerActivate.snapshot.params.id;

    this.getLikes(postId, options);
  }

  getLikes(postId, options) {
    this.http
      .get(`http://localhost:8000/api/post/${postId}/likes`, options)
      .subscribe((response) => {
        this.usersLikedPost = response["likes"];
      });
  }
}
