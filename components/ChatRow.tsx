import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { FC } from 'react';
import {  View, Text, TouchableHighlight, Image } from 'react-native';
import AppleStyleSwipeableRow from '@/components/AppleStyleSwipeableRow';

export interface ChatRowProps {
    id: string;
    from: string;
    date: string;
    img: string;
    msg: string;
    read: boolean;
    unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({ id, from, date, img, msg, read, unreadCount }) => {
    return(
        <AppleStyleSwipeableRow>
            <Link href={'/(tabs)/chats/${id}'} asChild>
                <TouchableHighlight activeOpacity={0.6} underlayColor={Colors.lightgrey}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingLeft: 20, paddingVertical: 10, }}>
                        <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{from}</Text>
                            <Text style={{ fontSize: 16, color: Colors.grey }}>{msg.length > 100 ? `${msg.substring(0, 100)}...` : msg}</Text>
                        </View>
                        <Text style={{ color: Colors.grey, paddingRight: 20, alignSelf: 'flex-start' }}>{format(date, 'dd.MM.yy')}</Text>
                    </View>
                </TouchableHighlight>
            </Link>
        </AppleStyleSwipeableRow>
    );
};

export default ChatRow;
