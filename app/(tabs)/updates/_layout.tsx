import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Updates',
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerStyle: { backgroundColor: '#fff' },
                    headerRight: () => (
                        <TouchableOpacity>
                            <Ionicons
                                name="ellipsis-horizontal-circle-outline"
                                color={Colors.primary}
                                size={30}
                            />
                        </TouchableOpacity>
                        
                    ),
                }}
            />
        </Stack>
    );
};

export default Layout;
