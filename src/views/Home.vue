<template>
  <div class="home">
    <div class="inline-left" style="margin-top: 10%">
      
      <button @click="doDjikstra(false)" :disabled="!editable">Djikstra without diagonals</button>
      <br>
      <button @click="doDjikstra(true)" :disabled="!editable">Djikstra with Diagonals</button>
      <br>
      <button @click="doBFS(true)" :disabled="!editable">BFS with Diagonals</button>
      <br>
      <button @click="doBFS(false)" :disabled="!editable">BFS without Diagonals</button>
      <br>
      <button @click="doDFS(true)" :disabled="!editable">DFS with Diagonals</button>
      <br>
      <button @click="doDFS(false)" :disabled="!editable">DFS without Diagonals</button>
      <br>
      <button @click="doAStar(true)" :disabled="!editable">aStar with Diagonals</button>
      <br>
      <button @click="doAStar(false)" :disabled="!editable">aStar without Diagonals</button>
      <br>
      <br>
      <button @click="reset(false)" :disabled="editable">Reset</button>
      <br>
      <button @click="reset(true)" :disabled="editable">Reset with Walls</button>
    </div>
    <!-- right aligned sections div -->
    <div class="inline-left">
      <Grid :data="this.data" @onClick="clicked" :editable="editable"></Grid>
    </div>
    <div class="inline-right">
      <div class="section">
        <p>
          <span>Start</span>
          <br>
           <!-- x and y input with labels saying x or y-->
          <label>X: </label>
          <input type="number" v-model="startPosx" :disabled="!editable" :min="0" :max="gridBaseDimension - 1" style="width: 50px">
          <label>Y: </label>
          <input type="number" v-model="startPosy" :disabled="!editable" :min="0" :max="gridBaseDimension - 1" style="width: 50px">
        </p>
        <p>
          <span>End:</span>
          <br>
          <label>X: </label>
          <input type="number" v-model="endPosx" :disabled="!editable" :min="0" :max="gridBaseDimension - 1" style="width: 50px">
          <label>Y: </label>
          <input type="number" v-model="endPosy" :disabled="!editable" :min="0" :max="gridBaseDimension - 1" style="width: 50px">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { djikstra, BFS, DFS, aStar } from '../algorithms'

function xyToIndex(x, y, gridBaseDimension) { 
  return parseInt(y) * gridBaseDimension + parseInt(x);
}

function indexToXY(index, gridBaseDimension) {
  let x = index % gridBaseDimension;
  let y = Math.floor(index / gridBaseDimension);
  return {x: x, y: y};
}

export default {
  name: 'Home',
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
      editableTypes: [
        'wall',
        'empty',
      ],
      data: [

      ],
      editable: true,
      startPosx: 0,
      startPosy: 0,
      endPosx: 0,
      endPosy: 0,
      solutionPath: [],
      consideredNodes: [],
      consideredInterval: null,
      pathInterval: null,
    }
  },
  beforeMount() {
    let toAdd = 100;
    for (let i = 0; i < toAdd; i++) {
      this.data.push({type: 'empty', id: this.data.length + 1});
    }
    this.data[0].type = 'start';
    this.data[toAdd - 1].type = 'end';
    this.endPosx = indexToXY(toAdd - 1, this.gridBaseDimension).x;
    this.endPosy = indexToXY(toAdd - 1, this.gridBaseDimension).y;
  },
  computed: {
    gridBaseDimension: function() {
      console.log(Math.ceil(Math.sqrt(this.data.length)));
      return Math.ceil(Math.sqrt(this.data.length));
    },
  },
  methods: {
    changeType(x, y, newType) {
      let sqrt = Math.ceil(Math.sqrt(this.data.length));
      let index = (y * sqrt) + x;
      this.data[index].type = newType;
    },
    clicked({x, y}) {
      let sqrt = Math.ceil(Math.sqrt(this.data.length));
      let index = (y * sqrt) + x;
      let curType = this.data[index].type;
      if(!this.editableTypes.includes(curType)) {
        return;
      }
      let curTypeIndex = this.editableTypes.indexOf(curType);
      let newType = this.editableTypes[(curTypeIndex + 1) % this.editableTypes.length];
      this.changeType(x, y, newType);
    },
    doDjikstra(diagonals=false) {
      let start = this.data.find(cell => cell.type === 'start');
      let end = this.data.find(cell => cell.type === 'end');
      if (!start || !end) {
        alert('Please set start and end');
        return;
      }
      this.editable = false;
      let { path, considered } = djikstra(this.data, diagonals);
      this.animate(considered, path)
    },
    doBFS(diagonals=false) {
      let start = this.data.find(cell => cell.type === 'start');
      let end = this.data.find(cell => cell.type === 'end');
      if (!start || !end) {
        alert('Please set start and end');
        return;
      }
      this.editable = false;
      let { path, considered } = BFS(this.data, diagonals);
      this.animate(considered, path)
    },
    doDFS(diagonals=false) {
      let start = this.data.find(cell => cell.type === 'start');
      let end = this.data.find(cell => cell.type === 'end');
      if (!start || !end) {
        alert('Please set start and end');
        return;
      }
      this.editable = false;
      let { path, considered } = DFS(this.data, diagonals);
      this.animate(considered, path)
    },
    doAStar(diagonals=false) {
      let start = this.data.find(cell => cell.type === 'start');
      let end = this.data.find(cell => cell.type === 'end');
      if (!start || !end) {
        alert('Please set start and end');
        return;
      }
      this.editable = false;
      let { path, considered } = aStar(this.data, diagonals);
      this.animate(considered, path)
    },
    animate(considered, path){

      this.solutionPath = path;
      this.consideredNodes = considered;

      this.consideredInterval = setInterval(() => {
        if (considered.length === 0) {
          clearInterval(this.consideredInterval);
          this.pathInterval = setInterval(() => {
            if (path.length === 0) {
              clearInterval(this.pathInterval);
            }
            let cell = path.shift();
            if(cell)
              this.changeType(cell.y, cell.x, 'path');
          }, 50);
        }
        let cell = considered.shift();
        if(cell)
          this.changeType(cell.y, cell.x, 'visited');
      }, 50);

    },
    reset(withWalls=false) {
      this.data.forEach(cell => {
        if (withWalls && cell.type === 'wall') return;
        cell.type = 'empty';
      });
      let startPos = xyToIndex(this.startPosx, this.startPosy, this.gridBaseDimension);
      let endPos = xyToIndex(this.endPosx, this.endPosy, this.gridBaseDimension);
      this.data[startPos].type = 'start';
      this.data[endPos].type = 'end';
      this.solutionPath = [];
      this.consideredNodes = [];
      clearInterval(this.consideredInterval);
      clearInterval(this.pathInterval);
      this.editable = true;
    },
  },
  watch: {
    startPosx: function(newVal) {
      try {
        this.data.filter(cell => cell.type === 'start')[0].type = 'empty';
      }catch(e){
        console.log(e);
      }
      this.data[xyToIndex(newVal, this.startPosy, this.gridBaseDimension)].type = 'start';
    },
    startPosy: function (newVal) {
      try {
        this.data.filter(cell => cell.type === 'start')[0].type = 'empty';
      }catch(e){
        console.log(e);
      }
      this.data[xyToIndex(this.startPosx, newVal, this.gridBaseDimension)].type = 'start';
    },
    endPosx: function(newVal) {
      try {
        this.data.filter(cell => cell.type === 'end')[0].type = 'empty';
      }catch(e){
        
        console.log(e);
      }
      this.data[xyToIndex(newVal, this.endPosy, this.gridBaseDimension)].type = 'end';
    },
    endPosy: function(newVal) {
      try {
        this.data.filter(cell => cell.type === 'end')[0].type = 'empty';
      }catch(e){
        console.log(e);
        
      }
      this.data[xyToIndex(this.endPosx, newVal, this.gridBaseDimension)].type = 'end';
    },

  }
}
</script>

<style scoped>
/* center grid and align right css without flex */
.grid {
  display: inline-block;  
  width: 100%;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
}
.right-aligned-sections {
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
  text-align: right;
}
/* inline-left and inline-right, split into left and right */
.inline-left {
  display: inline-block;
  width: 20%;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
  text-align: center;
}
.inline-right {
  display: inline-block;
  width: 30%;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
  text-align: right;
}

</style>