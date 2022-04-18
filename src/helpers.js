function declOfNum (number, phrases) {
  switch (true) {
    case number % 10 === 1 && number !== 11:
      return phrases[0]
  
    case number > 1 && number < 5:
      return phrases[1]

    default:
      return phrases[2]
  }
}

function generateString (length) {
  const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const symLength = symbols.length
  
  let string = ''

  for (let i = 0; i < length; i++) {
    string += symbols[Math.floor(Math.random() * symLength)]
  }

  return string
}

function getNPCMarkup (data) {
  return `- **Имя**:  ${data.name}
    - **Роль**:  ${data.role}
    - **Класс**: ${data.class}
    - **День рождения**: ${data.birthday}
    - **Рост**: ${data.growth}
    - **Характер**: ${data.character}
    - **Особые приметы**: ${data.signs}
    - **Уровень физической подготовки**: ${data.physics}
    - **Уровень доступа**: ${data.access}`
}

export { declOfNum, generateString, getNPCMarkup }
