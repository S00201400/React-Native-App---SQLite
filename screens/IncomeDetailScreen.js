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
    const incomeId = props.navigation.getParam('incomeId');
    const selectedIncome = useSelector(state => state.incomes.userIncomes.find(income => income.id === incomeId))
    const [selectedImage, setSelectedImage] = useState();
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedIncome.imageURL }} />
            {/* <Text style={styles.amount}>${selectedIncome.amount}</Text> */}
            <Text style={styles.amount}>${selectedIncome.amount.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedIncome.description}</Text>
        </ScrollView>
    );
};


IncomeDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('incomeName')
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
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    }
});

export default IncomeDetailScreen;