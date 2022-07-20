import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  await authenticator.authenticate("email-link", request, {
    successRedirect: "/me",
    failureRedirect: "/__tests/login",
  });
}
