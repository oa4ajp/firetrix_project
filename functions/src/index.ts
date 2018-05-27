import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as privateFunctions from './privateFunctions';

const config = {
    apiKey: "AIzaSyA0qvbVS8i8IdbzFpPQSrQEZSPXLdY9t7I",
    authDomain: "firetrix-project-mendiola.firebaseapp.com",
    databaseURL: "https://firetrix-project-mendiola.firebaseio.com",
    projectId: "firetrix-project-mendiola",
    storageBucket: "firetrix-project-mendiola.appspot.com",
    messagingSenderId: "31127316738"
};

admin.initializeApp(config);

const corsHandler = cors({origin: true});

export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    //console.log(user);
    let userEmail = user.email;
    let displayName = user.displayName;

    const userProviderData: admin.auth.UserInfo  = user.providerData[0];

    if(userProviderData != null){
        let providerId = userProviderData.providerId;  

        switch(providerId){        
            case "github.com":
                userEmail = userProviderData.email; 
                break;
            
            case "google.com":
                userEmail = userProviderData.email; 
                break;          
        }
    }

    if(displayName == null){
        displayName = privateFunctions.getEmailBeforeAt(userEmail);
    }

    if(userEmail != null){
        return admin.database().ref('/emailQueue/' + user.uid).set({
            'userId': user.uid,
            'emailAddress': userEmail,
            'subject:': 'Welcome ' + displayName,
            'message:': 'Welcome ' + displayName + ' to our Firetrix site.',
            'sentDate': new Date().toISOString()
        });
    }else{
        //console.log('userEmail == null');
        return new Promise<boolean>((resolve) => {
          resolve(true);
        });        
    }
    
});

//Remove the Deleted Users from the Database.
export const removeDeletedUsers = functions.auth.user().onDelete((user) => {
    //console.log(user);

    let userId = privateFunctions.getUserId(user);

    //Get the uid
    return admin.database().ref('/users/' + userId).remove();

});

//autoDestruction
export const autoDestruction = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
		return admin.auth().listUsers().then(listUserResult => {
			let userList: admin.auth.UserRecord[] = listUserResult.users;

			if(userList != null){
				//console.log('userList != null');
				userList.forEach(item => {
					return admin.auth().deleteUser(item.uid);
				});
			}

			return new Promise<boolean>((resolve) => {
				resolve(true);
			});             
			
		})
		.then( () => {    
			response.status(200).send("OK");
		});		
	});
});

export const updateSocialNetworks = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({   
            '/socialNetworks/FB/counterOne': privateFunctions.randomIntFromInterval(10, 100),
            '/socialNetworks/FB/counterTwo': privateFunctions.randomIntFromInterval(10, 150),
            '/socialNetworks/GP/counterOne': privateFunctions.randomIntFromInterval(10, 200),
            '/socialNetworks/GP/counterTwo': privateFunctions.randomIntFromInterval(10, 250),
            '/socialNetworks/LI/counterOne': privateFunctions.randomIntFromInterval(10, 300),
            '/socialNetworks/LI/counterTwo': privateFunctions.randomIntFromInterval(10, 350),
            '/socialNetworks/TW/counterOne': privateFunctions.randomIntFromInterval(10, 400),
            '/socialNetworks/TW/counterTwo': privateFunctions.randomIntFromInterval(10, 450)             
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateDailyTraffic = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({   
            '/dailyTraffic/1/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/2/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/3/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/4/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/5/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/6/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/7/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/8/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/9/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/10/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/11/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/12/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/13/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/14/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/15/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/16/value': privateFunctions.randomIntFromInterval(1, 250),  
            '/dailyTraffic/17/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/18/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/19/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/20/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/21/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/22/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/23/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/24/value': privateFunctions.randomIntFromInterval(1, 250),  
            '/dailyTraffic/25/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/26/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/27/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/28/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/29/value': privateFunctions.randomIntFromInterval(1, 250),
            '/dailyTraffic/30/value': privateFunctions.randomIntFromInterval(1, 250)                                 
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateTraffic = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref('/traffic/').update({   
            'bounceRate': privateFunctions.randomIntFromInterval(10, 100),
            'newUsersPercentage': privateFunctions.randomIntFromInterval(10, 100),
            'newUsersQuantity': privateFunctions.randomIntFromInterval(10, 200),
            'pageViewsPercentage': privateFunctions.randomIntFromInterval(10, 100),
            'pageViewsQuantity': privateFunctions.randomIntFromInterval(10, 700),
            'uniqueVisitsPercentage': privateFunctions.randomIntFromInterval(10, 100),
            'uniqueVisitsQuantity': privateFunctions.randomIntFromInterval(10, 400),
            'visitsPercentage': privateFunctions.randomIntFromInterval(10, 100),           
            'visitsQuantity': privateFunctions.randomIntFromInterval(50, 1000),           
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateSalesTraffic = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({   
            '/salesTraffic/BR/value': privateFunctions.randomIntFromInterval(1, 100),
            '/salesTraffic/CT/value': privateFunctions.randomIntFromInterval(5, 100),
            '/salesTraffic/NC/value': privateFunctions.randomIntFromInterval(1000, 10000),
            '/salesTraffic/OR/value': privateFunctions.randomIntFromInterval(500, 20000),
            '/salesTraffic/PV/value': privateFunctions.randomIntFromInterval(500, 70000),
            '/salesTraffic/RC/value': privateFunctions.randomIntFromInterval(500, 20000)
            
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateProducts = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({
            '/products/EB/quantity': privateFunctions.randomIntFromInterval(100000, 150000),        
            '/products/IM4/quantity': privateFunctions.randomIntFromInterval(1000, 2000),
            '/products/IP6/quantity': privateFunctions.randomIntFromInterval(600, 1500),
            '/products/PA/quantity': privateFunctions.randomIntFromInterval(100, 1000),
            '/products/PH/quantity': privateFunctions.randomIntFromInterval(5000, 14000),
            '/products/SGE/quantity': privateFunctions.randomIntFromInterval(500, 2000),
            '/products/SS/quantity': privateFunctions.randomIntFromInterval(500, 1000)

        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateSalesByDay = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({   
            '/salesByDay/F/newClients': privateFunctions.randomIntFromInterval(10, 20),        
            '/salesByDay/F/recurringClients': privateFunctions.randomIntFromInterval(21, 100), 
            
            '/salesByDay/M/newClients': privateFunctions.randomIntFromInterval(10, 30),        
            '/salesByDay/M/recurringClients': privateFunctions.randomIntFromInterval(31, 100), 

            '/salesByDay/S/newClients': privateFunctions.randomIntFromInterval(1, 10),        
            '/salesByDay/S/recurringClients': privateFunctions.randomIntFromInterval(11, 100),

            '/salesByDay/SA/newClients': privateFunctions.randomIntFromInterval(25, 55),
            '/salesByDay/SA/recurringClients': privateFunctions.randomIntFromInterval(56, 100),
            
            '/salesByDay/T/newClients': privateFunctions.randomIntFromInterval(1, 60),
            '/salesByDay/T/recurringClients': privateFunctions.randomIntFromInterval(61, 100),
            
            '/salesByDay/TH/newClients': privateFunctions.randomIntFromInterval(1, 50),
            '/salesByDay/TH/recurringClients': privateFunctions.randomIntFromInterval(51, 100),
            
            '/salesByDay/W/newClients': privateFunctions.randomIntFromInterval(1, 30),
            '/salesByDay/W/recurringClients': privateFunctions.randomIntFromInterval(31, 100)
            
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});

export const updateSalesByOrigin = functions.https.onRequest( (request, response) => {
    corsHandler(request, response, () => {
        return admin.database().ref().update({
            '/salesByOrigin/FB/quantity': privateFunctions.randomIntFromInterval(10000, 55000),              
            '/salesByOrigin/LI/quantity': privateFunctions.randomIntFromInterval(1000, 29000),            
            '/salesByOrigin/OR/quantity': privateFunctions.randomIntFromInterval(5000, 20000),            
            '/salesByOrigin/TW/quantity': privateFunctions.randomIntFromInterval(10000, 38000)
            
        }).then( () => {    
            response.status(200).send("OK");
        });
    });
});
