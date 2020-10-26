import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "../jwt.service";

@Component({
  selector: "app-compose-post",
  templateUrl: "./compose-post.component.html",
  styleUrls: ["./compose-post.component.scss"],
})
export class ComposePostComponent implements OnInit {
  post: string;
  userConnected;
  message: string = "Quoi de neuf?";
  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.userConnected = {
      id: localStorage.getItem("id"),
      avatar: localStorage.getItem("avatar"),
    };
    console.log(typeof this.userConnected);
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
          this.router.navigate(["/feed"]);
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            this.router.navigate(["/"]);
          } else if (error.status === 404) {
            this.message = error.error.error;
          }
        }
      );
  }

  returnToBackPage() {
    return this.router.navigate(["/feed"]);
  }
}
