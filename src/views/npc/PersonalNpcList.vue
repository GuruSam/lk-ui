<template>
  <div class="container-fluid">
    <page-title title="Список личных NPC" sub-title="NPC, доступ к которым есть только у вас">
      <router-link to="/tickets/create?category=14" class="d-block btn btn-primary rounded-pill">
        <span class="ion ion-md-add"></span>&nbsp; Создать нового NPC
      </router-link>
    </page-title>

    <div class="row mt-3">
      <character v-for="character in npcList" :key="character.id" :character="character" favorable />
      <span v-if="npcList.length === 0 && !fetching" class="text-muted">Персонажи не найдены.</span>
    </div>

    <loader v-if="fetching" />
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import SmallCard from '@/components/characters/SmallCard'
import DataLoader from '@/components/loaders/DataLoader'
import axios from 'axios'

export default {
  name: 'NpcList',
  components: {
    'page-title': PageTitle,
    'character': SmallCard,
    'loader': DataLoader
  },

  data: () => ({
    npcList: [],
    fetching: false,
    limit: 12,
    total: null
  }),

  async beforeRouteEnter (to, from, next) {
    const params = { limit: 12, offset: 13 }
    const { data } = await axios.get('/npc/personal', { params })

    next(vm => {
      vm.npcList = vm.npcList.concat(data.characters, data.items),
      vm.total = data.total
    })
  },

  mounted() {
    document.addEventListener('scroll', this.scrollHandler)
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollHandler)
  },

  methods: {
    async fetchData () {
      this.fetching = true

      const params = {
        limit: this.limit,
        offset: this.npcList.length
      }
      const { data } = await axios.get('/npc/personal', { params })

      this.npcList = this.npcList.concat(data.characters, data.items)
      this.total = data.total
      this.fetching = false
    },

    scrollHandler () {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

      if (scrolledToBottom && !this.fetching && this.npcList.length < this.total) {
        this.fetchData()
      }
    }
  }
}
</script>
