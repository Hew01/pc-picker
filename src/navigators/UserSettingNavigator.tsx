import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import PasswordChangeScreen from '../screens/PasswordChangeScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

const UserSettingsStack = createNativeStackNavigator();

const UserSettingsNavigator = () => (
  <UserSettingsStack.Navigator screenOptions={{headerShown: false}}>
    <UserSettingsStack.Screen
      name="UserSettings"
      component={UserSettingsScreen}
      options={{animation: 'slide_from_bottom'}}
    />
    <UserSettingsStack.Screen
      name="PasswordChange"
      component={PasswordChangeScreen}
      options={{animation: 'slide_from_bottom'}}
    />
    <UserSettingsStack.Screen
      name="UserInfo"
      component={UserInfoScreen}
      options={{animation: 'slide_from_bottom'}}
    />
  </UserSettingsStack.Navigator>
);

export default UserSettingsNavigator;
