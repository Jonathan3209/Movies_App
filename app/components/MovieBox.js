import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import AppColors from '../constants/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ConstantStyles from '../constants/Styles'

const window = Dimensions.get('window');

const MovieBox = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Image style={styles.img} source={{ uri: props.imagePath }} />
                <View style={styles.textContainer}>
                    <Text style={ConstantStyles.TITLE}>{props.movieName?.length > 20 ? props.movieName.slice(0, 20) + '...' : props.movieName}</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                            onPress={props.inWatchList ? () => { } : props.watchlistFunc}>
                            {
                                props.removeMovieIcon ?
                                    <MaterialCommunityIcons type="MaterialCommunityIcons" name="playlist-remove" color={AppColors.RED} size={30} />
                                    :
                                    props.inWatchList ?
                                        <MaterialCommunityIcons type="MaterialCommunityIcons" name="playlist-check" color={AppColors.BLUE} size={30} />
                                        :
                                        <MaterialCommunityIcons type="MaterialCommunityIcons" name="playlist-plus" color={AppColors.BLACK} size={30} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rankContainer}>
                    <FontAwesome type="FontAwesome" name="star" color={AppColors.BLACK} size={16} />
                    <Text style={styles.rank}>{props.rank}</Text>
                </View>
                <View style={styles.yearContainer}>
                    <Text style={styles.year}>{props.releaseDate}</Text>
                </View>
            </View>
        </View>
    )
}

export default MovieBox

const styles = StyleSheet.create({
    container: {
        marginHorizontal: ConstantStyles.MARGIN_HORIZONTAL,
        paddingVertical: 25,
    },
    boxContainer: {
        ...Platform.select({
            ios: {
                height: window.height * 0.53,
                width: window.width * 0.7,
            },
            android: {
                height: window.height * 0.6,
                width: window.width * 0.6,
            },
        }),
        borderRadius: 10,
        backgroundColor: AppColors.GRAY7,
        shadowColor: AppColors.BLACK,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    img: {
        ...Platform.select({
            ios: { height: window.height * 0.4 },
            android: { height: window.height * 0.45, },
        }),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    iconContainer: {

    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: ConstantStyles.MARGIN_HORIZONTAL,
        alignItems: 'center'
    },
    rankContainer: {
        flexDirection: 'row',
        marginHorizontal: ConstantStyles.MARGIN_HORIZONTAL,
        alignItems: 'center'
    },
    rank: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    yearContainer: {
        flexDirection: 'row',
        marginHorizontal: ConstantStyles.MARGIN_HORIZONTAL,
        marginTop: 5,
        alignItems: 'center',
    },
    year: {
        fontSize: 14,
    }
})
