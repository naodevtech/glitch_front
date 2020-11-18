import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.scss"],
})
export class TrendsComponent implements OnInit {
  APIKEY: string = "2be47f3b2b1448b395fa5f780887a524";
  videoGamesTrends: any[];

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit(): void {
    this.http
      .get(
        `https://api.rawg.io/api/games?key=${this.APIKEY}&dates=2019-10-10,2020-10-10&ordering=-added`
      )
      .subscribe((response) => {
        this.videoGamesTrends = response["results"];
      });
  }

  goToPostsTrend(gameId: number) {
    this.router.navigate([`trends/${gameId}/posts`]);
  }
}
