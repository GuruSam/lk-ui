<template>
  <footer class="layout-footer footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3 pt-3">
      <div class="text-primary">
        2015-2022 © <a class="footer-text font-weight-bolder text-primary" href="https://thesims.cc" target="_blank">The Sims Creative Club</a>
      </div>

      <div class="links d-flex align-items-center">
        <a class="tg-link mr-3" href="https://t.me/labirint_news" target="_blank" title="Новости Лабиринта">
          <span class="sr-only">Новости Лабиринта</span>
        </a>
        <a href="https://playlabirint.ru/rules" class="footer-link">Правила игры</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style>
.layout-footer {
  background-color: #131315;
}

.tg-link {
  display: inline-block;
  width: 21px;
  height: 21px;
  background-image: url(/telegram-plane.png);
  background-size: cover;
}
</style>
