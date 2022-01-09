<template>
<!-- scrollable -->
<div class="grid-container">
  <div class="grid" id="container" :style="{width: gridBaseWidth + 'px', height: gridBaseWidth + 'px'}">
    <div class="cell" :class="cell.type + (editable ? ' pointer' : '' )" :style="{'width': cellWidth + 'px', 'height': cellWidth + 'px', 'background-color': cellColor(index)}" v-for="cell, index in myData" :key="index" @click="clickCell(index)">
        <slot :cell="cell"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    data: Array,
    editable: Boolean,
  },
  mounted() {
    // let sqrt = Math.ceil(Math.sqrt(this.data.length));
    // console.log(sqrt);
    // let remainder = Math.abs(this.data.length - (sqrt * sqrt));
    // console.log(remainder);
    // for (let i = 0; i < remainder; i++) {
    //   this.myData.push({type: 'empty', id: this.data.length + 1});
    // }  
    console.log(this.gridBaseDimension);
  },
  data() {
    return {
      gridBaseDimension: Math.ceil(Math.sqrt(this.data.length)),
      gridBaseWidth: 550,
      myData: this.data,
    }
  },
  computed: {
    cellWidth: function() {
      return this.gridBaseWidth / this.gridBaseDimension;
    },
    cellHeight: function() {
      return this.gridBaseWidth / this.gridBaseDimension;
    },
  },
  methods: {
    clickCell(cell) {
      if(this.editable) {
        let x = cell % this.gridBaseDimension;
        let y = Math.floor(cell / this.gridBaseDimension);
        this.$emit('onClick', {
          x: x,
          y: y,
        });
      }
    },cellColor: function(cellIndex) {
      let cell = this.myData[cellIndex];
      if(!cell) {
        return '#fff';
      }
      if (cell.type === 'empty') {
        return '#fff';
      } else if (cell.type === 'start') {
        return '#00ff00';
      } else if (cell.type === 'end') {
        return '#ff0000';
      } else if (cell.color) {
        return cell.color;
      } else if (cell.type === 'wall') {
        return '#000000';
      } else if (cell.type === 'path') {
        return '#0000ff';
      } else if (cell.type === 'visited') {
        return 'lightgray';
      } else {
        return '#ffffff';
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* create a centered square grid border for the grid, the grid should have width  */
#container {
	position: relative;
	top: 10px;
	font-size: 0;
	margin:auto;
	height:960px;
	width:960px;
	padding: 0;
	border: none;
}

.cell {
	margin:0;
	padding:0;
	border:none;
	outline:1px solid #000;
	display:inline-block;
}

.empty {
	background-color: #fff;
}

.player {
	background-color: #42b983;
}

.enemy {
	background-color: #ff0000;
}

.wall {
	background-color: #000000;
}

.coin {
	background-color: #ffcc00;
}

.start {
  background-color: #42b983;
}

.end {
  background-color: #ff0000;
}

.visited {
  background-color: #ccc; 
}

.path {
  background-color: #42b983;
}

.pointer {
  cursor: pointer;
}

.grid-container {
  
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 1px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 10px;
}

</style>
