var mongoose = require('mongoose');
    //在app/moduel/client创建新的数据库表文件
// Define the schema
//通过html文件里面的fromdate.value获取value等属性
//client:id ,client_name,interest_rate,interest,begin_date,last_modify_time,balance
//账户表：id，用户名字，利率，利息，开始日期，上次修改日期，金额
//时间都初始化为当前时间
module.exports = mongoose.model('Client', {
    client_id: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    client_name: {
        type: String,
        default: ''
    },

    interest_rate:{
        type: Number,
        //初始利润为0.028
        default:0.028
    },
    interest:{
        type:Number,
        default:0

    },

    begin_date:{
        type:Date,
        default:new Date()
    },
    last_modify_time:{
        type:Date,
        default:new Date()
    },
    balance:{
        type:Number,
        default:0
    }

});