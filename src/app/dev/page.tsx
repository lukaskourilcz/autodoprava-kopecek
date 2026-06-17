import DevApp from "./DevApp";

export const metadata = {
  title: "Editor obsahu — Autodoprava Kopeček",
  // Keep the editor out of search engines.
  robots: { index: false, follow: false },
};

export default function DevPage() {
  return <DevApp />;
}
