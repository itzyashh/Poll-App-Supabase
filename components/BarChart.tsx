import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type BarChartProps = {
    data: {
        option: string;
        votesCount: number;
        percentage: number;
        color: string;
    }[] | undefined
}

const BarChart = ({ data }: BarChartProps) => {

    // add random color to each option


    return (
        <View style={styles.container}>



            {data?.map((item, index) => {

                const height = `${item.percentage}%`

                return (
                    <View key={index} style={styles.barContainer}>


                        <Text style={styles.voteCount}>{item.votesCount}</Text>
                        <View
                            style={[styles.bar, { height: height, backgroundColor: item.color }]}
                        />
                        <View style={[styles.barBox, { backgroundColor: item.color }]}></View>
                    </View>
                )
            }

            )}



        </View>
    )
}

export default BarChart

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'flex-end',
        height: 300,
    },
    barContainer: {
        alignItems: 'center'
    },
    bar: {
        minHeight: 10,
        width: 30,
        backgroundColor: 'blue',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderCurve: 'continuous'
    },
    voteCount: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    barBox: {
        marginTop: 10,
        height: 20,
        width: 30,  
        borderRadius: 15,
    }
})