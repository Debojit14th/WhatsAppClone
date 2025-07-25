import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Linking, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const IND_PHONE = [
    '+',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
    const { bottom } = useSafeAreaInsets();
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const openLink = () => {
        Linking.openURL('https://www.whatsapp.com/legal/terms-of-service#terms-of-service-privacy-policy-and-user-data');
    };

    const sendOTP = async () => {
            setLoading(true);
            try {
                await signUp!.create({
                    phoneNumber
                });

                signUp!.preparePhoneNumberVerification();

                router.push(`/verify/${phoneNumber}`);
            }
            catch(err) {
                console.log(err);
                if (isClerkAPIResponseError(err)) {
                    if (err.errors[0].code === 'form_identifier_exists') {
                        console.log('user exists');
                        await trySignIn();
                    }
                    else {
                        setLoading(false);
                        Alert.alert('Error', err.errors[0].message);
                    }
                }
            }
        };

    const trySignIn = async () => {
        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });

        router.push(`/verify/${phoneNumber}?signin=true`);
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView behavior='padding' style = {{ flex: 1 }}>
            <View style = {styles.container}>
                {loading && (
                    <View style = {[StyleSheet.absoluteFill, styles.loading]}>
                        <ActivityIndicator size='large' color={Colors.primary} />
                        <Text style = {{ fontSize: 18, padding: 10 }}>Sending code...</Text>
                    </View>
                )}

                <Text style = {styles.description}>
                    WhatsApp will need to verify your account. Carrier charges may apply.
                </Text>

                <View style = {styles.list}>
                    <View style = {styles.listItem}>
                        <Text style = {styles.listItemText}>India</Text>
                        <Ionicons name = 'chevron-forward' size = {20} color = {Colors.grey} />
                    </View>
                    <View style = {styles.separator} />

                    <MaskInput
                      value={phoneNumber}
                      keyboardType='numeric'
                      autoFocus
                      placeholder='+91 Your Phone Number'
                      style={styles.input}
                      onChangeText={(masked, unmasked) => {
                        setPhoneNumber(masked); 
                    }}
                    mask={IND_PHONE}
                    />
                </View>

                <Text style = {styles.legal}>
                    You must be{' '}
                    <Text style = {styles.link} onPress={openLink}>
                        at least 16 years old
                    </Text>{' '}
                    to register. Learn how WhatsApp works with the{' '}
                    <Text style = {styles.link} onPress={openLink}>
                        Meta Companies
                    </Text>
                </Text>

                <View style = {{ flex : 1}} />

                <TouchableOpacity style = {[styles.button, phoneNumber !== '' ? styles.enabled : null, {marginBottom: bottom}]}
                disabled = {phoneNumber === ''} 
                onPress={sendOTP}>
                    <Text style = {[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.background,
        gap: 20,
    },

    description: {
        fontSize: 14,
        color: Colors.grey,
    },

    list: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10,
    },

    listItemText: {
        fontSize: 18,
        color: Colors.primary,
    },

    separator: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        opacity: 0.3,
    },

    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },

    link: {
        color: Colors.primary,
    },

    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightgrey,
        padding: 10,
        borderRadius: 10,
    },

    enabled: {
        backgroundColor: Colors.primary,
        color: '#fff',
    },

    buttonText: {
        color: Colors.grey,
        fontSize: 22,
        fontWeight: '500',
    },

    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,
    },

    loading: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Page;
