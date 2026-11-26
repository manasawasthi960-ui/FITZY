import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_STORAGE_KEY = '@fitzy_user_profile';

export interface FitnessProfile {
  name?: string;
  age?: string;
  gender?: string;

  height?: string;
  currentWeight?: string;
  targetWeight?: string;

  goal?: string;
  experience?: string;

  frequency?: string;
  workoutType?: string;

  onboardingCompleted?: boolean;
}

export const saveProfileData = async (
  updates: Partial<FitnessProfile>,
): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

    const existingProfile: FitnessProfile = existingData
      ? JSON.parse(existingData)
      : {};

    const updatedProfile = {
      ...existingProfile,
      ...updates,
    };

    await AsyncStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(updatedProfile),
    );
  } catch (error) {
    console.error('Error saving FITZY profile:', error);
    throw error;
  }
};

export const getProfileData = async (): Promise<FitnessProfile | null> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving FITZY profile:', error);
    return null;
  }
};

export const clearProfileData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing FITZY profile:', error);
    throw error;
  }
};