
# react-native-navybits-date-time-picker
This project is a modified version of [react-native-datePicker](https://github.com/xgfe/react-native-datepicker).
It solves the need to set a *MinuteInterval* on android using the native picker [`MaterialDateTimePicker`](https://github.com/wdullaer/MaterialDateTimePicker)
 

## Getting started

`$ npm install react-native-navybits-date-time-picker --save`

### Manual installation
#### iOS
you don't need to do anything 
#### Android
1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNNavybitsDateTimePickerPackage;` to the imports at the top of the file
  - Add `new RNNavybitsDateTimePickerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-navybits-date-time-picker'
  	project(':react-native-navybits-date-time-picker').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-navybits-date-time-picker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-navybits-date-time-picker')
  	```

## Example 
Please refer to example.js
![android](https://github.com/Navybits/react-native-navybits-date-time-picker/img/nbPicker_android.gif)
![ios](https://github.com/Navybits/react-native-navybits-date-time-picker/img/NBPicker.gif)

 

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| style | - | `object` | Specify the style of the DatePicker button, eg. width, height...  |
| date | - | <code>string &#124; date &#124; Moment instance</code> | Specify the display date of DatePicker. `string` type value must match the specified format |
| mode | 'date' | `enum` | The `enum` of `date` and `time` for android and ios, , `datetime` for ios only|
| format | 'YYYY-MM-DD' | `string` | Specify the display format of the date, which using [moment.js](http://momentjs.com/). The default value change according to the mode. |
| okText | 'ok' | `string` | Specify the confirm text |
| cancelText | 'cancel' | `string` | Specify cancel text |
| minDate | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| maxDate | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| minTime | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| maxTime | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| duration | 300 | `number` | Specify the animation duration of datepicker on ios.|
| hourInterval | 1 | `number` | Controls hours interval on android time picker.|
| minuteInterval | 10 | `number` | Controls minutes interval on time picker.(ios and android)|
| secondInterval | 10 | `number` | Controls seconds interval on android time picker.|
| okColor | 'green' | `string` | Controls ok Text color.|
| cancelColor | 'red' | `string` | Controls cancel Text color.|
| accentColor | 'blue' | `string` | Controls date/Time header color.|
| darkTheme | false | `boolean` | Controls date/Time body color.(light or dark)|
| vibrate | false | `boolean` | Set whether the dialogs should vibrate the device when a selection is made. (android only)|
| dismissOnPause | false | `boolean` | Set whether the picker dismisses itself when the parent Activity is paused or whether it recreates itself when the Activity is resumed.(android only)|
| enableSeconds | false | `boolean` | Allows you to enable or disable a seconds and minutes picker on the TimepickerDialog. Enabling the seconds picker, implies enabling the minutes picker. Disabling the minute picker will disable the seconds picker. The last applied setting will be used. By default enableSeconds = false and enableMinutes = true..(android only)|
| enableMinutes | true | `boolean` | Allows you to enable or disable a minutes on the TimepickerDialog. (android only)|
| showYearPickerFirst | false | `boolean` | Show the year picker first, rather than the month and day picker.. (android only)|
| scrollOrientation | 'horizontal' | `string` | Determines whether months scroll Horizontal or Vertical. Defaults to Horizontal for the v2 layout and Vertical for the v1 layout (android only)|
| disabledTimes | - | `array` | You can pass in an array of objects, each object contains hour limiter minute and or seconds limiter. These values will not be available for selection. (android only)|
| customStyles | - | `object` | The hook of customize datepicker style, same as the native style. `dateTouchBody`, `dateInput`...|
| hideText | false | `boolean` | hides the displayed date/Time |
| disabled | false | `boolean` | Disable date/Time picker button |
| is24Hour | - | `boolean` | Set the TimePicker is24Hour flag. The default value depend on `format`. |
| allowFontScaling | true | `boolean` | Set to false to disable font scaling for every text component. |
| placeholder | '' | `string` | The placeholder show when this.props.date is falsy |
| onDateChange | - | `function` | This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by [moment.js](http://momentjs.com/) with the given format property. |
| onOpenModal | - | `function` | This is called when the DatePicker Modal opens. (ios only) |
| onCloseModal | - | `function` | This is called when the DatePicker Modal closes. (ios only) |
| onPressMask | - | `function` | This is called when clicking the ios modal mask. (ios only) |
| TouchableComponent | `TouchableHighlight` | `Component` | Replace the `TouchableHighlight` with a custom `Component`. For example : `TouchableOpacity` |
| getDateStr | - | Function | A function to override how to format the date into a `String` for display, receives a `Date` instance

### Property `customStyles` available keys

* appearance: `dateInput`, `disabled`, `dateTouchBody`, `placeholderText`, `dateText`
* ios select panel: `datePickerCon`, `datePicker`, `btnConfirm`, `btnTextConfirm`, `btnCancel`, `btnTextCancel`


## Instance Methods

| Method  | Params  | Description |
| :------------ |:---------------:| :---------------:|
| onConfirm | - | Manually open the date picker panel |
| onCancel | - | Manually close the date picker panel like, similarly pressing cancel btn |



## Usage
```javascript
import TimePicker from "react-native-navybits-date-time-picker";

 <TimePicker
          accentColor={this.state.accentColor}
          okColor={this.state.okColor}
          cancelColor={this.state.cancelColor}
          okText={"OK"}
          cancelText={"CANCEL"}
          mode={this.state.mode}
          is24Hour={this.state.is24Hour}
          disabled={this.state.disabled}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          date={this.state.selectedDate}
          ref="TimePicker"
        />
