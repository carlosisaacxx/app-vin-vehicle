import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VinInputScreen from '../screens/VinInputScreen';
import VinResultScreen from '../screens/VinResultScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VinInput" component={VinInputScreen} options={{ title: "Consulta VIN" }} />
        <Stack.Screen name="VinResult" component={VinResultScreen} options={{ title: "Resultado VIN" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}