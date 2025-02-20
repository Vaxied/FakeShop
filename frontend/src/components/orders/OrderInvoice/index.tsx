import React from 'react'
import interLight from '@assets/fonts/Inter_18pt-Light.ttf'
import interRegular from '@assets/fonts/Inter_18pt-Regular.ttf'
import interMedium from '@assets/fonts/Inter_18pt-Medium.ttf'
import interSemibold from '@assets/fonts/Inter_18pt-SemiBold.ttf'
import interBold from '@assets/fonts/Inter_18pt-Bold.ttf'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer'

import { Order } from '@@types/order'

Font.register({
    // only font formats that are supported are ttf and woff
    family: 'Inter',
    fonts: [
        {
            src: interLight,
            fontWeight: 'light',
        },
        {
            src: interRegular,
            fontWeight: 'normal',
        },
        {
            src: interMedium,
            fontWeight: 'medium',
        },
        {
            src: interSemibold,
            fontWeight: 'semibold',
        },
        {
            src: interBold,
            fontWeight: 'bold',
        },
    ],
})

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        height: '100%',
        fontFamily: 'Inter',
        color: '#424661',
        fontSize: 12,
    },
    section: {
        marginVertical: 10,
        flexGrow: 1,
        width: '100%',
    },
    horizontalDivider: {
        width: '100%',
        backgroundColor: 'gray',
        height: '1',
        marginVertical: 10,
    },
    horizontalDividerWithoutMargin: {
        width: '100%',
        backgroundColor: '#677beb',
        height: '1',
    },
    addressColumn: {
        flexDirection: 'column',
        width: '50%',
        columnGap: 10,
    },
    table: {
        flexGrow: 1,
        width: '100%',
        borderTop: '1 solid darkgray',
        borderLeft: '1 solid darkgray',
        borderRight: '1 solid darkgray',
        fontFamily: 'Helvetica',
        // fontWeight: 700,
    },
    tableHeader: {
        color: 'white',
        backgroundColor: '#677beb',
    },
    tableRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1 solid darkgray',
        // fontWeight: 'light',
    },
    tableCellFirstColumn: {
        width: '60%',
        padding: 5,
        paddingLeft: 10,
    },
    tableCellMiddleColumn: {
        width: '20%',
        // lighter gray borders
        borderLeft: '1 solid darkgray',
        borderRight: '1 solid darkgray',
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
    },
    costBreakdownSecondColumn: {
        flexDirection: 'column',
        gap: 5,
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
    title: {
        color: '#677beb',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    boldHeader: {
        fontWeight: 'bold',
    },
    fullBorder: {
        border: '1 solid #677beb',
    },
    evenTableRow: {
        backgroundColor: '#f2f2f2',
    },
    oddTableRow: { backgroundColor: '#ffffff' },
    textCenter: {
        textAlign: 'center',
    },
    fontBold: {
        fontWeight: 'bold',
    },
    fontSemibold: {
        fontWeight: 'semibold',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
    },
    justifyFlexEnd: {
        justifyContent: 'flex-end',
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
// const items = Array.from({ length: 5 })
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
type OrderInvoiceProps = {
    order: Order
    orderBreakdown: { tax: string; shipping: string; total: string }
}

console.log('order invoice')
function OrderInvoice({ order, orderBreakdown }: OrderInvoiceProps) {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>FakeShop</Text>
                </View>
                <View
                    style={[
                        styles.section,
                        styles.textSmall,
                        styles.textCenter,
                        styles.fontSemibold,
                        {
                            paddingVertical: 30,
                        },
                    ]}
                >
                    {/* <Text>Order details for order #123456789</Text> */}
                    <Text>Order details for order #{order.orderId}</Text>
                    <Text>Please print this document for your records.</Text>
                </View>
                <View style={[styles.section, { paddingBottom: 20 }]}>
                    <View style={[styles.flexRow, styles.justifySpaceBetween]}>
                        {/* <Text>Order reference: 123456789</Text> */}
                        <Text>Order #{order.orderId}</Text>
                        <Text>Order date: 24/12/2022</Text>
                    </View>
                    <Text>Paypal order reference: 123456789</Text>
                </View>
                <View style={styles.horizontalDividerWithoutMargin}></View>
                <View
                    style={[
                        styles.section,
                        styles.boldHeader,
                        styles.textCenter,
                    ]}
                >
                    <Text style={[styles.textMedium]}>
                        Delivery information
                    </Text>
                </View>
                <View
                    style={[
                        styles.section,
                        styles.textSmall,
                        styles.flexRow,
                        { paddingBottom: 20 },
                    ]}
                >
                    <View style={styles.addressColumn}>
                        <Text
                            style={[
                                styles.fontSemibold,
                                {
                                    paddingBottom: 10,
                                },
                            ]}
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
                    <View style={[styles.flexColumn, { width: '50%' }]}>
                        <Text
                            style={[
                                styles.fontSemibold,
                                {
                                    paddingBottom: 10,
                                },
                            ]}
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
                <View style={styles.horizontalDividerWithoutMargin}></View>
                <View
                    style={[
                        styles.section,
                        styles.boldHeader,
                        styles.textCenter,
                    ]}
                >
                    <Text style={[styles.textMedium]}>Item List</Text>
                </View>
                <View style={[styles.section, styles.table, styles.textSmall]}>
                    <View style={[styles.tableHeader, styles.tableRow]}>
                        <View style={[styles.tableCellFirstColumn]}>
                            <Text>Item name</Text>
                        </View>
                        <View
                            style={[
                                styles.tableCellMiddleColumn,
                                styles.tableCell,
                            ]}
                        >
                            <Text>Unit(s)</Text>
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
                    {order.productList.map((item, index) => (
                        <View
                            key={item.product_id}
                            style={[
                                styles.tableRow,
                                index % 2 === 0
                                    ? styles.evenTableRow
                                    : styles.oddTableRow,
                            ]}
                        >
                            <View style={styles.tableCellFirstColumn}>
                                <Text>{item.title}</Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCell,
                                    styles.tableCellMiddleColumn,
                                ]}
                            >
                                <Text>{item.product_quantity}</Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCell,
                                    styles.tableCellLastColumn,
                                ]}
                            >
                                <Text style={styles.textCenter}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View
                    style={[
                        styles.section,
                        styles.flexRow,
                        styles.justifyFlexEnd,
                    ]}
                >
                    <View
                        style={[
                            styles.textMedium,
                            styles.costBreakdown,
                            { padding: 5 },
                        ]}
                    >
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
                                    width: '100%',
                                    marginVertical: 10,
                                }}
                            ></View>
                            <Text
                                style={[styles.textMedium, styles.boldHeader]}
                            >
                                Total
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.costBreakdownSecondColumn,
                                styles.textSmall,
                            ]}
                        >
                            <Text>${order.totalPrice}</Text>
                            <Text>${orderBreakdown.shipping}</Text>
                            <Text>${orderBreakdown.tax}</Text>
                            <View style={styles.horizontalDivider}></View>
                            <Text
                                style={[styles.textMedium, styles.boldHeader]}
                            >
                                ${orderBreakdown.total}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.footer]}>
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
