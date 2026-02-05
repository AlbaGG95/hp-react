import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./styles/app.css";

export default function App() {
  return (
    <div className="app app-shell">
      <main className="app-main">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
