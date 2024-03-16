export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
    </div>
  );
}
