import axios from "axios"


interface postLikeCreds {
    userId: number;
    loopId: number 
}

export const postLike = async (credentials: postLikeCreds) => {
    return fetch('/api/Like', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
}