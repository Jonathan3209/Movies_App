import {Dimensions, Platform} from 'react-native'

const window = Dimensions.get('window');

export default {
    HEADLINE: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    TITLE:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    MARGIN_HORIZONTAL: 10,
    POPUP_CONTAINER: {
        width: window.width * 0.7,
        ...Platform.select({
            ios: {
                minHeight: window.height * 0.2,
            },
            android: {
                minHeight: window.height * 0.25,
            },
        }),
    }
}