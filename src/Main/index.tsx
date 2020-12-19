import React, {useState,useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import scale from '../../Common/scale';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: {params: {name: string}};
  navigation: StackNavigationProp<{}>;
}
interface DataType {
  title: string;
  key: number;
  terms: number;
  host: string;
}

export default function index(props: Props) {
  const [data, set_data] = useState<Array<DataType>>([
    {
      title: '첫번째 투표',
      key: 0,
      terms: Date.now(),
      host: '유성현',
    },
    {
      title: '두번째 투표',
      key: 1,
      terms: Date.now(),
      host: '유성현',
    },
    {
      title: '세번째 투표',
      key: 2,
      terms: Date.now(),
      host: '유성현',
    },
    {
      title: '세번째 투표',
      key: 3,
      terms: Date.now(),
      host: '유성현',
    },
    {
      title: '네번째 투표',
      key: 4,
      terms: Date.now(),
      host: '유성현',
    },
    {
      title: '다섯번째 투표',
      key: 5,
      terms: Date.now(),
      host: '유성현',
    },
  ]);

  useEffect(() => {
		props.navigation.addListener('focus', async () => {
      const result = await AsyncStorage.getItem('data')
      console.log('result : ',result)
		});
	}, [props.navigation]);

  return (
    <>
      <View style={{...styles.container}}>
        <View style={{...styles.container}}>
          <Text style={{...styles.title}}>VOTE</Text>
          <View style={{...styles.flat_container}}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index + 'm'}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Detail');
                    // props.navigation.navigate('Result');
                  }}
                  style={{...styles.vote_container}}>
                  <View style={{...styles.vote_row}}>
                    <Text style={{...styles.vote_txt}}>{item.title}</Text>
                    {true ? (
                      <Text style={{...styles.vote_txt}}>진행중</Text>
                    ) : (
                      <Text style={{...styles.vote_txt}}>종료</Text>
                    )}
                  </View>
                  <Text style={{...styles.vote_sub_txt}}>{item.host}</Text>
                  <Text style={{...styles.vote_sub_txt}}>{item.terms}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Create');
          }}
          style={{...styles.create_container}}>
          <Text style={{...styles.create_txt}}>투표 만들기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
