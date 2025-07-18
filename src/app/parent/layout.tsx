

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <main className="flex-1">
            {children}
        </main>
    </div>
  );
}
