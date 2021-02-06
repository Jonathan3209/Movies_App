import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import AppColors from '../constants/AppColors'
import Header from '../components/Header'
import Api from '../constants/Api'
import withAsyncStorage from '../components/HOCs/withAsyncStorage'
import AsyncStorageActions from '../constants/AsyncStorageActions'
import MoviesInFlatList from '../components/MoviesInFlatList'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ChooseWatchlist from '../components/popupPartialViews/ChooseWatchlist'
import withFetchMovies from '../components/HOCs/withFetchMovies'

const Movies = (props) => {
    const [searchInputText, setSearchInputText] = useState('');
    const [watchlistData, setWatchlistData] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [addToWatchListObj, setAddToWatchListObj] = useState({});
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState({});
    const [headline, setHeadline] = useState('Popular Movies')
    const [onSearch, setOnSearch] = useState(false);

    const isFocused = useIsFocused();

    // Gets all popular movies. initiate on every page or on search updates
    useEffect(() => {
        props.getData(Api.GET_POPULAR_MOVIES, null, page).then(res => {
            setMovies(res);
            if (!onSearch)
                setHeadline('Popular Movies');
        })
    }, [page, onSearch])


    // Initialize Dictionary state with all watchlists
    useEffect(() => {
        if(!showPopup){
            let dictionary = {};
            props.mapActions(AsyncStorageActions.GET_ALL_KEYS).then((arr) => {
                arr?.length > 0 && arr.map(movie => {
                    dictionary[movie?.movie?.id] = movie?.watchlist;
                });
                console.log(dictionary)
                setWatchlistData(dictionary);
            })
        }
    }, [isFocused, showPopup]);

    // Sets new page
    const jumpToPage = (newPage) => {
        setPage(newPage);
    }

    // Sets new search text
    const onSearchTextChange = (newText) => {
        setSearchInputText(newText);
    }

    // Searching for movies on changes in search text
    useEffect(() => {
        if (searchInputText?.length > 1) {
            setHeadline(`Searched for ${searchInputText}`)
            setOnSearch(true);
            props.getData(Api.SEARCH_FOR_MOVIES, searchInputText, 1).then(res => {
                if(res?.results?.length > 0){
                    setMovies(res);
                }
            })
        }
        else if (onSearch && searchInputText?.length === 0) {
            setOnSearch(false);
        }
    }, [searchInputText])

    // Opens a popup to select watchlist
    const addMovieToWatchlist = (movie) => {
        setAddToWatchListObj(
            {
                key: { watchlist: '', movie: movie },
                value: movie
            })
        setShowPopup(true);
    }

    // Closing popup
    const onSubmit = () => {
        setShowPopup(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header inputText={searchInputText} onTextChange={onSearchTextChange} />
            <MoviesInFlatList
                headline={headline}
                movies={movies?.results}
                watchlistFunc={addMovieToWatchlist}
                watchlistData={watchlistData}
                page={page}
                lastPage={movies?.total_pages}
                jumpToPage={jumpToPage}
            />
            <Dialog
                visible={showPopup}
                onTouchOutside={() => setShowPopup(false)}>
                <DialogContent>
                    <ChooseWatchlist movie={addToWatchListObj?.value} onConfirm={onSubmit} />
                </DialogContent>
            </Dialog>
        </SafeAreaView>
    )
}

export default withAsyncStorage()(withFetchMovies()(Movies))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.GRAY5,
    },
})
