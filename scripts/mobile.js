import { memberCountInput } from './domElements.js';

export function setupMobileMemberCountInput() {
  const isMobile = 'ontouchstart' in window;

  if (!isMobile) {
    return;
  }

  memberCountInput.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
  }, { passive: false });
}

