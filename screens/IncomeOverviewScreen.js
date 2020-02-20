import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Button, Alert, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TemplateItem from '../components/features/TemplateItem';
import HeaderButton from '../components/UI/MyHeaderButton';
import Colors from '../constants/colors';
import * as IncomesActions from '../store/actions/incomes';
import { loadAsync } from 'expo-font';

const IncomeOverviewScreen = props => {
  const [isRefreshing, setIsRefreshing]= useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState();
  //IncomeOverviewScreen is taking the data that is in userIncomes 
  //using the useSelector which has the state=initialState : { all parameters for income }
  const incomes = useSelector(state => state.incomes.userIncomes)
  const dispatch = useDispatch();

  const loadIncomes = useCallback(async () => {
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
    const willFocusSub = props.navigation.addListener('willFocus', loadIncomes);
    return () => {
      willFocusSub.remove();
    };
  }, [loadIncomes]);

  //everytime i m loading the screen i want to fire this effect
  useEffect(() => {
    setIsLoading(true);
    loadIncomes().then(()=>{
      setIsLoading(false);
    });
  }, [dispatch, loadIncomes]);

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
    props.navigation.navigate('IncomeDetail', {
      incomeId: id,
      incomeName: name
    });
  };

  const editIncomeHandler = (id) => {
    props.navigation.navigate('EditIncome', {
      incomeId: id
    });
  };

  if (error) {
    return (
      < View style={styles.centered} >
        <Text>An error occured</Text>
        <Button title="Try again" onPress={loadIncomes} color={Colors.primary} />
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

  if (!isLoading && incomes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No incomes found. </Text>
      </View>
    );
  }

  return <FlatList
    onRefresh={loadIncomes}
    refreshing={isRefreshing}
    data={incomes}
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
          onPress={() => {
            editIncomeHandler(itemData.item.id);
          }}
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
IncomeOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Incomes',
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
          title="Add Income"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('EditIncome');
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
export default IncomeOverviewScreen;