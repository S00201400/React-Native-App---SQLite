import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/colors';

import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//importing all the screens
import HomeScreen from '../screens/HomeScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/not now/LoginScreen';
import UserAccountScreen from '../screens/not now/UserAccountScreen';
import PlacesListScreen from '../screens/not now/PlacesListScreen';
import PlaceDetailScreen from '../screens/not now/PlaceDetailScreen';
import NewPlaceScreen from '../screens/not now/NewPlaceScreen';
import MapScreen from '../screens/not now/MapScreen';
import IncomeOverviewScreen from '../screens/IncomeOverviewScreen';
import IncomeDetailScreen from '../screens/IncomeDetailScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';
import ExpenseOverviewScreen from '../screens/ExpenseOverviewScreen';
import EditExpenseScreen from '../screens/EditExpenseScreen';
import EditIncomeScreen from '../screens/EdittIncomeScreen';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const IncomesNavigator = createStackNavigator(
  {
    //the first screen written here is always the first screen that we see
    IncomeOverview: IncomeOverviewScreen,
    //these are all the screens where we can go from the first screen
    IncomeDetail: IncomeDetailScreen,
    EditIncome: EditIncomeScreen,
    
    CreateAccount: CreateAccountScreen,
    Login: LoginScreen,
    UserAccount: UserAccountScreen,
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,

  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

const ExpensesNavigator = createStackNavigator(
  {
    //the first screen written here is always the first screen that we see
    ExpenseOverview: ExpenseOverviewScreen,
    //these are all the screens where we can go from the first screen
    ExpenseDetail: ExpenseDetailScreen,
    EditExpense: EditExpenseScreen
  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

//the title from the default header
// IncomeOverviewScreen.navigationOptions = {
//   headerTitle: 'All incomes'
// };

//i have to change here - this is the menu
const MenuNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

//combining those 2 stack navigators in a drawer
const SensibleNavigator = createDrawerNavigator(
  {
    Incomes: IncomesNavigator,
    Home: MenuNavigator,
    Expenses: ExpensesNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(SensibleNavigator);