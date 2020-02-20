import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/UI/MainButton';
import TopHeader from '../components/UI/TopHeader';
import Colors from '../constants/colors';
//DON T FORGET ABOUT THE ALERT WHEN YOU PRESS -> ON THIS PAGE, TRY TO USE PUSH FOR NAVIGATION 
//AND FOR THE OTHER BUTTON THAT IS IN ALERT , TRY TO USE REPLACE TO USER ACCOUNT 
const CreateAccountScreen = props => {
    return (
        <View style={styles.screen}>
            <TopHeader />
            {/* {/* <View >

                <Image source={require('../assets/logo.png')} style={styles.image} />
            </View> */}

            <View style={styles.alignText}>
                <Text style={styles.styleTitle}>Sensible</Text>
                <Text style={styles.styleSubTitle}>Finance Management App</Text>
                <Text style={styles.styleTitle}>Create an Account</Text>
            </View>
            <View style={styles.input} >
                <TextInput style={styles.textInput} textContentType="name" placeholder="Full Name" placeholderTextColor="green"></TextInput>
                <TextInput style={styles.textInput} textContentType="emailAddress" placeholder="Email" placeholderTextColor="green"></TextInput>
                <TextInput style={styles.textInput} textContentType="password" placeholder="Password" placeholderTextColor="green"></TextInput>
                <TextInput style={styles.textInput} textContentType="password" placeholder="Confirm Password" placeholderTextColor="green"></TextInput>
            </View>
            <View style={styles.styleTerms}>
                <Text style={styles.styleTerms}>By creating an account you agree </Text>
                <Text style={styles.styleTerms}>to our Terms of Service and Privacy Policy </Text>
            </View>


            <View style={styles.buttons}>
                <MainButton onPress={() => {
                    props.navigation.replace('Home');
                }}>
                    <Ionicons name="ios-arrow-round-back" size={34} />
                </MainButton>

                <MainButton onPress={() => {
                    props.navigation.replace('UserAccount');
                }}>
                    <Ionicons name="ios-arrow-round-forward" size={34} />
                </MainButton>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    // image: {
    //     width: '25%',
    //     height: 100,
    //     marginLeft: 138,
    //     marginTop: 10
    // },
    screen: {
        backgroundColor: Colors.primary,
        // flex: 1,
        // justifyContent: 'center'
        width: '100%',
        height: '100%'
    },
    alignText: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        marginBottom: '15%'
    },
    styleTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        marginTop: 10
    },
    styleSubTitle: {
        fontFamily: 'open-sans',
        fontSize: 13,
        color: 'black',
     //marginTop: 9
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20
    },
    textInput: {
        marginBottom: 20,
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        paddingLeft: 20,
        backgroundColor: '#ccffcc',
        fontFamily: 'open-sans'

    },
    // text: {
    //     textAlign: 'center',
    //     color: 'white',
    //     fontSize: 25,
    //     fontFamily: 'open-sans'

    // },
    // text1: {
    //     textAlign: 'center',
    //     fontSize: 10,
    //     marginBottom: 29,
    //     fontFamily: 'open-sans-bold'
    // },
    // text2: {
    //     textAlign: 'center',
    //     color: 'white',
    //     marginBottom: 45,
    //     fontSize: 30,
    //     fontFamily: 'open-sans'
    // },
    // text4: {
    //     textAlign: 'center',
    //     color: 'white',
    //     fontSize: 10,
    //     fontFamily: 'open-sans'
    // },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    styleTerms: {
            textAlign: 'center',
            color: 'white',
            fontSize: 10,
            fontFamily: 'open-sans'
    }

});

export default CreateAccountScreen;