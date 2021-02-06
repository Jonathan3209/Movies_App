import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import ConstantStyles from '../constants/Styles'
import AppColors from '../constants/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MoviesInFlatList from '../components/MoviesInFlatList'

// Row with title and data at bottom. can be opened and can be closed.
const RowWithDataAtBottom = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    // When removing movie from watchlist
    const onRemoveMovie = (item) => {
        props.onRemoveMovie(props.title, item);
    }
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={props.onRemove}>
                        <AntDesign type="AntDesign" name="delete" color={AppColors.BLACK} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowChildCon}>
                    <View style={styles.watchlistContainer}>
                        <Text style={ConstantStyles.TITLE}>{props.title}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                            {
                                isOpen ?
                                    <MaterialCommunityIcons type="MaterialCommunityIcons" name="menu-up-outline" color={AppColors.BLACK} size={40} />
                                    :
                                    <MaterialCommunityIcons type="MaterialCommunityIcons" name="menu-down-outline" color={AppColors.BLACK} size={40} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                isOpen &&
                <>
                    {
                        props.bottomList?.length > 0 ?
                            <View>
                                <MoviesInFlatList
                                    movies={props.bottomList}
                                    watchlistFunc={onRemoveMovie}
                                    watchlistData={true}
                                    removeMovieIcon={true}
                                />
                            </View>
                            :
                            <View style={styles.emptyTextContainer}>
                                <Text style={ConstantStyles.TITLE}>{'EMPTY LIST'}</Text>
                            </View>
                    }
                </>
            }
        </View>
    )
}

export default RowWithDataAtBottom

const styles = StyleSheet.create({
    container: {
    },
    rowContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: AppColors.GRAY7,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: AppColors.GRAY3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: AppColors.BLACK,
        shadowOpacity: 0.2,
    },
    rowChildCon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    watchlistContainer: {
        marginLeft: ConstantStyles.MARGIN_HORIZONTAL,
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: ConstantStyles.MARGIN_HORIZONTAL,
        marginLeft: ConstantStyles.MARGIN_HORIZONTAL,
    },
    emptyTextContainer:{
        padding:20,
        alignItems: 'center',
    }
})
