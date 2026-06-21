import { Animated, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

export interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor: string;
  inactiveColor: string;
  thumbColor: string;
}

export const CustomSwitch = ({
  value,
  onValueChange,
  activeColor,
  inactiveColor,
  thumbColor
}: CustomSwitchProps) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [value, animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor]
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // width(50) - thumbWidth(26) - 2 padding = 22
  });

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.switchTrack, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.switchThumb,
            { transform: [{ translateX }], backgroundColor: thumbColor }
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center"
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2
  }
});
