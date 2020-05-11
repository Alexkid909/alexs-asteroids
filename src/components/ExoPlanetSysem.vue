<template>
  <div class="component exoplanet-system">
    <section class="section">
      <p>
        <span>System Name: </span><span>{{systemData.systemName}}</span>
      </p>
      <p>
        <span>System Planets: </span><span>{{systemData.planets.length}}</span>
      </p>
      <p>
        <span>System Distance (pc): </span><span>{{systemData.distanceParsecs}}</span>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ExoPlanetSystem',
  props: {
    systemData: Object,
  },
};
</script>

<style>

</style>
