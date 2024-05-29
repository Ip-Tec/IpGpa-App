// files: @/components/EmptyState.tsx
import React from "react";
import { ScrollView, Text } from "@/components/Themed";
import { Index } from "@/components/CSSStyle";
import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleProp, TouchableOpacity, View } from "react-native";
import { EmptyStateProps } from "@/type/interface";

export const EmptyState: React.FC<EmptyStateProps> = ({
  toggleInputs,
  onPressIn,
  onPressOut,
}) => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image
        source={require("@/assets/images/GPA_Calculator.png")}
        style={{
          width: 200,
          height: 200,
          objectFit: "scale-down",
          marginBottom: 10,
        }}
      />
      <Text style={Index.instructionText}>
        Tap the + button below to add a course.
      </Text>
      <Plus
        toggleInputs={toggleInputs}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
    </ScrollView>
  );
};

export const Plus: React.FC<EmptyStateProps> = (
  { toggleInputs, onPressIn, onPressOut },
  props?
) => {
  return (
    <TouchableOpacity
      style={[Index.addButton, props]}
      // The onPress event occurs when the user presses the button.
      // The toggleInputs function is called when this event occurs.
      onPress={toggleInputs}
      // The onPressIn event occurs when the user starts pressing the button.
      // The onPressIn function is called when this event occurs.
      onPressIn={onPressIn}
      // The onPressOut event occurs when the user stops pressing the button.
      // The onPressOut function is called when this event occurs.
      onPressOut={onPressOut}
    >
      <FontAwesome name="plus-circle" size={50} color="white" />
    </TouchableOpacity>
  );
};
