const NETWORK_ERROR_PROBABILITY = 0.1;

function fakeFetch(ad, cb) {
  let data = [];//para generar la cadena a retornar

  const fakeResponses = [
    { ad: 1, title: 'The first ad' },
    { ad: 2, title: 'The second ad' },
    { ad: 3, title: 'The third ad' },
    { ad: 4, title: 'The forth ad' },
    { ad: 5, title: 'The last ad' },
  ];
  const randomDelay = (Math.round(Math.random() * 1E4) % 40) + 1000;
    setTimeout(() => {
      const networkError = Math.random() <= NETWORK_ERROR_PROBABILITY;
      const currentAd = fakeResponses.find(resp => resp.ad === ad);
      if (networkError) {
        //indicamos qu hubo un error y especificamos cual peticion fue
        data.push(
          { ad: ad, title: 'Failed to load the ad ' + ad });
        cb(true,data);
      } else {
        //agregamos el numero de la peticion
        data.push(currentAd)
        cb(null,data);
      }
      
    }, randomDelay);
}

//ordenamos el array que creamos con las peticiones
function orenarCadena(items) {
  let r = items.sort(function (a, b) {
    //comparamos los valores para dterminar cual es mayor y asi poder ordenarlos
    if (a.ad > b.ad) {
      return 1;
    }
    if (a.ad < b.ad) {
      return -1;
    }
    return 0;
  });
  let dev ='';
  //mandamos solo los datos que nos pide (el title)
  r.forEach(element => 
    dev += element.title + "\n"
  );
  return dev;
}
var da = [];//para crear la cadena auxiliar, la que creamos con las peticiones
var cont = 1;//determina cuando ya termino de realizar las peticiones
for (let i = 1; i < 6; i++) {
  fakeFetch(i,function llamar(error,response){
    da.push(response[0]);
    if(error){
      let ordenado = orenarCadena(da);
      console.log(ordenado)
    }else{
      cont++;
      if(cont == 6){
        let ordenado = orenarCadena(da);
        ordenado +=  "Done!";
        console.log(ordenado)
      }
    }
  });
}//end for