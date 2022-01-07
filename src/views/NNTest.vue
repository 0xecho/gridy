<template>
  <div class="about">
    <label for="generations">Generations</label>
    <input type="number" v-model="generations" :disabled="!editable" :min="0" :max="1000" style="width: 50px">
    <label for="ticks">Ticks</label>
    <input type="number" v-model="ticks" :disabled="!editable" :min="0" :max="1000" style="width: 50px">
    <label for="ticks">Tick speed</label>
    <input type="number" v-model="tickSpeed" :disabled="!editable" :min="50" :max="1000" style="width: 50px">
    <button @click="play()" :disabled="startIndex==null || endIndex==null || !editable ">Play</button>
    <button @click="reset(10)" :disabled="editable">Reset BTN</button>
    <br>
    <h6>Current Tick: {{tick}}</h6>
    <Grid :data='data' :editable='editable' @onClick='clickCell'>
    </Grid>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import nn from '../nn'

function xyToIndex(x, y, gridBaseDimension) { 
  return parseInt(y) * gridBaseDimension + parseInt(x);
}

function indexToXY(index, gridBaseDimension) {
  let x = index % gridBaseDimension;
  let y = Math.floor(index / gridBaseDimension);
  return {x: x, y: y};  
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
            ticks: 10,
            tick: 0,
            tickSpeed: 100,
            generations: 10,
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
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16)
              });
          }
          // this.play()
        },
        play() {
          this.editable = false;
          this.addRandomPlayers(10)
          
          let tick = 0;
          let interval = setInterval(() => {
            if (tick >= this.ticks) {
              clearInterval(interval);
              return;
            }
            let state = this.getNextState(tick);
            console.log("State: ", state.map(player => player.path));
            // loop through states
            for(let i=0; i<state.length; i++) {
              let player = state[i];
              this.updatePlayer(player);
              this.players[player.id]=player;
              if (player.x === indexToXY(this.endIndex, this.gridBaseDimension).x && player.y === indexToXY(this.endIndex, this.gridBaseDimension).y) {
                clearInterval(interval);
                this.found(player.path);
                console.log("Found: ", player.path);
                break
              }
            }
            tick++;
            this.tick = tick;
          }, this.tickSpeed);
          this.gameInterval = interval;
          // this.addRandomPlayers(10);
          
          // this.players.forEach(player => {
          //   nn(player, endNode)
          // })
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
          // for each player, 
          let endNode = {
            x: indexToXY(this.endIndex, this.gridBaseDimension).x,
            y: indexToXY(this.endIndex, this.gridBaseDimension).y,
          }
          let dirX = [1, 0, -1, 0];
          let dirY = [0, 1, 0, -1];
          let nextState = this.players.map(player => {
            let {playerWeight,outputWeight,direction} = nn(player, endNode) 
            let newX = player.x + dirX[direction];
            let newY = player.y + dirY[direction];
            player.playerWeight = playerWeight;
            player.outputWeight = outputWeight;
            return {
              ...player,
              newX: newX,
              newY: newY,
              path: [...player.path, {x: newX, y: newY}],
            }
          })
          return nextState
        },
        updatePlayer(player) {
          // remove player from grid and add to new position
          let index = xyToIndex(player.x, player.y, this.gridBaseDimension);
          console.log("index: ", index);
          console.log("player: ", player);
          console.log("data: ", this.data);
          this.data[index].type = 'visited';
          this.data[player.newX + player.newY * this.gridBaseDimension].type = 'player';
          player.x = player.newX;
          player.y = player.newY;
          this.players[player.id] = player;
        },
        reset() {
          this.players = [];
          this.data.forEach(cell => cell.type = 'empty');
          this.data[this.startIndex].type = 'start';
          this.data[this.endIndex].type = 'end';
          clearInterval(this.gameInterval);
          this.editable = true;
        },
        found(path){
          // this.players.forEach(player => {
          //   this.data[player.x + player.y * this.gridBaseDimension].type = 'visited';
          // })
          this.data.filter(cell => cell.type === 'player').forEach(cell => cell.type = 'visited');
          path.forEach(cell => {
            this.data[cell.x + cell.y * this.gridBaseDimension].type = 'end';
          })

        }
    }

}
</script>