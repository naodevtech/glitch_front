import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"],
})
export class FollowersComponent implements OnInit {
  followers;

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
      .get(`http://localhost:8000/api/users/${userId}/followers`, options)
      .subscribe((response) => {
        console.log(response);
        this.followers = response["followers"];
        console.log(this.followers);
      });
  }
}
