// import Income from '../../models/income';
// export const DELETE_INCOME = "DELETE_INCOME";
// export const CREATE_INCOME = "CREATE_INCOME";
// export const UPDATE_INCOME = "UPDATE_INCOME";
// export const SET_INCOMES = "SET_INCOMES"; // for taking my data from db, storying in set income and place it into my store after
import * as FileSystem from 'expo-file-system';

export const ADD_INPUT = 'ADD_INPUT';

export const addInput = (name, imageURL, description,amount) => {
  return async dispatch => {
    const fileName = imageURL.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageURL,
        to: newPath
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({ type: ADD_INPUT, inputData: { name: name, imageURL: newPath, description: description, amount: amount } });
  };
};

// export const fetchIncomes = () => {

//     return async dispatch => {
//         try {
//             //this function is returning a promise
//             //we use await because is an async func
//             const response = await fetch('https://sensible-app.firebaseio.com/incomes.json');

//             if (!response.ok) {
//                 throw new Error('Something went wrong!');
//             }
//             const resData = await response.json();
//             const loadedIncomes = [];

//             for (const key in resData) {
//                 loadedIncomes.push(
//                     new Income(
//                         key,
//                         'c1',
//                         resData[key].name,
//                         resData[key].imageURL,
//                         resData[key].description,
//                         resData[key].amount
//                     )
//                 );
          
//             }


//             dispatch({ type: SET_INCOMES, incomes: loadedIncomes });

//         } catch (err) {
//             throw err; //send it where you want
//         }
//     };
// };

// //delete from db
// export const deleteIncome = incomeId => {
//     return async dispatch => {
//         const response = await fetch(
//             `https://sensible-app.firebaseio.com/incomes/${incomeId}.json`,
//             {
//                 method: 'DELETE',
//             }
//         );

//         if (!response.ok) {
//             throw new Error('Something went wrong!');
//         }

//         dispatch({
//             type: DELETE_INCOME,
//             iid: incomeId
//         });
//     };
// };

// export const createIncome = (name, imageURL, description, amount) => {
//     return async dispatch => {
//         //this function is returning a promise
//         //we use await because is an async func
//         const response = await fetch('https://sensible-app.firebaseio.com/incomes.json', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name,
//                 imageURL,
//                 description,
//                 amount
//             })
//         });


//         const resData = await response.json();
//         // console.log(resData);
//         dispatch({
//             type: CREATE_INCOME,
//             incomeData: {
//                 id: resData.name,
//                 name: name,
//                 imageURL: imageURL,
//                 description: description,
//                 amount: amount
//             }
//         });


//     };

// };
// //update from db
// export const updateIncome = (id, name, imageURL, description, amount) => {
//     return async dispatch => {
//         const response = await fetch(
//             //``this type of quotes still creats a string but a string where i can dinamical inject data into
//             `https://sensible-app.firebaseio.com/incomes/${id}.json`,
//             {
//                 //patch update, push override
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name,
//                     imageURL,
//                     description,
//                     amount
//                 })
//             }
//         );

//         if (!response.ok) {
//             throw new Error('Something went wrong!');
//         }

//         dispatch({
//             type: UPDATE_INCOME,
//             iid: id,
//             incomeData: {
//                 name: name,
//                 imageURL: imageURL,
//                 description: description,
//                 amount: amount
//             }
//         });
//     };


// };