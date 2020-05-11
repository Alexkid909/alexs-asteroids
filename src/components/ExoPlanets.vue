<template>
  <div class="exo-planet-systems">
      <container>
        <div class="level">
          <div class="level-item has-text-centered">
            <h2 class="title is-2">Exoplanet Systems</h2>
          </div>
        </div>
      </container>
      <container>
        <ul>
          <li v-for="system in exoPlanetSystems" :key="system.systemName">
            <exo-planet-system :system-data="system"></exo-planet-system>
          </li>
        </ul>
      </container>
  </div>
</template>

<script>
// @ is an alias to /src

import ApiService from '../services/api.service';
import Container from './Container.vue';
import ExoPlanetSystem from './ExoPlanetSysem.vue';

export default {
  name: 'ExoPlanets',
  components: {
    ExoPlanetSystem,
    Container,
  },
  data() {
    return {
      exoPlanets: [],
    };
  },
  methods: {
    getExoPlanets() {
      this.apiService.getExoplanets().then((exoPlanets) => {
        this.exoPlanets = exoPlanets;
        console.log('exoPlanets', this.exoPlanets);
      });
    },
  },
  computed: {
    exoPlanetSystems() {
      const systemsObj = this.exoPlanets.reduce((systems, currentPlanet) => {
        /* eslint-disable camelcase */
        /* eslint-disable object-curly-newline */
        const { pl_hostname, pl_letter, pl_name, pl_pnum, st_dist } = currentPlanet;
        const newPlanet = { pl_letter, pl_name, pl_pnum };
        /* eslint-enable camelcase */
        /* eslint-enable object-curly-newline */

        const newSystems = systems;
        if (newSystems[pl_hostname]) {
          newSystems[pl_hostname].planets.push(newPlanet);
        } else {
          newSystems[pl_hostname] = {
            planets: [newPlanet],
            st_dist,
          };
        }
        return newSystems;
      }, {});
      const exoSystems = Object.keys(systemsObj).map((systemName) => {
        const system = systemsObj[systemName];
        return {
          systemName,
          planets: system.planets,
          distanceParsecs: system.st_dist,
        };
      });
      console.log('exoSystems', exoSystems);
      return exoSystems;
    },
  },
  created() {
    this.apiService = new ApiService();
    this.getExoPlanets();
  },
};
</script>
