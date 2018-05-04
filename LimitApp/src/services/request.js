
const {services}=require('./config.json')


const parseJSON=(response)=>{
    return response.json();
}


const checkStatus=(response)=>{
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const catchErr=(err)=>{
    return {status:0,message:err.message,err}
}


export const get = (url) => {

        const options = {
            method: 'GET',
            // headers: HttpHeaders
        }
        return fetch(services+url, options)
            // .then(check401)
            .then(checkStatus)
            .then(parseJSON)
            // .then(checkToken)
            .catch(catchErr)
}

export const post = (url, body) => {
    console.log(url,body)
    const options = {
        body:JSON.stringify(body),
        method: 'POST',
         headers: new Headers()
    }
    return fetch(services+url, options)
        // .then(check401)
        .then(checkStatus)
        .then(parseJSON)
        // .then(checkToken)
        .catch(catchErr)

}
