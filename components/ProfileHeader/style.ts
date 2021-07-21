import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  rightSide: {
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 16
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineText: {
    marginRight: 5,
    color: 'grey'
  }
});

export default styles;
