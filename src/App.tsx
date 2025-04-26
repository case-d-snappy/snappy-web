import { GlobalPortal } from 'utils/GlobalPortal';

export default function App() {
  return (
    <GlobalPortal.Provider>
      <main className="h-screen bg-[#131E28] flex-1">
        <section className="flex flex-col items-center justify-center px-7 py-25 h-full w-full">
          <img src="/snappy.svg" alt="Snappy Logo" className="w-32 h-32" />
          <h1 className="text-5xl font-extrabold text-[#F0EDE5]">Snappy</h1>
        </section>
      </main>
    </GlobalPortal.Provider>
  );
}
