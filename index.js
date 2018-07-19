import _ from "lodash";
import React, { Component } from "react";

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
