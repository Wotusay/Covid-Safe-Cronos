import { getDatabase, set, ref } from 'firebase/database';

class FirebaseService {
  db: any;
  constructor(firebase: any) {
    this.db = getDatabase(firebase);
  }

  writeUserData = async (
    username: string,
    date: string,
    validate: string,
  ): Promise<any> => {
    try {
      await set(ref(this.db, `covid-items/wheelhouse/${username}`), {
        username,
        date,
        validate,
      });
    } catch (error) {
      console.info(error);
    }
  };
}

export default FirebaseService;
