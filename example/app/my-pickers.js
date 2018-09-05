import { DatePicker, WheelPicker } from "@delightfulstudio/react-native-wheel-picker-android"
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

const wheelPickerData = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const now = new Date();

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: "center"
    },
    wheelPicker: {
        width: 200,
        height: 150
    }
} );

export default class MyPickers extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <WheelPicker
                    onItemSelected={ this.onItemSelected }
                    isCurved
                    data={ wheelPickerData }
                    visibleItemCount={5}
                    style={ styles.wheelPicker }/>
                <DatePicker
                    date={ now }
                    mode="datetime"
                    onDateChange={ this.onDateSelected }/>
                <DatePicker
                    date={ now }
                    mode="time"
                    onDateChange={ this.onTimeSelected }/>
            </View>
        );
    }

    onItemSelected = event => {
        // do something
    };

    onDateSelected = date => {
        // do something
    };

    onTimeSelected = date => {
        // do something
    };
}
