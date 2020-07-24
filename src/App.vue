<template>
  <div>
    <!-- <div class="row" v-if="!isCreated">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Vue Blackjack</span>
            <p>Entre com seu nome, valor inicial e número de baralhos em jogo (se não souber, deixe o padrão)</p>
            <div class="input-field">
              <input id="name" type="text" v-model="playerName" />
              <label for="name">Nome do jogador</label>
            </div>
            <div class="input-field">
              <input id="value" type="number" min="1000" step="1000" v-model="playerValue" />
              <label for="value">Valor Inicial (R$...USD)</label>
            </div>
            <div class="input-field">
              <select id="decks" class="browser-default" v-model="gameDecks">
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>
          <div class="card-action">
            <button class="btn blue-grey" @click="createGame">Criar sala e entrar</button>
          </div>
        </div>
      </div>
    </div> -->
    <Board :playerName="playerName" :playerValue="playerValue" :numberOfDecks="gameDecks"></Board>
  </div>
</template>

<script>
import Board from "./components/Board";

export default {
  name: "App",
  components: {
    Board
  },
  data: () => {
    return {
      playerName: "",
      playerValue: 1000,
      gameDecks: 2,
      isCreated: false
    };
  },
  methods: {
    createGame() {
      if (this.isValid) {
        this.isCreated = true;
        const audioFlip = new Audio(require("@/assets/audio/card.mp3"));
        audioFlip.play();
        console.log("Criando game...");
      }
    }
  },
  computed: {
    isValid() {
      console.log(this.playerName && this.playerValue >= 1000);
      return this.playerName != "" && this.playerValue >= 1000;
    }
  }
};
</script>

<style>
body {
  background-image: url("assets/background/blackjack1.jpeg");
  background-repeat: repeat-y;
  background-size: 100%;
}

h2 {
  color: gold;
}
</style>
