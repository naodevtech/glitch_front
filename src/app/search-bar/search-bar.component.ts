import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "../jwt.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  searchTerm: string;
  usersFound: any[];
  placeholder: string;

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.placeholder = "Rechercher sur #Glitch";
  }

  handleChangeInputSearch() {
    const options = this.jwtService.loggedIn();

    this.http
      .get(
        `http://localhost:8000/api/users?searchTerm=${this.searchTerm}`,
        options
      )
      .subscribe(
        (response) => {
          this.usersFound = response["userExist"];
          console.log(this.usersFound);
        },
        (error) => {
          console.log(error);
          this.placeholder = error.error.error;
        }
      );
  }
}
