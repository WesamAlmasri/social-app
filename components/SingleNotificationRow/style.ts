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
  },
  notificationImage: {
    backgroundColor: '#d0d9ff',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nText: {
    color: 'green',
    fontSize: 25
  },
  notificationState: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginLeft: 'auto',
    alignSelf: 'center',
    marginRight: 15
  }
});

export default styles;
