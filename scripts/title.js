import { titleElement, titleEditor } from './domElements.js';

export function editTitle() {
  titleElement.style.display = 'none';
  titleEditor.style.display = 'inline-block';
  titleEditor.value = titleElement.textContent;
  adjustEditorWidth();
  titleEditor.focus();
  titleEditor.select();
}

export function saveTitle() {
  titleElement.textContent = titleEditor.value.trim() || 'AA是好文明';
  titleEditor.style.display = 'none';
  titleElement.style.display = 'inline-block';
}

export function handleTitleKeypress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.blur();
  } else if (event.key === 'Escape') {
    titleEditor.style.display = 'none';
    titleElement.style.display = 'inline-block';
  }

  setTimeout(adjustEditorWidth, 0);
}

export function adjustEditorWidth() {
  const tempSpan = document.createElement('span');
  const computedStyle = window.getComputedStyle(titleEditor);

  Object.assign(tempSpan.style, {
    visibility: 'hidden',
    position: 'absolute',
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily,
    fontWeight: computedStyle.fontWeight
  });

  tempSpan.textContent = titleEditor.value || '占位文本';
  document.body.appendChild(tempSpan);
  const textWidth = tempSpan.offsetWidth + 40;
  document.body.removeChild(tempSpan);

  titleEditor.style.width = `${Math.max(200, Math.min(textWidth, window.innerWidth * 0.8))}px`;
}

