import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Api from '../../constants/Api'

const withFetchMovies = () => (Component) => (props) => {
    const [country, setCountry] = useState('IL');
    
    const getData = async (action, data, page, includeAdult = false) => {
        try {
            let request = '';
            switch(action){
                case 'GET_POPULAR_MOVIES':
                    request = `${Api.BASE_URL + '/' + Api.MOVIE + '/' + Api.POPULAR + '?api_key=' + Api.API_KEY + '&language=' + Api.LANGUAGE + '&page=' + page + '&region='+ country}`
                    break;
                case 'GET_NOW_PLAYING_MOVIES':
                    request = `${Api.BASE_URL + '/' + Api.MOVIE + '/' + Api.NOW_PLAYING + '?api_key=' + Api.API_KEY + '&language=' + Api.LANGUAGE + '&page=' + page + '&region='+ country}`
                    break;
                case 'GET_UPCOMING_MOVIES':
                    request = `${Api.BASE_URL + '/' + Api.MOVIE + '/' + Api.UPCOMING + '?api_key=' + Api.API_KEY + '&language=' + Api.LANGUAGE + '&page=' + page + '&region='+ country}`
                    break;
                case 'SEARCH_FOR_MOVIES':
                    request = `${Api.BASE_URL + '/' + Api.SEARCH + '/' + Api.MOVIE + '?api_key=' + Api.API_KEY + '&language=' + Api.LANGUAGE + '&query=' + data + '&page=' + page + '&include_adult=' + includeAdult}`
                    break;
            }

            let response = await fetch(request);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }


    return <Component {...props} getData={getData}/>
}

export default withFetchMovies

const styles = StyleSheet.create({})
