import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import contacts from '@/assets/data/contacts.json';
import { AlphabetList } from 'react-native-section-alphabet-list';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useState } from 'react';

const Page = () => {
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

    const data = contacts.map((contact, index) => ({
        value: `${contact.first_name} ${contact.last_name}`,
        name: `${contact.first_name} ${contact.last_name}`,
        img: contact.img,
        desc: contact.desc,
        key: `${contact.first_name} ${contact.last_name}-${index}`,
    }));

    const toggleSelection = (contactName: string) => {
        setSelectedContacts((prevSelected) =>
            prevSelected.includes(contactName)
                ? prevSelected.filter((name) => name !== contactName)
                : [...prevSelected, contactName]
        );
    };

    const createGroupChat = () => {
        console.log('Group Chat Created with:', selectedContacts);
        // Navigate to the group chat or save it in your app's state
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingTop: 20, backgroundColor: Colors.background }}>
                <AlphabetList
                    data={data}
                    stickySectionHeadersEnabled
                    indexLetterStyle={{ color: Colors.primary, fontSize: 12 }}
                    indexContainerStyle={{ width: 24, backgroundColor: Colors.background }}
                    style={{ marginLeft: 14 }}
                    renderCustomSectionHeader={(section) => (
                        <View style={styles.sectionHeaderContainer}>
                            <Text>{section.title}</Text>
                        </View>
                    )}
                    renderCustomItem={(item: any) => (
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.listItemContainer,
                                    selectedContacts.includes(item.value) && {
                                        backgroundColor: Colors.lightgreen,
                                    },
                                ]}
                                onPress={() => toggleSelection(item.value)}
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                />
                                <View>
                                    <Text style={{ color: '#000', fontSize: 14 }}>
                                        {item.value}
                                    </Text>
                                    <Text
                                        style={{
                                            color: Colors.grey,
                                            fontSize: 12,
                                        }}
                                    >
                                        {item.desc.length > 100
                                            ? `${item.desc.substring(0, 100)}...`
                                            : item.desc}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[defaultStyles.separator]} />
                        </>
                    )}
                />
                <TouchableOpacity
                    style={styles.createGroupButton}
                    onPress={createGroupChat}
                >
                    <Text style={styles.createGroupButtonText}>
                        Create Group Chat
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        height: 50,
        gap: 10,
        alignItems: 'center',
    },
    sectionHeaderContainer: {
        height: 30,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    createGroupButton: {
        backgroundColor: Colors.primary,
        padding: 14,
        margin: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    createGroupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default Page;
