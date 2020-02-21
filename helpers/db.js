import * as SQLite from 'expo-sqlite';
//creates db at first launch and holds a refferances to my db
const db = SQLite.openDatabase('inputs.db');

//initialize the db and creating a basic tabel
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS  inputs1 (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, imageURL TEXT NOT NULL, amount INTEGER NOT NULL, description TEXT NOT NULL)',
                [],
                () => {
                    resolve(); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const insertInput = (name, imageURL, amount,description) => {
    const promise = new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO inputs1 (name, imageURL, amount, description) VALUES (?, ?, ?, ?);`,
                [name, imageURL, amount, description],
                (_, result) => {
                    resolve(result); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchInputs = () => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        db.transaction(tx => {
            tx.executeSql(
                //here you can put a where to select exact what you want
                'SELECT * FROM inputs1',
                [],
                (_, result) => {
                    resolve(result); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deleteInput = (id) => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        db.transaction(tx => {
            tx.executeSql(
                //here you can put a where to select exact what you want
                `DELETE FROM inputs1 where id=?`,
                [id]
                ,
                (_, result) => {
                   // resolve(result); //success case
                    if (results.rowsAffected < 0) {
                        Alert.alert(
                          'Success',
                          'User deleted successfully',
                          [
                            {
                              text: 'Ok',
                            },
                          ],
                          { cancelable: false }
                        );
                      } else {
                        alert('Try again!');
                      }
                    }
                ,
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};