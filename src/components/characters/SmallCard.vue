<template>
  <b-col xl="4" lg="12" md="6" sm="12">
    <div class="card card-bordered mb-4">
      <div class="card-body">
        <div class="media">
          <img 
            :src="character.avatar" 
            alt="avatar" 
            class="rounded-circle" 
            :class="isXlEntered ? 'ui-w-80' : 'ui-w-100'"
          />
          <div class="media-body pt-2 ml-3">
            <h5 class="mb-2" :class="{ 'text-large' : !isXlEntered }">{{ character.name }}</h5>
            <div class="text-success text-big mb-2">{{ status }}</div>
          </div>
        </div>
      </div>
      <div class="card-footer py-3">
        <form ref="authForm" method="post" action="https://playlabirint.ru/game/login/login">
          <input type="hidden" name="login" :value="character.name" />
          <input type="hidden" name="password" :value="character.password" />
          <input type="hidden" name="remember" value="1" />
          <input type="hidden" name="logout" value="1" />
          <input type="hidden" name="_xfRedirect" value="https://playlabirint.ru/game" />
          <input type="hidden" name="_xfToken" value="1620461050,09b979c1da62bb10b98dbe1a9d6f9d1e" />
        </form>
        <a href="#" class="btn btn-sm btn-primary rounded-pill" @click="loginCharacter"><i class="ion ion-md-key"></i>&nbsp; Авторизоваться</a>
        &nbsp;
        <a 
          href="#" 
          class="btn btn-sm rounded-pill" 
          :class="{ 'btn-success' : pwdCopied }"
          @click="copyPassword"
        >
          <i class="ion" :class="pwdCopied ? 'ion-md-checkmark' : 'ion-md-copy'"></i>
          &nbsp; Скопировать пароль
        </a>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'small-card',
  props: {
    character: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    const xlBreakpoint = matchMedia('(max-width: 1500px) and (min-width: 1200px)')

    return {
      xlBreakpoint,
      isXlEntered: xlBreakpoint.matches,
      pwdCopied: false
    }
  },
  mounted () {
    this.xlBreakpoint.addEventListener('change', () => {
      this.isXlEntered = this.xlBreakpoint.matches
    })
  },
  computed: {
    status () {
      switch (this.character.status) {
        case 0:
          return 'Вне игры'
        case 1: 
          return 'В игре'
        case 2:
          return 'Недоступен'
        default:
          return 'Неизвестно'
      }
    }
  },
  methods: {
    loginCharacter () {
      this.$refs.authForm.submit()
    },
    copyPassword () {
      navigator.clipboard.writeText(this.character.password)
        .then(() => {
          this.pwdCopied = true

          setTimeout(() => {
            this.pwdCopied = false
          }, 10000);
        })
    }
  }
}
</script>

