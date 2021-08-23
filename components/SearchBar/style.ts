import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    marginTop: 10
  },
  searchIcon: {
    position: 'absolute',
    left: '3%',
    top: '50%',
  },
  xIcon: {
    position: 'absolute',
    right: '1%',
    top: '48%'
  },
  textInputContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 13,
    padding: 10,
    backgroundColor: '#eaeaea',
  },
  textInput: {
    marginLeft: 22,
    marginRight: 25
  }
});

export default styles;
