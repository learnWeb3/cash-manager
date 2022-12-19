import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Badge, Button, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NFCManager } from '../NFCManager';

export const TicketTotal = ({ ticketProducts = [], sumToggled = false, setSumToggled = null }) => {

    const allTicketsStatus = {
        PAYMENT_ERROR: 5,
        PAID: 4,
        PAYMENT_PROCESSING: 3,
        AWAITING_PAYMENT: 2,
        NOT_PAID: 1
    }
    const [ticketTotal, setTicketTotal] = React.useState(0)
    const [ticketStatus, setTicketStatus] = React.useState(allTicketsStatus.AWAITING_PAYMENT)

    React.useEffect(() => {

        setTicketTotal(calculateSum(ticketProducts))

    }, [ticketProducts])

    function calculateSum(ticketProducts = []) {
        return ticketProducts.reduce((sum, ticketProduct) => {
            return sum + ticketProduct.product.price * ticketProduct.quantity
        }, 0)
    }

    function handlePay() {

    }

    return <View style={styles.container}>
        {sumToggled ?
            <View style={styles.priceContainer}>
                <Text variant="headlineMedium" style={styles.priceHeader}>Total</Text>
                <View>
                    {ticketStatus === allTicketsStatus.NOT_PAID ? <>
                        <View style={styles.totalItem}>
                            <Text>Taxes excluded</Text>
                            <Badge size={36} style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                alignSelf: 'flex-end',
                                backgroundColor: '#FFFFFF',
                            }} >{`${Math.floor(ticketTotal * 100) / 100}`} $ </Badge>
                        </View>
                        <View style={styles.totalItem}>
                            <Text>Taxes</Text>
                            <Badge size={36} style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                alignSelf: 'flex-end',
                                backgroundColor: '#FFFFFF',
                            }} >{`${Math.floor(ticketTotal * 100) / 100}`} $ </Badge>
                        </View>
                        <View style={styles.totalItem}>
                            <Text>Taxes included</Text>
                            <Badge size={36} style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                alignSelf: 'flex-end',
                                backgroundColor: '#FFFFFF',
                            }} >{`${Math.floor(ticketTotal * 100) / 100}`} $ </Badge>
                        </View>
                        <Button onPress={handlePay} mode="contained">Pay</Button>
                    </> : <View style={styles.action}>
                        {ticketStatus === allTicketsStatus.AWAITING_PAYMENT ?
                            <>
                                <ActivityIndicator size={64} />
                                <Text style={{ marginTop: 16 }}>Awaiting payment</Text>
                                <NFCManager />
                            </>

                            : ticketStatus === allTicketsStatus.PAYMENT_PROCESSING ?
                                <>
                                    <Ionicons name={'checkmark-outline'} size={64} color={'#f44336'} />
                                    <Text style={{ marginTop: 16 }}>Payment processing</Text>
                                </>

                                :

                                <>
                                    <Ionicons name={'alert-outline'} size={64} color={'#f44336'} />
                                    <Text style={{ marginTop: 16 }}>Payment Error</Text>
                                </>
                        }
                    </View>}
                </View>
                <Button onPress={() => setSumToggled(false)}><Ionicons name={'chevron-up-outline'} size={36} color={'#f44336'} /></Button>
            </View > :

            <>
                <View style={{ ...styles.priceContainer, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="headlineMedium" style={styles.priceHeader}>Total</Text>
                    <Text variant="headlineMedium" style={styles.priceHeader}>{Math.floor(ticketTotal * 100) / 100} $</Text>
                    <View style={styles.action}>
                        {ticketStatus === allTicketsStatus.NOT_PAID ?
                            <Button onPress={handlePay} mode="contained">Pay</Button> :
                            ticketStatus === allTicketsStatus.AWAITING_PAYMENT || ticketStatus === allTicketsStatus.PAYMENT_PROCESSING ?
                                <ActivityIndicator /> : ticketStatus === allTicketsStatus.PAID ?
                                    <Ionicons name={'checkmark-outline'} size={36} color={'#f44336'} />
                                    : <Ionicons name={'alert-outline'} size={36} color={'#f44336'} />}
                    </View>
                </View>

                <Button onPress={() => setSumToggled(true)}><Ionicons name={'chevron-down-outline'} size={36} color={'#f44336'} /></Button>
            </>
        }

        {/* <NFCManager/> */}
    </View >
}


const styles = StyleSheet.create({
    action: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceContainer: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "#FFF"
    },
    priceHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8
    },
    totalItem: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 4,
        paddingBottom: 4
    },
})