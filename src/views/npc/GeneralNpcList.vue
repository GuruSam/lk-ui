<template>
  <div class="container-fluid">
    <page-title title="Список общих NPC" sub-title="NPC, доступ к которым есть у всех игроков">
      <div class="row justify-content-end px-3">
        <label class="npc-filter mr-3">
          <span class="mr-2">Имя:</span>
          <input class="form-control" v-model="filterByName" type="search" placeholder="Введите имя..." @input="filterHandler">
        </label>

        <label class="npc-filter">
          <span class="mr-2">Роль:</span>
          <input class="form-control" v-model="filterByRole" type="search" placeholder="Введите роль..." @input="filterHandler">
        </label>
      </div>
    </page-title>

    <div class="row mt-3">
      <character v-for="character in npcList" :key="character.id" :character="character" />
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
    total: null,

    filterByName: null,
    filterByRole: null,
    filterDebounce: null
  }),

  async beforeRouteEnter (to, from, next) {
    const params = { limit: 12, offset: 0 }
    const { data } = await axios.get('/npc/general', { params })

    next(vm => {
      vm.npcList = data.items,
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
        offset: this.npcList.length,
        name: this.filterByName,
        role: this.filterByRole
      }
      const { data } = await axios.get('/npc/general', { params })

      this.npcList = [...this.npcList, ...data.items]
      this.total = data.total
      this.fetching = false
    },

    scrollHandler () {
      const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

      if (scrolledToBottom && !this.fetching && this.npcList.length < this.total) {
        this.fetchData()
      }
    },

    filterHandler () {
      clearTimeout(this.filterDebounce)

      this.filterDebounce = setTimeout(() => {
        this.npcList = []
        this.fetchData()
      }, 500)
    }
  }
}
</script>

<style>
.npc-filter {
  display: flex;
  align-items: center;
}
</style>
