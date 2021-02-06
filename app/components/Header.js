import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import AppColors from '../constants/AppColors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');

// Search bar
const Header = ({ inputText, onTextChange }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                    {
                        inputText?.length > 0 &&
                        <TouchableOpacity onPress={() => onTextChange('')}>
                            <View style={{ ...styles.iconContainer, marginRight: 10 }}>
                                <FontAwesome type="FontAwesome" name="remove" color={AppColors.BLACK} size={20} />
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(newText) => onTextChange(newText)}
                                value={inputText}
                                placeholder={'SEARCH'}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={styles.iconContainer}>
                            <FontAwesome type="FontAwesome" name="search" color={inputText?.length > 0 ? AppColors.BLACK : AppColors.GRAY1} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        top: 0,
        backgroundColor: AppColors.GRAY5,
        height: 40,
        justifyContent: 'center',
    },
    rowContainer: {
        backgroundColor: AppColors.GRAY3,
        width: window.width * 0.9,
        borderRadius: 40,
        shadowColor: AppColors.BLACK,
        shadowRadius: 40,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1
    },
    textInput: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconContainer: {},
})
