angular.module('fmbfService', [])
    //定义对应的方法
	// super simple service
    // each function returns a promise object
    //函数通过发送delete，get，post等报文分别
    
	.factory('Fmbfs', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/fmbfs');
			},
			create : function(fmbfData) {
				return $http.post('/api/fmbfs', fmbfData);
			},
			delete : function(id) {
				return $http.delete('/api/fmbfs/' + id);
			},
			modify: function(id,fmbfData)
			{
				$http.delete('/api/fmbfs/' + id);
				return $http.post('/api/fmbfs', fmbfData);
			},
			getitem:function(id)
			{
				return $http.get('/api/fmbfs'+id);
			}
		}
	}]);
