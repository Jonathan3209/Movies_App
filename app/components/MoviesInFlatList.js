import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import MovieBox from '../components/MovieBox'
import Api from '../constants/Api'
import AppColors from '../constants/AppColors'
import ConstantStyles from '../constants/Styles'

// Horizontal flatlist
const MoviesInFlatList = ({ headline, movies, watchlistFunc, watchlistData, removeMovieIcon, page, lastPage, jumpToPage }) => {
    return (
        <View style={styles.flatListContainer}>
            <Text style={{ ...ConstantStyles.HEADLINE, marginLeft: ConstantStyles.MARGIN_HORIZONTAL }}>{headline}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) =>
                    <MovieBox
                        movieName={item?.title}
                        imagePath={Api?.IMAGE_BASE_URL + item?.poster_path}
                        rank={item?.vote_average}
                        releaseDate={item?.release_date?.split('-').find(d => d.length === 4)}
                        watchlistFunc={() => watchlistFunc(item)}
                        inWatchList={watchlistData[item?.id] ? true : false}
                        removeMovieIcon={removeMovieIcon}
                    />

                }
                keyExtractor={(item) => item?.id.toString()}
                horizontal={true}
            />
            {
                page && lastPage &&
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={page > 1 ? () => jumpToPage(page - 1) : () => { }}>
                        <Text style={{ ...styles.txt, ...(!(page > 1) && { color: AppColors.GRAY3 }) }}>Previous page</Text>
                    </TouchableOpacity>
                    <Text>{`${page}/${lastPage}`}</Text>
                    <TouchableOpacity onPress={page < lastPage ? () => jumpToPage(page + 1) : () => { }}>
                        <Text style={{ ...styles.txt, ...(!(page < lastPage) && { color: AppColors.GRAY3 }) }}>next page</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default MoviesInFlatList

const styles = StyleSheet.create({
    flatListContainer: {
        marginTop: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: ConstantStyles.MARGIN_HORIZONTAL
    },
    txt: {
        fontSize: 14,
        color: AppColors.BLUE,
        textDecorationLine: 'underline',
    },
})
