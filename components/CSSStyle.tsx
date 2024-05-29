import { StyleSheet, Dimensions, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { Appearance } from "react-native";
import { useEffect } from "react";

const colorScheme = () => {
  return useColorScheme();
};

const { width } = Dimensions.get("window");
function StylesFunction() {
  let theme =
    Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light;
  return theme;
}
function StylesFunctionOPP() {
  let theme =
    Appearance.getColorScheme() === "dark" ? Colors.light : Colors.dark;
  return theme;
}
export const icon = () => {
  return StylesFunction().tabIconDefault;
};

export const Index = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  instructionText: {
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "80%",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 1,
  },
  inputContainer: {
    flex: 1,
    width: "80%",
    padding: 10,
    minHeight: width,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#ccc",
    position: "absolute",
    // backgroundColor: "#f0f0f0",
    backgroundColor: StylesFunction().background,
  },
  row: {
    width: "100%",
    marginBottom: 0,
    flexDirection: "column",
    backgroundColor: StylesFunction().background,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: StylesFunction().text,
    backgroundColor: StylesFunction().background,
  },
  input: {
    height: 40,
    // borderColor: "#999",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: StylesFunction().background,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0077b6",
    borderRadius: 50,
    width: 80,
    aspectRatio: 1,
    position: "absolute",
    top: "130%",
    left: "60%",
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,
    width: "100%",
    backgroundColor: "rgba(19, 100, 216,1)",
  },
  submitButtonText: {
    fontSize: 18,
    color: StylesFunctionOPP().tint,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
export const MenuStyle = StyleSheet.create({
  card: {
    padding: 1,
    width: "90%",
    height: "auto",
    borderRadius: 10,
    // marginVertical: 10,
    shadowColor: "#000",
    borderLeftWidth: 20,
    borderBottomWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 1,
  },
  cardHeader: {
    paddingVertical: 16,
    alignItems: "stretch",
    paddingHorizontal: 10,
    flexDirection: "column",
    color: StylesFunction().text,
    justifyContent: "space-between",
    backgroundColor: StylesFunction().tabIconDefault,
  },
  cardHeader2: {
    width: "100%",
    flexDirection: "row",
    color: StylesFunction().text,
    backgroundColor: StylesFunction().tabIconDefault,
  },
  cardHeader3: {
    flexGrow: 1,
    width: "93%",
    color: StylesFunction().text,
    backgroundColor: StylesFunction().tabIconDefault,
  },
  levelText: {
    fontSize: 28,
    textAlign: "left",
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 6,
    columnGap: 28,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: StylesFunction().tabIconDefault,
  },
  infoText: {
    fontSize: 16,
  },
  editView: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderLeftWidth: 2,
    borderLeftColor: StylesFunction().text,
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  acctionIcon: {
    right: 0,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    marginVertical: 1,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  collapsibleContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "snow",
  },
  tableHeader: {
    flex: 1,
    width: "25%",
    padding: 8,
  },
  tableText: {
    fontWeight: "bold",
  },
  tableData: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 2,
    color: StylesFunction().text,
    borderBottomColor: StylesFunction().text,
  },
  tableDataRow: {
    flex: 1,
    padding: 8,
    width: "25%",
    textAlign: "center",
    backgroundColor: StylesFunction().background,
  },
  tableDataText: {
    width: 150,
    padding: 0,
    color: StylesFunction().text,
  },
});

export const Modal = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: StylesFunction().background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: StylesFunction().text,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
    backgroundColor: StylesFunction().background,
  },
  accordionHeader: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: StylesFunction().background,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: StylesFunction().text,
  },
  accordionContent: {
    width: "100%",
    padding: 15,
    backgroundColor: StylesFunction().background,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: StylesFunction().text,
    marginVertical: 6,
  },
  socialMedia: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 25,
    shadowColor: StylesFunction().background,
    backgroundColor: StylesFunction().tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    color: StylesFunction().tabIconDefault,
  },
});

export const WebViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  defaultUrlButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 16,
    marginRight: 4,
  },
  defaultUrlButtonText: {
    color: "#333",
  },
  webView: {
    flex: 1,
    width: width,
    marginTop: 20,
  },
  iconColor: {
    color: StylesFunction().text,
  },
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",

    backgroundColor: StylesFunction().background,
    color: StylesFunction().text,
  },
  navigationButton: {
    padding: 5,
  },
});

export const ModalStyle = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 0,
    width: "100%",
    backgroundColor: StylesFunction().background,
  },

  text: {
    fontWeight: "bold",
    color: StylesFunction().text,
  },
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: StylesFunction().background,
  },
});
