/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  Switch,
  Slider,
  View,
  Dimensions
} from "react-native";
import TimePicker from "./datePicker";
import moment from "moment";
let { width, height } = Dimensions.get("window");
export default class App extends Component {
  constructor(props) {
    super(props);
    let selectedDate = moment();
    this.state = {
      mode: "date",
      is24Hour: true,
      accentColor: "blue",
      minuteInterval: 5,
      disabled: false,
      okColor: "green",
      cancelColor: "red",
      darkTheme: false,
      showYearPickerFirst: false,
      enableSeconds: false,
      scrollOrientation: "horizontal",
      selectedDate
    };
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
  }
  renderDate(date) {
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MMM");
    let day = moment(date).format("DD");
    return (
      <View style={styles.dateWrapper}>
        <View
          style={[
            styles.dateElementView,
            {
              marginRight: 10
            }
          ]}
        >
          <Text style={styles.dateElement}>{month}</Text>
        </View>
        <View
          style={[
            styles.dateElementView,
            {
              marginRight: 10
            }
          ]}
        >
          <Text style={styles.dateElement}>{day}</Text>
        </View>
        <View style={styles.dateElementView}>
          <Text style={styles.dateElement}>{year}</Text>
        </View>
      </View>
    );
  }
  _handleDatePicked(date) {
    console.log("selectedDate", date);
    this.setState({ selectedDate: date });
  }
  _hideDateTimePicker() {
    console.log("canceled");
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  setAccentColor() {
    this.setState({ accentColor: this.getRandomColor() });
  }
  setOkColor() {
    this.setState({ okColor: this.getRandomColor() });
  }
  setCancelColor() {
    this.setState({ cancelColor: this.getRandomColor() });
  }
  render() {
    return (
      <View style={styles.container}>
        <TimePicker
          renderDate={date => this.renderDate(date)}
          accentColor={this.state.accentColor}
          okColor={this.state.okColor}
          cancelColor={this.state.cancelColor}
          okText={"OK"}
          cancelText={"CANCEL"}
          showYearPickerFirst={this.state.showYearPickerFirst}
          minuteInterval={this.state.minuteInterval}
          enableSeconds={this.state.enableSeconds}
          mode={this.state.mode}
          darkTheme={this.state.darkTheme}
          is24Hour={this.state.is24Hour}
          disabled={this.state.disabled}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          date={this.state.selectedDate}
          placeholder={this.state.mode == "date" ? "YY/DD/MM" : "HH:MM"}
          title={`Navybits ${
            this.state.mode == "date" ? "Date Picker" : "Time Picker"
          }`}
          height={300}
          disabledTimes={[
            { hour: 22, minute: 10 },
            { hour: 13, minute: 20 }
            // { hour: 10, minute: 10, second: 20 }
          ]}
          minTime={new Date()}
          minDate={new Date()}
          scrollOrientation={this.state.scrollOrientation}
          ref="TimePicker"
        />
        <View style={styles.row}>
          <Text style={styles.switchText}>Not disabled</Text>
          <View style={styles.centerView}>
            <Switch
              onValueChange={val => {
                this.setState({ disabled: val });
              }}
              value={this.state.disabled}
            />
          </View>
          <Text style={styles.switchText}>Disabled</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.switchText}>Time</Text>
          <View style={styles.centerView}>
            <Switch
              onValueChange={val => {
                this.setState({ mode: val ? "date" : "time" });
              }}
              value={this.state.mode == "date" ? true : false}
            />
          </View>
          <Text style={styles.switchText}>Date</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.switchText}>light theme</Text>
          <View style={styles.centerView}>
            <Switch
              onValueChange={val => {
                this.setState({ darkTheme: val });
              }}
              value={this.state.darkTheme}
            />
          </View>
          <Text style={styles.switchText}>dark theme</Text>
        </View>
        {this.state.mode == "time" ? (
          <View style={styles.row}>
            <Text style={styles.switchText}>not is24Hour</Text>
            <View style={styles.centerView}>
              <Switch
                onValueChange={val => {
                  this.setState({ is24Hour: val });
                }}
                value={this.state.is24Hour}
              />
            </View>
            <Text style={styles.switchText}>is24Hour</Text>
          </View>
        ) : null}
        {Platform.OS == "android" && this.state.mode == "date" ? (
          <View style={styles.row}>
            <Text style={styles.switchText}>Vertical</Text>
            <View style={styles.centerView}>
              <Switch
                onValueChange={val => {
                  this.setState({
                    scrollOrientation: val ? "horizontal" : "vertical"
                  });
                }}
                value={
                  this.state.scrollOrientation == "horizontal" ? true : false
                }
              />
            </View>
            <Text style={styles.switchText}>Horizontal</Text>
          </View>
        ) : null}
        {Platform.OS == "android" && this.state.mode == "time" ? (
          <View style={styles.row}>
            <Text style={styles.switchText}>do not enableSeconds</Text>
            <View style={styles.centerView}>
              <Switch
                onValueChange={val => {
                  this.setState({
                    enableSeconds: val
                  });
                }}
                value={this.state.enableSeconds}
              />
            </View>
            <Text style={styles.switchText}>enableSeconds</Text>
          </View>
        ) : null}
        {Platform.OS == "android" && this.state.mode == "date" ? (
          <View style={styles.row}>
            <Text style={styles.switchText}>do not showYearPickerFirst</Text>
            <View style={styles.centerView}>
              <Switch
                onValueChange={val => {
                  this.setState({
                    showYearPickerFirst: val
                  });
                }}
                value={this.state.showYearPickerFirst}
              />
            </View>
            <Text style={styles.switchText}>showYearPickerFirst</Text>
          </View>
        ) : null}
        {this.state.mode == "time" ? (
          <View style={styles.row}>
            <Text style={styles.switchText}>{"Minute Interval"}</Text>
            <View style={styles.centerView}>
              <Slider
                style={{ width: 100 }}
                thumbTintColor={"green"}
                minimumValue={0}
                maximumValue={20}
                onValueChange={val => {
                  this.setState({
                    minuteInterval: val
                  });
                }}
                step={5}
                value={this.state.minuteInterval}
              />
            </View>
            <Text style={styles.switchText}>{this.state.minuteInterval}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setAccentColor()}
        >
          <Text>Set Accent Color to random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setOkColor()}
        >
          <Text>Set Ok Color to random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setCancelColor()}
        >
          <Text>Set Cancel Color to random</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    alignSelf: "stretch",
    margin: 5
  },
  button: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    backgroundColor: "lightgray"
  },
  switchText: {
    flex: 1,
    textAlign: "center"
  },
  centerView: {
    flex: 1,
    alignItems: "center"
  },
  dateElementView: {
    flex: 1,
    height: 50,
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  dateElement: {
    color: "navy"
  },
  dateWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    width: width - 40,
    height: 50,
    justifyContent: "space-between"
  }
});
