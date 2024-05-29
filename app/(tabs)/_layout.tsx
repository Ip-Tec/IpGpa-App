import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {
  Animated,
  Appearance,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/Utility/DB";
import { Index } from "@/components/CSSStyle";
import { Plus } from "@/components/EmptyState";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

type ColorSchemeName = "light" | "dark" | null | undefined;
export default function TabLayout() {
  let colorScheme = useColorScheme();
  const [scaleValue] = useState(new Animated.Value(1));
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [theme, setTheme] = useState<ColorSchemeName>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    Appearance.setColorScheme(theme);
    colorScheme = theme;
  };

  useEffect(() => {
    let colorScheme = Appearance.getColorScheme();
    Appearance.setColorScheme(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const handleAppearanceChange = (preferences: {
      colorScheme: ColorSchemeName;
    }) => {
      setTheme(preferences.colorScheme);
    };

    const subscription = Appearance.addChangeListener(handleAppearanceChange);
    return () => subscription.remove();
  }, []);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SQLiteProvider databaseName="IpGpaDB.db" onInit={migrateDbIfNeeded}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Calculate",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="calculator" color={color} />
              ),
              headerRight: () => (
                <View style={{ flexDirection: "row", columnGap: 20 }}>
                  <Link href="/modal" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="info-circle"
                          size={25}
                          color={Colors[colorScheme ?? "dark"].text}
                          style={{
                            // marginRight: 15,
                            opacity: pressed ? 0.5 : 1,
                          }}
                        />
                      )}
                    </Pressable>
                  </Link>
                  <TouchableOpacity
                    style={[Index.addButton]}
                    onPress={toggleInputs}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                  >
                    <Plus
                    // style={}
                      toggleInputs={toggleInputs}
                      onPressIn={onPressIn}
                      onPressOut={onPressOut}
                    />
                  </TouchableOpacity>
                  <View>
                    <Pressable onPress={toggleTheme}>
                      {theme === "light" ? (
                        <>
                          <FontAwesome
                            name="sun-o"
                            size={25}
                            color={Colors[colorScheme ?? "dark"].text}
                            style={{ marginRight: 15, opacity: 1 }}
                          />
                        </>
                      ) : (
                        <>
                          <FontAwesome
                            name="moon-o"
                            size={25}
                            color={Colors[colorScheme ?? "dark"].text}
                            style={{ marginRight: 15, opacity: 1 }}
                          />
                        </>
                      )}
                    </Pressable>
                  </View>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: "Web View",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="building-o" color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
