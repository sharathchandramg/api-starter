export class Config {
  public static get port(): number {
    return parseInt(process.env["PORT"]);
  }

  public static get public_key(): string {
    return process.env.PUBLIC_KEY;
  }

  public static get refresh_token_secret(): string {
    return process.env.REFRESHTOKEN_SECRET;
  }

  public static get access_token_secret(): string {
    return process.env.ACCESSTOKEN_SECRET;
  }

  public static get token_expiration_in_minutes(): number {
    return parseInt(process.env.TOKEN_EXPIRATION_IN_MINS);
  }
}
