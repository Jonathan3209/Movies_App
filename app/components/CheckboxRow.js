import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import AppColors from '../constants/AppColors'
import ConstantStyles from '../constants/Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CheckboxRow = ({ name, checked, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
                    {
                        checked ?
                            <MaterialCommunityIcons type="MaterialCommunityIcons" name="checkbox-intermediate" color={AppColors.BLUE} size={25} />
                            :
                            <MaterialCommunityIcons type="MaterialCommunityIcons" name="checkbox-blank-outline" color={AppColors.BLUE} size={25} />
                    }
                </TouchableHighlight>
                <Text style={{ ...ConstantStyles.TITLE, ...styles.title }}>{name}</Text>
            </View>
        </View>
    )
}

export default CheckboxRow

const styles = StyleSheet.create({
    container: {
        top: 5,
        height: 30,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        // bottom: 1,
    },
})
