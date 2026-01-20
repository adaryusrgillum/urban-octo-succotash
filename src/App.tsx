import { useEffect } from 'react';
import './App.css';
import WebGLBackground from './components/WebGLBackground';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Works from './sections/Works';
import Services from './sections/Services';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black-soft noise">
      {/* WebGL Background */}
      <WebGLBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <Works />
        <About />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
