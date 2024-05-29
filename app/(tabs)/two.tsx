import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { WebView } from "react-native-webview";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { icon, WebViewStyle } from "@/components/CSSStyle";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

/**
 * Renders a WebView component with options to open a URL, navigate back and forth, and reload the page.
 *
 * @return {JSX.Element} The rendered WebView component.
 */
export default function Kofa() {
  const [url, setUrl] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const webViewRef = useRef(null);

  const handleUrlChange = (text: string) => {
    setUrl(text);
  };

  /**
   * Handles the opening of a URL in the WebView component.
   *
   * @return {void} This function does not return anything.
   */
  const handleOpenUrl = () => {
    setShowWebView(true);
    const urlToOpen = url;
    console.log("Opening URL:", urlToOpen);
    setWebViewUrl(urlToOpen);
    handleOpenDefaultUrl(urlToOpen);
  };

  /**
   * Handles the opening of a default URL in the WebView component.
   *
   * @param {string} Url - The default URL to open.
   * @return {void} This function does not return anything.
   */
  const handleOpenDefaultUrl = (Url: string) => {
    setShowWebView(true);
    console.log("Opening Default URL:", Url);
    setWebViewUrl(Url);
    setIsLoading(false);
  };

  /**
   * Handles the load event of the WebView component, setting the isLoading state to false.
   *
   * @return {void} This function does not return anything.
   */
  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  /**
   * Handles the start of the WebView load event by setting the isLoading state to true.
   *
   * @return {void} This function does not return anything.
   */
  const handleWebViewLoadStart = () => {
    setIsLoading(true);
  };

  /**
   * Handles the go back event in the WebView component.
   *
   * @return {void} This function does not return anything.
   */
  const handleGoBack = () => {
    if (webViewRef.current) {
      (webViewRef.current as WebView).goBack();
    }
  };

  /**
   * Handles the home event in the WebView component.
   *
   * @return {void} This function does not return anything.
   */
  const handleHome = () => {
    setShowWebView(false);
    setWebViewUrl("");
    if (webViewRef.current) {
      (webViewRef.current as WebView).reload();
    }
  };

  /**
   * Handles the go forward event in the WebView component.
   *
   * @return {void} This function does not return anything.
   */
  const handleGoForward = () => {
    if (webViewRef.current) {
      (webViewRef.current as WebView).goForward();
    }
  };

  return (
    <View style={WebViewStyle.container}>
      {showWebView ? (
        <>
          <StatusBar animated={true} />
          <WebView
            ref={webViewRef}
            source={{ uri: webViewUrl }}
            style={WebViewStyle.webView}
            onLoad={handleWebViewLoad}
            onLoadStart={handleWebViewLoadStart}
          />
          <View style={WebViewStyle.navigationContainer}>
            <TouchableOpacity
              style={WebViewStyle.navigationButton}
              onPress={handleGoBack}
            >
              <FontAwesome name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={WebViewStyle.navigationButton}
              onPress={handleHome}
            >
              <FontAwesome name="home" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={WebViewStyle.navigationButton}
              onPress={handleGoForward}
            >
              <FontAwesome name="arrow-right" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          {isLoading && (
            <View style={WebViewStyle.loadingContainer}>
              <ActivityIndicator size="large" color="#007bff" />
            </View>
          )}
        </>
      ) : (
        <>
          <Image
            source={require("@/assets/images/GPA_Calculator.png")}
            style={{
              width: 200,
              height: 200,
              objectFit: "scale-down",
              marginBottom: 10,
            }}
          />
          <TextInput
            style={[WebViewStyle.input, WebViewStyle.iconColor]}
            placeholder="Enter URL"
            value={url}
            // placeholderTextColor={WebViewStyle.placeholderTextColor}
            onChangeText={handleUrlChange}
          />
          <TouchableOpacity style={WebViewStyle.button} onPress={handleOpenUrl}>
            <Text style={WebViewStyle.buttonText}>Open URL</Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={WebViewStyle.defaultUrlButton}
              onPress={() => {
                handleOpenDefaultUrl("https://aaue.waeup.org/login");
              }}
            >
              <Image
                source={require("@/assets/images/aaulogo.png")}
                style={{
                  width: 100,
                  height: 40,
                  objectFit: "scale-down",
                }}
              />
              {/* <Text style={WebViewStyle.defaultUrlButtonText}>AAU Ekpoma</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={WebViewStyle.defaultUrlButton}
              onPress={() => {
                handleOpenDefaultUrl("https://waeup.uniben.edu/login");
              }}
            >
              <Image
                source={require("@/assets/images/uniben_logo.png")}
                style={{
                  width: 100,
                  height: 40,
                  objectFit: "scale-down",
                }}
              />
              {/* <Text style={WebViewStyle.defaultUrlButtonText}>AAU Ekpoma</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={WebViewStyle.defaultUrlButton}
              onPress={() => {
                handleOpenDefaultUrl("https://iuokada.waeup.org/login");
              }}
            >
              <Image
                source={require("@/assets/images/iou_logo.png")}
                style={{
                  width: 100,
                  height: 40,
                  objectFit: "scale-down",
                }}
              />
              {/* <Text style={WebViewStyle.defaultUrlButtonText}>AAU Ekpoma</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={WebViewStyle.defaultUrlButton}
              onPress={() => {
                handleOpenDefaultUrl("https://dspg.waeup.org/login");
              }}
            >
              <Image
                source={require("@/assets/images/dspg_logo.png")}
                style={{
                  width: 100,
                  height: 40,
                  objectFit: "scale-down",
                }}
              />
              {/* <Text style={WebViewStyle.defaultUrlButtonText}>AAU Ekpoma</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={WebViewStyle.defaultUrlButton}
              onPress={() => {
                handleOpenDefaultUrl("https://edopoly.waeup.org/login");
              }}
            >
              {/* <Image
                source={require("@/assets/images/uniben_logo.png")}
                style={{
                  width: 100,
                  height: 40,
                  objectFit: "scale-down",
                }}
              /> */}
              <Text style={WebViewStyle.defaultUrlButtonText}>
                Edo State Polytechnic
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
