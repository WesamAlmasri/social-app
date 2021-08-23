import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  rightSide: {
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineText: {
    marginRight: 5,
    color: 'grey',
    fontSize: 12
  }
});

export default styles;
