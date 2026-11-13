import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../src/App.jsx';
import '../../src/styles.css';

// Test-only entry point: exercise a complete unmount and subsequent mount.
let root;
window.showroomFixture = {
  mount() {
    root = createRoot(document.getElementById('root'));
    root.render(<StrictMode><App /></StrictMode>);
  },
  unmount() { root.unmount(); },
};
window.showroomFixture.mount();
