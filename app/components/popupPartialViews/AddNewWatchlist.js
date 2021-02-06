import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import AppColors from '../../constants/AppColors'
import ConstantStyles from '../../constants/Styles'
import Button from '../Button'


const AddNewWatchlist = ({ inputText, onTextChange, onSubmit }) => {
    return (
        <View style={{ ...ConstantStyles.POPUP_CONTAINER, ...styles.container }}>
            <View>
                <View style={styles.textContainer}>
                    <Text style={ConstantStyles.TITLE}>{'Add new watchlist'}</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(newText) => onTextChange(newText)}
                    value={inputText}
                    placeholder={'WATCHLIST NAME'}
                />
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title={'Confirm'}
                    bgColor={inputText?.length > 0 ? AppColors.blue : AppColors.GRAY3}
                    onSubmit={onSubmit}
                />
            </View>
        </View>
    )
}

export default AddNewWatchlist

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    textContainer: {
        paddingVertical: 20,
    },
    textInput: {
        backgroundColor: AppColors.GRAY3,
        borderRadius: 10,
        shadowColor: AppColors.BLACK,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        paddingVertical: 10,
    },
    btnContainer: {
        alignSelf: 'flex-end',
    },
})
