// A mock function to mimic making an async request for data
export function recheckUser() {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('e-commerce-token');
    const res = await fetch("https://backend-ecommerce-api.vercel.app/auth/check", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();

    resolve({data});
  });
}
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("https://backend-ecommerce-api.vercel.app/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if( res.ok ){
      const data = await res.json();
      resolve({ data });
    }
    else{
      const data = await res.json();
      // console.log({data: data})
      reject({data: data})
    }
  });
}

export function cheackUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("https://backend-ecommerce-api.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if(res.ok){
        const data = await res.json();
        resolve({data});
      }
      else{
        const data = await res.text();
        // console.log( data );
        reject({data});
      }
      
    } catch (error) {
      reject({ error });
    }
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch("https://backend-ecommerce-api.vercel.app/auth/" + userData.id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    resolve({ data });
  });
}

export function logoutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ Success: true, id: userId });
  });
}
