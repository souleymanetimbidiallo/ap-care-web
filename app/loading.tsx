export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12" aria-busy="true" aria-label="Chargement">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 w-64 rounded bg-slate-200" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="h-72 rounded-2xl bg-slate-200" />)}
        </div>
      </div>
    </main>
  );
}
