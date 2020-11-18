import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-followings",
  templateUrl: "./followings.component.html",
  styleUrls: ["./followings.component.scss"],
})
export class FollowingsComponent implements OnInit {
  followings: any[];

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
      .get(`http://localhost:8000/api/users/${userId}/followings`, options)
      .subscribe((response) => {
        this.followings = response["followings"];
      });
  }

  goToProfile(idProfile: string) {
    return this.router.navigate([`/profile/${idProfile}`]);
  }
}
