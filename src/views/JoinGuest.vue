<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <PlanetCard>
          <template #header>
            <h1 class="card-title h3 font-weight-light mb-2 mt-1">Создание гостя</h1>
          </template>

          <template #content>
            <GuestForm />
          </template>
        </PlanetCard>
      </div>
    </div>
  </div>
</template>

<script>
import PlanetCard from '@/components/PlanetCard'
import GuestForm from '@/components/smart-wizard/GuestForm'

export default {
  name: 'JoinGuest',

  components: { PlanetCard, GuestForm }
}
</script>
