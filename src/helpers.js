export function declOfNum (number, phrases) {
  switch (true) {
    case number % 10 === 1 && number !== 11:
      return phrases[0]
  
    case number > 1 && number < 5:
      return phrases[1]

    default:
      return phrases[2]
  }
}

export function generateString (length) {
  const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const symLength = symbols.length
  
  let string = ''

  for (let i = 0; i < length; i++) {
    string += symbols[Math.floor(Math.random() * symLength)]
  }

  return string
}
