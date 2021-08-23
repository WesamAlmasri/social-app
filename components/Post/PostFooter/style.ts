import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  postFooterContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor: '#e7e7e7',
      paddingTop: 10
  },
  likesContainer:{
    flexDirection: 'row',
    marginRight: 30,
    alignItems: 'center'
  },
  numberOfLikes: {
    marginLeft: 5,
    color: 'grey'
  }
});

export default styles;
