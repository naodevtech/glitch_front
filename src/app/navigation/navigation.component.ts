import { Component, OnInit } from "@angular/core";
import { JwtService } from "../jwt.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  avatar: string;

  constructor(private JwtService: JwtService, public router: Router) {}

  ngOnInit(): void {
    this.avatar = localStorage.getItem("avatar");
  }

  disconnect() {
    this.JwtService.logout();
    this.router.navigate(["/"]);
  }

  goToFeed() {
    return this.router.navigate(["/feed"]);
  }
}
