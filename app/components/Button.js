import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AppColors from '../constants/AppColors'


const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onSubmit}>
            <View style={{
                ...styles.container,
                ...{ backgroundColor: props.bgColor ? props.bgColor : AppColors.BLUE },
                ...{ width: props.width ? props.width : 80 },
                ...{ height: props.height ? props.height : 30 },
                ...{ shadowColor: props.shadowColor ? props.shadowColor : AppColors.BLACK },

            }}>
                <View style={styles.textContainer}>
                    <Text style={{
                        ...styles.txt,
                        ...{ color: props.color ? props.color : AppColors.WHITE },
                        ...{ fontSize: props.fontSize ? props.fontSize : 14 }
                    }}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontWeight: 'bold',
    },
})
