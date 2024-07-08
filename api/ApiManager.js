import { EndPoints } from "./EndPoints"

// export const METHODS = {
//   POST : "POST",
//   GET:"GET",
//   PUT:"PUT",
//   DELETE:"DELETE"
// }

// const buildURL = (endpoint) => {
//   return EndPoints.BASEURL + endpoint
// }

// const buildHeaders = () => {
//   const headers = {
//     "Content-Type":"application/json"
    
//   }
//   return headers;
// }

// export const makeRequest = async (endpoint,body,method)=>{
// try{
//   let response =await  fetch(buildURL(endpoint),{
//     method:method,
//     body:body,
//     headers: buildHeaders(),
//   });


//   if(response.ok){
//     let responseJaon = response.json();
//     return responseJaon
//   }else{
//     console.log(response.statusText);
//   }

// }catch(error){
//   throw error;
// }
// }




const defaultHeaders = {
  // 'Content-Type': 'application/json',
  "access-control-allow-origin" : "*",
};

class APIManager {
  constructor() {}

  static isFormData(data) {
    return data instanceof FormData;
  }

  static getFetchBody(request) {
    if (request.body == null) {
      return undefined;
    }
    return APIManager.isFormData(request.body)
      ? request.body
      : request.method === 'POST'
      ? JSON.stringify(request.body)
      : undefined;
  }

  static async makeRequest(request, useDebug = true) {
    const method = request.method ?? 'GET';
    const body = APIManager.getFetchBody(request);
    const url = request.url;
    const headers = { ...defaultHeaders, ...request.headers };
    try {
      
      const accessToken = localStorage.getItem('access_token');
      if (accessToken != null) {
        headers['authorization'] = 'Bearer ' + accessToken;
      }
      // console.log(headers);
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: request.abort?.signal,
      });
      const responseJson = await response.json();
      const responseData = responseJson;
      if (!response.ok || !responseJson.status) {
        throw new Error(responseData.message);
      }
      if (useDebug) {
        this.printRequest({ url, method, headers, body }, response, responseJson);
      }
      return responseData;
    } catch (error) {
      console.log(error);
      if (useDebug) {
        this.printRequest({ url, method, headers, body });
      }
      throw error;
    }
  }

  static async printRequest(request, response, responseData) {
    console.log('*****************************************************');
    console.log('URL: ', request.url);
    console.log('Method: ', request.method);
    console.log('Headers: ', request.headers);
    console.log('Body: ', request.body);
    if (response != null) {
      console.log('Status Code: ', response?.status);
      console.log('Response Json: ', responseData);
    }
    console.log('*****************************************************');
  }
}

export default APIManager;
