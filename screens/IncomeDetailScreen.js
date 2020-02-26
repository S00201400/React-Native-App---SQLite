import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Button
} from 'react-native';
import Colors from '../constants/colors';
import { useSelector } from 'react-redux';
import ImagePicker from '../components/features/ImagePicker';
const IncomeDetailScreen = props => {

    // getting incomeId from IncomeOverviewScreen using the method getParam
    //IncomeOverviewScreen is taking the incomeId using the useSelector 
    //which has the state=initialState : { all parameters for one income }
    //here, selectedIncome is finding the right id and is displaying only that data
    const inputId = props.navigation.getParam('inputId');
    const selectedIncome = useSelector(state => state.inputs.inputs.find(input => input.id === inputId));
  

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedIncome.imageURL }} />
             {/* <Text style={styles.amount}>€{selectedIncome.amount}</Text> */}
             <Text style={styles.amount}>€{parseFloat(selectedIncome.amount).toFixed(2)}</Text>
             <Text style={styles.address}>{selectedIncome.address}</Text>
            <Text style={styles.description}>{selectedIncome.description}</Text> 
        </ScrollView>
    );
};


IncomeDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('inputName')
    };
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300

    },
    amount: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans'
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans',
    
    },
    address:{
            fontSize: 14,
          //  textAlign: 'center',
            marginHorizontal: 20,
            fontFamily: 'open-sans',
            marginBottom:20
    }
});

export default IncomeDetailScreen;