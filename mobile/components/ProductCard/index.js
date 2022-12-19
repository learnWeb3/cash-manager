import * as React from 'react';
import { Card, Title, Paragraph, Text, Badge } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import InputGroup from '../InputGroup/index';
import { Ionicons } from '@expo/vector-icons';

export const ProductCard = ({ title, description, price, quantity, unit, taxRate, descriptionLength = 100, editable = false, setQuantity = null, setPrice = null, setTaxRate = null }) => {

    const formatDescription = (value) => {
        return descriptionLength > 0 ? value.slice(0, descriptionLength) + '...' : value
    }

    return <Card style={styles.container}>
        <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{formatDescription(description)}</Paragraph>
        </Card.Content>
        {editable ? <>
            <Card.Actions style={{ width: "100%" }}>
                <InputGroup handleInput={setQuantity} value={`${quantity}`} label={"quantity"} style={{ width: "100%" }} />
            </Card.Actions>
            <Card.Actions style={{ width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
                <InputGroup handleInput={setTaxRate} value={`${taxRate}`} label={"tax rate"} style={{ width: "100%" }} />
            </Card.Actions>
            <Card.Actions style={{ width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
                <InputGroup handleInput={setPrice} value={`${price}`} label={"price"} style={{ width: "100%" }} />
            </Card.Actions>
        </> : <Card.Actions style={{ width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
            <InputGroup handleInput={setQuantity} value={`${quantity}`} label={"quantity"} style={{ width: 100 }} />
            <View>
                <Text variant="labelMedium">Price / u</Text>
                <Badge size={36} style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    alignSelf: 'flex-end',
                    backgroundColor: '#FFFFFF',
                }} >{price} $ / {unit}</Badge>
            </View>
            <View>
                <Text variant="labelMedium">Total</Text>
                <Badge size={36} style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    alignSelf: 'flex-end',
                    backgroundColor: '#FFFFFF',
                }} >{`${price * quantity}`.slice(0, 4)} $ </Badge>
            </View>
            <View>
                <Badge size={64} style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    alignSelf: 'flex-end',
                    backgroundColor: '#FFFFFF',
                }} >
                    <Ionicons name={'trash-outline'} size={32} color={'#f44336'} />
                </Badge>
            </View>
        </Card.Actions>}


    </Card >
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative'
    }
})