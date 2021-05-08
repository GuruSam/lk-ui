<template>
  <div>
    <form ref="authForm" method="post" action="https://playlabirint.ru/game/login/login">
      <input type="hidden" name="login" :value="character.name" />
      <input type="hidden" name="password" :value="character.password" />
      <input type="hidden" name="remember" value="1" />
      <input type="hidden" name="logout" value="1" />
      <input type="hidden" name="_xfRedirect" value="https://playlabirint.ru/game" />
      <input type="hidden" name="_xfToken" value="1620461050,09b979c1da62bb10b98dbe1a9d6f9d1e" />
    </form>
    <a href="#" class="btn btn-sm btn-primary rounded-pill mr-2" @click="loginCharacter"><i class="ion ion-md-key"></i>&nbsp; Авторизоваться</a>
    <a 
      href="#" 
      class="btn btn-sm rounded-pill" 
      :class="{ 'btn-success' : pwdCopied }"
      @click="copyPassword"
    >
      <i class="ion mr-1" :class="pwdCopied ? 'ion-md-checkmark' : 'ion-md-copy'"></i>
      {{ pwdCopied ? 'Пароль скопирован' : 'Скопировать пароль' }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'auth-buttons',
  props: ['character'],
  data: () => ({
    pwdCopied: false,
    timeout: null
  }),
  methods: {
    loginCharacter () {
      this.$refs.authForm.submit()
    },
    copyPassword (evt) {
      evt.preventDefault()
      
      navigator.clipboard.writeText(this.character.password)
        .then(() => {
          this.pwdCopied = true

          if (this.timeout) {
            clearTimeout(this.timeout)
          }

          this.timeout = setTimeout(() => {
            this.pwdCopied = false
          }, 5000);
        })
    }
  }
}
</script>
