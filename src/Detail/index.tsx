import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DataType} from '../../Common/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import scale from '../../Common/scale';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  route: {
    params: DataType;
  };
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  const {route} = props;
  const {params} = route;
  const [data, set_data] = useState<DataType>({
    ...params,
    item: params.item.map((v) => {
      return {...v, isCheck: false};
    }),
  });

  // useEffect(() => {
  //   props.navigation.addListener('focus', async () => {
  //     set_data(props.route.params)
  //   });
  // }, [props.navigation]);

  return (
    <View style={{...styles.container2}}>
      <Text style={{...styles.title}}>{data.title}</Text>
      <FlatList
        data={data?.item}
        keyExtractor={(item, index) => index + 'd'}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  let tmp = {...data};
                  tmp.item[index].isCheck = !tmp.item[index].isCheck;
                  set_data(tmp);
                }}
                style={
                  item.isCheck
                    ? {...styles.input_check}
                    : {...styles.input}
                }>
                <Text style={item.isCheck
                    ? {...styles.plust_text_check}
                    : {...styles.plust_text}}>{item.name}</Text>
              </TouchableOpacity>
              {index === data?.item.length - 1 ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.term_text}}>마감 기간</Text>
                  <View style={{...styles.input, marginRight: scale(5)}}>
                    <Text>{dayjs(data?.terms).format('YYYY-MM-DD')}</Text>
                  </View>
                  <View style={{...styles.input}}>
                    <Text>{dayjs(data?.terms).format('hh:mm a')}</Text>
                  </View>
                </View>
              ) : null}
            </>
          );
        }}
      />
      <View style={{...styles.row_view}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{...styles.create_container}}>
          <Text style={{...styles.create_txt}}>뒤로 가기!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {}}
          style={{...styles.create_container2}}>
          <Text style={{...styles.create_txt2}}>투표 하기!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
