import { Authenticator } from "remix-auth";
import { EmailLinkStrategy } from "remix-auth-email-link";
import { User } from "~/models/user.server";
import { sessionStorage } from "~/session.server";

let testAuthenticator = new Authenticator<User>(sessionStorage);

// testAuthenticator.use(new EmailLinkStrategy<User>({ sendEmail }))
