import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { JwtService } from "../jwt.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  message: string;
  registerForm: FormGroup;

  constructor(
    public router: Router,
    private http: HttpClient,
    private jwtService: JwtService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      lastname: [""],
      firstname: [""],
      username: [""],
      email: [""],
      password: [""],
      confirmPassword: [""],
      avatar: [""],
    });

    this.avatar =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg/1200px-Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg";
  }

  register() {
    const formData = new FormData();
    formData.append("lastname", this.registerForm.get("lastname").value);
    formData.append("firstname", this.registerForm.get("firstname").value);
    formData.append("username", this.registerForm.get("username").value);
    formData.append("email", this.registerForm.get("email").value);
    formData.append("password", this.registerForm.get("password").value);
    formData.append(
      "confirmPassword",
      this.registerForm.get("confirmPassword").value
    );
    formData.append("avatar", this.registerForm.get("avatar").value);

    this.http.post("http://localhost:8000/api/signup", formData).subscribe(
      (response) => {
        if (
          this.registerForm.get("password").value !==
          this.registerForm.get("confirmPassword").value
        ) {
          return (this.message =
            "Les deux mots de passe doivent être identiques ❌ ");
        } else {
          this.jwtService
            .login({
              email: response["newSubscriber"].email,
              password: this.registerForm.get("password").value,
            })
            .subscribe((response) => {
              localStorage.setItem("token", response["token"]);
              localStorage.setItem("id", response["userConnected"].id);
              localStorage.setItem(
                "firstname",
                response["userConnected"].firstname
              );
              localStorage.setItem(
                "lastname",
                response["userConnected"].lastname
              );
              localStorage.setItem("avatar", response["userConnected"].avatar);
              return this.router.navigate(["/"]);
            });
        }
      },
      (error) => {
        console.log(error);
        this.message = error.error.error;
      }
    );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get("avatar").setValue(file);
      this.avatar = "http://localhost:8000/api/" + event.target.files[0].name;
      console.log(this.registerForm);
    } else {
      return this.registerForm
        .get("avatar")
        .setValue(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg/1200px-Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg"
        );
    }
  }
}
