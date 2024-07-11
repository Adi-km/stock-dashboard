const basePath = "https://finnhub.io/api/v1";




const basePath2 = process.env.URL2;
const basePath3 = process.env.URL3; 
const basePath4 =process.env.USER_URL;

export const searchSymbols = async (query) => {
    const url = `${basePath4}/search_stocks?q=${query}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}



export const fetchHistoricalData = async (
    stockSymbol,
    resolution,
    period
) => {
    const url =  `${basePath2}/fetch_historical_data?symbol=${stockSymbol}&period=${period}&interval=${resolution}`
    
    
    
    // const response = await fetch(url);
        const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const fetchSentiment = async (
    stockSymbol,
) => {
    const url =  `${basePath2}/sentiment?stock_symbol=${stockSymbol}`  
    
    
    
    const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchPrediction = async (
    stockSymbol,
) => {
    const url =  `${basePath3}/predict?symbol=${stockSymbol}`   
    
    

    
    const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}