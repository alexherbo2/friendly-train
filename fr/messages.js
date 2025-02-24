export default {
  keyCodeValuePopoverTemplate: keyValue => (
    `« ${keyValue} » sur votre clavier.`
  ),
  noKeyCodeValuePopoverTemplate: codeValue => (
    `Aucune valeur trouvée pour « ${codeValue} ».`
  ),
}
