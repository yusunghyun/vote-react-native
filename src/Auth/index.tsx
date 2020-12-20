import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  const [name, set_name] = useState<string>('');

  const AsyncStorage_setting = async () => {
    const legacy = await AsyncStorage.getItem('data');
    if (legacy) {
    } else {
      await AsyncStorage.setItem(
        'data',
        JSON.stringify([
          {
            title: '치킨을 골라주세요 !',
            item: [
              {name: '뿌링클', vote: 11, isCheck: true},
              {name: '스노우', vote: 4, isCheck: false},
              {name: '치즐링', vote: 4, isCheck: false},
              {name: '바사삭', vote: 7, isCheck: false},
            ],
            key: '0',
            host: '유성현',
            terms: 1608460200000,
          },
          {
            title: '최고의 언어는?',
            item: [
              {name: '파이썬', vote: 6, isCheck: false},
              {name: 'C언어', vote: 2, isCheck: false},
              {name: '자바스크립트', vote: 7, isCheck: true},
              {name: 'JAVA', vote: 4, isCheck: false},
              {name: 'DART', vote: 2, isCheck: false},
            ],
            key: '175',
            host: '유성현',
            terms: 1609426740000,
          },
        ]),
      );
    }
  };

  useEffect(() => {
    AsyncStorage_setting();
  }, []);

  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.title}}>반갑습니다!</Text>
      <View style={{...styles.container2}}>
        <TextInput
          placeholder="사용하실 이름을 입력해 주세요"
          placeholderTextColor="#FFC091"
          value={name}
          onChangeText={(text) => {
            set_name(text);
          }}
          style={{...styles.input}}
        />
        <TouchableOpacity
          onPress={() => {
            if (name) {
              props.navigation.navigate('Main', {name: name});
            } else {
              ToastAndroid.showWithGravity(
                '이름을 입력해 주세요!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          }}
          style={{...styles.touch_container}}>
          <Text style={{...styles.touch_txt}}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
