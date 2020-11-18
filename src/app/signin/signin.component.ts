import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService } from "../jwt.service";

export interface Credentials {
  email: string;
  password: string;
}
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  message: string;

  constructor(public router: Router, private JwtService: JwtService) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  signin() {
    const credentials: Credentials = {
      email: this.email,
      password: this.password,
    };

    this.JwtService.login(credentials).subscribe(
      (response) => {
        const token: string = "Bearer " + response["token"];
        const id = response["userConnected"].id;
        const firstname = response["userConnected"].firstname;
        const lastname = response["userConnected"].lastname;
        const username = response["userConnected"].username;
        const avatar = response["userConnected"].avatar;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        this.router.navigate(["feed"]);
      },
      (error) => {
        this.message = error.error.error;
      }
    );
  }
}
