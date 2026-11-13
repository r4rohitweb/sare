import { useLayoutEffect, useRef } from 'react';
import { initializeExperience } from './experience/index.js';
import IconLibrary from './components/IconLibrary.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Archive from './components/Archive.jsx';
import TryTheLook from './components/TryTheLook.jsx';
import PickASilk from './components/PickASilk.jsx';
import TheRack from './components/TheRack.jsx';
import FestiveSilks from './components/FestiveSilks.jsx';
import TheMuse from './components/TheMuse.jsx';
import SilkInMotion from './components/SilkInMotion.jsx';
import BridalCollection from './components/BridalCollection.jsx';
import TheWeave from './components/TheWeave.jsx';
import Footer from './components/Footer.jsx';
import Ticker from './components/Ticker.jsx';
import Dialogs from './components/Dialogs.jsx';

export default function App() {
  const root = useRef(null);
  useLayoutEffect(() => initializeExperience(root.current), []);

  return (
    <div ref={root} className="site-root">
      <a className="skip-link" href="#main">
        {"Skip to content"}
      </a>
      <IconLibrary />
      <div className="curtain-intro" aria-hidden="true">
        <div className="curtain curtain-left"></div>
        <div className="curtain curtain-right"></div>
        <div className="intro-brand">
          <svg>
            <use href="#lotus"></use>
          </svg>
          <span>
            {"NOOLAM"}
          </span>
          <small>
            {"A THREAD OF TRADITION"}
          </small>
        </div>
      </div>
      <button className="skip-intro" type="button">
        {"Skip intro "}
        <span>
          {"↗"}
        </span>
      </button>
      <Header />
      <main id="main">
        <Hero />
        <Archive />
        <TryTheLook />
        <PickASilk />
        <TheRack />
        <FestiveSilks />
        <TheMuse />
        <SilkInMotion />
        <BridalCollection />
        <TheWeave />
      </main>
      <Footer />
      <Ticker />
      <div className="notice" role="status" aria-live="polite">
        <span></span>
        <button type="button" aria-label="Dismiss notification">
          {"×"}
        </button>
      </div>
      <Dialogs />
    </div>
  );
}
