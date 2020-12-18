import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './style';
import dayjs from 'dayjs';
interface Props {
  name: string;
}

export default function index(props: Props) {
  const [date, set_date] = useState<Date>();
  const [date_modal, set_date_modal] = useState<boolean>(false);
  const [time, set_time] = useState<Date>();
  const [time_modal, set_time_modal] = useState<boolean>(false);

  return (
    <>
      <View style={{...styles.container}}>
        <View style={{...styles.container2}}>
          <Text style={{...styles.title}}>투표 만들기</Text>
          <TextInput style={{...styles.input}} placeholder="제목" />
          <TextInput style={{...styles.input}} placeholder="항목" />
          <TextInput style={{...styles.input}} placeholder="항목" />
          <TextInput style={{...styles.input}} placeholder="항목" />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                set_date_modal(true);
              }}
              style={{...styles.input}}>
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
        </View>
        <View style={{...styles.row_view}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Create');
            }}
            style={{...styles.create_container2}}>
            <Text style={{...styles.create_txt2}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Create');
            }}
            style={{...styles.create_container}}>
            <Text style={{...styles.create_txt}}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={date_modal}
        mode="date"
        onConfirm={() => {
          return set_date_modal(false);
        }}
        onCancel={(data) => {
          set_date(data)
          return set_date_modal(false);
        }}
      />
      <DateTimePickerModal
        isVisible={time_modal}
        mode="time"
        onConfirm={(data) => {
          set_time(data)
          return set_time_modal(false);
        }}
        onCancel={() => {
          return set_time_modal(false);
        }}
      />
    </>
  );
}
