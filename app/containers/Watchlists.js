import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import RowWithDataAtBottom from '../components/RowWithDataAtBottom'
import AppColors from '../constants/AppColors'
import AsyncStorageActions from '../constants/AsyncStorageActions'
import ConstantStyles from '../constants/Styles'
import withAsyncStorage from '../components/HOCs/withAsyncStorage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import AddNewWatchlist from '../components/popupPartialViews/AddNewWatchlist'


const Watchlists = (props) => {
    const [watchlistData, setWatchlistData] = useState();
    const [watchlistView, setWatchlistView] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [tempName, setTempName] = useState('');
    const [tempMovie, setTempMovie] = useState('');

    const isFocused = useIsFocused();

    // Initialize Dictionary state with all watchlists
    useEffect(() => {
        let dictionary = {};
        props.mapActions(AsyncStorageActions.GET_ALL_KEYS).then((arr) => {
            arr?.length > 0 && arr.map(movie => {
                if (movie?.watchlist != null) {
                    if (dictionary[movie?.watchlist] == null)
                        dictionary[movie?.watchlist] = movie.movie ? [movie.movie] : [];
                    else
                        dictionary[movie?.watchlist].push(movie.movie);
                }
            });
            let temp = [];
            for (const [key, value] of Object.entries(dictionary)) {
                temp.push(
                    <RowWithDataAtBottom key={key} title={key} bottomList={value?.length > 0 && value[0] ? value : []} onRemove={() => onRemove(key)} onRemoveMovie={onRemoveMovie} />
                );
            }
            setWatchlistView(temp);
            console.log(dictionary)
            setWatchlistData(dictionary);
        })
    }, [isFocused, tempName]);

    // Sets the name of a new watchlist
    const onTextChange = (newText) => {
        setNewWatchlistName(newText);
    }

    // Add new empty watchlist
    // Regular function for it to be hoisted
    function onSubmit() {
        props.mapActions(
            AsyncStorageActions.SET,
            {
                key: { watchlist: newWatchlistName, movie: null },
                value: null
            });
        let name = newWatchlistName;
        setWatchlistData({ ...watchlistData, [name]: null })
        setWatchlistView([
            ...watchlistView,
            <RowWithDataAtBottom key={name} title={name} bottomList={[]} onRemove={() => onRemove(name)} onRemoveMovie={onRemoveMovie} />
        ])
        setShowPopup(false);
        setNewWatchlistName('');
    }

    // Initiate remove movie from watchlist
    // Regular function for it to be hoisted
    function onRemoveMovie(wLName, movie) {
        if (movie) {
            setTempMovie(movie);
            setTempName(wLName);
        }
    }

    // Initiate remove watchlist from watchlist
    // Regular function for it to be hoisted
    function onRemove(wLName) {
        setTempName(wLName);
    }

    // Remove movie or watchlist
    useEffect(() => {
        if (tempName?.length > 0) {
            props.mapActions(AsyncStorageActions.GET_ALL_KEYS).then((arr) => {
                let list = [];
                let toRemove = [];
                if (tempMovie)
                    list = arr.filter(d => d.movie?.id === tempMovie?.id && d.watchlist === tempName);
                else
                    list = arr.filter(d => d.watchlist === tempName);
                list?.length > 0 && list.map(item => {
                    toRemove.push(JSON.stringify(item));
                })
                props.mapActions(AsyncStorageActions.MULTI_REMOVE, toRemove).then(res => {
                    setTempName('');
                    setTempMovie('');
                })
            });
        }
    }, [tempName])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headlineContainer}>
                <Text style={ConstantStyles.HEADLINE}>{'Watchlists'}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setShowPopup(true)}>
                    <Ionicons type="Ionicons" name="add" color={AppColors.BLACK} size={35} />
                </TouchableOpacity>
            </View>
            <Dialog
                visible={showPopup}
                onTouchOutside={() => setShowPopup(false)}>
                <DialogContent>
                    <AddNewWatchlist inputText={newWatchlistName} onTextChange={onTextChange} onSubmit={newWatchlistName?.length > 0 ? onSubmit : () => { }} />
                </DialogContent>
            </Dialog>
            <ScrollView>
                <View>{watchlistView}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default withAsyncStorage()(Watchlists)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.GRAY5,
    },
    headlineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30
    },
    iconContainer: {
        alignSelf: 'flex-end',
        bottom: 15,
        marginRight: ConstantStyles.MARGIN_HORIZONTAL,
    }
})
