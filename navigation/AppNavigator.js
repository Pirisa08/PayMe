import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import HistoryScreen from '../screens/HistoryScreen';
import BillCardScreen from '../screens/BillCardScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PayMe' }} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: 'Checklist' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
      <Stack.Screen name="BillCard" component={BillCardScreen} options={{ title: 'Bill Card' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
