import Intro from 'components/Intro';
import { ScrollHint } from 'components/ScrollHint';
import { lazy } from 'react';
import { GlobalPortal } from 'utils/GlobalPortal';

const Concept = lazy(() => import('components/Concept'));
const Strengths = lazy(() => import('components/Strengths'));
const Subscription = lazy(() => import('components/Subscription'));
const Footer = lazy(() => import('components/Footer'));

export default function App() {
  return (
    <GlobalPortal.Provider>
      <main className="flex flex-col flex-1 overflow-hidden">
        <Intro />
        <Concept />
        <Strengths />
        <Subscription />
        <Footer />
      </main>
      <ScrollHint />
    </GlobalPortal.Provider>
  );
}
