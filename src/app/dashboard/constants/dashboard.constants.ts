import { SalesTraffic }     from '../models/sales-traffic'
import { SalesByDay }       from '../models/sales-by-day'
import { SalesByGender }    from '../models/sales-by-gender'
import { SalesByOrigin }    from '../models/sales-by-origin'
import { Product }          from '../models/product'
import { Traffic }          from '../models/traffic'
import { SocialNetwork }    from '../models/social-network'
import Util from '../../core/utils/util';

export class DashboardConstants {
    public static get salesTrafficData(): SalesTraffic[] { 
        return [
            {
                'code':  'BR',
                'description': 'Bounce Rate',
                'value': Util.randomIntFromInterval(1, 100).toString()             
            },
            {
                'code':  'CT',
                'description': 'CTR',
                'value': Util.randomIntFromInterval(5, 100).toString()            
            },
            {
                'code':  'NC',
                'description': 'New Clients',
                'value': Util.randomIntFromInterval(1000, 10000).toString()            
            },  
            {
                'code':  'OR',
                'description': 'Organic',
                'value': Util.randomIntFromInterval(500, 20000).toString()            
            },  
            {
                'code':  'PV',
                'description': 'Page views',
                'value': Util.randomIntFromInterval(500, 70000).toString()            
            },  
            {
                'code':  'RC',
                'description': 'Recurring clients',
                'value': Util.randomIntFromInterval(500, 20000).toString()            
            }                                
        ];
    }

    public static get salesByDayData(): SalesByDay[] {
        return [
            {
                'code':  'F',
                'description': 'Friday',
                'newClients': Util.randomIntFromInterval(10, 20).toString(), 
                'position': '4',
                'recurringClients': Util.randomIntFromInterval(21, 100).toString()
            },
            {
                'code':  'M',
                'description': 'Monday',
                'newClients': Util.randomIntFromInterval(10, 30).toString(), 
                'position': '1',
                'recurringClients': Util.randomIntFromInterval(31, 100).toString()           
            },
            {
                'code':  'S',
                'description': 'Sunday',
                'newClients':Util.randomIntFromInterval(1, 10).toString(), 
                'position': '6',
                'recurringClients': Util.randomIntFromInterval(11, 100).toString()           
            },  
            {
                'code':  'SA',
                'description': 'Saturday',
                'newClients': Util.randomIntFromInterval(25, 55).toString(), 
                'position': '5',
                'recurringClients': Util.randomIntFromInterval(56, 100).toString()        
            },  
            {
                'code':  'T',
                'description': 'Tuesday',
                'newClients': Util.randomIntFromInterval(1, 60).toString(), 
                'position': '1',
                'recurringClients': Util.randomIntFromInterval(61, 100).toString()         
            },  
            {
                'code':  'TH',
                'description': 'Thursday',
                'newClients': Util.randomIntFromInterval(1, 50).toString(), 
                'position': '3',
                'recurringClients': Util.randomIntFromInterval(51, 100).toString()      
            },
            {
                'code':  'W',
                'description': 'Wednesday',
                'newClients': Util.randomIntFromInterval(1, 30).toString(), 
                'position': '2',
                'recurringClients': Util.randomIntFromInterval(31, 100).toString()      
            }                                            
        ];
    }

    public static get salesByOriginData(): SalesByOrigin[] {
        return [
            {
                'code': 'FB',
                'description': 'Facebook',
                'iconClass': 'icon-social-facebook', 
                'percentage': '15',
                'position': '1',
                'quantity': Util.randomIntFromInterval(10000, 55000).toString()
            },
            {
                'code': 'LI',
                'description': 'LinkedIn',
                'iconClass': 'icon-social-linkedin', 
                'percentage': '8',
                'position': '3',
                'quantity': Util.randomIntFromInterval(1000, 29000).toString()
            },
            {
                'code': 'OR',
                'description': 'Organic Search',
                'iconClass': 'icon-globe', 
                'percentage': '56',
                'position': '0',
                'quantity': Util.randomIntFromInterval(5000, 20000).toString()
            },
            {
                'code': 'TW',
                'description': 'Twitter',
                'iconClass': 'icon-social-twitter', 
                'percentage': '11',
                'position': '2',
                'quantity': Util.randomIntFromInterval(10000, 38000).toString()
            }                                          
        ];     
    }

    public static get productsData(): Product[] {
        return [
            {
                'code': 'EB',
                'description': 'Ebook',
                'iconClass': 'icon-cloud-download bg-danger', 
                'position': '5',
                'quantity': Util.randomIntFromInterval(100000, 150000).toString(),
                'quantityDescription': 'Downloads'
            },
            {
                'code': 'IM4',
                'description': 'iMac 4k',
                'iconClass': 'icon-screen-desktop bg-primary', 
                'position': '0',
                'quantity': Util.randomIntFromInterval(1000, 2000).toString(),
                'quantityDescription': 'Sold this week'
            },
            {
                'code': 'IP6',
                'description': 'iPhone 6S',
                'iconClass': 'icon-screen-smartphone bg-warning', 
                'position': '2',
                'quantity': Util.randomIntFromInterval(600, 1500).toString(),
                'quantityDescription': 'Sold this week'
            },
            {
                'code': 'PA',
                'description': 'Premium accounts',
                'iconClass': 'icon-user bg-danger', 
                'position': '3',
                'quantity': Util.randomIntFromInterval(100, 1000).toString(),
                'quantityDescription': 'Sold this week'
            },
            {
                'code': 'PH',
                'description': 'Photos',
                'iconClass': 'icon-camera bg-warning', 
                'position': '6',
                'quantity': Util.randomIntFromInterval(5000, 14000).toString(),
                'quantityDescription': ''
            },
            {
                'code': 'SGE',
                'description': 'Samsung Galaxy Edge',
                'iconClass': 'icon-screen-smartphone bg-info', 
                'position': '1',
                'quantity': Util.randomIntFromInterval(500, 2000).toString(),
                'quantityDescription': 'Sold this week'
            },
            {
                'code': 'SS',
                'description': 'Spotify Subscriptions',
                'iconClass': 'icon-social-spotify bg-success', 
                'position': '4',
                'quantity': Util.randomIntFromInterval(500, 1000).toString(),
                'quantityDescription': 'Sold this week'
            }                                                                                          
        ];
    }

    public static get trafficData(): Traffic {    
        return {
            'bounceRate': Util.randomIntFromInterval(10, 100).toString(),
            'newUsersPercentage': Util.randomIntFromInterval(10, 100).toString(),
            'newUsersQuantity': Util.randomIntFromInterval(10, 200).toString(),
            'pageViewsPercentage': Util.randomIntFromInterval(10, 100).toString(),
            'pageViewsQuantity': Util.randomIntFromInterval(10, 700).toString(),
            'uniqueVisitsPercentage': Util.randomIntFromInterval(10, 100).toString(),
            'uniqueVisitsQuantity': Util.randomIntFromInterval(10, 400).toString(),
            'visitsPercentage': Util.randomIntFromInterval(10, 100).toString(),
            'visitsQuantity': Util.randomIntFromInterval(50, 1000).toString(),
        };
    }

    public static get socialNetworkData(): SocialNetwork[] {
        return [
            {
                'code':  'FB',
                'counterOne': Util.randomIntFromInterval(10, 100).toString(),
                'counterOneName': 'Friends',
                'counterTwo': Util.randomIntFromInterval(10, 150).toString(),
                'counterTwoName':  'Feeds',
                'name': 'Facebook'             
            },
            {
                'code':  'GP',
                'counterOne': Util.randomIntFromInterval(10, 200).toString(),
                'counterOneName': 'Followers',
                'counterTwo': Util.randomIntFromInterval(10, 250).toString(),
                'counterTwoName':  'Circles',
                'name': 'Google Plus'             
            },
            {
                'code':  'LI',
                'counterOne': Util.randomIntFromInterval(10, 300).toString(),
                'counterOneName': 'Contacts',
                'counterTwo': Util.randomIntFromInterval(10, 350).toString(),
                'counterTwoName':  'Feeds',
                'name': ''             
            },  
            {
                'code':  'TW',
                'counterOne': Util.randomIntFromInterval(10, 400).toString(),
                'counterOneName': 'Followers',
                'counterTwo': Util.randomIntFromInterval(10, 450).toString(),
                'counterTwoName':  'Feeds',
                'name': 'Tweeter'             
            }                              
        ];    
    }    
}