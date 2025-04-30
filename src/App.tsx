import Header from 'components/Header';
import Intro from 'components/Intro';
import { ScrollHint } from 'components/ScrollHint';
import { lazy } from 'react';
import { GlobalPortal } from 'utils/GlobalPortal';

const Concept = lazy(() => import('components/Concept'));
const Strengths = lazy(() => import('components/Strengths'));
const Subscription = lazy(() => import('components/Subscription'));
const Footer = lazy(() => import('components/Footer'));
const GetStarted = lazy(() => import('components/GetStarted'));

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <GlobalPortal.Provider>
      <Header />
      <main className="flex flex-col flex-1 overflow-hidden -mt-20">
        <Intro />
        <Concept />
        <Strengths />
        <Subscription />
        <GetStarted />
      </main>
      <Footer />
      <ScrollHint />
    </GlobalPortal.Provider>
  );
}
