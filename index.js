import _ from "lodash";
import moment from "moment";
import React, { Component } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import DatePicker from "./datePicker";

export default class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  render() {
    return <DatePicker ref={"Picker"} {...this.props} />;
  }
}
