import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataType} from '../../Common/type'
interface Props {
  route: {
    params: DataType;
  };
}

export default function index(props: Props) {
  const [data, set_data] = useState<DataType>();
  console.log(props.route.params);
  return (
    <View>
      <Text>ㅎㅇㅎㅇㅎㅇ</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
