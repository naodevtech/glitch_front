import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { JwtService } from "../jwt.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  message: string;

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {}

  register() {
    this.http
      .post("http://localhost:8000/api/signup", {
        lastname: this.lastname,
        firstname: this.firstname,
        username: this.username,
        email: this.email,
        password: this.password,
        avatar: this.avatar,
      })
      .subscribe(
        (response) => {
          if (this.password !== this.confirmPassword) {
            return (this.message =
              "Les deux mots de passe doivent être identiques ❌ ");
          } else {
            this.jwtService
              .login({
                email: response["newSubscriber"].email,
                password: this.password,
              })
              .subscribe((response) => {
                localStorage.setItem("token", response["token"]);
                localStorage.setItem("id", response["userConnected"].id);
                localStorage.setItem(
                  "firstname",
                  response["userConnected"].firstname
                );
                localStorage.setItem(
                  "lastname",
                  response["userConnected"].lastname
                );
                localStorage.setItem(
                  "avatar",
                  response["userConnected"].avatar
                );
                return this.router.navigate(["/"]);
              });
          }
        },
        (error) => {
          console.log(error);
          this.message = error.error.error;
        }
      );
  }
}
