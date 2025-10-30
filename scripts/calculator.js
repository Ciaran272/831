import { totalAmountInput } from './domElements.js';

function validateNumberInput(input) {
  const value = parseFloat(input.value);

  if (Number.isNaN(value) || value < 0) {
    input.value = '';
    return 0;
  }

  return value;
}

export function calculate() {
  const totalAmount = validateNumberInput(totalAmountInput);
  const memberCards = document.querySelectorAll('.member-card:not(.removing)');
  let totalHours = 0;
  const memberData = [];

  memberCards.forEach((card) => {
    const timeInput = card.querySelector('.member-time');
    const resultElement = card.querySelector('.member-result');
    const hours = validateNumberInput(timeInput);

    memberData.push({ hours, resultElement });
    totalHours += hours;
  });

  const costPerHour = totalAmount > 0 && totalHours > 0 ? totalAmount / totalHours : 0;

  memberData.forEach(({ hours, resultElement }) => {
    const memberCost = hours * costPerHour;
    const display = memberCost === 0
      ? '0.00'
      : memberCost.toFixed(2).replace(/\.00$/, '');

    resultElement.textContent = `¥ ${display}`;
  });
}

