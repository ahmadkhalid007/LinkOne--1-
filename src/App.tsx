import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AppealTypes } from './components/AppealTypes';
import { StatusTracking } from './components/StatusTracking';
import { ContactUs } from './components/ContactUs';
import { About } from './components/About';
import { Footer } from './components/LinkOneFooter';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { AdminLogin } from './components/AdminLogin';
import { AdminSignup } from './components/AdminSignup';
import { AdminDashboard } from './components/AdminDashboard';
import { Dialog, DialogContent, DialogTitle } from './components/ui/dialog';

function AppContent() {
  const [currentSection, setCurrentSection] = useState<'home' | 'appeal' | 'status' | 'contact' | 'about' | 'admin'>('home');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authType, setAuthType] = useState<'student' | 'admin'>('student');
  const { isAdmin } = useAuth();

  const handleOpenAuth = (mode: 'login' | 'signup', type: 'student' | 'admin' = 'student') => {
    setAuthMode(mode);
    setAuthType(type);
    setAuthDialogOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthDialogOpen(false);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentSection={currentSection} 
        onNavigate={setCurrentSection}
        onOpenAuth={handleOpenAuth}
      />
      
      {currentSection === 'home' && (
        <>
          <Hero onGetStarted={() => setCurrentSection('appeal')} />
          <AppealTypes onSelectAppeal={() => setCurrentSection('appeal')} />
        </>
      )}
      
      {currentSection === 'appeal' && <AppealTypes onSelectAppeal={() => {}} />}
      {currentSection === 'status' && <StatusTracking />}
      {currentSection === 'contact' && <ContactUs />}
      {currentSection === 'about' && <About />}
      {currentSection === 'admin' && isAdmin && <AdminDashboard />}
      
      <Footer onNavigate={setCurrentSection} />

      {/* Auth Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogTitle className="sr-only">
            {authType === 'admin' 
              ? (authMode === 'login' ? 'Admin Login' : 'Admin Signup')
              : (authMode === 'login' ? 'Login to Link One' : 'Sign up for Link One')
            }
          </DialogTitle>
          {authType === 'admin' ? (
            authMode === 'login' ? (
              <AdminLogin 
                onSwitchToSignup={handleSwitchAuthMode}
                onClose={handleCloseAuth}
              />
            ) : (
              <AdminSignup 
                onSwitchToLogin={handleSwitchAuthMode}
                onClose={handleCloseAuth}
              />
            )
          ) : (
            authMode === 'login' ? (
              <Login 
                onSwitchToSignup={handleSwitchAuthMode}
                onClose={handleCloseAuth}
              />
            ) : (
              <Signup 
                onSwitchToLogin={handleSwitchAuthMode}
                onClose={handleCloseAuth}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
