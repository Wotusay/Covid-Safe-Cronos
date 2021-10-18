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
    try {
      await set(ref(this.db, `covid-items/${group}/${username}`), {
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
