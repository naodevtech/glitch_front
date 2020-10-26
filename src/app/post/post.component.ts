import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { JwtService } from "../jwt.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  post;
  comments;
  comment: string;
  message: string = "Commenter ce post...";
  btnValue: string;
  btnColor: string;
  usersLikedPost: any[];
  postId = this.routerActivate.snapshot.params.id;

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService,
    private routerActivate: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();

    this.btnValue = "J'aime";
    this.btnColor = "white";

    this.http
      .get(`http://localhost:8000/api/posts/${this.postId}`, options)
      .subscribe(
        (response) => {
          this.post = response;
          console.log(this.post);
          this.getComments(this.postId, options);
        },
        (error) => {
          console.log(error);
        }
      );

    this.http
      .get(`http://localhost:8000/api/post/${this.postId}/likes`, options)
      .subscribe((response) => {
        this.usersLikedPost = response["likes"];
        console.log(this.usersLikedPost);
        if (this.usersLikedPost) {
          return this.usersLikedPost.map((userLiked) => {
            console.log(userLiked);
            if (userLiked.Likes.userId == localStorage.getItem("id")) {
              console.log("match");
              this.btnValue = "Je n'aime plus";
              this.btnColor = "red";
              return console.log(this.btnValue);
            }
          });
        }
      });
  }

  returnToBackPage() {
    return this._location.back();
  }

  goToLikesPage() {
    this.router.navigate([`/post/${this.postId}/likes`]);
  }

  getComments(postId, options) {
    this.http
      .get(`http://localhost:8000/api/posts/${postId}/comments`, options)
      .subscribe(
        (response) => {
          this.comments = response["comments"];
          this.sortComments(this.comments);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addComment() {
    const options = this.jwtService.loggedIn();
    const postId = this.routerActivate.snapshot.params.id;
    this.http
      .post(
        `http://localhost:8000/api/posts/${postId}/comments`,
        {
          content: this.comment,
        },
        options
      )
      .subscribe(
        (response) => {
          this.ngOnInit();
          this.comment = "";
        },
        (error) => {
          console.log(error);
          this.message = error.error.error;
        }
      );
  }

  sortComments(comments) {
    return comments.sort((a, b) => {
      return (
        <any>new Date(b.Comments.createdAt) -
        <any>new Date(a.Comments.createdAt)
      );
    });
  }

  goToProfile(idProfile: string) {
    return this.router.navigate([`/profile/${idProfile}`]);
  }

  addLike() {
    const options = this.jwtService.loggedIn();
    const postId = parseInt(this.routerActivate.snapshot.params.id);
    console.log(postId);
    return this.http
      .post(`http://localhost:8000/api/post/${postId}/likes`, {}, options)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
      });
  }
}
