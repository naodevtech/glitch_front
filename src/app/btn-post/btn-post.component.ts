import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-btn-post",
  templateUrl: "./btn-post.component.html",
  styleUrls: ["./btn-post.component.scss"],
})
export class BtnPostComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  composePost() {
    return this.router.navigate(["/compose/post"]);
  }
}
