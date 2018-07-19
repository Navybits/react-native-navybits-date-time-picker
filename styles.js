import { Dimensions, StyleSheet } from "react-native";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

module.exports = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: 20
  },
  itemStyle: {
    color: "red"
  },
  datePickerIOS: {
    height: 216
  },
  datePickerMask: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center"
  },
  containerModal: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignSelf: "center",
    flex: 1
  },
  closeGallery: {
    position: "absolute",
    top: 20,
    right: 10,
    padding: 10,
    zIndex: 5,
    backgroundColor: "transparent"
  },
  dateTouch: {
    width: 142
  },
  dateTouchBody: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center"
  },
  dateText: {
    color: "#333"
  },
  placeholderText: {
    color: "#c9c9c9"
  },
  datePickerMask: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#00000077"
  },
  datePickerCon: {
    backgroundColor: "#fff",
    height: 0,
    overflow: "hidden"
  },
  btnsView: {
    height: 42,
    // backgroundColor:'red',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  titleWrapper: {
    // position: "absolute"
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  btnText: {
    position: "absolute",
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnTextText: {
    fontSize: 16,
    color: "green"
  },
  btnTextCancel: {
    color: "red"
  },
  btnCancel: {
    flex: 1,
    alignItems:'flex-start'
  },
  btnConfirm: {
    flex:1,
    alignItems:'flex-end'
  },
  datePicker: {
    // marginTop: 42,
    borderTopColor: "#ccc",
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: "#eee"
  }
});
