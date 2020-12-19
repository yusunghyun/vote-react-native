import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import scale from '../../Common/scale';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {DataType} from '../../Common/type';

interface Props {
  route: {params: {name: string}};
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  const [data, set_data] = useState<Array<DataType>>();

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      const result = await AsyncStorage.getItem('data');
      if (result !== null) {
        console.log('result : ', JSON.parse(result)[0].item);
        set_data(JSON.parse(result));
      }
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
              renderItem={({item, index}) => {
                let now_time = dayjs(Date.now()).unix() * 1000;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.terms > now_time) {
                        props.navigation.navigate('Detail', item);
                      } else {
                        props.navigation.navigate('Result', item);
                      }
                    }}
                    style={{...styles.vote_container}}>
                    <View style={{...styles.vote_row}}>
                      <Text style={{...styles.vote_txt}}>{item.title}</Text>
                      {item.terms > now_time ? (
                        <Text style={{...styles.vote_txt}}>진행중</Text>
                      ) : (
                        <Text style={{...styles.vote_txt}}>종료</Text>
                      )}
                    </View>
                    <Text style={{...styles.vote_sub_txt}}>{item.host}</Text>
                    <Text style={{...styles.vote_sub_txt}}>{item.terms}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Create', {
              name: props.route.params.name,
            });
          }}
          style={{...styles.create_container}}>
          <Text style={{...styles.create_txt}}>투표 만들기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
