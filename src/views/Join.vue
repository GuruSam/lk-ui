<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <PlanetCard>
          <template #header>
            <h1 class="card-title display-4 mb-2 mt-3">Добро пожаловать в Лабиринт!</h1>
            <p class="card-text text-muted info-header_quote">Среди далёких галактик затерялся неприметный мир под названием Иртмис...</p>
          </template>

          <template #content>
            <div class="text-justify">
              <p class="card-text">Ролевая игра - это отличная возможность почувствовать себя на месте другого человека, посмотреть на мир его глазами, прожить его собственную интересную и неповторимую жизнь, воплотить свои фантазии, развить воображение. Вместе с другими игроками творите судьбы своих персонажей, встречайтесь, влюбляйтесь, раскрывайте тайны игрового мира и плетите интриги.</p>
              <p class="card-text">Основные события разворачиваются в Атлантисе (также известном как Шестиградье) - содружестве Шести Городов, столицей которого является Бриджпорт - шумный мегаполис, пестрящий неоновыми вывесками. Если бешеный ритм большого города вам не по душе, всегда можно отправиться в прибрежный Исла Парадисо, насладиться горячими источниками и прекрасными пейзажами Авроры Скайс, окунутся в туманы загадочного Мунлайт Фоллз или же обосноваться в Твинбруке, городе озёр, болот и гиблых топей. А может вы найдёте уютным один из заброшенных особняков Миднайт Холлоу? Главное, не пропасть без следа, как исчез известный блоггер Оливер Спектр. Выбор за вами!</p>
              <p class="card-text">В игре есть не только люди, но и сверхъестественные персонажи: маги, оборотни, вампиры и даже крылатые. Магическая система позволяет прокачивать способности по мере игры, постепенно усиливая вашего персонажа.</p>
              <p class="card-text">Вы можете начать игру гостем или сразу создать полноценного персонажа.</p>
            </div>

            <div class="text-center">
              <p class="lead mt-4">Кем вы хотите начать игру?</p>
              <button type="button" class="btn btn-lg rounded-pill btn-primary mr-2" @click="onGuestSelect">Гость </button>
              <button type="button" class="btn btn-lg rounded-pill btn-primary" @click="onCharacterSelect">Персонаж </button>
            </div>

            <transition name="slide">
              <div v-if="infoOpened" class="mt-4 text-center">
                <div v-if="showGuestInfo">
                  <p class="text-justify">
                    <span class="text-primary">Гость</span> или <span class="text-primary">пробный персонаж</span> - легкий способ войти в игру, не продумывая и не заполняя детальную анкету. Он даёт возможность попробовать себя в ролевой и прочувствовать персонажа. Но у него есть ряд ограничений: статус гостя в Лабиринте, невозможность иметь собственную тему с жильём, инициироваться и развивать магические способности. Пробного персонажа можно перевести в полноценного в любой момент, если нет лимита, либо по достижении им 500 постов (после чего игра за пробного персонажа становится невозможной).
                  </p>

                  <router-link to="/join/guest" class="btn rounded-pill btn-primary">Продолжить</router-link>
                </div>
                <div v-if="showCharacterInfo">
                  <p class="text-justify">
                    <span class="text-primary">Обычный персонаж</span> - полноправный участник ролевой, который может использовать все ее возможности. Таких персонажей у вас может быть 4, каждого последующего вы сможете завести не раньше, чем через год после предыдущего.
                  </p>

                  <router-link to="/join/character" class="btn rounded-pill btn-primary">Продолжить</router-link>
                </div>
              </div>
            </transition>
          </template>
        </PlanetCard>
      </div>
    </div>
  </div>
</template>

<script>
import PlanetCard from '@/components/PlanetCard'

export default {
  name: 'WelcomeScreen',

  components: { PlanetCard },

  data: () => ({
    infoOpened: false,
    showGuestInfo: false,
    showCharacterInfo: false
  }),

  methods: {
    onGuestSelect () {
      if (!this.infoOpened) {
        this.infoOpened = true
      }

      this.showGuestInfo = true
      this.showCharacterInfo = false
    },

    onCharacterSelect () {
      this.showCharacterInfo = true
      this.showGuestInfo = false

      if (!this.infoOpened) {
        this.infoOpened = true
      }
    }
  }
}
</script>

<style>
.info-header_quote {
  font-size: 15px;
  font-weight: 300;
}

.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-out;
}
</style>
