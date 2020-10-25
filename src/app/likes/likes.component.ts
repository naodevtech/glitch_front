import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";
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
    private glitchServices: GlitchService,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const postId = this.routerActivate.snapshot.params.id;
    console.log(postId);

    this.http
      .get(`http://localhost:8000/api/post/${postId}/likes`, options)
      .subscribe((response) => {
        console.log(response);
        this.usersLikedPost = response["likes"];
        console.log(this.usersLikedPost);
      });
  }

  getLikes(postId, options) {
    return this.glitchServices.getPostLikesById(postId, options);
  }
}
