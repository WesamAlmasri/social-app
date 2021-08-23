import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    NewPostRowContainer: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10
    },
    newPostButton: {
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10
    },
    buttonText: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#2e97dc'
    }
})

export default styles;