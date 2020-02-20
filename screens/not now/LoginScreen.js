import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MainButton from '../../components/UI/MainButton';
import TopHeader from '../../components/UI/TopHeader';
const LoginScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TopHeader />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
       /// height: '100%'
        // flex: 1,
        //justifyContent: "center",
        // alignItems: 'center'
    },
    header: {
        width: '100%',
        height: '90%',
        // alignItems: 'center'
        // marginBottom: 80
    },
});

export default LoginScreen;