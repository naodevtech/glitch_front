import { Component, OnInit } from "@angular/core";
import { Router, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  id: string;
  avatar: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.avatar = localStorage.getItem("avatar");
    this.id = localStorage.getItem("id");
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.id}`]);
  }
}
