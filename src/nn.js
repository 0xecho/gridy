class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.weights_hl = [];
        this.biase_h = [];
        this.weights_ol = [];
        this.biase_o = [];
        this.initialize_weights();
    }

    initialize_weights() {
        for (let i = 0; i < this.hidden_nodes; i++) {
            this.weights_hl.push([]);
            for (let j = 0; j < this.input_nodes; j++) {
                this.weights_hl[i].push(Math.random() * 2 - 1);
            }
        }
        for (let i = 0; i < this.output_nodes; i++) {
            this.weights_ol.push([]);
            for (let j = 0; j < this.hidden_nodes; j++) {
                this.weights_ol[i].push(Math.random() * 2 - 1);
            }
        }
        for (let i = 0; i < this.hidden_nodes; i++) {
            this.biase_h.push(Math.random() * 2 - 1);
        }
        for (let i = 0; i < this.output_nodes; i++) {
            this.biase_o.push(Math.random() * 2 - 1);
        }
    }

    get_output(inputs) {
        let hidden_outputs = [];
        for (let i = 0; i < this.hidden_nodes; i++) {
            let hidden_node_output = 0;
            for (let j = 0; j < this.input_nodes; j++) {
                hidden_node_output += inputs[j] * this.weights_hl[i][j];
            }
            hidden_node_output += this.biase_h[i];
            hidden_node_output = this.activation_function(hidden_node_output);
            hidden_outputs.push(hidden_node_output);
        }
        let output_outputs = [];
        for (let i = 0; i < this.output_nodes; i++) {
            let output_node_output = 0;
            for (let j = 0; j < this.hidden_nodes; j++) {
                output_node_output += hidden_outputs[j] * this.weights_ol[i][j];
            }
            output_node_output += this.biase_o[i];
            output_node_output = this.activation_function(output_node_output);
            output_outputs.push(output_node_output);
        }
        return this.argmax(output_outputs);
    }
    
    activation_function(x) {
        return 1 / (1 + Math.exp(-x));
    }

    argmax(arr) {
        return arr.indexOf(Math.max(...arr));
    }

    get_random_weight_children(weight_decay) {
        if(weight_decay == undefined) {
            weight_decay = 0.2;
        }
        let new_nn = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
        for (let i = 0; i < this.hidden_nodes; i++) {
            for (let j = 0; j < this.input_nodes; j++) {
                new_nn.weights_hl[i][j] = this.weights_hl[i][j] + (Math.random() * 2 - 1) * weight_decay;
            }
        }
        for (let i = 0; i < this.output_nodes; i++) {
            for (let j = 0; j < this.hidden_nodes; j++) {
                new_nn.weights_ol[i][j] = this.weights_ol[i][j] + (Math.random() * 2 - 1) * weight_decay;
            }
        }
        for (let i = 0; i < this.hidden_nodes; i++) {
            new_nn.biase_h[i] = this.biase_h[i] + (Math.random() * 2 - 1) * weight_decay;
        }
        for (let i = 0; i < this.output_nodes; i++) {
            new_nn.biase_o[i] = this.biase_o[i] + (Math.random() * 2 - 1) * weight_decay;
        }
        return new_nn;
    }            
}

export default NeuralNetwork;