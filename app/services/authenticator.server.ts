import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/session.server";
import type { User } from "~/models/user.server";
import { getUserByEmail } from "~/models/user.server";
import type { SendEmailFunction } from "remix-auth-email-link";
import { EmailLinkStrategy } from "remix-auth-email-link";

let sendEmail: SendEmailFunction<User> = async (options) => {
  await Promise.resolve();
};

let secret = "SECRET";

let authenticator = new Authenticator<User>(sessionStorage);

let validateSessionMagicLink = true;

authenticator.use(
  new EmailLinkStrategy<User>(
    { sendEmail, secret, validateSessionMagicLink },
    async ({ email }) => {
      const user = await getUserByEmail(email);
      if (!user) throw new AuthorizationError("No User");
      return user;
    }
  )
);

export { authenticator };
