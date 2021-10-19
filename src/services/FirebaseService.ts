import { getDatabase, set, ref } from 'firebase/database';

class FirebaseService {
  db: any;
  constructor(firebase: any) {
    this.db = getDatabase(firebase);
  }

  writeUserData = async ({
    username,
    date,
    validationDate,
    group,
  }: {
    username: string;
    date: string;
    validationDate: string;
    group: string;
  }): Promise<any> => {
    const userPath = username;
    if (username === 'testinguser22') {
      username = 'Wout S.';
    } else if (username === 'testinguser400') {
      username = 'Daren M.';
    } else {
      username = 'Test user';
    }
    try {
      await set(ref(this.db, `covid-items/${group}/${userPath}`), {
        username,
        date,
        validationDate,
      });
    } catch (error) {
      console.info(error);
    }
  };
}

export default FirebaseService;
