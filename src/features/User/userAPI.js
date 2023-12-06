// A mock function to mimic making an async request for data
export function fetchUser(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch('http://localhost:8080/user/'+userId)
    const data = await res.json();
    resolve( {data} );
  });
}

export function fetchOrders(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch('http://localhost:8080/orders/?user='+userId)
    const data = await res.json();
    resolve( {data} );
  });
}


export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/user/"+userData.id, {
      method: "PATCH",
      headers:{
        "Content-type" : "application/json",
      },
      body : JSON.stringify(userData)
    });
    const data = await res.json();

    resolve( {data} );
  });
}
