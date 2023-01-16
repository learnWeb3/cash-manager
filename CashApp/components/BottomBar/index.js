import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import ClockInOutScreen from '../../screens/ClockInOutScreen/index';
import { routes as appRoutes } from '../../routes/index';
import DashboardScreen from '../../screens/DashboardScreen/index';


const BottomBar = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: appRoutes.clockinout.name, title: appRoutes.clockinout.title, focusedIcon: 'clock', unfocusedIcon: 'clock' },
        { key: appRoutes.dashboard.name, title: appRoutes.dashboard.title, focusedIcon: 'google-analytics', unfocusedIcon: 'google-analytics' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        [appRoutes.clockinout.name]: () => ClockInOutScreen,
        [appRoutes.dashboard.name]: () => DashboardScreen

    });

return (
    <BottomNavigation
        style={{ width: "100%" }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
)
}

export default BottomBar