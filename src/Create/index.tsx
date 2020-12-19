import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
        name: '첫번째 항목',
        vote: 0,
      },
      {
        name: '두번째 항목',
        vote: 0,
      },
      {
        name: '세번째 항목',
        vote: 0,
      },
    ],
    key: '',
    host: '',
    terms: Date.now(),
  });

  const [date, set_date] = useState<Date | number>(Date.now());
  const [date_modal, set_date_modal] = useState<boolean>(false);
  const [time, set_time] = useState<Date | number>();
  const [time_modal, set_time_modal] = useState<boolean>(false);

  return (
    <>
      <View style={{...styles.container}}>
        <View style={{...styles.container2}}>
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
                placeholder={`${v.name}`}
              />
            ))}
            {form?.item.length < 5 ? (
              <TouchableOpacity
                onPress={() => {
                  set_form({
                    ...form,
                    item: [...form.item].concat({
                      name: '추가된 항목',
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
              <Text style={{...styles.term_text}}>마감 기간</Text>
              <TouchableOpacity
                onPress={() => {
                  set_date_modal(true);
                }}
                style={{...styles.input, marginRight: scale(5)}}>
                <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  set_time_modal(true);
                }}
                style={{...styles.input}}>
                <Text>{dayjs(time).format('HH:mm')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{...styles.row_view}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{...styles.create_container2}}>
            <Text style={{...styles.create_txt2}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              const tmp = await AsyncStorage.getItem('data');
              if (tmp) {
                await AsyncStorage.setItem(
                  'data',
                  JSON.stringify([
                    ...tmp,
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
            }}
            style={{...styles.create_container}}>
            <Text style={{...styles.create_txt}}>완료</Text>
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
