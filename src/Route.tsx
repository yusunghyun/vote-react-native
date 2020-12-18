import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Main from './Main';
import Create from './Create';
import Detail from './Detail';
import Result from './Result';
import Auth from './Auth';

const Stack = createStackNavigator();

const Route = (props: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
