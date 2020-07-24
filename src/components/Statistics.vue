<template>
  <div class="row">
    <div class="col s12 box">
      <h4 class="gameName">Estatísticas</h4>
      <hr />
      <p>Pontuação do jogador: {{player}}</p>
      <p>Pontuação da mesa: {{table}}</p>
      <p>Cartas restantes: {{current}}</p>
      <p>Cartas usadas: {{used}}</p>
      <p>R$ jogador: {{formatMoney(playerValue)}}</p>
      <p>R$ mesa: {{formatMoney(houseValue)}}</p>
      <p>Partidas jogadas: {{totalGames}}</p>
      <p>Partidas ganha jogador: {{playerWinner}}</p>
      <p>Partidas ganha mesa: {{tableWinner}}</p>
      <p>Partidas empatadas: {{totalGames - tableWinner - playerWinner}}</p>
    </div>
    <!-- <div class="col s12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Estatísticas gerais</span>
          <p>Pontuação do jogador: {{player}}</p>
          <p>Pontuação da mesa: {{table}}</p>
          <br/>
          <p>Cartas restantes: {{current}}</p>
          <p>Cartas usadas: {{used}}</p>
          <br/>
          <p>R$ jogador: {{formatMoney(playerValue)}}</p>
          <p>R$ mesa: {{formatMoney(houseValue)}}</p>
          <br/>
          <p>Partidas jogadas: {{playerWinner + tableWinner}}</p>
          <p>Partidas ganha jogador: {{playerWinner}}</p>
          <p>Partidas ganha mesa: {{tableWinner}}</p>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { formatMoney } from "./utils/format";
export default {
  props: [
    "player",
    "table",
    "used",
    "current",
    "playerValue",
    "houseValue",
    "playerWinner",
    "tableWinner",
    "totalGames"
  ],
  methods: {
    formatMoney,
  },
};
</script>

<style>
.box {
  background: rgba(76, 175, 79, 0.9);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #999;
  font-weight: bold;
  /* color: gold; */
}
</style>