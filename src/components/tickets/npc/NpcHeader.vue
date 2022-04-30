<template>
  <div class="mb-4 npc-header magic-type" :class="typeClass">
    <div class="media col-md-10 col-lg-8 col-xl-7 p-4 align-items-center">
      <img class="d-block ui-w-100 rounded-circle" :src="'https://playlabirint.ru' + data.avatar" alt="Аватар персонажа.">

      <div class="media-body ml-5">
        <h2 class="h4 font-weight-bold mb-2">{{ data.name }}</h2>
        <div class="text-big character-role mb-2">{{ data.role }}</div>
        <div class="text-big" :class="statusColor">{{ status }}</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NpcHeader',

  props: {
    data: Object
  },

  data: () => ({
    classOptions: {
      1: 'type-human',
      2: 'type-mage',
      3: 'type-vampire',
      4: 'type-vampire',
      5: 'type-winged',
      6: 'type-ghost'
    }
  }),

  computed: {
    status() {
      switch (this.data.status) {
        case 0:
          return 'На утверждении'
        case 1:
          return 'Активен'
        case 2:
          return 'Отклонён'
      
        default:
          return 'Статус неизвестен'
      }
    },

    statusColor() {
      switch (this.data.status) {
        case 0:
          return 'text-primary'
        case 1:
          return 'text-success'
        case 2:
          return 'text-danger'
      
        default:
          return 'text-primary'
      }
    },

    typeClass() {
      return this.classOptions[this.data.type]
    }
  }
}
</script>

<style scoped>
.npc-header {
  background-color: #121214;
  border-bottom: 2px solid #102e33;
}

.magic-type {
  background-repeat: no-repeat;
  background-position: 98% 0%;
}

.type-mage {
  background-image: linear-gradient(to right, rgb(18 18 20 / 50%) 0 100%), url(https://playlabirint.ru/storage/source/1/aJUO0NBg0s7ELalVAsAtPq91MaV4X0i7.png);
}

.type-vampire {
  background-image: linear-gradient(to right, rgb(18 18 20 / 50%) 0 100%), url(https://playlabirint.ru/storage/source/1/bqixLqCTIQfrayspOr2FENjreU-9Br6X.png);
}

.type-winged {
  background-image: linear-gradient(to right, rgb(18 18 20 / 50%) 0 100%), url(https://playlabirint.ru/storage/source/1/Ol5oWwv4pngQx1kZ_RydsXv03BsrSwco.png);
}

.type-warewolf {
  background-image: linear-gradient(to right, rgb(18 18 20 / 50%) 0 100%), url(https://playlabirint.ru/storage/source/1/xmp7rdTF3pneiP3KjanXNPBZoodx8jjO.png);
}

.type-ghost {
  background-image: linear-gradient(to right, rgb(18 18 20 / 50%) 0 100%), url(https://playlabirint.ru/storage/source/1/rNrhE4skyFkgx5O0yA5HLgdVdQzQmZ3B.png);
}

.character-role {
  color: #4b939f;
  margin-bottom: 1.5rem;
}
</style>
