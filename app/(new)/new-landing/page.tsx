import { redirect } from "next/navigation";

// This page's content now lives at the site root ("/").
// Kept as a redirect so old links/bookmarks to /new-landing still resolve.
export default function NewLandingRedirect() {
  redirect("/");
}
