import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService } from "../jwt.service";

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
    const credentials = {
      email: this.email,
      password: this.password,
    };
    this.JwtService.login(credentials).subscribe(
      (response) => {
        console.log(response["userConnected"]);

        const token = "Bearer " + response["token"];
        const id = response["userConnected"].id;
        const firstname = response["userConnected"].firstname;
        const lastname = response["userConnected"].lastname;
        const username = response["userConnected"].username;
        const avatar = response["userConnected"].avatar;
        const link = ["feed"];
        // à opti
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        this.router.navigate(link);
      },
      (error) => {
        this.message = error.error.error;
      }
    );
  }
}
