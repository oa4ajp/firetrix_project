export const randomIntFromInterval = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);   
} 

export const getEmailBeforeAt = function(emailAddress: string){
    let emailName = '';

    if(emailAddress != null){
        let splittedArray = emailAddress.split('@', 1);
        if(splittedArray.length > 0){
            emailName = splittedArray[0];
        }
    }

    return emailName;
}

export const encondeFireBaseKey = function(key: string){
    return key.replace(/\%/g, '%25')
        .replace(/\./g, '%2E')
        .replace(/\#/g, '%23')
        .replace(/\$/g, '%24')
        .replace(/\//g, '%2F')
        .replace(/\[/g, '%5B')
        .replace(/\]/g, '%5D');
}

export const getProviderEmail = function(user: any){
    let email = '';
    email = user.providerData[0].email;        
    return email;
}

export const getUserId = function(user: any){
    let userId = '';

    if(user.providerData.length == 0){
        //Case for anonymous and email/password accounts
        if(user.email == null){
            // Anonymous
            userId = user.uid;
        }else{
            // email/password account
            userId = encondeFireBaseKey(user.email);
        }        
    }else{
        // Account with Providers
        userId = encondeFireBaseKey(getProviderEmail(user));
    }  
    return userId;
}