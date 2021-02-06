import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import AppColors from '../../constants/AppColors'
import ConstantStyles from '../../constants/Styles'
import CheckboxRow from '../CheckboxRow'
import Button from '../Button'
import withAsyncStorage from '../HOCs/withAsyncStorage'
import AsyncStorageActions from '../../constants/AsyncStorageActions'

// Popup body for choosing watchlist
const ChooseWatchlist = ({ movie, mapActions, onConfirm }) => {
    const [wLDictionary, setWLDictionary] = useState({});
    const [newWLName, setNewWLName] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [rows, setRows] = useState([]);

    // Sets all watchlists in dictionary
    useEffect(() => {
        let dict = {};
        mapActions(AsyncStorageActions.GET_ALL_KEYS).then((arr) => {
            arr?.length > 0 && arr.map(movie => {
                if (dict[movie?.watchlist] == null)
                    dict[movie?.watchlist] = false;
            });
            setWLDictionary(dict);
        })
    }, []);

    // Initiate checkbox for each watchlist on each dicionary update
    useEffect(() => {
        if (wLDictionary) {
            let arr = [];
            for (const [key, value] of Object.entries(wLDictionary)) {
                arr.push(<CheckboxRow key={key} name={key} checked={value} onPress={() => onToggleCheckbox(key, !value)} />)
            }
            setRows(arr);
        }
    }, [wLDictionary])

    // Updating new watchlist name text
    const onTextChange = (newText) => {
        setNewWLName(newText);
    }

    // Sets each checkbox toggle
    const onToggleCheckbox = (key, value) => {
        setWLDictionary({ ...wLDictionary, [key]: value });
    }

    // Submit adding movie to selected watchlists
    const onSubmit = () => {
        let arr = []
        if (newWLName?.length > 0) {
            arr.push([
                JSON.stringify({ watchlist: newWLName, movie }),
                JSON.stringify(movie)
            ]);
        }
        if (wLDictionary) {
            for (const [key, value] of Object.entries(wLDictionary)) {
                if (value) {
                    arr.push([
                        JSON.stringify({ watchlist: key, movie }),
                        JSON.stringify(movie)
                    ]);
                }
            }
        }
        mapActions(AsyncStorageActions.MULTI_SET, arr).then(res => {
            onConfirm(res);
        });
    }
    return (
        <View style={{ ...ConstantStyles.POPUP_CONTAINER, ...styles.container }}>
            <View>
                <View style={styles.textContainer}>
                    <Text style={ConstantStyles.TITLE}>{'Choose Watchlists'}</Text>
                </View>
                {
                    !showTextInput ?
                        <TouchableOpacity onPress={() => setShowTextInput(true)}>
                            <View>
                                <Text style={
                                    {
                                        ...ConstantStyles.TITLE,
                                        ...{ textDecorationLine: 'underline', color: AppColors.BLUE }
                                    }}>{'Press here to add new Watchlist!'}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(newText) => onTextChange(newText)}
                            value={newWLName}
                            placeholder={'NEW WATCHLIST NAME'}
                        />
                }
                {rows}
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title={'Confirm'}
                    bgColor={AppColors.blue}
                    onSubmit={onSubmit}
                />
            </View>
        </View>
    )
}

export default withAsyncStorage()(ChooseWatchlist)

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
})
