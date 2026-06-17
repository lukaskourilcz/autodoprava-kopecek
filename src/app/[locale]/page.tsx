import LocalePage from "./LocalePage";

// Only the locales from the parent layout's generateStaticParams are built.
export const dynamicParams = false;

export default function Page() {
  return <LocalePage />;
}
