import 'index.css';
import 'utils/i18n';

import App from 'App';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Loading from 'utils/Loading';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
);
