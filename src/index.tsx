import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import App from './app';
import { store } from './redux/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
