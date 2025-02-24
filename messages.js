export default {
  keyCodeValuePopoverTemplate: keyValue => (
    `“${keyValue}” on your keyboard.`
  ),
  noKeyCodeValuePopoverTemplate: codeValue => (
    `No value found for “${codeValue}”.`
  ),
}
