import { extend } from 'vee-validate'

function trim (value) {
  return typeof value === 'string' ? value.trim() : value
}

extend('required', value => {
  const trimmed = trim(value)

  return ['', null, undefined].indexOf(trimmed) !== -1 ? 'Необходимо заполнить' : true
})

extend('max', (value, args) => {
  return value.trim().length <= args[0] ? true : `Не больше ${args[0]} символов`
})

extend('email', value => {
  const preg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const trimmed = trim(value) 
  
  return preg.test(trimmed) ? true : 'Неправильный email'
})
