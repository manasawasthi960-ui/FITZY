import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import {
  Pressable,
  View,
  StyleSheet,
} from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export default function AppTabs() {
  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/tabs" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>

          <TabTrigger name="explore" href="/tabs/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>

      <TabSlot style={{ flex: 1 }} />
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  const { ref: _ref, ...pressableProps } = props;

  return (
    <Pressable
      {...pressableProps}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.pressed,
      ]}
    >
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="backgroundElement"
        style={styles.innerContainer}
      >
        <ThemedText type="smallBold" style={styles.brandText}>
          FITZY.
        </ThemedText>

        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },

  innerContainer: {
    width: '100%',
    maxWidth: 1100,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  brandText: {
    marginRight: 'auto',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },

  tabButton: {
    borderRadius: 20,
  },

  tabButtonView: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  pressed: {
    opacity: 0.7,
  },
});