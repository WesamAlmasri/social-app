import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveChat } from './store/chat/actionCreators';
import { updateActiveNotification } from './store/notifications/actionCreators';
import { MESSAGES_SOCKET_URL, NOTIFICATIONS_SOCKET_URL } from './urls';
import { StoreStateType } from './store/types';

let messagesSocket;
let notificationsSocket;


const SocketService = () => {

    const dispatch = useDispatch();
    const { user, activeChatUser } = useSelector(mapStateToProps);

    const setupSocket = () => {
        if(!user)return;

        // Messages service
        messagesSocket = openSocket(MESSAGES_SOCKET_URL);
        messagesSocket.emit('join', {user_id: user.id});
        messagesSocket.on('message', (data) => {
            console.log('received message : ', data);
            if (user.id === data.receiver_id /*|| user.id === data.sender_id */){
                dispatch(updateActiveChat(data));
                if((user.id === data.receiver_id) && (data.sender_id !== activeChatUser?.id)){
                    // Send notification
                }
            } else {return;}
        })

        // Notifications service
        notificationsSocket = openSocket(NOTIFICATIONS_SOCKET_URL);
        notificationsSocket.emit('join', {user_id: user.id});
        notificationsSocket.on('notification', (data) => {
            console.log('received notification : ', data);
            if (user.id === data.receiver_id){
                dispatch(updateActiveNotification(data));
            } else {return;}
        })
    };

    useEffect(setupSocket, [user]);

    return null;
};

const mapStateToProps = (state: StoreStateType)  => ({
    activeChatUser: state.chat.activeChatUser.activeChatUser,
    user: state.user.user
})

export default SocketService;