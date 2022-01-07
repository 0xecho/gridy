// create a neural network, with the given number of input, hidden, and output nodes, use numjs for the math
// inputs: current node's x and y coordinates, end node's x and y coordinates
// outputs: direction to move

export default function nn(player, end){
    var inputs = [player.x, player.y, end.x, end.y];
    let weights = []
    for(let i = 0; i < 3; i++){
        weights.push(Math.random())
    }

    let outputWeights = [
    ]
    for (let i = 0; i < 4; i++) {
        outputWeights.push(Math.random())
    }
    
    let layer = [
        inputs[0] * weights[0] + inputs[1] * weights[0] + inputs[2] * weights[0] + inputs[3] * weights[0],
        inputs[0] * weights[1] + inputs[1] * weights[1] + inputs[2] * weights[1] + inputs[3] * weights[1],
        inputs[0] * weights[2] + inputs[1] * weights[2] + inputs[2] * weights[2] + inputs[3] * weights[2]
    ]

    let output = [
        layer[0] * outputWeights[0] + layer[1] * outputWeights[0] + layer[2] * outputWeights[0],
        layer[0] * outputWeights[1] + layer[1] * outputWeights[1] + layer[2] * outputWeights[1],
        layer[0] * outputWeights[2] + layer[1] * outputWeights[2] + layer[2] * outputWeights[2],        
        layer[0] * outputWeights[3] + layer[1] * outputWeights[3] + layer[2] * outputWeights[3]
    ]

    // console.log("Inputs: ", inputs)
    // console.log("Weights: ", weights)
    // console.log("Output Weights: ", outputWeights)
    // console.log("Layer: ", layer)
    // console.log("Output: ", output)

    let max = 0;
    let maxIndex = 0;
    for(let i = 0; i < output.length; i++){
        if(output[i] > max){
            max = output[i];
            maxIndex = i;
        }
    }
    return {
        direction: maxIndex,
        playerWeight: weights,
        outputWeight: outputWeights
    }
}
