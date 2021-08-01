import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5
  },
  touchableContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  rightSide:{
    marginLeft: 10
  },
  message: {
    marginBottom: 5,
    color: '#000'
  },
  createdAt: {
    color:'#a5a5a5'
  }
});

export default styles;
