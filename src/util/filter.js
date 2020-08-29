import Vue from 'vue';
import moment from 'moment';

Vue.filter("dateFormat",function(date,format = "YYYY-MM-DD"){
    return moment(date).format(format);
});
