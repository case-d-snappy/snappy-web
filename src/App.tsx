import Intro from 'components/Intro';
import { ScrollHint } from 'components/ScrollHint';
import { GlobalPortal } from 'utils/GlobalPortal';

export default function App() {
  return (
    <GlobalPortal.Provider>
      <main className="flex flex-col flex-1 overflow-hidden">
        <Intro />
      </main>
      <ScrollHint />
    </GlobalPortal.Provider>
  );
}
