import { useState } from 'react';
import { useReveals } from './hooks/motion.js';
import Sprite from './components/Sprite.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Kitchen from './components/Kitchen.jsx';
import Gallery from './components/Gallery.jsx';
import Guests from './components/Guests.jsx';
import Visit from './components/Visit.jsx';
import Closing from './components/Closing.jsx';
import Footer from './components/Footer.jsx';
import ActionBar from './components/ActionBar.jsx';

export default function App() {
  // Everything behind the overlay nav is inert while it is open (keeps focus inside header + nav)
  const [menuOpen, setMenuOpen] = useState(false);
  useReveals();

  return (
    <>
      <Sprite />
      <a className="skip-link" href="#main" inert={menuOpen}>Skip to content</a>

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main" inert={menuOpen}>
        <Hero />
        <Story />
        <Kitchen />
        <Gallery />
        <Guests />
        <Visit />
        <Closing />
      </main>

      <Footer inert={menuOpen} />
      <ActionBar inert={menuOpen} />
    </>
  );
}
