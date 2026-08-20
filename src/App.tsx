import { DemoPanel } from "./ui/components/DemoPanel";

/**
 * App root.
 *
 * Just composes the (dumb) demo panel, passing the project identity down from
 * the scaffold context. No business logic here — that lives in `src/core`.
 */
export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full">
        <DemoPanel
          projectName="Build A Markdown Notes App With Tags And Search"
          owner="AntonLapshin"
          repo="build-a-markdown-notes-app-with-tags-and-search"
          description="Build a markdown notes app with tags and search"
        />
      </div>
    </main>
  );
}
