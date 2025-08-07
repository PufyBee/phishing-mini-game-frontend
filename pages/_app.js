// phishing-mini-game/frontend/pages/_app.js
import '../styles/globals.css';

/**  
 * Wraps every page; imports your global Tailwind CSS.  
 */
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
