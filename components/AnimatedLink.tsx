import {
  Animated,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

const AnimatedLink = ({
  href,
  children,
  style,
}: {
  href: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const [iconScale] = useState(new Animated.Value(1));

  const handleIconPress = () => {
    Animated.sequence([
      Animated.timing(iconScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(iconScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.iconContainer, style]}
      onPress={handleIconPress}
    >
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <Link href={href}>{children}</Link>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedLink;
const styles = StyleSheet.create({
  // ...
  socialMedia: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // ...
});
