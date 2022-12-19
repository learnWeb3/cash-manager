import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-paper';
import { ProductCard } from '../ProductCard/index';
import { FlatList } from 'react-native-gesture-handler';

export const ScanManager = () => {

    const [scannedProducts, setScannedProducts] = useState([
        {
            id: "638485c48e4953b0e9f050bd",
            title: "Evian 1L",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 5.5,
            taxRate: 20,
            quantity: 1
        },
        {
            id: "638485c48e4953b0e9f050be",
            title: "Grapefruit",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "Kg",
            price: 2.75,
            taxRate: 20,
            quantity: .565,
        },
        {
            id: "638485c48e4953b0e9f050fd",
            title: "Chopped steak charal",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 10.25,
            taxRate: 20,
            quantity: 2,
        },
        {
            id: "638485c48e4953b0e9f050bg",
            title: "Evian 1L",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 12.97,
            taxRate: 20,
            quantity: 1
        },
        {
            id: "638485c48e4953b0e9f050bh",
            title: "Grapefruit",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "Kg",
            price: 2.97,
            taxRate: 20,
            quantity: .565,
        },
        {
            id: "638485c48e4953b0e9f050bi",
            title: "Chopped steak charal",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 7.63,
            taxRate: 20,
            quantity: 2,
        }, {
            id: "638485c48e4953b0e9f050bj",
            title: "Evian 1L",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 1.53,
            taxRate: 20,
            quantity: 1
        },
        {
            id: "638485c48e4953b0e9f050bk",
            title: "Grapefruit",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "Kg",
            price: 3.10,
            taxRate: 20,
            quantity: .565,
        },
        {
            id: "638485c48e4953b0e9f050bl",
            title: "Chopped steak charal",
            description: "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
            unit: "u",
            price: 5.38,
            taxRate: 20,
            quantity: 2,
        }
    ])
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const [scannedData, setScannedData] = useState("")
    const [scannedDataType, setScannedDataType] = useState("")

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedDataType(type);
        setScannedData(data)
    };

    const handleNewScan = () => setScanned(false)

    const renderScannedProduct = ({ item: scannedProduct }) => {
        return <ProductCard
            title={scannedProduct.title}
            description={scannedProduct.description}
            unit={scannedProduct.unit}
            price={scannedProduct.price}
            taxRate={scannedProduct.taxRate}
            quantity={scannedProduct.quantity}
            descriptionLength={0}
            editable={true}
        />
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {scanned ?
                <>
                    <View style={styles.productList}>
                        <FlatList
                            data={scannedProducts}
                            renderItem={renderScannedProduct}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.actions}>
                        <Button color='#3A66BD' mode="contained" onPress={handleNewScan} style={styles.actionButton}>
                            SCAN AGAIN
                        </Button>
                        <Button color='#3A66BD' mode="contained" onPress={() => console.log('Pressed')} style={styles.actionButton}>
                            REGISTER
                        </Button>
                    </View>
                </>
                :
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            }
        </View >
    );

}

const styles = StyleSheet.create({
    productList: {
        height: "90%"
    },
    actions: {
        height: "10%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    actionButton: {
        height: '90%',
        width: '45%',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '100%',
        height: "100%"
    }
}); 