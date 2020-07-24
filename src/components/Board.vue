<template>
  <div>
    <div class="row center">
      <div>
        <h1 class="gameName">Vue BlackJack</h1>
      </div>
    </div>
    <div class="row center">
      <div class="col s2">
        <Statistics
          :player="calculateHand(playerCards)"
          :table="calculateHand(tableCards)"
          :current="currentCards.length"
          :used="discartedCards.length + playerCards.length + tableCards.length"
          :playerValue="currentPlayValue"
          :houseValue="currentHouseValue"
          :playerWinner="playerWinner"
          :tableWinner="tableWinner"
          :totalGames="totalGames"
        />
      </div>
      <div class="col s7" id="table">
        <div id="tableCards">
          <img
            v-for="(card, id) in tableCards"
            :key="id"
            :src="require(`@/assets/cards/${card}.png`)"
            :placeholder="card"
          />
        </div>
        <div>
          <h5 class="gameName">{{ message }}</h5>
        </div>
        <div id="playerCards">
          <img
            v-for="(card, id) in playerCards"
            :key="id"
            :src="require(`@/assets/cards/${card}.png`)"
            :placeholder="card"
          />
        </div>
        <div class="col center">
          <PlayerOptions
            v-if="playerCards.length === 0 && currentPlayValue !== 0"
            :currentPlayValue="currentPlayValue"
            :currentHouseValue="currentHouseValue"
            @onPlay="playGame($event)"
          />
          <!-- play game -->
          <div class="col s12 optionButtonSpace" v-if="playerCards.length !== 0 && !finishGame && currentPlayValue !== 0">
            <button class="btn" @click="anotherCard(playerCards)">Pedir carta</button>
            <button class="btn" @click="stop()">Parar</button>
          </div>
          <!-- finish game -->
          <div class="col s12 optionButtonSpace" v-if="playerCards.length !== 0 && finishGame && currentPlayValue !== 0">
            <button class="btn" @click="newGame()">Nova Partida</button>
          </div>
          <!-- Progress -->
          <div class="col s12 optionButtonSpace" v-if="finishGame && currentPlayValue === 0">
            <button class="btn" @click="newGame()">Novo Jogo </button>
            <button class="btn" @click="newGame()">Grafico de progresso</button>
          </div>
        </div>
      </div>
      <div class="col s3">
        <Log :logs="logs" />
      </div>
    </div>
  </div>
</template>

<script>
import Statistics from "./Statistics";
import PlayerOptions from "./PlayerOptions";
import Log from "./Log";

import { generateDeck, getDefaultValue } from "../deck";
import { formatTime } from "./utils/format";

import { CARDFLIP } from "./audio";

const BLACKJACK = 21;
export default {
  data: () => {
    return {
      currentHouseValue: 10000000,
      currentPlayValue: 0,
      discartedCards: [],
      currentCards: [],
      playerCards: [],
      tableCards: [],
      pot: 0,
      finishGame: false,
      message: "",
      playerWinner: 0,
      tableWinner: 0,
      totalGames: 0,
      gamesPlayedAfterShuffle: 0,
      logs: [],
      logResult: []
    };
  },
  props: ["playerName", "playerValue", "numberOfDecks"],
  components: {
    // Player,
    PlayerOptions,
    Statistics,
    Log,
  },
  methods: {
    calculateHand(hand) {
      let handValue = hand.reduce(
        (acc, value) => acc + getDefaultValue(value),
        0
      );
      if (handValue > BLACKJACK) {
        handValue = hand.reduce((acc, card) => {
          if (card[0] === "A") {
            if (acc > BLACKJACK) {
              return acc - 10;
            }
          }
          return acc;
        }, handValue);
      }
      return handValue;
    },

    playGame($event) {
      this.pot = $event;
      this.logEvent(
        `------------------Partida de no ${this.totalGames}---------------`
      );
      this.logEvent(`Jogador apostou: ${this.pot}`);
      CARDFLIP.play();
      this.anotherCard(this.playerCards);
      this.anotherCard(this.playerCards);
      this.anotherCard(this.tableCards);
    },

    newGame() {
      this.totalGames++;
      this.gamesPlayedAfterShuffle++
      if (this.gamesPlayedAfterShuffle % 10 == 0 || this.currentCards.length <= 20) {
        this.gamesPlayedAfterShuffle = 0
        this.currentCards = generateDeck(this.numberOfDecks);
        this.discartedCards = []
        this.logEvent('Criando novo baralho...')
      } else {
        this.discartedCards = [
          ...this.discartedCards,
          ...this.playerCards,
          ...this.tableCards,
        ];
      }
      this.message = "";
      this.finishGame = false;
      this.playerCards = [];
      this.tableCards = [];
    },

    anotherCard(hand) {
      CARDFLIP.play();
      const id = Math.floor(Math.random() * this.currentCards.length);
      const card = this.currentCards[id];
      hand.push(card);
      this.currentCards.splice(card, 1);
      this.logEvent(
        `Nova carta pedida. Player: ${this.playerCards}/Table: ${this.tableCards}`
      );
    },

    playWinner() {
      console.log("Parabéns, você ganhou");
      this.message = "Parabéns, você ganhou";
      this.logEvent(
        `Parabéns, você ganhou! Player: ${this.calculateHand(
          this.playerCards
        )}/ Table: ${this.calculateHand(this.tableCards)}`
      );
      this.currentPlayValue += this.pot;
      this.currentHouseValue -= this.pot;
      this.logResult.push({date: new Date(), status: 'PLAYWINNER', value: this.pot, playerHand: this.playerCards, tableCards: this.tableCards})
      this.pot = 0;
      this.playerWinner++;
      this.finishGame = true;
    },

    playLoose() {
      console.log("Que pena, você perdeu!");
      this.message = "Que pena, você perdeu!";
      this.currentHouseValue += this.pot;
      this.currentPlayValue -= this.pot;
      this.logResult.push({date: new Date(), status: 'PLAYLOOSE', value: this.pot, playerHand: this.playerCards, tableCards: this.tableCards})
      this.pot = 0;
      this.tableWinner++;
      this.finishGame = true;
    },

    drawGame() {
      console.log("Empate!");
      this.message = "Empate";
      this.logResult.push({date: new Date(), status: 'DRAW', value: this.pot, playerHand: this.playerCards, tableCards: this.tableCards})
      this.pot = 0;
      this.finishGame = true;
    },

    stop() {
      while (this.calculateHand(this.tableCards) < 17) {
        this.anotherCard(this.tableCards);
      }

      const playerHandValue = this.calculateHand(this.playerCards);
      const tableHandValue = this.calculateHand(this.tableCards);
      if (tableHandValue <= BLACKJACK) {
        if (playerHandValue > tableHandValue) {
          this.playWinner();
        } else {
          if (playerHandValue === tableHandValue) {
            this.drawGame();
          } else {
            this.playLoose();
          }
        }
      } else {
        this.playWinner();
      }
    },

    logEvent(message) {
      const date = new Date();
      const log = {
        hour: date.getHours(),
        minute: formatTime(date.getMinutes()),
        message,
      };
      this.logs.push(log);
    },
  },
  watch: {
    playerCards() {
      console.log("Fui chamado no playerCards!");
      if (this.calculateHand(this.playerCards) === BLACKJACK) {
        this.playWinner();
      } else {
        if (this.calculateHand(this.playerCards) > BLACKJACK) {
          this.playLoose();
        }
      }
    },
  },
  created() {
    this.currentPlayValue = this.playerValue;
    this.currentCards = generateDeck(this.numberOfDecks);
    this.logEvent("Novo jogo criado");
  },
};
</script>

<style>
#table {
  /* width: 100vw; */
  /* height: 100vh; */
  background-image: url("../assets/background/pokerTable.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  max-height: 100px;
  margin-left: 5px;
}

.optionButtonSpace > button {
  margin: 10px;
}

.gameName {
  /* font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; */
  color: #ffffffc9;
  font-weight: bolder;
}
</style>