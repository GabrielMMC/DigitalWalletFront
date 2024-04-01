import CardConfig from "./CardConfig";

export const moneyMask = (value: number | string | undefined) => {
  if (!value) value = 0

  let sanitized = value.toString().replace(/\D/g, '');

  if (!sanitized) return '0,00'

  return (parseInt(sanitized) / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.');
}

export const moneyMaskBRL = (value: number | undefined) => {
  if (!value) value = 0
  return "R$ " + moneyMask(value);
}

export const numberMask = (value: number | null) => {
  if (!value) return ''
  return value.toString().replace(/\D/g, '')
}

export const toNumber = (value: number | null) => {
  if (!value) return 0
  return Number(value.toString().replace(/\D/g, ''))
}

export const expirationMask = (value: string) => {
  if (value.length > 5) return value.substring(0, 5)
  return value.substring(0, 4)
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{2})/g, "$1/$2")
}

export const documentMask = (value: string) => {
  if (!value) return ''
  value = value.replace(/\D/g, "");

  if (value.length <= 11) {
    return value.substring(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
  } else {
    return value.substring(0, 14)
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
  }
}

export const inputMoneyMask = (value: string) => {
  let sanitized = value.toString().replace(/\D/g, '');

  if (!sanitized) return 'R$ 0,00'

  return 'R$ ' + (parseInt(sanitized) / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.');
}


export const cardMask = (text: string) => {
  const card = new CardConfig();
  const sanitized = text.replace(/\D/g, '');
  let brand = '';
  let mask = '';
  let length = 0;
  let cvv = 0;

  for (const cardType of Object.values(card.type)) {
    if (sanitized.match(cardType.detector)) {
      brand = cardType.name;
      length = cardType.cardLength;
      cvv = cardType.cvcLength;

      let indexMask = 0;
      for (let i = 0; i < sanitized.length && i < length; i++) {
        if (!isNaN(parseInt(sanitized[i]))) {
          if (cardType.maskCC[indexMask] === ' ') {
            mask += ' ';
            indexMask++;
          }
          if (cardType.maskCC[indexMask] === '0') {
            mask += sanitized[i];
          }
          indexMask++;
        }
      }
      break;
    }
  }

  if (text.length <= 20 || !brand) {
    mask = text;
  }

  return { brand, mask, length, cvv, value: sanitized };
}