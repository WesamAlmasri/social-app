import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    postHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    middle: {
        marginHorizontal: 10,
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 5
    }, 
    createdAt: {
        color: 'grey'
    },
    threeDotsIcon: {
        alignSelf: 'flex-start'
    }
})

export default styles;