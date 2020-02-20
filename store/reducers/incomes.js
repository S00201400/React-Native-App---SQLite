//importing the dummy data for testing
//import INCOMES from '../../data/dummy-data';
import {ADD_INPUT, DELETE_INCOME, CREATE_INCOME, UPDATE_INCOME, SET_INCOMES } from '../actions/incomes';
// import Income from '../../models/income';
// import Expense from '../../models/expense';
import Input from '../../models/input';
//initialState can have more data. Using the state.userIncomes for exemple
//we are accessing the data from userIncomes, but insted we can have userExpenses
//and we can access that data in the same way
const initialState = {
    // userIncomes: INCOMES
    // userIncomes: INCOMES.filter(incomes => incomes.userID === 'c1'),
    // userExpenses: INCOMES.filter(expenses => expenses.userID === 'c3')
    inputs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_INPUT:
        const newInput = new Input(
                action.inputData.id,
                'c1',
                action.inputData.name,
                action.inputData.imageURL,
                action.inputData.description,
                action.inputData.amount
        );
        return {
          inputs: state.inputs.concat(newInput)
        };
      default:
        return state;
    }
  };

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case SET_INCOMES: 
//         return{
//             userIncomes : action.incomes.filter(incomes => incomes.userID === 'c1'),
//             userExpenses: action.incomes.filter(expenses => expenses.userID === 'c3')
//         }
//         case CREATE_INCOME:
//             const newIncome = new Income(
//                 action.incomeData.id,
//                 'c1',
//                 action.incomeData.name,
//                 action.incomeData.imageURL,
//                 action.incomeData.description,
//                 action.incomeData.amount
//             );
//             const newExpense = new Expense(
//                 action.incomeData.id,
//                 'c3',
//                 action.incomeData.name,
//                 action.incomeData.imageURL,
//                 action.incomeData.description,
//                 action.incomeData.amount
//             );
//             return {
//                 ...state,
//                 // this are the old incomes, we use filter which is a method
//                 // that turns in a new array, an array that is created buy running a function on 
//                 // every item in the old array and if that functions return ture we keep that item
//                 //and if return false we drop that item
//                 //keeps all incomes where the id do not match
//                 userIncomes: state.userIncomes.concat(
//                     newIncome
//                 ),
//                 userExpenses: state.userExpenses.concat(
//                     newExpense
//                 )
//             };
//         case UPDATE_INCOME:
            
//             const incomeIndex = state.userIncomes.findIndex(
//                 inc => inc.id === action.iid
//             );
//             const updatedIncome = new Income(
//                 action.iid,
//                 state.userIncomes[incomeIndex].userID,
//                 action.incomeData.name,
//                 action.incomeData.imageURL,
//                 action.incomeData.description,
//                 action.incomeData.amount
//             );
//             const updatedUserIncomes = [...state.userIncomes]; //this is the original array
//             updatedUserIncomes[incomeIndex] = updatedIncome; //i am changing in the copy with the updated array

       
//             const expenseIndex = state.userExpenses.findIndex(
//                 exp => exp.id === action.iid
//             );
//             //here is working like this, because i don t have data for expense model, 
//             //so i hade to work whit income, but we have to change here 
//             // const updatedExpense = new Income(
//             //     action.iid,
//             //     state.userExpenses[expenseIndex].userID,
//             //     action.incomeData.name,
//             //     action.incomeData.imageURL,
//             //     action.incomeData.description,
//             //     action.incomeData.amount

//             // );

//             const updatedUserExpenses = [...state.userExpenses];
//             updatedUserExpenses[expenseIndex] = updatedIncome;
        
//             return {
//                 ...state, //copying the existing one
//                 userExpenses: updatedUserExpenses,
//                 userIncomes: updatedUserIncomes
            
//             };
//         case DELETE_INCOME:
//             return {
//                 //make sure to not lose any existing state
//                 ...state,
//                 // this are the old incomes, we use filter which is a method
//                 // that turns in a new array, an array that is created buy running a function on 
//                 // every item in the old array and if that functions return ture we keep that item
//                 //and if return false we drop that item
//                 //keeps all incomes where the id do not match
//                 userIncomes: state.userIncomes.filter(
//                     income => income.id !== action.iid
//                 ),
//                 userExpenses: state.userExpenses.filter(
//                     expense => expense.id !== action.iid
//                 )
//             };

//     }

//     return state;
// };