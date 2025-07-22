import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import welcomeImage from '@/assets/images/welcome.png';

const Page = () => {
    const openLink = () => {
        Linking.openURL('https://www.whatsapp.com/legal/terms-of-service#terms-of-service-privacy-policy-and-user-data');
    };

    return (
        <View style = {styles.container}>
            <Image source = {welcomeImage} style = {styles.welcome} />
            <Text style = {styles.headline}>Welcome to WhatsApp</Text>
            <Text style = {styles.description}>
                Read our{' '}
                <Text style = {styles.link} onPress={openLink}>
                    Privacy Policy
                </Text>
                . {'Tap "Agree & Continue" to accept the '}
                <Text style = {styles.link} onPress={openLink}>
                    Terms of Service
                </Text>
                .
            </Text>
            <Link href = {'/otp'} replace asChild>
              <TouchableOpacity style = {styles.button}>
                <Text style = {styles.buttonText}>Agree & Continue</Text>
              </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    welcome: {
        height: 600,
        width: 600,
        marginBottom: 20,
    },

    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.grey,
    },

    link: {
        color: Colors.primary,
    },

    button: {
        width: '100%',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 22,
        color: Colors.primary,
        fontWeight: 'bold',
    },
});

export default Page;
