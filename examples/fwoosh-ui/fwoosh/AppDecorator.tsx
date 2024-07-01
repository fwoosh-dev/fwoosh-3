export default function AppDecorator({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="app">{children}</div>;
}
