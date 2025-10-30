import {
  membersContainer,
  memberCountInput,
  minusButton,
  controlsContainer
} from './domElements.js';
import { calculate } from './calculator.js';

function maintainButtonPosition(controls, targetAbsoluteTop) {
  if (!controls || targetAbsoluteTop === null) {
    return;
  }

  let attempts = 0;
  const maxAttempts = 15;
  let lastDiff = 0;

  function checkAndAdjust() {
    const rect = controls.getBoundingClientRect();
    const currentAbsoluteTop = rect.top + window.scrollY;
    const diff = currentAbsoluteTop - targetAbsoluteTop;

    if (Math.abs(diff) > 0.5 && attempts < maxAttempts) {
      window.scrollTo(0, window.scrollY + diff);
      attempts += 1;

      if (Math.abs(diff - lastDiff) > 0.1) {
        lastDiff = diff;
        requestAnimationFrame(checkAndAdjust);
      } else if (attempts < 5) {
        requestAnimationFrame(checkAndAdjust);
      }
    } else if (attempts < 3) {
      attempts += 1;
      requestAnimationFrame(checkAndAdjust);
    }
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      checkAndAdjust();
    });
  });
}

function getCurrentMemberCount() {
  return document.querySelectorAll('.member-card:not(.removing)').length;
}

function updateMinusButtonState() {
  minusButton.disabled = getCurrentMemberCount() === 0;
}

function updateMemberCountInput() {
  memberCountInput.value = getCurrentMemberCount();
  updateMinusButtonState();
}

function addMember(updateInput = true, shouldCalculate = true) {
  let buttonAbsoluteTopBeforeAdd = null;

  if (window.innerWidth <= 768 && controlsContainer) {
    const rect = controlsContainer.getBoundingClientRect();
    buttonAbsoluteTopBeforeAdd = rect.top + window.scrollY;
  }

  const currentCount = getCurrentMemberCount();
  const memberId = currentCount + 1;
  const card = document.createElement('div');
  card.className = 'member-card';
  card.innerHTML = `
                <input type="text" class="member-name" placeholder="成员 ${memberId}">
                <input type="number" class="member-time" placeholder="小时数" min="0" step="0.1">
                <div class="member-result">¥ 0.00</div>
            `;

  membersContainer.appendChild(card);

  if (updateInput) {
    updateMemberCountInput();
  }

  if (shouldCalculate) {
    calculate();
  }

  if (window.innerWidth <= 768 && controlsContainer && buttonAbsoluteTopBeforeAdd !== null) {
    maintainButtonPosition(controlsContainer, buttonAbsoluteTopBeforeAdd);
  }
}

function removeMember(updateInput = true, shouldCalculate = true) {
  const memberCards = document.querySelectorAll('.member-card:not(.removing)');

  if (memberCards.length === 0) {
    return;
  }

  let buttonAbsoluteTopBeforeRemove = null;

  if (window.innerWidth <= 768 && controlsContainer) {
    const rect = controlsContainer.getBoundingClientRect();
    buttonAbsoluteTopBeforeRemove = rect.top + window.scrollY;
  }

  const lastCard = memberCards[memberCards.length - 1];
  lastCard.classList.add('removing');

  if (updateInput) {
    updateMemberCountInput();
  }

  if (shouldCalculate) {
    calculate();
  }

  setTimeout(() => {
    lastCard.remove();

    if (window.innerWidth <= 768 && controlsContainer && buttonAbsoluteTopBeforeRemove !== null) {
      maintainButtonPosition(controlsContainer, buttonAbsoluteTopBeforeRemove);
    }
  }, 300);
}

function setMemberCount() {
  let targetCount = parseInt(memberCountInput.value, 10) || 0;

  if (targetCount < 0) targetCount = 0;
  if (targetCount > 99) targetCount = 99;
  memberCountInput.value = targetCount;

  const currentCount = getCurrentMemberCount();
  const difference = targetCount - currentCount;

  if (difference > 0) {
    for (let i = 0; i < difference; i += 1) {
      addMember(false, false);
    }
  } else if (difference < 0) {
    for (let i = 0; i < Math.abs(difference); i += 1) {
      removeMember(false, false);
    }
  }

  updateMemberCountInput();
  calculate();
}

function initializeMembers() {
  for (let i = 0; i < 5; i += 1) {
    addMember(false, false);
  }

  updateMemberCountInput();
  calculate();
}

export {
  addMember,
  removeMember,
  setMemberCount,
  initializeMembers
};

