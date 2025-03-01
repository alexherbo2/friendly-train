// This module contains the code to interpret the “manual.html” buttons,
// and documenting physical keys.

import messages from './messages.js'

/**
 * Gets the localized string for the specified message.
 *
 * @param {string} messageName
 * @param {string[]} substitutions
 * @returns {string}
 */
function getLocalizedMessage(messageName, substitutions) {
  return messages[document.documentElement.lang][messageName].apply(substitutions)
}

const buttonElements = document.querySelectorAll('button[data-action]')
const keyCodeElements = document.querySelectorAll('kbd.code')

const keyboardLayoutMap = navigator.keyboard
  ? await navigator.keyboard.getLayoutMap()
  : new Map

for (const buttonElement of buttonElements) {
  const actionName = buttonElement.dataset.action

  switch (actionName) {
    case 'copyToClipboard':
      buttonElement.addEventListener('click', () => {
        navigator.clipboard
          .writeText(buttonElement.value)
          .then(() => {
            buttonElement.textContent = buttonElement.dataset.copyFeedback
            setTimeout(() => {
              buttonElement.textContent = buttonElement.ariaLabel
            }, 1000)
          })
      })
      break

    default:
      console.error(
        'Unknown action: "%s"',
        actionName
      )
  }
}

for (const keyElement of keyCodeElements) {
  const codeValue = keyElement.textContent
  if (keyboardLayoutMap.has(codeValue)) {
    const keyValue = keyboardLayoutMap.get(codeValue)
    keyElement.replaceWith(
      createPopover(
        new Text(
          getLocalizedMessage('keyCodeValuePopover', [keyValue])
        ),
        keyElement
      )
    )
  } else {
    keyElement.replaceWith(
      createPopover(
        new Text(
          getLocalizedMessage('noKeyCodeValuePopover', [codeValue])
        ),
        keyElement
      )
    )
  }
}

/**
 * Adds a popover to the given element.
 * Display additional information when clicking on the element.
 *
 * @param {Node} content
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
function createPopover(content, element) {
  const popoverElement = document.createElement('div')
  popoverElement.popover = 'auto'
  popoverElement.append(content)
  const buttonElement = document.createElement('button')
  buttonElement.popoverTargetElement = popoverElement
  buttonElement.append(
    element.cloneNode(true),
    popoverElement
  )
  return buttonElement
}
