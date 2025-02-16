import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/App';
import store from './store/store';
import './main_global.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
