import {
  membersContainer,
  totalAmountInput,
  memberCountInput,
  minusButton,
  plusButton,
  titleElement,
  titleEditor
} from './domElements.js';
import { debounce } from './utils.js';
import { calculate } from './calculator.js';
import {
  addMember,
  removeMember,
  setMemberCount,
  initializeMembers
} from './members.js';
import {
  editTitle,
  saveTitle,
  handleTitleKeypress,
  adjustEditorWidth
} from './title.js';
import { setupMobileMemberCountInput } from './mobile.js';

function initializeEventListeners() {
  const debouncedCalculate = debounce(calculate, 150);

  totalAmountInput.addEventListener('input', debouncedCalculate);

  membersContainer.addEventListener('input', (event) => {
    if (event.target?.classList.contains('member-time')) {
      debouncedCalculate();
    }
  });

  titleElement.addEventListener('click', editTitle);
  titleEditor.addEventListener('blur', saveTitle);
  titleEditor.addEventListener('keydown', handleTitleKeypress);
  titleEditor.addEventListener('input', adjustEditorWidth);

  memberCountInput.addEventListener('change', setMemberCount);
  memberCountInput.addEventListener('focus', (event) => {
    const input = event.target;
    setTimeout(() => input.select(), 0);
  });
  memberCountInput.addEventListener('click', (event) => {
    const input = event.target;
    setTimeout(() => input.select(), 0);
  });

  minusButton.addEventListener('click', () => removeMember());
  plusButton.addEventListener('click', () => addMember());

  setupMobileMemberCountInput();
}

function initializeApp() {
  initializeMembers();
  initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initializeApp);

