import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams/:teamId" element={<TeamPage />} />
          <Route path="/teams/:teamId/players/:playerId" element={<PlayerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
