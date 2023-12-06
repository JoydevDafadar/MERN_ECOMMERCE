export function createOrder(order) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers:{
        "Content-type" : "application/json",
      },
      body : JSON.stringify(order)
    });
    const data = await res.json();

    resolve( {data} );
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
 let queryString = '';

 for (let key in sort) {
  queryString += `${key}=${sort[key]}&`;
}

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      'http://localhost:8080/orders/all?' + queryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}