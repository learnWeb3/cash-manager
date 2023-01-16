import * as React from 'react';
import { Image } from 'react-native';

const Logo = () => {
    return <Image resizeMode={'contain'}
        style={{height: 50, width: "100%", marginBottom: 24}} source={require('./img/time_manager_icon.png')} />
}

export default Logo