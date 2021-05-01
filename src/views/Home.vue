<template>
  <div>
    <b-container fluid>
      <h2 class="font-weight-bold py-3 mb-4">Главная</h2>
      <b-row>
        <b-col xl="9" lg="8" md="12" sm="12" >
          <b-row>
            <b-col>
              <data-table type="tickets" title="Активные заявки" />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <data-table type="tasks" title="Задания в процессе" />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-2"><h3>Избранные персонажи</h3></b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="card card-bordered mb-4">
                <div class="card-body">
                  <div class="media">
                    <img src="https://playlabirint.ru/data/avatars/l/552/552037.jpg" alt class="ui-w-100 rounded-circle">
                    <div class="media-body pt-2 ml-3">
                      <h5 class="text-large mb-2">Аномалия</h5>
                      <div class="text-success text-big mb-2">В игре</div>
                    </div>
                  </div>
                </div>
                <div class="card-footer py-3">
                  <a href="#" class="btn btn-sm btn-primary rounded-pill"><i class="ion ion-md-key"></i>&nbsp; Авторизоваться</a>
                  &nbsp;
                  <a href="#" class="btn btn-sm rounded-pill"><i class="ion ion-md-copy"></i>&nbsp; Скопировать пароль</a>
                </div>
              </div>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
        </b-col>
        <b-col xl="3" lg="4" md="12" sm="12">
          <b-row>
            <info-card light icon="ios-contacts" :text="charactersInGame" />
            <info-card icon="ios-people" text="NPC в игре" />
            <info-card light icon="ios-mail" :text="ticketsPending" />
            <info-card icon="md-list-box" :text="activeTasks" />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Table from '@/components/Table'
import InfoCard from '@/components/InfoCard'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  },
  components: {
    'data-table': Table,
    'info-card': InfoCard
  },
  computed: {
    charactersInGame () {
      return this.declOfNum(0, ['персонаж', 'персонажа', 'персонажей']) + ' в игре' 
    },

    ticketsPending () {
      return this.declOfNum(0, ['заявка', 'заявки', 'заявок']) + ' ' + this.declOfNum(0, ['ждёт', 'ждут', 'ждут']) + ' ответа'
    },

    activeTasks () {
      return this.declOfNum(0, ['задание', 'задания', 'заданий']) + ' в процессе'
    }
  }
}
</script>
