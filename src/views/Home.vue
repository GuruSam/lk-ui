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
            <b-col sm="12" md="6" lg="12" xl="12">
              <div class="card bg-primary border-0 text-white mb-4">
                <div class="card-body d-flex align-items-center">
                  <span class="display-2 ion ion-ios-contacts"></span>
                  <div class="ml-3">
                    <div class="display-4">12</div>
                    <div class="opacity-75">персонажей в игре</div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="12" xl="12">
              <div class="card border-0 text-white mb-4">
                <div class="card-body d-flex align-items-center">
                  <span class="display-2 ion ion-md-people"></span>
                  <div class="ml-3">
                    <div class="display-4">10</div>
                    <div class="opacity-75">NPC в игре</div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="12" xl="12">
              <div class="card bg-primary border-0 text-white mb-4">
                <div class="card-body d-flex align-items-center">
                  <span class="display-2 ion ion-ios-mail"></span>
                  <div class="ml-3">
                    <div class="display-4">3</div>
                    <div class="opacity-75">заявки ждёт ответа</div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="12" xl="12">
              <div class="card border-0 text-white mb-4">
                <div class="card-body d-flex align-items-center">
                  <span class="display-2 ion ion-md-list-box"></span>
                  <div class="ml-3">
                    <div class="display-4">0</div>
                    <div class="opacity-75">заданий в процессе</div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Table from '@/components/Table'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  },
  components: {
    'data-table': Table
  }
}
</script>
