export default class DateUtil {
    
    static getValueWithLeadingZeros(value: number) { 
        return ("0" + value.toString()).slice(-2);     
    }

    static getFormattedHour(date: Date){
        return DateUtil.getValueWithLeadingZeros(date.getHours()) + ":" + 
               DateUtil.getValueWithLeadingZeros(date.getMinutes()) + ":" + 
               DateUtil.getValueWithLeadingZeros(date.getSeconds())
    }

    static getFormattedDate(date: Date){
      return  date.getFullYear() + '-' + 
              this.getValueWithLeadingZeros(date.getMonth() + 1) + '-' +
              this.getValueWithLeadingZeros(date. getDate()) + ' ' +
              this.getFormattedHour(date)
    }

}