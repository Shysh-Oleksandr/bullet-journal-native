import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface SaveButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: JSX.Element;
  text: string;
  className?: any;
}

const SaveButton = ({
  onPress,
  disabled,
  icon,
  text,
  className,
}: SaveButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[styles.saveButtonStyle, className]}
    >
      <Text style={styles.textButtonStyle}>
        {icon}
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButtonStyle: {
    backgroundColor: "#0891B2",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default SaveButton;
