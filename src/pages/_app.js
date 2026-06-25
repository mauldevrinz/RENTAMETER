// ========================================
// PAGES / _app.js
// Global App Configuration
// ========================================

import { useEffect } from 'react' // Tambahkan import ini
import Head from 'next/head'       // Tambahkan import ini untuk meta tag
import { GoogleOAuthProvider } from '@react-oauth/google'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'

export default function App({ Component, pageProps }) {
  
  useEffect(() => {
    // Fungsi untuk membatasi tombol shortcut zoom (Ctrl + / Ctrl - / Ctrl 0)
    const handleKeyDown = (e) => {
      if (
        e.ctrlKey && 
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
      ) {
        e.preventDefault();
      }
    };

    // Fungsi untuk membatasi zoom menggunakan scroll mouse + Ctrl
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Pasang event listener ke dokumen
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    // Membersihkan event listener saat komponen tidak lagi digunakan
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'placeholder-client-id.apps.googleusercontent.com'}>
      <Head>
        {/* Meta tag untuk mematikan zoom di perangkat mobile/layar sentuh */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" 
        />
      </Head>
      <Component {...pageProps} />
      <ChatWidget />
    </GoogleOAuthProvider>
  );
}