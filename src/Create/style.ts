import {Dimensions, StyleSheet} from 'react-native';
import scale from '../../Common/scale';
const {width: Width, height: Height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
  },
  container2: {
    flex: 1,
    backgroundColor: '#FFEFD5',
    paddingHorizontal: scale(20),
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: scale(20),
    fontWeight: 'bold',
    margin: scale(20),
    color: '#AE5E1A',
  },
  plust_text:{
    fontSize:scale(14), 
    color:'rgba(0,0,0,0.4)',
    marginVertical:scale(10), 
  },
  term_text:{
    flex:1,
    fontSize:scale(14), 
    color:'#AE5E1A'
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFC091',
    backgroundColor: '#FFDAB9',
    borderRadius: scale(14),
    paddingHorizontal: scale(10),
    fontSize: scale(14),
    color: '#000000',
    marginBottom: scale(10),
    elevation: 5,
    marginHorizontal:scale(20), 
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
    flex:1,
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
  create_container2: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(14),
    marginHorizontal: scale(10),
    marginTop: scale(20),
    marginBottom: scale(30),
    borderRadius: scale(12),
    backgroundColor: '#AE5E1A',
    elevation: 5,
  },
  create_txt: {
    fontSize: scale(14),
    color: '#AE5E1A',
    fontWeight: 'bold',
  },
  create_txt2: {
    fontSize: scale(14),
    color: '#FFB182',
    fontWeight: 'bold',
  },
});
export default styles;
