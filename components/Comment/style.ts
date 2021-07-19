import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    rightPart: {
      marginLeft: 15
    },
    username: {
      fontWeight: 'bold',
    },
    commentText: {
      
    },
    createdAt: {
      fontSize: 10,
      color: 'grey'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '70%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      confirmText: {
        alignSelf: 'center',
        marginTop: 10
      },
      exitBtn: {
        alignSelf: 'flex-end'
      },
      deleteBtn: {
        backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
      },
      deleteBtnText: {
        color: '#fff'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})

export default styles;