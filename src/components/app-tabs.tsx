import { Tabs } from "expo-router";
import { Pressable } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { TabIcon } from "@/components/tab-icon";
import { TabLabel } from "@/components/tab-label";

export function AppTabs() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.outline,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: theme.surfaceContainerLowest,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: theme.onSurface,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          paddingTop: 10,
          height: 80
        },
        tabBarButton: (props) => (
          <Pressable {...(props as any)} style={props.style} />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="calendar-blank" focused={focused} />
          ),
          tabBarLabel: (props) => <TabLabel {...props} children="Today" />
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="chart-timeline-variant" focused={focused} />
          ),
          tabBarLabel: (props) => <TabLabel {...props} children="Insights" />
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="plus-circle-outline" focused={focused} />
          ),
          tabBarLabel: (props) => <TabLabel {...props} children="Add" />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="cog-outline" focused={focused} />
          ),
          tabBarLabel: (props) => <TabLabel {...props} children="Settings" />
        }}
      />
    </Tabs>
  );
}
