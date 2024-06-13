import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define a type for your navigation prop
type RootStackParamList = {
  Settings: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const ProfilePic = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity style={styles.ImageContainer}
      onPress={() => navigation.navigate('Settings')}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.Image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default ProfilePic;
