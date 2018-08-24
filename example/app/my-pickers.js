import {DatePicker, TimePicker, WheelPicker} from 'react-native-wheel-picker-android'
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

const wheelPickerData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const now = new Date();

export default class MyPickers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WheelPicker
          onItemSelected={(event) => this.onItemSelected(event)}
          isCurved
          data={wheelPickerData}
          style={styles.wheelPicker}/>
        <DatePicker
          initDate={now.toISOString()}
          onDateSelected={(date) => this.onDateSelected(date)}/>
        <TimePicker
          initDate={now.toISOString()}
          onTimeSelected={(date) => this.onTimeSelected(date)}/>
      </View>
    );
  }

  onItemSelected(event) {
    // do something
  }

  onDateSelected(date) {
    // do something
  }

  onTimeSelected(date) {
    // do something
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wheelPicker: {
    width: 200,
    height: 150
  }
});
