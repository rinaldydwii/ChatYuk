import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { AppRoutes, AuthRoutes, SwitchRoutes } from './routes';

const AppNavigator = createSwitchNavigator({
    ...SwitchRoutes,
    Auth: { screen: createStackNavigator(AuthRoutes) },
    App: { screen: createStackNavigator(AppRoutes, {headerLayoutPreset: 'center'})}
}, {
})

export default createAppContainer(AppNavigator)
