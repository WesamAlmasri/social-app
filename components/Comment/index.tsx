import React from "react";
import { View } from 'react-native';
import styles from "./style";
import { CommentType } from "../../types";
import ProfilePicture from "../ProfilePicture";

export type CommentProps = {
    comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <View style={styles.commentContainer}>
            <ProfilePicture size={30} image={comment.profile.profile_picture} />
        </View>
    )
}

export default Comment;