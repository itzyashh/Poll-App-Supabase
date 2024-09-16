import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Legend = ({data}) => {
  return (
    <View style={styles.legendContainer}>
    {data?.map((item, index) => (
        <View key={index} style={styles.legend}>
            <View style={[styles.legendColor, {backgroundColor: item.color}]}></View>
            <Text style={styles.legendText}>{item.option}</Text>
        </View>
    ))}
</View>
  )
}

export default Legend

const styles = StyleSheet.create({
    legendContainer: {
        padding: 30,
        position: 'absolute',
        top: 0,
        right: 0,
        gap: 10
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 5
    },
    legendText: {
        fontSize: 14,
        color: '#fff'
    },
})