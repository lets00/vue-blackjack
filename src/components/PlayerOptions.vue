<template>
  <!-- Play options -->
  <div class="row">
    <!-- bets -->
    <div class="col s12">
      <h4>Valor da aposta:</h4>
      <h4>{{pot}}</h4>
      <div class="playBet">
        <button
          class="btn-floating btn-large green"
          @click="pot += 10"
          :disabled="pot + 10 > currentPlayValue || pot + 10 > currentHouseValue"
        >+10</button>
        <button
          class="btn-floating btn-large red"
          @click="pot += 50"
          :disabled="pot + 50 > currentPlayValue || pot + 50 > currentHouseValue"
        >+50</button>
        <button
          class="btn-floating btn-large black"
          @click="pot += 100"
          :disabled="pot + 100 > currentPlayValue || pot + 100 > currentHouseValue"
        >+100</button>
      </div>
      <div class="col s12 optionBet">
        <button class="btn indigo" @click="pot = 0" :disabled="pot === 0">Limpar</button>
        <button
          class="btn red"
          @click="pot = currentPlayValue > currentHouseValue ? currentHouseValue: currentPlayValue"
          :disabled="pot === currentPlayValue || pot === currentHouseValue"
        >Apostar tudo</button>
        <button class="btn" @click="playGame()" :disabled="pot === 0">Jogar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentPlayValue", "currentHouseValue"],
  data: () => {
    return {
      pot: 0
    };
  },
  methods: {
    playGame() {
      this.$emit("onPlay", this.pot);
    }
  }
};
</script>

<style>
.playBet > button, .optionBet > button {
    margin: 10px;
}

</style>