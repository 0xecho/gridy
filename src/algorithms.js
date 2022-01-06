function inflateGrid(grid) {
    // Turn 1D array of length n^2 into 2D array of size n x n
    var inflatedGrid = [];
    let n = Math.sqrt(grid.length);
    for (var i = 0; i < n; i++) {
        let row = [];
        for (var j = 0; j < n; j++) {
            row.push(grid[i * n + j]);
            let node = grid[i * n + j];
            node.x = i;
            node.y = j;
        }
        inflatedGrid.push(row);
    }
    return inflatedGrid;
}

function getNeighbors(node, grid, diagonals=false) {
    // Returns a list of nodes that are adjacent to the left, right, top, and bottom of the node, and their type is 'empty'
    let allowedTypes = ['empty', 'end', 'start'];
    var neighbors = [];
    if (node.x > 0 && allowedTypes.includes(grid[node.x - 1][node.y].type)) {
        neighbors.push(grid[node.x - 1][node.y]);
    }
    if (node.x < grid.length - 1 && allowedTypes.includes(grid[node.x + 1][node.y].type)) {
        neighbors.push(grid[node.x + 1][node.y]);
    }
    if (node.y > 0 && allowedTypes.includes(grid[node.x][node.y - 1].type)) {
        neighbors.push(grid[node.x][node.y - 1]);
    }
    if (node.y < grid.length - 1 && allowedTypes.includes(grid[node.x][node.y + 1].type)) {
        neighbors.push(grid[node.x][node.y + 1]);
    }
    if (diagonals) {
        if (node.x > 0 && node.y > 0 && allowedTypes.includes(grid[node.x - 1][node.y - 1].type)) {
            neighbors.push(grid[node.x - 1][node.y - 1]);
        }
        if (node.x < grid.length - 1 && node.y < grid.length - 1 && allowedTypes.includes(grid[node.x + 1][node.y + 1].type)) {
            neighbors.push(grid[node.x + 1][node.y + 1]);
        }
        if (node.x > 0 && node.y < grid.length - 1 && allowedTypes.includes(grid[node.x - 1][node.y + 1].type)) {
            neighbors.push(grid[node.x - 1][node.y + 1]);
        }
        if (node.x < grid.length - 1 && node.y > 0 && allowedTypes.includes(grid[node.x + 1][node.y - 1].type)) {
            neighbors.push(grid[node.x + 1][node.y - 1]);
        }
    }

    return neighbors;
}

function djikstra(grid, diagonals=false) {
    // Grid: 1D array of nodes, the array is a flattened representation of the 2D grid
    // Source: a node in grid with type 'start'
    // Target: a node in grid with type 'end'
    // Returns: a list of nodes all nodes 
    
    
    var start = grid.find(node => node.type === 'start');
    var end = grid.find(node => node.type === 'end');
    var inflatedGrid = inflateGrid(grid);
    var queue = [start];
    var considered = [];
    var distances = {};
    let path = [];
    var parents = {};
    distances[start.id] = 0;
    parents[start.id] = start;
    while(queue.length > 0){
        var current = queue.shift();
        if(current.id === end.id){
            // We found the end!
            path = [end];
            var currentParent = parents[end.id];
            while(currentParent.id !== start.id){
                path.push(currentParent);
                currentParent = parents[currentParent.id];
            }
            path.push(start);
            break
        }
        considered.push(current);
        var neighbors = getNeighbors(current, inflatedGrid, diagonals);
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!considered.includes(neighbor) && !queue.includes(neighbor)){
                queue.push(neighbor);
                distances[neighbor.id] = distances[current.id] + 1;
                parents[neighbor.id] = current;
            }
        }
    }

    return {
        path: path.reverse(),
        considered: considered,
    }
}

function BFS(grid, diagonals=false) {
    // Grid: 1D array of nodes, the array is a flattened representation of the 2D grid
    // Source: a node in grid with type 'start'
    // Target: a node in grid with type 'end'
    // Returns: a list of nodes all nodes 
    
    
    var start = grid.find(node => node.type === 'start');
    var end = grid.find(node => node.type === 'end');
    var inflatedGrid = inflateGrid(grid);
    var queue = [start];
    var considered = [];
    var distances = {};
    let path = [];
    var parents = {};
    distances[start.id] = 0;
    parents[start.id] = start;
    while(queue.length > 0){
        var current = queue.shift();
        if(current.id === end.id){
            // We found the end!
            path = [end];
            var currentParent = parents[end.id];
            while(currentParent.id !== start.id){
                path.push(currentParent);
                currentParent = parents[currentParent.id];
            }
            path.push(start);
            break
        }
        considered.push(current);
        var neighbors = getNeighbors(current, inflatedGrid, diagonals);
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!considered.includes(neighbor) && !queue.includes(neighbor)){
                queue.push(neighbor);
                distances[neighbor.id] = distances[current.id] + 1;
                parents[neighbor.id] = current;
            }
        }
    }
    return {
        path: path.reverse(),
        considered: considered,
    }
}

function DFS(grid, diagonals=false) {
    // Grid: 1D array of nodes, the array is a flattened representation of the 2D grid
    // Source: a node in grid with type 'start'
    // Target: a node in grid with type 'end'
    // Returns: a list of nodes all nodes 
    
    
    var start = grid.find(node => node.type === 'start');
    var end = grid.find(node => node.type === 'end');
    var inflatedGrid = inflateGrid(grid);
    var stack = [start];
    var considered = [];
    var distances = {};
    let path = [];
    var parents = {};
    distances[start.id] = 0;
    parents[start.id] = start;
    while(stack.length > 0){
        console.log("Stack: ", stack.map(node => node.id));
        var current = stack.pop();
        if(current.id === end.id){
            // We found the end!
            path = [end];
            var currentParent = parents[end.id];
            while(currentParent.id !== start.id){
                path.push(currentParent);
                currentParent = parents[currentParent.id];
            }
            path.push(start);
            break
        }
        considered.push(current);
        var neighbors = getNeighbors(current, inflatedGrid, diagonals);
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!considered.includes(neighbor) && !stack.includes(neighbor)){
                stack.push(neighbor);
                distances[neighbor.id] = distances[current.id] + 1;
                parents[neighbor.id] = current;
            }
        }
    }
    return {
        path: path.reverse(),
        considered: considered,
    }
}

function aStar(grid, diagonals=false) {
    // Grid: 1D array of nodes, the array is a flattened representation of the 2D grid
    // Source: a node in grid with type 'start'
    // Target: a node in grid with type 'end'
    // Returns: a list of nodes all nodes 
    function heuristic(node) {
        // Manhattan distance
        return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
    }
    
    var start = grid.find(node => node.type === 'start');
    var end = grid.find(node => node.type === 'end');
    var inflatedGrid = inflateGrid(grid);
    var queue = [start];
    var considered = [];
    var distances = {};
    let path = [];
    var parents = {};
    distances[start.id] = 0;
    parents[start.id] = start;
    start.f = heuristic(start);
    while(queue.length > 0){
        console.log("Queue: ", queue.map(node => node.id));
        // get the node with the lowest f score
        var current = queue.sort((a, b) => a.f - b.f).shift();
        if(current.id === end.id){
            // We found the end!
            path = [end];
            var currentParent = parents[end.id];
            while(currentParent.id !== start.id){
                path.push(currentParent);
                currentParent = parents[currentParent.id];
            }
            path.push(start);
            break
        }
        considered.push(current);
        var neighbors = getNeighbors(current, inflatedGrid, diagonals);
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!considered.includes(neighbor) && !queue.includes(neighbor)){
                queue.push(neighbor);
                distances[neighbor.id] = distances[current.id] + 1;
                parents[neighbor.id] = current;
                neighbor.f = distances[neighbor.id] + heuristic(neighbor);
            }
        }
    }
    return {
        path: path.reverse(),
        considered: considered,
    }

}

module.exports = {
    djikstra: djikstra,
    BFS: BFS,
    DFS: DFS,
    aStar: aStar,
};
