const tf = require('@tensorflow/tfjs-node');

function normalized(data){ 
    x1 = (data[0] - 65.6515) / 27.57740569
    x2 = (data[1] - 115.818) / 34.48227646
    x2 = (data[2] - 108.967) / 38.35462749
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[0] * 17.58940338) + 62.2865
    y2 = (data[1] * 58.6625485) + 104.9495
    y3 = (data[2] * 82.24848996) + 79.65207559
    return [y1, y2, y3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/none31/voltage1/main/public/tfjs_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
