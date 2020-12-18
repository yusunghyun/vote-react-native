import {Dimensions, StyleSheet} from 'react-native';
import scale from '../../Common/scale';
const {width: Width, height: Height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    color: '#AE5E1A',
    alignSelf: 'center',
    fontSize: scale(18),
    marginBottom: scale(10),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFC091',
    backgroundColor: '#FFDAB9',
    borderRadius: scale(14),
    paddingLeft: scale(10),
    fontSize: scale(14),
    color: '#000000',
    elevation: 5,
  },
  touch_container: {
    backgroundColor: '#AE5E1A',
    marginLeft: scale(10),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    elevation: 5,
  },
  touch_txt: {
    fontSize: scale(14),
    color: '#ffffff',
  },
  flat_container: {
    height: '85%',
    backgroundColor: '#FFDAB9',
    borderWidth: 1,
    borderColor: '#FFC091',
    marginHorizontal: scale(10),
    borderRadius: scale(12),
  },
  vote_container: {
    marginHorizontal: scale(20),
    marginVertical: scale(10),
    padding: scale(14),
    borderRadius: scale(12),
    backgroundColor: '#FFC091',
    elevation: 5,
  },
  vote_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vote_txt: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#AE5E1A',
  },
  vote_sub_txt: {
    fontSize: scale(10),
    color: '#C2722E',
    alignSelf: 'flex-end',
  },
  vote_on: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#AE5E1A',
  },
  vote_off: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#AE5E1A',
  },
  create_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(14),
    marginHorizontal: scale(10),
    marginTop: scale(20),
    marginBottom: scale(30),
    borderRadius: scale(12),
    backgroundColor: '#FFB182',
    elevation: 5,
  },
  create_txt: {
    fontSize: scale(14),
    color: '#AE5E1A',
    fontWeight: 'bold',
  },
});
export default styles;
