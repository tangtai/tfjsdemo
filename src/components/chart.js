import React, { Component } from 'react';
import { View } from 'react-native';
import { LineChart, XAxis } from 'react-native-svg-charts';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 },
        { x: 5, y: 10 },
        { x: 6, y: 12 },
        { x: 7, y: 14 },
        { x: 8, y: 16 },
        { x: 9, y: 18 },
        { x: 10, y: 20 },
        { x: 11, y: 22 },
        { x: 12, y: 24 },
        { x: 13, y: 26 },
        { x: 14, y: 28 },
        { x: 15, y: null },
        { x: 16, y: null },
        { x: 17, y: null }
      ]
    };
  }

  componentWillReceiveProps() {
    this.setNewData(this.props.predictData);
  }

  setNewData(inputdata) {
    if (inputdata) {
      console.log(inputdata);
      this.setState({
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 8 },
          { x: 5, y: 10 },
          { x: 6, y: 12 },
          { x: 7, y: 14 },
          { x: 8, y: 16 },
          { x: 9, y: 18 },
          { x: 10, y: 20 },
          { x: 11, y: 22 },
          { x: 12, y: 24 },
          { x: 13, y: 26 },
          { x: 14, y: 28 },
          { x: 15, y: inputdata[1] },
          { x: 16, y: inputdata[1] },
          { x: 17, y: inputdata[1] }
        ]
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 0.8 }}>
        <LineChart
          style={{ height: 300, width: 300, paddingBottom: 30 }}
          data={this.state.data}
          xAccessor={({ item }) => item.x}
          yAccessor={({ item }) => item.y}
          svg={{ strokeWidth: 5, stroke: 'rgb(134, 65, 244)' }}
          strokeWidth={20}
          contentInset={{ top: 20, bottom: 20 }}
          showGrid={false}
        />
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={this.state.data}
          xAccessor={({ item }) => item.x}
          formatLabel={value => value}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10 }}
        />
      </View>
    );
  }
}
