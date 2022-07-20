import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";
import { sessionStorage } from "~/session.server";
import crypto from 'crypto-js';

export async function action({ request }: ActionArgs) {
  await authenticator.authenticate("email-link", request, {
    successRedirect: "__tests/login",
    failureRedirect: "__tests/login",
  });
}

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/me",
  });
  let session = await sessionStorage.getSession(request.headers.get("Cookie"));
  let magicLink: string | undefined = undefined;
  if (session.has("auth:magiclink")) {
    magicLink = session.get("auth:magiclink") as string;
  }

  return json({ magicLink }, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    }
  });
}

export default function TestLogin() {
  const { magicLink } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Test Login</h1>
      {magicLink && (
        <div>
          <Link to={`/magic?token=${magicLink}`} target="_blank">Click me</Link>
        </div>
      )}
      <Form method="post">
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </p>
        <button>Login</button>
      </Form>
    </div>
  );
}
