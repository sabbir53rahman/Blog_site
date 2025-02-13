'use client';
    
import { Provider } from 'react-redux';
import './globals.css';
import store from '@/redux/app/store';
import Navbar from '@/Compo/Navbar/Navbar';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar/>
          {children}
        </Provider>
        </body>
    </html>
  );
}
