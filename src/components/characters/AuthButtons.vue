<template>
  <div>
    <form ref="authForm" method="post" action="https://playlabirint.ru/game/login/login">
      <input type="hidden" name="login" :value="character.name || character.username" />
      <input type="hidden" name="password" :value="character.password" />
      <input type="hidden" name="remember" value="1" />
      <input type="hidden" name="logout" value="1" />
      <input type="hidden" name="_xfRedirect" value="https://playlabirint.ru/game" />
      <input type="hidden" name="_xfToken" :value="xfToken" />
    </form>

    <button class="btn btn-primary btn-sm rounded-pill login-btn" type="button" :disabled="submit" @click="loginCharacter">
      <div v-if="!submit">
        <i class="ion ion-md-key"></i>
        &nbsp; Войти
      </div>
      <span v-else aria-hidden="true" class="spinner-border" />
    </button>

    <button class="btn btn-sm rounded-pill" :class="{'btn-success' : pwdCopied}" @click="copyPassword">
      <i class="ion mr-1" :class="pwdCopied ? 'ion-md-checkmark' : 'ion-md-copy'"></i>
      {{ pwdCopied ? 'Пароль скопирован' : 'Копировать пароль' }}
    </button>
  </div>
</template>

<script>
import { authService } from '@/services'

export default {
  name: 'AuthButtons',
  props: ['character'],
  data: () => ({
    pwdCopied: false,
    timeout: null,
    xfToken: null,
    submit: false
  }),
  methods: {
    loginCharacter () {
      this.submit = true

      authService.getXfToken()
        .then(({ data }) => {
          this.xfToken = data.token
          this.$nextTick(function () {
            this.$refs.authForm.submit()
          })
        })
        .finally(() => this.submit = false)
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

<style>
.login-btn {
  min-width: 75px;
}
</style>
