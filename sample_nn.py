import random
import itertools

# random.seed(1)
class Grid:
    # An nxn grid of cells, 
    # Each cell can be one of the following:
    #  0: Empty
    #  1: Wall
    #  2: Start
    #  3: End
    #  4: Visited
    #  5: Path
    #  6: Player

    def __init__(self, n):
        self.n = n
        self.grid = [[0] * n for i in range(n)]
        self.start = (0,0)
        self.end = (n-1, n-1)
        self.grid[self.start[0]][self.start[1]] = 2
        self.grid[self.end[0]][self.end[1]] = 3
        self.players = {
            # id: [current_pos, path]
        }
        self.PLAYER_ID = 0
    
    def __str__(self):
        s = ""
        for row in self.grid:
            s += " ".join(str(x) for x in row) + "\n"
        return s
    
    def add_player(self):
        self.players[self.PLAYER_ID] = [self.start, []]
        self.PLAYER_ID += 1
    
    def dist(self, a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def get_scores(self):
        scores = {}
        for player in self.players:
            scores[player] = self.dist(self.players[player][0], self.end)
        return scores
    
    def move_player(self, player_id, dir):
        dirX = [-1, 0, 1, 0]
        dirY = [0, 1, 0, -1]
        cur_pos = self.players[player_id][0]
        new_pos = (cur_pos[0] + dirX[dir], cur_pos[1] + dirY[dir])
        # check if new_pos is valid, is in grid
        if new_pos[0] < 0 or new_pos[0] >= self.n or new_pos[1] < 0 or new_pos[1] >= self.n:
            return False
        self.players[player_id][0] = new_pos
        self.players[player_id][1].append(cur_pos)
        self.grid[cur_pos[0]][cur_pos[1]] = 4
        self.grid[new_pos[0]][new_pos[1]] = 6

def getNextMove(grid, x, y):
    # Get the next move for the player at (x, y) from the neural network
    # Return a tuple (x, y)
    pass

class NeuralNetwork:
    def __init__(self, input_nodes, hidden_nodes, output_nodes):
        self.input_nodes = input_nodes
        self.hidden_nodes = hidden_nodes
        self.output_nodes = output_nodes

        # Initialize weights
        self.weights_hl = []
        for i in range(self.hidden_nodes):
            self.weights_hl.append([])
            for j in range(self.input_nodes):
                self.weights_hl[i].append(random.random())
        self.biase_h = []
        for i in range(self.hidden_nodes):
            self.biase_h.append(random.random())

        self.weights_ol = []
        for i in range(self.output_nodes):
            self.weights_ol.append([])
            for j in range(self.hidden_nodes):
                self.weights_ol[i].append(random.random())
        self.biase_o = []
        for i in range(self.output_nodes):
            self.biase_o.append(random.random())

    def get_output(self, inputs):
        # Get the output of the neural network for the given inputs
        # Return a list of outputs        
        hidden_outputs = []
        for hidden_node_idx in range(self.hidden_nodes):
            hidden_node_output = 0
            for input_node_idx in range(self.input_nodes):
                hidden_node_output += inputs[input_node_idx] * self.weights_hl[hidden_node_idx][input_node_idx]
            hidden_node_output += self.biase_h[hidden_node_idx]
            hidden_node_output = self.activation_function(hidden_node_output)
            hidden_outputs.append(hidden_node_output)            
        
        final_outputs = []
        for output_node_idx in range(self.output_nodes):
            output_node_output = 0
            for hidden_node_idx in range(self.hidden_nodes):
                output_node_output += hidden_outputs[hidden_node_idx] * self.weights_ol[output_node_idx][hidden_node_idx]
            output_node_output += self.biase_o[output_node_idx]
            final_outputs.append(output_node_output)
        return self.argmax(final_outputs)

    def activation_function(self, x):
        return max(0, x)
    
    def argmax(self, outputs):
        return outputs.index(max(outputs))
    
    def get_random_weight_children(self):
        weight_decay = 0.8
        new_weights_hl = []
        for i in range(self.hidden_nodes):
            new_weights_hl.append([])
            for j in range(self.input_nodes):
                new_weights_hl[i].append((self.weights_hl[i][j] + random.random() * weight_decay) * random.choice([-1, 1]))
        new_biase_h = []
        for i in range(self.hidden_nodes):
            new_biase_h.append(self.biase_h[i] + random.random() * weight_decay * random.choice([-1, 1]))
        new_weights_ol = []
        for i in range(self.output_nodes):
            new_weights_ol.append([])
            for j in range(self.hidden_nodes):
                new_weights_ol[i].append((self.weights_ol[i][j] + random.random() * weight_decay) * random.choice([-1, 1]))
        new_biase_o = []
        for i in range(self.output_nodes):
            new_biase_o.append(self.biase_o[i] + random.random() * weight_decay * random.choice([-1, 1]))
        new_nn = NeuralNetwork(self.input_nodes, self.hidden_nodes, self.output_nodes)
        new_nn.weights_hl = new_weights_hl
        new_nn.biase_h = new_biase_h
        new_nn.weights_ol = new_weights_ol
        new_nn.biase_o = new_biase_o
        return new_nn

ticks = 50
generations = 30
n = 10
NUM_OF_PLAYERS = 10
CUT_OFF_PERCENT = 0.2

if __name__ == "__main__":

    player_nn_map = {
    }
    for generation in range(generations):
        if player_nn_map :
            player_scores = grid.get_scores().items()
            player_scores = sorted(player_scores, key=lambda x: x[1], reverse=True)
            best_players = player_scores[:int(CUT_OFF_PERCENT * len(player_scores))]
            worst_players = player_scores[-1*int(CUT_OFF_PERCENT * len(player_scores)):]
            print(best_players)
            print(worst_players)
            print()
            grid = Grid(n)
            new_player_nn_map = {}
            for player in best_players:
                grid.add_player()
                new_player_nn_map[grid.PLAYER_ID - 1] = player_nn_map[player[0]]
            for player in worst_players:
                grid.add_player()
                new_player_nn_map[grid.PLAYER_ID - 1] = player_nn_map[player[0]]
            remaining_num_of_players = NUM_OF_PLAYERS - len(new_player_nn_map)
            for player, _ in zip(itertools.cycle(best_players), range(remaining_num_of_players)):
                grid.add_player()
                player_nn = player_nn_map[player[0]]
                new_player_nn = player_nn.get_random_weight_children()
                new_player_nn_map[grid.PLAYER_ID - 1] = new_player_nn
            player_nn_map = new_player_nn_map
            # 1/0

        if not player_nn_map:
            grid = Grid(n)
            for i in range(NUM_OF_PLAYERS):
                grid.add_player()
                player_nn_map[i] = NeuralNetwork(4, 4, 4)
        
        for _ in range(ticks):
            for player_id, player_nn in player_nn_map.items():
                cur_pos = grid.players[player_id][0]
                inputs = [0] * 4
                inputs[0] = cur_pos[0]
                inputs[1] = cur_pos[1]
                inputs[2] = grid.end[0]
                inputs[3] = grid.end[1]
                dir = player_nn.get_output(inputs)
                grid.move_player(player_id, dir)
                # print("Grid: ", grid)
                # print("Player: ", player_id, " moved to ", dir)
                # print("Scores: ", grid.get_scores())
                # print("\n")
    # BEst player with score
    print(grid)
    best_player = min(grid.get_scores().items(), key=lambda x: x[1])
    print("Best player: ", best_player)
    print("Best player nn weighths hl: ", player_nn_map[best_player[0]].weights_hl)
    print("Best player nn biase h: ", player_nn_map[best_player[0]].biase_h)
    print("Best player nn weighths ol: ", player_nn_map[best_player[0]].weights_ol)
    print("Best player nn biase o: ", player_nn_map[best_player[0]].biase_o)
