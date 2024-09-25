import React, { useState, useEffect } from 'react';
import { categoryService } from './category.service';

const App = () => {
  const userService = categoryService('https://api.example.com');
//   To add type
//   const [user, setUser] = useState<User>(null);

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const user: any = await userService.getCagetories(1);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default App;
