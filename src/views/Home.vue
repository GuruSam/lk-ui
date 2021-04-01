<template>
  <div>
    <h1 class="font-weight-bold py-3 mb-4">Главная</h1>
    <b-container fluid>
      <b-row>
        <b-col>
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
        <b-col>
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
        <b-col>
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
        <b-col>
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
      <b-row>
        <b-col>
          <div class="card mb-4">
            <div class="card-header text-large">
              Активные заявки
            </div>
            <div class="table-responsive">
              <table class="table card-table">
                <tbody>
                <tr>
                  <td>Согласование амулета</td>
                  <td><span class="badge badge-outline-warning">Ждёт ответа ГМ</span></td>
                  <td>01.04.2021 10:19</td>
                  <td><a href="#"><i class="ion ion-md-eye"></i></a></td>
                </tr>
                <tr>
                  <td>Заявка в игру Вася Пупкин</td>
                  <td><span class="badge badge-outline-danger">Ждёт вашего ответа</span></td>
                  <td>01.04.2021 10:19</td>
                  <td><a href="#"><i class="ion ion-md-eye"></i></a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="card mb-4">
            <div class="card-header text-large">
              Задания в процессе
            </div>
            <div class="table-responsive">
              <table class="table card-table">
                <tbody>
                <tr>
                  <td>Активных заданий нет</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-2"><h2>Избранные персонажи</h2></b-col>
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
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  }
}
</script>
