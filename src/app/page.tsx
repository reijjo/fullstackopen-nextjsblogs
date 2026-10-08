// @ts-expect-error MDX module declarations are provided by the Next.js build configuration.
import Homepage from "./homepage.mdx";

export default function Home() {
  return (
    <main className="markdown">
      <Homepage />
    </main>
  );
}
