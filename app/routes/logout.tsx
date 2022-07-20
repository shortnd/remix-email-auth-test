import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/authenticator.server";

export async function action({ request }: ActionArgs) {
  return authenticator.logout(request, {
    redirectTo: "/login",
  });
}

export async function loader() {
  return redirect("/");
}
