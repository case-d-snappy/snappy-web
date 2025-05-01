import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <main className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">{error.message}</h1>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={resetErrorBoundary}>
            메인화면 이동
          </button>
        </main>
      )}
    >
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10A9FF]"></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
