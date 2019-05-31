// JavaScript source code
var mongoose = require('mongoose');
// Define the schema
//通过html文件里面的fromdate.value获取value等属性
//fmbf:client_id,name,type,interest_rate,interest,begin_date,store_time,balance
//理财：用户id，理财项目名字，类型,利率，利息，开始日期，时长，金额
//时间都初始化为当前时间
module.exports = mongoose.model('Fmbf', {
    client_id: {
        type: String,
        default: ''
    },

    name: {
        type: String,
        default: ''
    },

    type: {
        type: String,
        default: ''
    },

    interest_rate: {
        type: Number,
        //产品1初始利润为0.035
        default: 0.035
    },

    interest: {
        type: Number,
        default: 0
    },

    begin_date: {
        type: Date,
        default: new Date()
    },

    store_time: {
        type: Number,
        //先做第一个，30天定期
        default:30
    },

    balance: {
        type: Number,
        default: 0
    }
});