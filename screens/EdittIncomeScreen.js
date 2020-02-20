import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/UI/MyHeaderButton';
import * as IncomesActions from '../store/actions/incomes';
import Colors from '../constants/colors';
import ImagePicker from '../components/features/ImagePicker';

const EditIncomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //i am getting saving the id in incId
  const incId = props.navigation.getParam('incomeId');

  //we can get our eddited incomes using the reducer slices userIncomes and checking for 
  //the id being equal with the one that we get
  //if is null, it means we want to add a new income
  const editedIncome = useSelector(state =>
    state.incomes.userIncomes.find(inc => inc.id === incId)
  );
  const dispatch = useDispatch();
  //if we have an id, we edit the income and we will have all the data in the inputs
  //if we don t have the id, we have an empty input
  const [name, setName] = useState(editedIncome ? editedIncome.name : '');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [imageURL, setImageURL] = useState(editedIncome ? editedIncome.imageURL : '');
  const [description, setDescription] = useState(editedIncome ? editedIncome.description : '');
  const [amount, setAmount] = useState(editedIncome ? editedIncome.amount : '');
  const [selectedImage, setSelectedImage] = useState();
  const imageTakenHandler = imagePath => {
   setSelectedImage(imagePath);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  //here i should have some changes for the validation part
  //this is validation only for the name
  const submitHandler = useCallback(async () => {
    if (!nameIsValid) {
      Alert.alert('Wrong input', 'Please check the errors', [{ text: 'okay' }])
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedIncome) {
        await dispatch(
          IncomesActions.updateIncome(
            incId,
            name,
            selectedImage,
          //  imageURL,
            description,
            +amount
          )
        );
      }
      else {
        await dispatch(
          IncomesActions.createIncome(
            name,
            selectedImage,
            // imageURL,
            description,
            +amount
          )
        );
      }
      //after add or edit, goBack to the last screen
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

    // }, [dispatch, incId, name, imageURL, description, amount]);
  }, [dispatch, incId, name, selectedImage, description, amount]);


  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const nameChangeHandler = text => {
    if (text.trim().length === 0) {
      setNameIsValid(false);
    } else {
      setNameIsValid(true);
    }
    setName(text);
  };


  //spinner for loading 
  if (isLoading) {
    return (
      < View style={styles.centered} >
        <ActivityIndicator size='large' color={Colors.primary} />
      </View >
    );
  }

  return (
    <ScrollView>

      <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>Name</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={nameChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onEndEditing={() => console.log('pnEndEd')}
            onSubmitEditing={() => console.log('onSubmit')}
          />
          {!nameIsValid && <Text>Please enter a valid text</Text>}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>

          {/* <TextInput
            style={styles.input}
            value={imageURL}
            onChangeText={text => setImageURL(text)}
            returnKeyType='next'
          /> */}
          <ImagePicker onImageTaken={imageTakenHandler} />

        </View>

        {/*  this is for not allowing to edit the amount{editedIncome ? null : ( */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType='decimal-pad'
          />
        </View>
        {/* )} */}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
            returnKeyType='done'
          />
        </View>
      </View>

    </ScrollView>
  );
};

//submit button
EditIncomeScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    //if our function is passed with the id, means that we are in edit, if not it means that we want to add a new income
    headerTitle: navData.navigation.getParam('incomeId')
      ? 'Edit Income'
      : 'Add Income',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>

  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditIncomeScreen;
