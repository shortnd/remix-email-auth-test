import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/__tests/login",
  });
  return json({ user });
}

export default function Me() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome {user.id}</h1>
      <p>You are logged in as {user.email}</p>
      <Form method="post" action="/logout">
        <button>Logout</button>
      </Form>
    </div>
  );
}
