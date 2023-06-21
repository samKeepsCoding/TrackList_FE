

interface Credentials {
    username: string;
    password: string;
  }
  
  const loginUser = async (credentials: Credentials) => {
    return fetch('/api/Auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  export default loginUser;