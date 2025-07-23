export default function MainLayout({ children }) {
  return (
    <main className="relative h-screen">
      <div>{children}</div>
    </main>
  );
}
