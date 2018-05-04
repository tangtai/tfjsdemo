import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Runtf from './src/components/run-tf';
import * as tf from '@tensorflow/tfjs';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};
const path = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const localPath = './tfjsmodel/model.json';
export default class App extends Component<Props> {
  componentDidMount() {}

  async loadmodel(p) {
    const model = await this.loadHostedPretrainedModel(p);
    console.log(model);
  }

  async loadHostedPretrainedModel(p) {
    try {
      const model = await tf.loadModel(p);
      return model;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Runtf />
        <View style={styles.loadmodelbuttons}>
          <Button
            title="Load local Model"
            onPress={() => {
              this.loadmodel(localPath);
            }}
          />
          <Button
            title="Load url Model"
            onPress={() => {
              this.loadmodel(path);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loadmodelbuttons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
