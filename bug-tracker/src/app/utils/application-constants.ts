
export class ApplicationConstants{

  // Routes
  public static readonly homeRoute = "home";
  public static readonly signInRoute = "signIn";
  public static readonly signOutRoute = "signOut";

  // Tokens
  public static readonly token = "token";
  public static readonly email = "email";

  //API
  public static readonly api = 'http://localhost:8080';
  public static readonly headers = { 'content-type': 'application/json'} ;
  public static readonly apiSignUp = "/users/signUp";
  public static readonly apiSignIn = "/users/signIn";
  public static readonly apiUsers = "/users/details";

}
