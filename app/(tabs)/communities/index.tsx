import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Colors from '@/constants/Colors';
import communities from '@/assets/data/communities.json';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                flex: 1,
                paddingBottom: 40,
                paddingTop: 80,
                backgroundColor: '#fff',
            }}
        >
            {/* New Community Option */}
            <TouchableOpacity style={styles.newCommunityRow}>
                <View style={styles.iconContainer}>
                    <Ionicons name="people" size={30} color={Colors.primary} />
                </View>
                <Text style={styles.newCommunityText}>New Community</Text>
                <View style={{ flex: 1 }} />
                <TouchableOpacity>
                    <Ionicons name="add-circle-outline" color={Colors.primary} size={30} />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* Separator */}
            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
            </View>

            {/* Existing Communities */}
            <FlatList
                data={communities}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={[defaultStyles.separator, { marginLeft: 60 }]} />
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.communityRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="people" size={30} color={Colors.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.communityName}>{item.name}</Text>
                            <Text
                                style={styles.communityDescription}
                                numberOfLines={1}
                            >
                                {item.desc}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    newCommunityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    newCommunityText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 16,
    },
    separatorContainer: {
        backgroundColor: Colors.lightgrey,
        paddingVertical: 8,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.grey,
        marginHorizontal: 16,
    },
    communityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightgrey,
        marginRight: 16,
    },
    communityName: {
        fontSize: 16,
        fontWeight: '500',
    },
    communityDescription: {
        color: Colors.grey,
        marginTop: 4,
    },
});

export default Page;
