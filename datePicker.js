import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  DatePickerIOS,
  NativeModules,
  Platform,
  Animated,
  Keyboard
} from "react-native";
var RCTDateTimePicker = NativeModules.DateTimePicker;

import styles from "./styles";
import moment from "moment";

const FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm",
  time24: "HH:mm",
  time: "hh:mm a"
};
import _ from "lodash";
const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true
    };
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);

    this.getDate = this.getDate.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: this.getDate(nextProps.date) });
    }
  }

  setModalVisible(visible) {
    const { height, duration } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration
      }).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressMask() {
    if (typeof this.props.onPressMask === "function") {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCancel === "function") {
      this.props.onCancel();
    }
    if (typeof this.props.onCloseModal === "function") {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);

    if (typeof this.props.onConfirm === "function") {
      this.props.onConfirm(this.state.date);
    }
    if (typeof this.props.onCloseModal === "function") {
      this.props.onCloseModal();
    }
  }

  getDate(date = this.props.date) {
    const { mode, minDate, maxDate, is24Hour } = this.props;
    let format = FORMATS[mode];
    if (mode == "time" && is24Hour) format = FORMATS["time24"];

    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return moment(date, format).toDate();
  }

  getDateStr(date = this.props.date) {
    const { mode, is24Hour } = this.props;
    let format = FORMATS[mode];
    if (mode == "time" && is24Hour) format = FORMATS["time24"];

    const dateInstance = date instanceof Date ? date : this.getDate(date);

    if (typeof this.props.getDateStr === "function") {
      return this.props.getDateStr(dateInstance);
    }

    return moment(dateInstance).format(format);
  }

  datePicked() {
    if (typeof this.props.onDateChange === "function") {
      this.props.onDateChange(
        this.getDateStr(this.state.date),
        this.state.date
      );
    }
  }

  getTitleElement() {
    const { date, placeholder, customStyles, allowFontScaling } = this.props;

    if (!date && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles.placeholderText]}
        >
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.dateText, customStyles.dateText]}
      >
        {this.getDateStr()}
      </Text>
    );
  }
  showTimePicker() {
    //date = date || new Date();
    let _this = this;
    let options = _.clone(this.props);
    let date = this.state.date;
    // console.log({ date: moment(date) });
    if (options.mode == "time") {
      options.hour = moment(date).hour();
      options.minute = moment(date).minute();
      options.second = moment(date).second();
    } else {
      options.year = moment(date).get("year");
      options.month = moment(date).get("month");
      options.day = moment(date).get("date");
    }
    // console.log({ options });
    if (options.mode == "time")
      RCTDateTimePicker.showTimePicker(options, function(hour, minute, second) {
        //ƒconsole.log({ hour, minute, second });
        let newDate = new Date();
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        newDate.setSeconds(second);
        //console.log({ newDate });
        if (hour && minute) _this._handleDatePicked(newDate);
        else _this._handleDatePicked(null);
      });
    else
      RCTDateTimePicker.showTimePicker(options, function(year, month, day) {
        // console.log({ year, month, day });
        let newDate = new Date(year, month, day);
        //  console.log({ newDate });
        if (year && month) _this._handleDatePicked(newDate);
        else _this._handleDatePicked(null);
      });
  }

  _handleDatePicked = date => {
    let { onConfirm, onCancel } = this.props;
    if (date) {
      let displayedDate = this.getDate(date);
      this.setState({
        originalDate: date,
        date: displayedDate,
      });
      onConfirm && onConfirm(date);
    } else {
      onCancel && onCancel();
    }
    this._hideDateTimePicker();
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  onDateChange(date) {
    this.setState({
      allowPointerEvents: false,
      date: date
    });
    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true
      });
      clearTimeout(timeoutId);
    }, 200);
  }

  onPressDate() {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      date: this.getDate()
    });

    if (Platform.OS == "ios") {
      this.setModalVisible(true);

      if (typeof this.props.onOpenModal === "function") {
        this.props.onOpenModal();
      }
    } else {
      this.showTimePicker(this.state.date);
    }
  }

  render() {
    const {
      mode,
      style,
      customStyles,
      disabled,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelText,
      title,
      okText,
      cancelColor,
      okColor,
      TouchableComponent,
      testID,
      is24Hour,
      accentColor,
      cancelBtnTestID,
      confirmBtnTestID,
      allowFontScaling,
      locale,
      darkTheme
    } = this.props;

    const dateInputStyle = [
      styles.dateInput,
      customStyles.dateInput,
      disabled && styles.disabled,
      disabled && customStyles.disabled
    ];

    return (
      <TouchableComponent
        style={[styles.dateTouch, style]}
        underlayColor={"transparent"}
        disabled={disabled}
        onPress={this.onPressDate}
        testID={testID}
      >
        <View style={[styles.dateTouchBody, customStyles.dateTouchBody]}>
          {!this.props.hideText ? (
            <View style={dateInputStyle}>{this.getTitleElement()}</View>
          ) : (
            <View />
          )}

          <Modal
            transparent={true}
            animationType="none"
            visible={this.state.modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableComponent
                style={[styles.datePickerMask]}
                activeOpacity={1}
                underlayColor={"#00000077"}
                onPress={this.onPressMask}
              >
                <TouchableComponent underlayColor={"#fff"} style={{ flex: 1 }}>
                  <Animated.View
                    style={[
                      styles.datePickerCon,
                      { height: this.state.animatedHeight },
                      customStyles.datePickerCon,
                      darkTheme ? { backgroundColor: 'lightgrey' } : {}
                    ]}
                  >
                    <View
                      style={[
                        styles.btnsView,
                        accentColor ? { backgroundColor: accentColor } : {}
                      ]}
                    >
                      <TouchableComponent
                        underlayColor={"transparent"}
                        onPress={this.onPressCancel}
                        style={[
                          // styles.btnText,
                          styles.btnCancel,
                          customStyles.btnCancel
                        ]}
                        testID={cancelBtnTestID}
                      >
                        <Text
                          allowFontScaling={allowFontScaling}
                          style={[
                            styles.btnTextText,
                            styles.btnTextCancel,
                            customStyles.btnTextCancel,
                            cancelColor ? { color: cancelColor } : {},
                          ]}
                        >
                          {cancelText}
                        </Text>
                      </TouchableComponent>
                      {title ? (
                        <View style={styles.titleWrapper}>
                          <Text style={styles.title}>{title}</Text>
                        </View>
                      ) : null}
                      <TouchableComponent
                        underlayColor={"transparent"}
                        onPress={this.onPressConfirm}
                        style={[
                          // styles.btnText,
                          styles.btnConfirm,
                          customStyles.btnConfirm
                        ]}
                        testID={confirmBtnTestID}
                      >
                        <Text
                          allowFontScaling={allowFontScaling}
                          style={[
                            styles.btnTextText,
                            customStyles.btnTextConfirm,
                            okColor ? { color: okColor } : {},

                          ]}
                        >
                          {okText}
                        </Text>
                      </TouchableComponent>
                    </View>
                    <View
                      pointerEvents={
                        this.state.allowPointerEvents ? "auto" : "none"
                      }
                      style={[
                        styles.datePicker,
                        darkTheme ? { backgroundColor: "lightgrey" } : {}
                      ]}
                    >
                      <DatePickerIOS
                        date={this.state.date}
                        mode={mode}
                        ref={picker => {
                          this._picker = picker;
                        }}
                        minimumDate={minDate && this.getDate(minDate)}
                        maximumDate={maxDate && this.getDate(maxDate)}
                        onDateChange={this.onDateChange}
                        itemStyle={styles.itemStyle}
                        minuteInterval={minuteInterval}
                        timeZoneOffsetInMinutes={
                          timeZoneOffsetInMinutes
                            ? timeZoneOffsetInMinutes
                            : null
                        }
                        style={[styles.datePickerIOS, customStyles.datePicker]}
                        locale={locale || (is24Hour ? "en_GB" : "en_us")}
                      />
                    </View>
                  </Animated.View>
                </TouchableComponent>
              </TouchableComponent>
            </View>
          </Modal>
        </View>
      </TouchableComponent>
    );
  }
}

DatePicker.defaultProps = {
  mode: "date",
  date: new Date(),
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  okText: "ok",
  cancelText: "cancel",
  //   iconSource: require("./date_icon.png"),
  customStyles: {},

  // whether or not show the icon
  showIcon: true,
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: "",
  TouchableComponent: TouchableHighlight,

  hoursInterval: 1,
  minutesInterval: 10,
  secondInterval: 10,

  is24Hour: false,
  vibrate: false,
  darkTheme: false,
  enableSeconds: false,

  cancelColor:'red',
  okColor:'green',
  accentColor:'blue'
};

DatePicker.propTypes = {
  mode: PropTypes.oneOf(["date", "datetime", "time"]),
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.object
  ]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), //ios
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), //ios
  minTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), //ios
  maxTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), //ios

  customStyles: PropTypes.object,

  height: PropTypes.number, //ios
  duration: PropTypes.number, //ios
  hourInterval: PropTypes.number, //android time picker
  minuteInterval: PropTypes.number, //android time picker
  secondInterval: PropTypes.number, //android time picker

  is24Hour: PropTypes.bool,
  disabled: PropTypes.bool,
  allowFontScaling: PropTypes.bool, //ios

  locale: PropTypes.string, //ios
  placeholder: PropTypes.string,
  title: PropTypes.string,
  format: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okColor: PropTypes.string,
  cancelColor: PropTypes.string,
  accentColor: PropTypes.string, //all

  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  getDateStr: PropTypes.func,
  onDateChange: PropTypes.func, //ios
  onOpenModal: PropTypes.func, //ios
  onCloseModal: PropTypes.func, //ios
  onPressMask: PropTypes.func, //ios

  dismissOnPause: PropTypes.bool, //android
  vibrate: PropTypes.bool, //android
  darkTheme: PropTypes.bool, //android
  enableSeconds: PropTypes.bool, // time picker
  enableMinutes: PropTypes.bool, // time picker
  
  showYearPickerFirst: PropTypes.bool, //android date picker

  scrollOrientation: PropTypes.oneOf(["vertical", "horizontal"]), //android date picker
  disabledTimes: PropTypes.array //android time picker
};

export default DatePicker;
