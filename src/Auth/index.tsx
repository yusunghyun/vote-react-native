import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.title}}>반갑습니다!</Text>
      <View style={{...styles.container2}}>
        <TextInput
          placeholder="사용하실 이름을 입력해 주세요"
          placeholderTextColor="#FFC091"
          style={{...styles.input}}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Main', {name: '유성현222'});
          }}
          style={{...styles.touch_container}}>
          <Text style={{...styles.touch_txt}}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
