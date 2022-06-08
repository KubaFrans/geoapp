import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartGeo from "./components/StartGeo"
import MainContent from './components/MainContent';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="main"
                    component={StartGeo}
                    options={{
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="positions"
                    component={MainContent}
                    options={{
                        title: 'Zapis pozycji',
                        headerStyle: {
                            backgroundColor: '#00796B',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20
                        },
                    }} />
                <Stack.Screen
                    name="map"
                    component={Map}
                    options={{
                        title: 'Pozycja na mapie',
                        headerStyle: {
                            backgroundColor: '#00796B',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20
                        },
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
