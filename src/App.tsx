import Intro from 'components/Intro';
import { ScrollHint } from 'components/ScrollHint';
import { lazy } from 'react';
import { GlobalPortal } from 'utils/GlobalPortal';

const Strengths = lazy(() => import('components/Strengths'));

export default function App() {
  return (
    <GlobalPortal.Provider>
      <main className="flex flex-col flex-1 overflow-hidden">
        <Intro />
        <Strengths />
      </main>
      <ScrollHint />
    </GlobalPortal.Provider>
  );
}
