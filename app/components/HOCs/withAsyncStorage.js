import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import AsyncStorageActions from '../../constants/AsyncStorageActions'

const withAsyncStorage = () => (Component) => (props) => {

    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem(
                JSON.stringify(data?.key),
                JSON.stringify(data?.value),
            );
            return true;

        } catch (error) {
            console.log(`Error while storing data. Error: ${error}`)
            return false;
        }
    };

    const multiSet = async (data) => {
        try {
            await AsyncStorage.multiSet(data);
            return true;

        } catch (error) {
            console.log(`Error while storing data. Error: ${error}`)
            return false;
        }
    };

    const retrieveData = async (data) => {
        try {
            const value = await AsyncStorage.getItem(JSON.stringify(data));
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(`Error while retreving data. Error: ${error}`)
        }
    };
    const removeItem = async (data) => {
        try {
            const value = await AsyncStorage.getItem(JSON.stringify(data));
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(`Error while deleting data. Error: ${error}`)
        }
    };

    const getAllKeys = async () => {
        try {
            const values = await AsyncStorage.getAllKeys();
            if (values?.length > 0) {
                let arr = [];
                values.map(value => {
                    arr.push(JSON.parse(value));
                })
                return arr;
            }
            return [];
        } catch (error) {
            console.log(`Error while retreving data. Error: ${error}`)
            return [];
        }
    };

    const multiRemove = async (data) => {
        try {
            const value = await AsyncStorage.multiRemove(data);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(`Error while deleting data. Error: ${error}`)
        }
    };

    const clearAll = async () => {
        try {
            const value = await AsyncStorage.clear();
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(`Error while deleting data. Error: ${error}`)
        }
    };


    const mapActions = (action, data) => {
        switch (action) {
            case AsyncStorageActions.SET:
                return storeData(data);
            case AsyncStorageActions.GET:
                return retrieveData(data);
            case AsyncStorageActions.REMOVE_ITEM:
                return removeItem(data);
            case AsyncStorageActions.GET_MOVIE_BY_ID:
                return getMovieByID(data);
            case AsyncStorageActions.GET_ALL_KEYS:
                return getAllKeys();
            case AsyncStorageActions.MULTI_SET:
                return multiSet(data);
            case AsyncStorageActions.MULTI_REMOVE:
                return multiRemove(data);
            case AsyncStorageActions.CLEAR_ALL:
                return clearAll();
        }
    }


    return <Component {...props} mapActions={mapActions} />
}

export default withAsyncStorage
