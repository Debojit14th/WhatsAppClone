import { ScrollView, View, Text, FlatList } from 'react-native';
import chats from '@/assets/data/chats.json'
import { defaultStyles } from '@/constants/Styles';
import ChatRow from '@/components/ChatRow';

const Page = () => {
    return(
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 40, paddingTop: 80, backgroundColor: '#fff' }}>
            <FlatList scrollEnabled={false} data={chats} keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (<View style={[defaultStyles.separator, { marginLeft: 90 }]} />)}
            renderItem={({ item }) => <ChatRow {...item} />} />
        </ScrollView>
    );
};

export default Page;
