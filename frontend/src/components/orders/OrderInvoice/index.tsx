import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Order } from '@@types/order'

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        height: '100%',
    },
    section: {
        marginVertical: 10,
        flexGrow: 1,
        width: '100%',
    },
    horizontalDivider: {
        width: '100%',
        backgroundColor: 'black',
        height: '1',
        marginVertical: 10,
    },
    addressColumn: {
        flexDirection: 'column',
        width: '50%',
        columnGap: 10,
    },
    table: {
        flexGrow: 1,
        width: '100%',
        borderTop: '1 solid black',
        borderLeft: '1 solid black',
        borderRight: '1 solid black',
    },
    tableRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1 solid black',
    },
    tableCellFirstColumn: {
        width: '60%',
        padding: 5,
        paddingLeft: 10,
    },
    tableCellMiddleColumn: {
        width: '20%',
        borderRight: '1 solid black',
        borderLeft: '1 solid black',
    },
    tableCellLastColumn: {
        width: '20%',
    },
    tableCell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 5,
    },
    textSmall: {
        fontSize: 12,
    },
    textMedium: {
        fontSize: 14,
    },
    textLarge: {
        fontSize: 16,
    },
    costBreakdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        width: 160,
    },
    costBreakdownFirstColumn: {
        flexDirection: 'column',
        gap: 5,
        backgroundColor: 'green',
    },
    costBreakdownSecondColumn: {
        flexDirection: 'column',
        gap: 5,
        backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        width: '100%',
        textAlign: 'center',
        fontSize: 10,
    },
})

// generate items with random data for demo with this structure
const itemsArray = [
    {
        name: 'Item 1 This is an item with a very long name that shoud wrap to the next line',
        quantity: 2,
        price: 100,
    },
    {
        name: 'Item 1',
        quantity: 2,
        price: 100,
    },
    {
        name: 'Item 1',
        quantity: 2,
        price: 100,
    },
]
const items = Array.from({ length: 5 })
const mockAddresses = [
    {
        id: '1',
        firstName: 'Andy',
        lastName: 'Rocks',
        street: '4545 1st Ave SE',
        city: 'Cedar Rapids',
        state: 'Iowa',
        zipCode: '52402',
        country: 'United States',
    },
    {
        id: '2',
        firstName: 'Sandra',
        lastName: 'Mountain',
        street: '1400 N La Brea Ave',
        city: 'Inglewood',
        state: 'California',
        zipCode: '90302',
        country: 'United States',
    },
]

console.log('order invoice')
function OrderInvoice() {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={[styles.section, { fontSize: 20 }]}>
                    <Text style={{ fontWeight: 'extrabold' }}>FakeShop</Text>
                </View>
                <View style={[styles.section, { textAlign: 'right' }]}>
                    <Text
                        style={[
                            styles.textMedium,
                            { fontWeight: 'light', paddingBottom: 10 },
                        ]}
                    >
                        Order date: 24/12/2022
                    </Text>
                </View>
                <View
                    style={[
                        styles.section,
                        styles.textMedium,
                        { backgroundColor: 'green' },
                    ]}
                >
                    {/* <Text>Placed on 24/12/2022</Text> */}
                    <Text>Order reference: 123456789</Text>
                    <Text>Paypal order reference: 123456789</Text>
                </View>
                <View style={styles.horizontalDivider}></View>
                <View
                    style={[
                        styles.section,
                        styles.textSmall,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={styles.addressColumn}>
                        <Text
                            style={{
                                paddingBottom: 10,
                                fontWeight: 'demibold',
                            }}
                        >
                            Shipped to:
                        </Text>
                        <Text>
                            {mockAddresses[0].firstName}{' '}
                            {mockAddresses[0].lastName}
                        </Text>
                        <Text>
                            {mockAddresses[0].street}, {mockAddresses[0].city}
                        </Text>
                        <Text>
                            {mockAddresses[0].zipCode}, {mockAddresses[0].state}
                        </Text>
                        <Text>{mockAddresses[0].country}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                        <Text
                            style={{
                                paddingBottom: 10,
                                fontWeight: 'demibold',
                            }}
                        >
                            Billed to:
                        </Text>
                        <Text>
                            {mockAddresses[0].firstName}{' '}
                            {mockAddresses[0].lastName}
                        </Text>
                        <Text>
                            {mockAddresses[0].street}, {mockAddresses[0].city}
                        </Text>
                        <Text>
                            {mockAddresses[0].zipCode}, {mockAddresses[0].state}
                        </Text>
                        <Text>{mockAddresses[0].country}</Text>
                    </View>
                </View>
                <View style={styles.horizontalDivider}></View>
                <View style={[styles.section, styles.table, styles.textSmall]}>
                    <View
                        style={[styles.tableRow, { backgroundColor: 'gray' }]}
                    >
                        <View style={styles.tableCellFirstColumn}>
                            <Text>Item name</Text>
                        </View>
                        <View
                            style={[
                                styles.tableCellMiddleColumn,
                                styles.tableCell,
                            ]}
                        >
                            <Text
                                style={{
                                    backgroundColor: 'green',
                                }}
                            >
                                Quantity
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCellLastColumn,
                                styles.tableCell,
                            ]}
                        >
                            <Text>Price</Text>
                        </View>
                    </View>
                    {itemsArray.map((item, index) => (
                        <View
                            style={[
                                styles.tableRow,
                                index % 2 === 0
                                    ? { backgroundColor: 'lightgray' }
                                    : { backgroundColor: 'white' },
                            ]}
                        >
                            <View style={styles.tableCellFirstColumn}>
                                <Text>{item.name}</Text>Text
                            </View>
                            <View
                                style={[
                                    styles.tableCell,
                                    styles.tableCellMiddleColumn,
                                ]}
                            >
                                <Text>{item.quantity}</Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCell,
                                    styles.tableCellLastColumn,
                                ]}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View
                    style={[
                        styles.section,
                        {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        },
                    ]}
                >
                    <View style={[styles.textMedium, styles.costBreakdown]}>
                        <View
                            style={[
                                styles.costBreakdownFirstColumn,
                                styles.textSmall,
                            ]}
                        >
                            <Text>Subtotal:</Text>
                            <Text>Shipping:</Text>
                            <Text>Tax:</Text>
                            <View
                                style={{
                                    height: 1,
                                    marginVertical: 10,
                                    width: '100%',
                                }}
                            ></View>
                            <Text style={styles.textMedium}>Total</Text>
                        </View>
                        <View
                            style={[
                                styles.costBreakdownSecondColumn,
                                styles.textSmall,
                            ]}
                        >
                            <Text>$90.00</Text>
                            <Text>$10.00</Text>
                            <Text>$10.00</Text>
                            <View style={styles.horizontalDivider}></View>
                            <Text style={styles.textMedium}>$110.00</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.footer, { backgroundColor: 'yellow' }]}>
                    <Text>
                        This document was generated using FakeShop for your
                        records
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default OrderInvoice
