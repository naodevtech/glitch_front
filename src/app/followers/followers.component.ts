import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"],
})
export class FollowersComponent implements OnInit {
  followers: any[];

  constructor(
    public router: Router,
    private routerActivate: ActivatedRoute,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const userId: string = this.routerActivate.snapshot.params.id;

    this.http
      .get(`http://localhost:8000/api/users/${userId}/followers`, options)
      .subscribe((response) => {
        this.followers = response["followers"];
      });
  }

  goToProfile(idProfile: string) {
    return this.router.navigate([`/profile/${idProfile}`]);
  }
}
