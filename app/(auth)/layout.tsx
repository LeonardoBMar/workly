import Header from '../components/layout/Header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-blue-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-purple-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>

        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}
