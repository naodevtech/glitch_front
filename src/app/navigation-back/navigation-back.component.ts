import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-navigation-back",
  templateUrl: "./navigation-back.component.html",
  styleUrls: ["./navigation-back.component.scss"],
})
export class NavigationBackComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit(): void {}

  returnToBackPage() {
    return this._location.back();
  }
}
