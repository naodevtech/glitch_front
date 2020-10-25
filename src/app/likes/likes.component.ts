import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";
import { Router, ActivatedRoute } from "@angular/router";

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
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const postId = this.routerActivate.snapshot.params.id;
    this.getLikes(postId, options)
      .then((response) => {
        this.usersLikedPost = response["likes"];
        console.log(this.usersLikedPost);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getLikes(postId, options) {
    return this.glitchServices.getPostLikesById(postId, options);
  }
}
