async function fetchAPI(query) {
  //   let headers: object = {
  //     Authorization: "daf6ad231ba6903840667d355eebca078554ff89 "
  //   };
  let fetchData = await fetch(query);
  let jsonData = await fetchData.json();
  console.log(jsonData);
}


