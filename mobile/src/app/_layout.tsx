import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  Stack,
} from 'expo-router';

import { getProfileData } from '../lib/profileStorage';

export const unstable_settings = {
  initialRouteName: 'onboarding',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [isReady, setIsReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const profile = await getProfileData();

        setOnboardingCompleted(
          profile?.onboardingCompleted === true
        );
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
        setOnboardingCompleted(false);
      } finally {
        setIsReady(true);
      }
    };

    checkOnboarding();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!onboardingCompleted}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="profile-setup" />
          <Stack.Screen name="body-metrics" />
          <Stack.Screen name="fitness-goals" />
          <Stack.Screen name="experience" />
          <Stack.Screen name="workout-preference" />
          <Stack.Screen name="profile-summary" />
        </Stack.Protected>

        <Stack.Protected guard={onboardingCompleted}>
          <Stack.Screen name="tabs" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}