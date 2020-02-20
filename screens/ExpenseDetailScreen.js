import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Buttom,
    StyleSheet,
    Button
} from 'react-native';
import Colors from '../constants/colors';
import { useSelector } from 'react-redux';
import ImagePicker from '../components/features/ImagePicker';
const ExpenseDetailScreen = props => {

    // getting incomeId from IncomeOverviewScreen using the method getParam
    //IncomeOverviewScreen is taking the incomeId using the useSelector 
    //which has the state=initialState : { all parameters for one income }
    //here, selectedIncome is finding the right id and is displaying only that data
    const expenseId = props.navigation.getParam('expenseId');
    const selectedExpense = useSelector(state => state.incomes.userExpenses.find(expense => expense.id === expenseId))
    const [selectedImage, setSelectedImage] = useState();
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };
    return (
        <ScrollView>
            {/* <Image style={styles.image} source={{ uri: selectedExpense.imageURL }} /> */}
            <ImagePicker onImageTaken={imageTakenHandler}/>
            {/* <Text style={styles.amount}>${selectedExpense.amount}</Text> */}
            <Text style={styles.amount}>${selectedExpense.amount.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedExpense.description}</Text>
        </ScrollView>
    );
};


ExpenseDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('expenseName')
    };
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
       // height: '30%'
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

export default ExpenseDetailScreen;