"use strict";
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const loginbutton = document.querySelector('#login');

loginbutton.addEventListener('click', () =>{
    const id = email.value;
    const password = password.value;
    const params = {  // URL Encode
        method: "POST",
        body:  'id='+id+'&password='+password,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/login";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        display.value = response.answer;
        console.log( response );
    })
})