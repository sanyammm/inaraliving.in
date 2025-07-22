import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { RoomsPage } from "./pages/RoomsPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";
// import { useAuth } from "./lib/auth";
import { AmenitiesPage } from "./pages/AmenitiesPage";
import { AboutPage } from "./pages/AboutPage";
import { ScrollToTop } from "./components/ScrollToTop"; // Import ScrollToTop
import { HouseRulesPage } from "./pages/HouseRulesPage";
import { ReferEarnPage } from "./pages/ReferEarnPage";
import { ExploreRoomPage } from "./pages/ExploreRoomPage";
import LeadCaptureModal from "./components/LeadCaptureModal";

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   return user?.isAuthenticated ? (
//     <>{children}</>
//   ) : (
//     <Navigate to="/admin/login" />
//   );
// }

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Layout>
      <LeadCaptureModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/explore/:roomId" element={<ExploreRoomPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rules" element={<HouseRulesPage />} />
          <Route path="/refer" element={<ReferEarnPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
