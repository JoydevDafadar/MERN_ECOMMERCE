// A mock function to mimic making an async request for data
// export function fetchBrand( ) {
//   return new Promise(async (resolve) => {
//     const res = await fetch("http://localhost:8080/brand");
//     const data = await res.json();
//     resolve({data})
//   });
// }
// export function fetchCategory( ) {
//   return new Promise(async (resolve) => {
//     const res = await fetch("http://localhost:8080/category");
//     const data = await res.json();
//     resolve({data})
//   });
// }
export function fetchProductById( id ) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products/${id}`);
    const data = await res.json();
    resolve({data})
  });
}
export function updateProduct( product ) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products/${product.id}`, {
      method: "PATCH",
      headers : {
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(product)
    });
    const data = await res.json();
    resolve({data})
  });
}
export function createProduct( product ) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products/`,{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await res.json();
    resolve({data});
  });
}

export function fetchProductsbyFilter( {filter, sort, pagenation} ) {

  let queryString = '';
  for( let key in filter ){
    const categories = filter[key];
    categories.forEach(element => {
      queryString += `${key}=${element}&`
    });
  }

  // console.log(sort)
  for( let key in sort ){
    queryString += `${key}=${sort[key]}&`
  }
  for( let key in pagenation ){
    queryString += `${key}=${pagenation[key]}&`
  }

  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products?"+queryString);
    // console.log(queryString)
    const data = await res.json();
    const totalItem = res.headers.get('X-Total-Count');
    // console.log( totalItem )
    resolve({data: { products: data, totalItem: +totalItem}})
  });
}


