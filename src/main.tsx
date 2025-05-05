import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './utils/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <ThemeProvider >
        <App />
      </ThemeProvider>
    </Provider>
  // </StrictMode>,
)
