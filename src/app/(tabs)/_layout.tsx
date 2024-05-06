
import { Tabs } from "expo-router"
import { AntDesign } from '@expo/vector-icons';

export default () => {
    return (
        <Tabs screenOptions={{ headerTitle: "", headerShown: false }}>
            <Tabs.Screen name="home" options={{
                title: 'Home', tabBarIcon: ({ color, size }) => (
                    <AntDesign name="home" size={size} color={color} />
                )
            }} />            
            <Tabs.Screen name="reviewPage" options={{
                title: 'My Reviews', tabBarIcon: ({ color, size }) => (
                    <AntDesign name="barschart" size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}