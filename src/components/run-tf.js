import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Chart from './chart';
import * as tf from '@tensorflow/tfjs';

export default class Runtf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainedModel: null,
      modelStatus: 'Model-not-trained',
      predictValues: null
    };
  }

  async trainModel() {
    const model = await tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
    this.setState({ modelStatus: 'Model-training ...' });
    const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], [14, 1]);
    const ys = tf.tensor2d([2, 4, 6, 7, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28], [14, 1]);
    await model.fit(xs, ys, { epochs: 2000 });
    this.setState({ trainedModel: model, modelStatus: 'Model-trained' });
  }

  predictFuture() {
    const model = this.state.trainedModel;
    if (model) {
      const predictValue_1 = model.predict(tf.tensor2d([15], [1, 1])).dataSync();
      const predictValue_2 = model.predict(tf.tensor2d([16], [1, 1])).dataSync();
      const predictValue_3 = model.predict(tf.tensor2d([17], [1, 1])).dataSync();
      const predictValues = [predictValue_1[0], predictValue_2[0], predictValue_3[0]];
      this.setState({ predictValues: predictValues });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Chart predictData={this.state.predictValues} />
        <Text>{this.state.modelStatus}</Text>
        <Button onPress={this.trainModel.bind(this)} title="Train Staff" />
        <Button onPress={this.predictFuture.bind(this)} title="Predict Future" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  tf: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 5
  }
});
