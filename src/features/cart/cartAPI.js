// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers:{
        "Content-type" : "application/json",
      },
      body : JSON.stringify(item)
    });
    const data = await res.json();

    resolve( {data} );
  });
}

export function fetchCartItem (userId) {
  return new Promise( async (resolve) => {
    const items = await fetch("http://localhost:8080/cart?user="+userId);
    const data = await items.json();

    resolve( { data } );
  })
}

export function updateCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart/"+item.id, {
      method: "PATCH",
      headers:{
        "Content-type" : "application/json",
      },
      body : JSON.stringify(item)
    });
    const data = await res.json();

    resolve( {data} );
  });
}
export function deleteCart(itemId) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart/"+itemId, {
      method: "DELETE",
      headers:{
        "Content-type" : "application/json",
      }
    });
    // const data = await res.json();

    resolve( {data: {id : itemId}} );
  });
}


export function resetCart (userId) {
  return new Promise( async ( resolve ) => {
    const res = await fetchCartItem(userId);
    const items = res.data;
    for( let item of items ){
      await deleteCart(item.id);
    }
    resolve({status: "done"})
  })
}