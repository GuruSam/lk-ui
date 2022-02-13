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
