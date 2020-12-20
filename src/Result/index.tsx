import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import {DataType} from '../../Common/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import scale from '../../Common/scale';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  route: {
    params: {data: DataType; name: string};
  };
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  const {route} = props;
  const {params} = route;
  const [data, set_data] = useState<DataType>({
    ...params.data,
  });
  const [vote_volume, set_vote_volume] = useState<number>(0);
  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      let tmp_cnt = 0;
      params.data.item.forEach((v) => {
        tmp_cnt += v.vote;
      });
      set_vote_volume(tmp_cnt);
    });
  }, [props.navigation]);

  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.title}}>{data.title}</Text>
      <Text style={{...styles.sub_title}}>총 투표수 {vote_volume}</Text>
      <FlatList
        data={data?.item}
        keyExtractor={(item, index) => index + 'd'}
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  ...styles.input_check,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: scale(20),
                }}>
                <Text style={{...styles.plust_text_check}}>{item.name}</Text>
                <Text style={{...styles.plust_text_check}}>
                  {item.vote}표{' '}
                  {item.vote ? Math.round((item.vote * 100) / vote_volume) : 0}%
                </Text>
              </View>
              {index === data?.item.length - 1 ? (
                <>
                  {data.terms > dayjs(Date.now()).unix() * 1000 ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{...styles.term_text, marginLeft: scale(20)}}>
                        마감 기간
                      </Text>
                      <View style={{...styles.input, marginRight: scale(5)}}>
                        <Text>{dayjs(data?.terms).format('YYYY-MM-DD')}</Text>
                      </View>
                      <View style={{...styles.input, marginRight: scale(20)}}>
                        <Text>{dayjs(data?.terms).format('hh:mm a')}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{...styles.term_text, marginLeft: scale(20)}}>
                        마감된 투표입니다.
                      </Text>
                    </View>
                  )}
                </>
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
      </View>
    </View>
  );
}
