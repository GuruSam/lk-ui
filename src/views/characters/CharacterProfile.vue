<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="media align-items-center mb-3">
          <img :src="character.avatar" alt="Аватар персонажа." class="profile-avatar profile-avatar--full">
          <div class="media-body ml-4">
            <h4 class="font-weight-bold mb-0">{{ character.name }} <span class="text-muted font-weight-normal">@nmaxwell</span></h4>
            <div class="text-muted mb-2">ID: {{ character.id }}</div>
            <a href="javascript:void(0)" class="btn btn-primary btn-sm">Редактировать</a>&nbsp;
            <a href="javascript:void(0)" class="btn btn-default btn-sm">Профиль</a>&nbsp;
            <a href="javascript:void(0)" class="btn btn-default btn-sm icon-btn"><i class="ion ion-md-mail"></i></a>
          </div>
        </div>

        <div class="row no-gutters row-bordered">
          <div class="d-flex col-md align-items-center">
            <a href="javascript:void(0)" class="card-body d-block text-body">
              <div class="text-primary small line-height-1">Игровых постов</div>
              <div class="text-xlarge">125</div>
            </a>
          </div>
          <div class="d-flex col-md align-items-center">
            <a href="javascript:void(0)" class="card-body d-block text-body">
              <div class="text-primary small line-height-1">Лайков</div>
              <div class="text-xlarge">534</div>
            </a>
          </div>
          <div class="d-flex col-md align-items-center">
            <a href="javascript:void(0)" class="card-body d-block text-body">
              <div class="text-primary small line-height-1">Начало игры</div>
              <div class="text-xlarge">{{ character.createdAt }}</div>
            </a>
          </div>
        </div>

        <div class="card-header">Social links</div>

        <table class="table user-view-table m-0">
          <tbody>
            <tr>
              <td>Username:</td>
              <td>nmaxwell</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>Nelle Maxwell</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>nmaxwell@mail.com</td>
            </tr>
            <tr>
              <td>Company:</td>
              <td>Company Ltd.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CharacterProfile',

  data: () => ({
    character: {}
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get(`/characters/${to.params.id}`)
    
    next(vm => {
      vm.character = data
    })
  }
}
</script>

<style>
.profile-avatar--full {
  max-width: 140px;
  margin: 0;
}
</style>
