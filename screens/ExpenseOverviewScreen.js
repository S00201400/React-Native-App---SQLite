import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Button, Alert, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TemplateItem from '../components/features/TemplateItem';
import HeaderButton from '../components/UI/MyHeaderButton';
import Colors from '../constants/colors';
import * as IncomesActions from '../store/actions/incomes';
import { loadAsync } from 'expo-font';

const ExpenseOverviewScreen = props => {
  const [isRefreshing, setIsRefreshing]= useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState();
  //state.incomes.userExpenses - incomes is the name of the reducer file, 
  //but here is the reference from app.js from combineReducers where I named the slice incomes
  const expenses = useSelector(state => state.incomes.userExpenses)
  const dispatch = useDispatch();


  const loadExpenses = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(IncomesActions.fetchIncomes());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  //willFocus fire when the transition beginns
  //we should consider this because you want yo load everyting form your db each time
  //not only one time when you enter
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadExpenses);
    return () => {
      willFocusSub.remove();
    };
  }, [loadExpenses]);

  //everytime i m loading the screen i want to fire this effect
  useEffect(() => {
    setIsLoading(true);
    loadExpenses().then(()=>{
      setIsLoading(false);
    });
  }, [dispatch, loadExpenses]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: 'No', style: 'default' },
      {
        text: 'Yes', style: 'destructive', onPress: async () => {
          setError(null);
          setIsLoading(true);
          try {
            await dispatch(IncomesActions.deleteIncome(id));
            props.navigation.goBack();
          } catch (err) {
            setError(err.message);
          }

          setIsLoading(false);

        }
      }
    ]);
  };
  const selectItemHandler = (id, name) => {
    props.navigation.navigate('ExpenseDetail', {
      expenseId: id,
      expenseName: name
    });
  };

  const editExpenseHandler = (id) => {
    props.navigation.navigate('EditExpense', {
      expenseId: id
    });
  };

  if (error) {
    return (
      < View style={styles.centered} >
        <Text>An error occured</Text>
        <Button title="Try again" onPress={loadExpenses} color={Colors.primary} />
      </View >
    );
  }
  //spinner for loading 
  if (isLoading) {
    return (
      < View style={styles.centered} >
        <ActivityIndicator size='large' color={Colors.primary} />
      </View >
    );
  }

  if (!isLoading && expenses.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No expenses found. </Text>
      </View>
    );
  }

  return <FlatList
    onRefresh={loadExpenses}
    refreshing={isRefreshing}
    data={expenses}
    keyExtractor={item => item.id}

    renderItem={itemData =>
      <TemplateItem
        image={itemData.item.imageURL}
        name={itemData.item.name}
        amount={itemData.item.amount}
        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.name);
        }}
      >
        <Button
          color={Colors.primary}
          title="Edit"
          onPress={() => { editExpenseHandler(itemData.item.id); }}
        />
        <Button
          color={Colors.primary}
          title="Delete"
          onPress={deleteHandler.bind(this, itemData.item.id)}
        />

      </TemplateItem>
    }
  />;


};

//default header title and adding a + button using ionicons
ExpenseOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Expenses',
    headerLeft: () =>

      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ,
    headerRight: () =>

      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Expense"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('EditExpense');
          }}
        />
      </HeaderButtons>

  };
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default ExpenseOverviewScreen;