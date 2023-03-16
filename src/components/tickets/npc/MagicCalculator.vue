<template>
  <div class="form-group position-relative dark-style">
    <label class="form-label mb-3">Магия</label>

    <p class="mb-3">В зависимости от выбранного ординара доступно разное количество баллов способностей и баллов уровней. Баллы способностей тратятся на выбор конкретных способностей, а баллы уровней можно распределить между ними.</p>

    <FormSelect v-model="ordinar" label="Ординар" :options="ordinarLevels" @input="fetchData" />

    <div class="points mt-5 mb-3">
      <span class="mr-3">Баллы способностей 
        <span class="badge p-2" :class="skillPoints > 0 ? 'badge-primary' : 'badge-danger'">{{ skillPoints }}</span>
      </span>

      <span class="mr-3">Баллы уровней 
        <span class="badge p-2" :class="levelPoints > 0 ? 'badge-primary' : 'badge-danger'">{{ levelPoints }}</span>
      </span>

      <span>Доступные школы 
        <span class="badge p-2" :class="schoolPoints > 0 ? 'badge-primary' : 'badge-danger'">{{ schoolPoints }}</span>
      </span>
    </div>

    <div class="mb-4 mt-4" v-if="selectedSchools.size > 0">
      <span>Школы выбраны: </span>
      <span v-for="school in selectedSchools" :key="school" class="badge badge-secondary badge-pill mr-2">
        {{ school }}
      </span>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Способность</th>
          <th>Уровень</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(skill, index) in skills" :key="index">
          <td>
            <Multiselect :id="index" v-model="skill.data" :options="skillsOptions" group-values="skills" group-label="category" track-by="id" label="name" :searchable="false" />
          </td>
          <td class="level-column">
            <Multiselect :id="index" v-model="skill.lvl" :options="skillLevels" :searchable="false" />
          </td>
          <td class="action-column">
            <button v-if="index === 0" class="btn btn-primary btn-sm" :class="{'disabled' : disabled}" @click="addSkill">
              <span class="ion ion-md-add"></span>
            </button>
            <button v-else class="btn btn-danger btn-sm" @click="removeSkill($event, index)">
              <span class="ion ion-md-trash"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<script>
import Multiselect from 'vue-multiselect'
import FormSelect from '@/components/form/FormSelect'
import axios from 'axios'

export default {
  name: 'MagicCalculator',
  
  props: {
    magicClass: Number,
    magic: Object
  },

  components: { Multiselect, FormSelect },

  data: () => ({
    points: {
      skill: 0,
      lvl: 0,
      school: 0
    },

    ordinar: 1,
    ordinarLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    skills: [{}],
    skillsByCategories: [],
    skillLevels: [1, 2, 3, 4, 5],
    blockedSkills: [],

    schoolsByCategories: new Map()
  }),

  computed: {
    skillPoints () {
      return this.points.skill - this.skills.length
    },

    levelPoints () {
      return this.points.lvl - this.skills.reduce((acc, cur) => acc + (cur.lvl || 0), 0)
    },

    selectedSchools () {
      return new Set(
        this.skills.filter(skill => skill.data).map(skill => skill.data.school)
      )
    },

    schoolPoints () {
      return this.points.school - this.selectedSchools.size
    },

    skillsOptions () {
      return this.schoolPoints === 0 && this.selectedSchools.size > 0 ? this.getOptionsBySchool() : this.skillsByCategories
    },

    disabled () {
      return this.skillPoints === 0
    }
  },

  watch: {
    magicClass() {
      this.fetchData()
      this.skills = [{}]
    }
  },

  created () {
    this.ordinar = this.magic.lvl ?? 1
    this.fetchData()
  },

  methods: {
    async fetchData () {
      if (this.magicClass && this.ordinar) {
        const params = {
          magicClass: this.magicClass,
          lvl: this.ordinar
        }
        const { data } = await axios.get('/npc/form', { params })

        this.points = data.magic.points
        this.blockedSkills = data.magic.blockedSkills ?? []
        this.skillsByCategories = this.createSkillsOptions(data.magic.skills)
        this.setMagic()

        if (this.skills.length > this.points.skill) {
          this.skills.splice(this.points.skill)
        }
      }
    },

    createSkillsOptions (skills) {
      return skills.reduce((acc, skill) => {
        let category = acc.find(el => el.category === skill.category)

        if (!category) {
          category = {
            category: skill.category,
            skills: []
          }

          acc.push(category)
          this.schoolsByCategories.set(skill.category, skill.school)
        }

        if (this.blockedSkills.includes(skill.id)) {
          skill.$isDisabled = true
        }

        category.skills.push(skill)

        return acc
      }, [])
    },

    addSkill (evt) {
      evt.preventDefault()

      if (this.skillPoints > 0) {
        this.skills.push({})
      }
    },

    removeSkill (evt, index) {
      evt.preventDefault()

      this.skills.splice(index, 1)
    },

    getOptionsBySchool () {
      let categories = new Set()

      this.schoolsByCategories.forEach((school, category) => 
        this.selectedSchools.has(school) ? categories.add(category) : null
      )

      return this.skillsByCategories.filter(skill => categories.has(skill.category))
    },

    getMagic () {
      return {
        lvl: this.ordinar,
        levelPoints: this.levelPoints,
        skills: this.getSkills()
      }
    },

    getSkills () {
      const skills = this.skills.map(skill => ({ 
        id: skill.data ? skill.data.id : null, 
        lvl: skill.lvl 
      }))

      return skills.filter(skill => skill.id)
    },

    setMagic () {
      const magic = this.magic

      if (magic.skills && magic.skills.length) {
        const flat = this.skillsByCategories.flatMap(category => category.skills)
        const skills = []

        magic.skills.forEach(skill => {
          const data = flat.find(el => el.id === skill.id)
          skills.push({ lvl: skill.lvl, data })
        })

        this.skills = skills
      }
    }
  }
}
</script>

<style scoped>
.level-column {
  width: 25%;
}

.action-column {
  width: 50px;
  text-align: center;
  vertical-align: middle;
}
</style>
