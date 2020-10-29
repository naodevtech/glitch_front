import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-followings",
  templateUrl: "./followings.component.html",
  styleUrls: ["./followings.component.scss"],
})
export class FollowingsComponent implements OnInit {
  followings;

  constructor(
    public router: Router,
    private routerActivate: ActivatedRoute,
    private glitchServices: GlitchService,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const userId = this.routerActivate.snapshot.params.id;

    this.http
      .get(`http://localhost:8000/api/users/${userId}/followings`, options)
      .subscribe((response) => {
        console.log(response);
        this.followings = response["followings"];
        console.log(this.followings);
      });
  }

  goToProfile(idProfile: string) {
    return this.router.navigate([`/profile/${idProfile}`]);
  }
}
