
// import { Tabs } from "expo-router"
// import { AntDesign } from '@expo/vector-icons';

// export default () => {
//     return (
//         <Tabs screenOptions={{ headerTitle: "", headerShown: false }}>
//             <Tabs.Screen name="home" options={{
//                 title: 'Home', tabBarIcon: ({ color, size }) => (
//                     <AntDesign name="home" size={size} color={color} />
//                 )
//             }} />            
//             <Tabs.Screen name="reviewPage" options={{
//                 title: 'My Reviews', tabBarIcon: ({ color, size }) => (
//                     <AntDesign name="barschart" size={size} color={color} />
//                 )
//             }} />
//         </Tabs>
//     )
// }

// import { createMaterialBottomTabNavigator, 
//     MaterialBottomTabNavigationOptions, 
//     MaterialBottomTabNavigationEventMap } from '@react-navigation/material-bottom-tabs'
// import { ParamListBase, TabNavigationState } from '@react-navigation/native'
// import { withLayoutContext } from 'expo-router'

// const { Navigator } = createMaterialBottomTabNavigator()

// export const MaterialBottomTabs = withLayoutContext<
// MaterialBottomTabNavigationOptions,
// typeof Navigator,
// TabNavigationState<ParamListBase>,
// MaterialBottomTabNavigationEventMap
// >(Navigator);

// const Layout = () => (
//     <MaterialBottomTabs>

//     </MaterialBottomTabs>
// )

// export default Layout


import { createMaterialTopTabNavigator, 
    MaterialTopTabNavigationOptions, 
    MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { withLayoutContext } from 'expo-router'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => (
    <MaterialTopTabs 
    intialRouteName="home"
    screenOptions={{
        tabBarActiveTintColor: '#131620',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarIndicatorStyle: { backgroundColor: '#1C87ED'}
    }}>
        <MaterialTopTabs.Screen name="theCrew" options={{title: "The Crew"}} />
        <MaterialTopTabs.Screen name="home" options={{title: "Home"}} />
        <MaterialTopTabs.Screen name="reviewPage" options={{title: "Review"}} />
        
    </MaterialTopTabs>
)

export default Layout