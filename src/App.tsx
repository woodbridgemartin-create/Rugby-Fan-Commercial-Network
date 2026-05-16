import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import ClubsPage from './pages/ClubsPage';
import BusinessNetworkPage from './pages/BusinessNetworkPage';
import BusinessRegistrationPage from './pages/BusinessRegistrationPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import ClubRegistrationPage from './pages/ClubRegistrationPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/business-network" element={<BusinessNetworkPage />} />
          <Route path="/business-registration" element={<BusinessRegistrationPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/club-registration" element={<ClubRegistrationPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
