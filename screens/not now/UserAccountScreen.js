import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopHeader from '../../components/UI/TopHeader';
import Colors from '../../constants/colors';
const UserAccountScreen = props => {
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

export default UserAccountScreen;