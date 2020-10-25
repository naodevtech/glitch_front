import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { JwtService } from "../jwt.service";
import { GlitchService } from "../_services/glitch.service";

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
  usersLikedPost: any[];

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService,
    private routerActivate: ActivatedRoute,
    private glitchServices: GlitchService
  ) {}

  ngOnInit(): void {
    const options = this.jwtService.loggedIn();
    const postId = this.routerActivate.snapshot.params.id;
    this.http
      .get(`http://localhost:8000/api/posts/${postId}`, options)
      .subscribe(
        (response) => {
          console.log(response);
          this.post = response;
          this.getComments(this.post.id, options);
        },
        (error) => {
          console.log(error);
        }
      );

    this.getLikes(postId, options)
      .then((response) => {
        this.usersLikedPost = response["likes"];
        this.usersLikedPost.map((user) => {
          console.log(user);

          if (user.Likes.userId == parseInt(localStorage.getItem("id"))) {
            this.btnValue = "Je n'aime plus";
          } else {
            this.btnValue = "J'aime";
          }
        });
        console.log(this.usersLikedPost);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  returnToBackPage() {
    return this.router.navigate(["/feed"]);
  }

  getComments(postId, options) {
    this.http
      .get(`http://localhost:8000/api/posts/${postId}/comments`, options)
      .subscribe(
        (response) => {
          console.log(response);
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
          console.log(response);
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

  addLike(postId: number) {
    const options = this.jwtService.loggedIn();
    return this.http
      .post(`http://localhost:8000/api/post/${postId}/likes`, {}, options)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
      });
  }

  getLikes(postId, options) {
    return this.glitchServices.getPostLikesById(postId, options);
  }
}
