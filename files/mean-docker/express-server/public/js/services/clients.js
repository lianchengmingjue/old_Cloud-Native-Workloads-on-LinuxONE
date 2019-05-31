angular.module('clientService', [])
    //定义对应的方法
	// super simple service
    // each function returns a promise object
    //函数通过发送delete，get，post等报文分别
	//函数使用方法参考main.js里面的使用方法，如果函数测试有问题我继续改
	//使用client和fmbf表的时候记得再core。js里面把todo修改成对应的名字
	.factory('Clients', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/clients');
			},
			create : function(clientData) {
				return $http.post('/api/clients', clientData);
			},
			delete : function(id) {
				return $http.delete('/api/clients/' + id);
			},
			modify: function(id,clientData)
			{
				$http.delete('/api/clients/' + id);
				return $http.post('/api/clients', clientData);
			},
			getitem:function(id)
			{
				return $http.get('/api/clients/'+id);
			}
		}
	}]);
