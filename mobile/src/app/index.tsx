import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { getProfileData } from '../lib/profileStorage';

export default function Index() {
  useEffect(() => {
    const redirect = async () => {
      try {
        const profile = await getProfileData();

        if (profile?.onboardingCompleted === true) {
          router.replace('/tabs');
        } else {
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        router.replace('/onboarding');
      }
    };

    redirect();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#101310',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#C6FF4D" />
    </View>
  );
}