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
                        props.navigation.navigate('Detail', {
                          data: item,
                          name: props.route.params.name,
                        });
                      } else {
                        props.navigation.navigate('Result', {
                          data: item,
                          name: props.route.params.name,
                        });
                      }
                    }}
                    style={{...styles.vote_container}}>
                    <View style={{...styles.vote_row}}>
                      <Text style={{...styles.vote_txt}}>{item.title}</Text>
                      {item.terms > now_time ? (
                        <Text style={{...styles.vote_txt}}>진행중인 투표</Text>
                      ) : (
                        <Text style={{...styles.vote_txt}}>종료된 투표</Text>
                      )}
                    </View>
                    <Text style={{...styles.vote_sub_txt}}>
                      작성자 : {item.host}
                    </Text>
                    {item.terms > now_time ? (
                      <Text style={{...styles.vote_sub_txt}}>
                        마감 기간 :{' '}
                        {dayjs(item.terms).format('YYYY-MM-DD hh:mm a')}
                      </Text>
                    ) : null}
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
