import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const config = {
    apiKey: "AIzaSyA0qvbVS8i8IdbzFpPQSrQEZSPXLdY9t7I",
    authDomain: "firetrix-project-mendiola.firebaseapp.com",
    databaseURL: "https://firetrix-project-mendiola.firebaseio.com",
    projectId: "firetrix-project-mendiola",
    storageBucket: "",
    messagingSenderId: "31127316738"
};

admin.initializeApp(config);

const randomIntFromInterval = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);   
} 

export const updateSocialNetworks = functions.https.onRequest( (request, response) => {

    return admin.database().ref().update({   
        '/socialNetworks/FB/counterOne': randomIntFromInterval(10, 100),
        '/socialNetworks/FB/counterTwo': randomIntFromInterval(10, 150),
        '/socialNetworks/GP/counterOne': randomIntFromInterval(10, 200),
        '/socialNetworks/GP/counterTwo': randomIntFromInterval(10, 250),
        '/socialNetworks/LI/counterOne': randomIntFromInterval(10, 300),
        '/socialNetworks/LI/counterTwo': randomIntFromInterval(10, 350),
        '/socialNetworks/TW/counterOne': randomIntFromInterval(10, 400),
        '/socialNetworks/TW/counterTwo': randomIntFromInterval(10, 450)             
    }).then( () => {    
        response.status(200).send("OK");
    });

});

export const updateDailyTraffic = functions.https.onRequest( (request, response) => {

    return admin.database().ref().update({   
        '/dailyTraffic/1/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/2/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/3/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/4/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/5/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/6/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/7/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/8/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/9/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/10/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/11/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/12/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/13/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/14/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/15/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/16/value': randomIntFromInterval(1, 250),  
        '/dailyTraffic/17/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/18/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/19/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/20/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/21/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/22/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/23/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/24/value': randomIntFromInterval(1, 250),  
        '/dailyTraffic/25/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/26/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/27/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/28/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/29/value': randomIntFromInterval(1, 250),
        '/dailyTraffic/30/value': randomIntFromInterval(1, 250)                                 
    }).then( () => {    
        response.status(200).send("OK");
    });
    
});

export const updateTraffic = functions.https.onRequest( (request, response) => {

    return admin.database().ref('/traffic/').update({   
        'bounceRate': randomIntFromInterval(10, 100),
        'newUsersPercentage': randomIntFromInterval(10, 100),
        'newUsersQuantity': randomIntFromInterval(10, 200),
        'pageViewsPercentage': randomIntFromInterval(10, 100),
        'pageViewsQuantity': randomIntFromInterval(10, 700),
        'uniqueVisitsPercentage': randomIntFromInterval(10, 100),
        'uniqueVisitsQuantity': randomIntFromInterval(10, 400),
        'visitsPercentage': randomIntFromInterval(10, 100),           
        'visitsQuantity': randomIntFromInterval(50, 1000),           
    }).then( () => {    
        response.status(200).send("OK");
    });

});

export const updateSalesTraffic = functions.https.onRequest( (request, response) => {

    return admin.database().ref().update({   
        '/salesTraffic/BR/value': randomIntFromInterval(1, 100),        
        '/salesTraffic/CT/value': randomIntFromInterval(5, 100),        
        '/salesTraffic/NC/value': randomIntFromInterval(1000, 10000),        
        '/salesTraffic/OR/value': randomIntFromInterval(500, 20000),
        '/salesTraffic/PV/value': randomIntFromInterval(500, 70000),
        '/salesTraffic/RC/value': randomIntFromInterval(500, 20000)
    }).then( () => {    
        response.status(200).send("OK");
    });

});

export const updateProducts = functions.https.onRequest( (request, response) => {

    return admin.database().ref().update({   
        '/products/EB/quantity': randomIntFromInterval(100000, 150000),        
        '/products/IM4/quantity': randomIntFromInterval(1000, 2000),        
        '/products/IP6/quantity': randomIntFromInterval(600, 1500),        
        '/products/PA/quantity': randomIntFromInterval(100, 1000),
        '/products/PH/quantity': randomIntFromInterval(5000, 14000),
        '/products/SGE/quantity': randomIntFromInterval(500, 2000),
        '/products/SS/quantity': randomIntFromInterval(500, 1000),
    }).then( () => {    
        response.status(200).send("OK");
    });

});

export const updateSalesByDay = functions.https.onRequest( (request, response) => {

    return admin.database().ref().update({   
        '/salesByDay/F/newClients': randomIntFromInterval(10, 20),        
        '/salesByDay/F/recurringClients': randomIntFromInterval(21, 100),     
        '/salesByDay/M/newClients': randomIntFromInterval(10, 30),        
        '/salesByDay/M/recurringClients': randomIntFromInterval(31, 100),        
        '/salesByDay/S/newClients': randomIntFromInterval(1, 10),        
        '/salesByDay/S/recurringClients': randomIntFromInterval(11, 100),        
        '/salesByDay/SA/newClients': randomIntFromInterval(25, 55),
        '/salesByDay/SA/recurringClients': randomIntFromInterval(56, 100),
        '/salesByDay/T/newClients': randomIntFromInterval(1, 60),
        '/salesByDay/T/recurringClients': randomIntFromInterval(61, 100),
        '/salesByDay/TH/newClients': randomIntFromInterval(1, 50),
        '/salesByDay/TH/recurringClients': randomIntFromInterval(51, 100),
        '/salesByDay/W/newClients': randomIntFromInterval(1, 30),
        '/salesByDay/W/recurringClients': randomIntFromInterval(31, 100),
    }).then( () => {    
        response.status(200).send("OK");
    });

});
