export const deleteCookie=()=>{
    let cookies = document.cookie.split(";");
    if(cookies.length){
        cookies=cookies.map((cook)=>cook.trim())
    }
    for (var i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        console.log('typeof cookie',typeof cookie)
        if(typeof cookie ==='string'){
            if(cookie.search(/^_ga_\w+/)===0){
            console.log('cookie.search(/^_ga_/)',cookie.search(/^_ga_\w+/))
            console.log('$$$$$cookie',cookie)
            }
            if(cookie.search(/^_ga=\w+/)===0){
                console.log('cookie.search(/^_ga=/)',cookie.search(/^_ga=\w+/))
                console.log('$$$$$cookie',cookie)
            }
        }    
    }
    console.log('cookies',cookies)
}
   