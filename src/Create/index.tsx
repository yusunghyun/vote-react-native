import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './style';
import dayjs from 'dayjs';
import scale from '../../Common/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {DataType} from '../../Common/type';

interface Props {
  route: {params: {name: string}};
  navigation: StackNavigationProp<{}>;
}

export default function index(props: Props) {
  const [form, set_form] = useState<DataType>({
    title: '',
    item: [
      {
        name: '',
        vote: 0,
      },
      {
        name: '',
        vote: 0,
      },
      {
        name: '',
        vote: 0,
      },
    ],
    key: '',
    host: '',
    terms: Date.now(),
  });

  const [date, set_date] = useState<Date | number>(Date.now());
  const [date_modal, set_date_modal] = useState<boolean>(false);
  const [time, set_time] = useState<Date | number>(Date.now());
  const [time_modal, set_time_modal] = useState<boolean>(false);

  return (
    <>
      <View style={{...styles.container}}>
        <View style={{...styles.container}}>
          <ScrollView>
            <Text style={{...styles.title}}>투표 만들기</Text>
            <TextInput
              style={{...styles.input}}
              value={form.title}
              onChangeText={(text) => {
                set_form({...form, title: text});
              }}
              placeholder="제목"
            />
            {form?.item.map((v, i) => (
              <TextInput
                key={i + 'ci'}
                style={{...styles.input}}
                placeholder={`${i + 1}번째 항목`}
                value={form.item[i].name} //아 벨류가 필수네 걍 뻇더니 한글자에서 끝남 ㅇㅅㅇ
                onChangeText={(text) => {
                  let tmp = {...form};
                  tmp.item[i].name = text;
                  set_form(tmp);
                }}
              />
            ))}
            {form?.item.length < 5 ? (
              <TouchableOpacity
                onPress={() => {
                  set_form({
                    ...form,
                    item: [...form.item].concat({
                      name: ``,
                      vote: 0,
                    }),
                  });
                }}
                style={{...styles.input}}>
                <Text style={{...styles.plust_text}}>
                  + 항목 추가 (최대 5개)
                </Text>
              </TouchableOpacity>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.term_text, marginLeft: scale(20)}}>
                마감 기간
              </Text>
              <TouchableOpacity
                onPress={() => {
                  set_date_modal(true);
                }}
                style={{...styles.input, marginRight: 0}}>
                <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  set_time_modal(true);
                }}
                style={{...styles.input, marginLeft: scale(5)}}>
                <Text>{dayjs(time).format('hh:mm a')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{...styles.row_view}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{...styles.create_container}}>
            <Text style={{...styles.create_txt}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (form.title && form.item.some((v) => v.name)) {
                // await AsyncStorage.clear()
                const tmp = await AsyncStorage.getItem('data');
                if (tmp) {
                  await AsyncStorage.setItem(
                    'data',
                    JSON.stringify([
                      ...JSON.parse(tmp),
                      {
                        ...form,
                        terms:
                          dayjs(
                            dayjs(date).format('YYYY-MM-DD') +
                              ' ' +
                              dayjs(time).format('HH:mm'),
                          ).unix() * 1000,
                        host: props.route.params.name,
                        key: `${tmp.length}`,
                      },
                    ]),
                  );
                } else {
                  await AsyncStorage.setItem(
                    'data',
                    JSON.stringify([
                      {
                        ...form,
                        terms:
                          dayjs(
                            dayjs(date).format('YYYY-MM-DD') +
                              ' ' +
                              dayjs(time).format('HH:mm'),
                          ).unix() * 1000,
                        host: props.route.params.name,
                        key: '0',
                      },
                    ]),
                  );
                }
                props.navigation.goBack();
              }else{
                ToastAndroid.showWithGravity(
                  '모두 입력해 주세요!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }
            }}
            style={{...styles.create_container2}}>
            <Text style={{...styles.create_txt2}}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={date_modal}
        mode="date"
        onConfirm={(data) => {
          set_date(data);
          return set_date_modal(false);
        }}
        onCancel={() => {
          return set_date_modal(false);
        }}
      />
      <DateTimePickerModal
        isVisible={time_modal}
        mode="time"
        onConfirm={(data) => {
          set_time(data);
          return set_time_modal(false);
        }}
        onCancel={() => {
          return set_time_modal(false);
        }}
      />
    </>
  );
}
