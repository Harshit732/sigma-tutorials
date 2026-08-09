import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
