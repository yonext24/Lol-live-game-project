export function getFetch(url){

    return fetch(url)
    .then( response => response.json())
    .catch(err => {
        throw new Error(err);
    });

}