import * as React from 'react'
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkAvailable } from '../../stores/reducers/isNetworkAvailableReducer';
import UnavailableNetwork from '../UnavailableNetwork';


const NetworkManager = (props) => {

    const dispatch = useDispatch()
    const isNetworkAvailable = useSelector((state) => state.isNetworkAvailable.value)

    React.useEffect(() =>
        NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                dispatch(setNetworkAvailable(false))
            } else {
                dispatch(setNetworkAvailable(true))
            }
        }), []);


    return isNetworkAvailable ? props.children : <UnavailableNetwork />
}
export default NetworkManager