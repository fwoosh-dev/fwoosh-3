import { DocList } from "../../components/DocList";

type RootLayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside>
        <DocList />
      </aside>
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        {children}
      </main>
    </div>
  );
}
