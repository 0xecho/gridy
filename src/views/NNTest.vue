<template>
  <div class="about">
    <label for="generations">Generations</label>
    <input type="number" v-model="generations" :disabled="!editable" :min="0" :max="1000" style="width: 50px">
    <label for="ticks">Ticks</label>
    <input type="number" v-model="ticks" :disabled="!editable" :min="0" :max="1000" style="width: 50px">
    <label for="population">Population</label>
    <input type="number" v-model="population" :disabled="!editable" :min="0" :max="1000" style="width: 50px">
    <label for="weight_decay">Weight Decay</label>
    <input type="number" v-model="weight_decay" :disabled="!editable" :min="0" :max="1" step="0.01" style="width: 50px">
    <label for="cutOffPercentage">Cut Off Percentage</label>
    <input type="number" v-model="cutOffPercent" :disabled="!editable" :min="0" :max="1" step="0.01" style="width: 50px">
    <label for="ticks">Tick speed</label>
    <input type="number" v-model="tickSpeed" :disabled="!editable" :min="50" :max="1000" style="width: 50px">
    <label for="gridSize">Grid size</label>
    <input type="number" v-model="gridSize" :disabled="!editable" :min="5" :max="1000" style="width: 50px">
    <button @click="start()" :disabled="startIndex==null || endIndex==null || !editable ">Play</button>
    <button @click="reset(10)" :disabled="editable">Reset BTN</button>
    <br>
    <h6>Current Tick: {{tick}}</h6>
    <h6>Current Generation: {{generation}}</h6>
    <Grid :data='data' :editable='editable' @onClick='clickCell' :key="gridSize">
    </Grid>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import NeuralNetwork from '../nn'

function xyToIndex(x, y, gridBaseDimension) { 
  return parseInt(y) * gridBaseDimension + parseInt(x);
}

function indexToXY(index, gridBaseDimension) {
  let x = index % gridBaseDimension;
  let y = Math.floor(index / gridBaseDimension);
  return {x: x, y: y};  
}

function getRandomColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

export default {
    name: "TestRandomGame",
    components: {
        Grid
    },
    data() {
        return {
            // types
            types: [
                'empty',
                'start',
                'wall',
                'path',
                'visited',
                'end'
            ],
            data: [],
            startIndex: null,
            endIndex: null,
            selectingStart: true,
            players: [],
            gameInterval: null,
            editable: true,
            generations: 50,
            generation: 0,
            ticks: 50,
            tick: 0,
            tickSpeed: 100,
            player_nn_map: null,
            cutOffPercent: 0.2,
            population: 15,
            weight_decay: 0.15,
            gridSize: 11
        }
    },
    beforeMount() {
        let toAdd = 210;
        let gridBaseDimension = Math.ceil(Math.sqrt(toAdd));
        for (let i = 0; i < toAdd; i++) {
            this.data.push({
              type: 'empty', 
              id: i,
              // set x and y
              x: indexToXY(i, gridBaseDimension).x,
              y: indexToXY(i, gridBaseDimension).y,
            });
        }
    },
    computed: {
        gridBaseDimension: function() {
            return Math.ceil(Math.sqrt(this.data.length));
        },
    },
    watch: {
      // when gridSize changes, update the data
      gridSize: function() {
        this.data = [];
        let toAdd = this.gridSize * this.gridSize;
        let gridBaseDimension = Math.ceil(Math.sqrt(toAdd));
        for (let i = 0; i < toAdd; i++) {
          this.data.push({
            type: 'empty', 
            id: i,
            // set x and y
            x: indexToXY(i, gridBaseDimension).x,
            y: indexToXY(i, gridBaseDimension).y,
          });
        }
      },
    },
    methods: {
        clickCell(cell) {
            let x = cell.x;
            let y = cell.y;
            let index = xyToIndex(x, y, this.gridBaseDimension);
            if (this.selectingStart) {
                this.data.filter(cell => cell.type === 'start').forEach(cell => cell.type = 'empty');
                this.data[index].type = 'start';
                this.startIndex = index;
                this.selectingStart = false;
            } else {
                this.data.filter(cell => cell.type === 'end').forEach(cell => cell.type = 'empty');
                this.data[index].type = 'end';
                this.endIndex = index;
                this.selectingStart = true;
            }            
        },
        addRandomPlayers(n){
          this.editable = false;
          for (let i = 0; i < n; i++) {
              this.players.push({
                  x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                  y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                  type: 'player',
                  score: 0,
                  path: [
                    {
                      x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                      y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                    }
                  ],
                  id: i,
                  color: getRandomColor()
              });
          }
          this.play()
        },
        play() {
          // for a 100 ticks, get next state and update players
          let tick = 0;
          let interval = setInterval(() => {
            if (tick >= this.ticks) {
              clearInterval(interval);
              return;
            }
            let state = this.getNextState(tick);
            // console.log("State: ", state.map(player => player.path));
            // loop through states
            for(let i=0; i<state.length; i++) {
              let player = state[i];
              this.updatePlayer(player);
              if (player.x === indexToXY(this.endIndex, this.gridBaseDimension).x && player.y === indexToXY(this.endIndex, this.gridBaseDimension).y) {
                clearInterval(interval);
                this.found(player);
                // console.log("Found: ", player.path);
                break
              }
            }
            tick++;
            this.tick = tick;
          }, this.tickSpeed);
          this.gameInterval = interval;
        },
        getNeighbors(x, y, diagonals) {
            let sqrt = Math.ceil(Math.sqrt(this.data.length));
            let neighbors = [];
            if (x > 0) {
                neighbors.push(xyToIndex(x - 1, y, sqrt));
            }
            if (x < sqrt - 1) {
                neighbors.push(xyToIndex(x + 1, y, sqrt));
            }
            if (y > 0) {
                neighbors.push(xyToIndex(x, y - 1, sqrt));
            }
            if (y < sqrt - 1) {
                neighbors.push(xyToIndex(x, y + 1, sqrt));
            }
            if(diagonals){
              if (x > 0 && y > 0) {
                neighbors.push(xyToIndex(x - 1, y - 1, sqrt));
              }
              if (x < sqrt - 1 && y > 0) {
                neighbors.push(xyToIndex(x + 1, y - 1, sqrt));
              }
              if (x > 0 && y < sqrt - 1) {
                neighbors.push(xyToIndex(x - 1, y + 1, sqrt));
              }
              if (x < sqrt - 1 && y < sqrt - 1) {
                neighbors.push(xyToIndex(x + 1, y + 1, sqrt));
              }
            }
            return neighbors;
        },
        getNextState() {
          // returns a list of players states after one step
          // for each player, get a random neighbor and move there
          let nextState = this.players.map(player => {
            let neighbors = this.getNeighbors(player.x, player.y)
            let randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)]
            let randomNeighbor = this.data[randomNeighborIndex];
            // console.log("Random Neighbor: ", randomNeighbor.x, randomNeighbor.y);
            return {
              ...player,
              newX: randomNeighbor.x,
              newY: randomNeighbor.y,
              path: [...player.path, {x: randomNeighbor.x, y: randomNeighbor.y}]
            }
          })
          return nextState
        },
        updatePlayer(player) {
          // remove player from grid and add to new position
          let index = xyToIndex(player.x, player.y, this.gridBaseDimension);
          // console.log("index: ", index);
          // console.log("player: ", player);
          // console.log("data: ", this.data);
          this.data[index].type = 'visited';
          this.data[index].color = player.color;
          this.data[player.newX + player.newY * this.gridBaseDimension].type = 'player';
          player.x = player.newX;
          player.y = player.newY;
          player.score = player.path.length;
          this.players[player.id] = player;
        },
        reset() {
          this.players = [];
          this.data.forEach(cell => cell.type = 'empty');
          this.data[this.startIndex].type = 'start';
          this.data[this.endIndex].type = 'end';
          clearInterval(this.gameInterval);
          this.player_nn_map = null;
          this.generation = 0;
          this.tick = 0;
          this.editable = true;
        },
        found(player){
          let path = player.path;
          path.forEach(cell => {
            this.data[cell.x + cell.y * this.gridBaseDimension].color = player.color;
          })
          this.data.forEach(cell => {

            if (cell.type === 'player'){
              return
            }
            if (!path.find(pathCell => pathCell.x === cell.x && pathCell.y === cell.y)) {
              cell.color = '#cccccc';
            }
          })
        },
        async start() {
          this.editable = false;
          for(let i=0; i<this.generations; i++) {
            this.generation = i;
            this.data.forEach(cell => {
              cell.type = 'empty';              
            })
            this.data[this.startIndex].type = 'start';
            this.data[this.endIndex].type = 'end';
            await this.runGeneration(i);
            if (this.editable) {
              return
            }

          }
        },
        async runGeneration(){
          console.log((this.player_nn_map, this.player_nn_map!==null));
          if (this.editable) {
              return
            }
          if(this.player_nn_map !== null){
            let player_scores = await this.getScores();
            let sorted_players = Object.keys(player_scores).sort((a, b) => player_scores[b] - player_scores[a]);            
            console.log("Player Scores: ", player_scores);
            let best_players = sorted_players.slice(Object.keys(player_scores).length - this.cutOffPercent * Object.keys(player_scores).length, Object.keys(player_scores).length);
            let worst_players = sorted_players.slice(0, this.cutOffPercent * Object.keys(player_scores).length);
            console.log("Best Players: ", best_players);
            console.log("Worst Players: ", worst_players);
            let new_player_nn_map = {};
            this.players = []
            let id = 0
            best_players.forEach(player_id => {
              let player_nn = this.player_nn_map[player_id];
              let player = {
                id: id,
                x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                path: [],
                score: 0,
                color: getRandomColor()
              }
              this.players.push(player);
              new_player_nn_map[id] = player_nn;
              id++;
            })
            worst_players.forEach(player_id => {
              let player_nn = this.player_nn_map[player_id];
              let player = {
                id: id,
                x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                path: [],
                score: 0,
                color: getRandomColor()
              }
              this.players.push(player);
              new_player_nn_map[id] = player_nn;
              id++;
            })           
            
            // let remaining_num_of_players = this.population - best_players.length;
            let remaining_num_of_players = this.population - best_players.length - worst_players.length;
            for(let i=0; i<remaining_num_of_players; i++) {
              let player = {
                x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                path: [{x: indexToXY(this.startIndex, this.gridBaseDimension).x, y: indexToXY(this.startIndex, this.gridBaseDimension).y,}],
                id: id,
                type: 'player',
                score: 0,
                color: getRandomColor()
              }              
              this.players.push(player);
              let best_player = best_players[id % best_players.length]
              let best_player_nn = this.player_nn_map[best_player];
              new_player_nn_map[id] = best_player_nn.get_random_weight_children(this.weight_decay);
              id++;
            }
            this.player_nn_map = new_player_nn_map;
          }
          if(this.player_nn_map==null){
            this.players = []
            // add 10 random players
            for(let i=0; i<this.population; i++) {
              this.players.push({
                  x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                  y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                  type: 'player',
                  score: 0,
                  path: [
                    {
                      x: indexToXY(this.startIndex, this.gridBaseDimension).x,
                      y: indexToXY(this.startIndex, this.gridBaseDimension).y,
                    }
                  ],
                  id: i,
                  color: getRandomColor()
              });
            }
            this.player_nn_map = {}
            this.players.forEach(player => {
              this.player_nn_map[player.id] = new NeuralNetwork(4,4,4)
            })
          }
          for(let i=0; i<this.ticks; i++){
            this.tick = i;
            if (this.editable) {
              return
            }
            await this.runTick();
            await this.sleep(this.tickSpeed);
          }
        },
        sleep(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        },
        async runTick(){
          this.players.forEach(player => {
            let player_x = player.x;
            let player_y = player.y;
            let end_x = indexToXY(this.endIndex, this.gridBaseDimension).x;
            let end_y = indexToXY(this.endIndex, this.gridBaseDimension).y;
            let inputs = [
              player_x,
              player_y,
              end_x,
              end_y
            ];
            let dir = this.player_nn_map[player.id].get_output(inputs);
            if(dir!==4)this.movePlayer(player, dir);
          })
        },
        movePlayer(player, dir){
          let dirX = [-1 , 0, 1, 0];
          let dirY = [0, -1, 0, 1];
          let newX = player.x + dirX[dir];
          let newY = player.y + dirY[dir];
          let newIndex = newX + newY * this.gridBaseDimension;
          if(newX < 0 || newX >= this.gridBaseDimension || newY < 0 || newY >= this.gridBaseDimension || this.data[newIndex] === undefined){
            return;
          }

          this.data[newIndex].type = 'player';
          this.data[newIndex].color = player.color;
          this.data[player.x + player.y * this.gridBaseDimension].type = 'visited';
          player.x = newX;
          player.y = newY;
          player.path.push({x: newX, y: newY});
        },
        async getScores() {
          let scores = {};
          for(let i=0; i<this.players.length; i++) {
            let player = this.players[i];
            let score = await this.getPlayerScore(player);
            scores[player.id] = score;
          }
          return scores;
        },
        async getPlayerScore(player) {
          let player_x = player.x;
          let player_y = player.y;
          let end_x = indexToXY(this.endIndex, this.gridBaseDimension).x;
          let end_y = indexToXY(this.endIndex, this.gridBaseDimension).y;
          let distance = Math.abs(player_x - end_x) + Math.abs(player_y - end_y);
          return distance;
        },
    }

}
</script>

