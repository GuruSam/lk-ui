import { extend } from 'vee-validate'

extend('required', value => {
  const trimmed = typeof value === 'string' ? value.trim() : value

  return ['', null, undefined].indexOf(trimmed) !== -1 ? 'Необходимо заполнить' : true
})

extend('max', (value, args) => {
  return value.trim().length <= args[0] ? true : `Не больше ${args[0]} символов`
})
