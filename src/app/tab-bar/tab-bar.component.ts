import { Component, OnInit } from "@angular/core";
import { Router, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-tab-bar",
  templateUrl: "./tab-bar.component.html",
  styleUrls: ["./tab-bar.component.scss"],
})
export class TabBarComponent implements OnInit {
  avatar: string;
  id: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.avatar = localStorage.getItem("avatar");
    this.id = localStorage.getItem("id");
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.id}`]);
  }
}
