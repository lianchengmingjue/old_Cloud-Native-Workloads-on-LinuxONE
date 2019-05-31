angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos','Clients', 'Fmbfs',function($scope, $http, Todos,Clients,Fmbfs) {
		$scope.formData = {};//提前加载的数据
		$scope.formData1 = {};//提前加载的数据
		$scope.formData2 = {};//提前加载的数据
		$scope.temp = {};//临时账户
		$scope.loading = true;
		$scope.input = {};//登录页面的输入
		$scope.FLAG=1;
		$scope.FLAG1=1;
		$scope.FLAG2=0;
		$scope.clients={};//读取client表格的所有内容
		$scope.fmbfs={};//读取fmbf表格的所有内容
		$scope.client_id=localStorage.getItem("account_id");
		$scope.account={};//设置当前用户
		$scope.money;//用于存款和取款
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
		Clients.get()
			.success(function(data) {
				$scope.clients = data;
				$scope.loading = false;
			});	
			
		Fmbfs.get()
			.success(function(data) {
				$scope.fmbfs = data;
				$scope.loading = false;
			});	

			//在开始加载页面的时候先插入两条客户数据以及对应的四条理财产品数据
			//插入两条client数据
				$scope.formData.client_id="1";
				$scope.formData.password="1";
				$scope.formData.client_name="Jack";
				$scope.formData.interest_rate=0.030;
				$scope.formData.interest=300;
				$scope.formData. balance=20000;
	
			Clients.create($scope.formData)
				
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.clients = data; // assign our new list of todos
				});
				$scope.formData={};

				$scope.formData1.client_id="2";
				$scope.formData1.password="2";
				$scope.formData1.client_name="Nancy";
				$scope.formData1.interest_rate=0.028;
				$scope.formData1.interest=500;
				$scope.formData1. balance=30000;
	
			Clients.create($scope.formData1)
			
	
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData1 = {}; // clear the form so our user is ready to enter another
					$scope.clients = data; // assign our new list of todos
				});
				$scope.formData1={};
				//插入4条fmbf数据
				$scope.formData2.client_id="1";
				$scope.formData2.name="Jack";
				$scope.formData2.type="1";
				$scope.formData2.interest_rate=0.030;
				$scope.formData2.balance=10000;
				$scope.formData2.interest=$scope.formData.interest_rate*$scope.formData. balance;
				$scope.formData2.begin_date=new Date();
				$scope.formData2.store_time=30;

			Fmbfs.create($scope.formData2)
			
	
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData2 = {}; // clear the form so our user is ready to enter another
					$scope.fmbfs = data; // assign our new list of todos
				});

				$scope.formData2.client_id="1";
				$scope.formData2.name="Jack";
				$scope.formData2.type="2";
				$scope.formData2.interest_rate=0.050;
				$scope.formData2.balance=10000;
				$scope.formData2.interest=$scope.formData.interest_rate*$scope.formData. balance;
				$scope.formData2.begin_date=new Date();
				$scope.formData2.store_time=50;

			Fmbfs.create($scope.formData2)
			
	
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData2 = {}; // clear the form so our user is ready to enter another
					$scope.fmbfs = data; // assign our new list of todos
				});
				$scope.formData2.client_id="2";
				$scope.formData2.name="Nancy";
				$scope.formData2.type="1";
				$scope.formData2.interest_rate=0.030;
				$scope.formData2.balance=30000;
				$scope.formData2.interest=$scope.formData.interest_rate*$scope.formData. balance;
				$scope.formData2.begin_date=new Date();
				$scope.formData2.store_time=30;

			Fmbfs.create($scope.formData2)
			
	
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData2 = {}; // clear the form so our user is ready to enter another
					$scope.fmbfs = data; // assign our new list of todos
				});

				$scope.formData2.client_id="2";
				$scope.formData2.name="Nancy";
				$scope.formData2.type="2";
				$scope.formData2.interest_rate=0.050;
				$scope.formData2.balance=30000;
				$scope.formData2.interest=$scope.formData.interest_rate*$scope.formData. balance;
				$scope.formData2.begin_date=new Date();
				$scope.formData2.store_time=50;
				$scope.FLAG=$scope.formData2.begin_date.getDate();
			Fmbfs.create($scope.formData2)
			
	
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData2 = {}; // clear the form so our user is ready to enter another
					$scope.fmbfs = data; // assign our new list of todos
				});
				
		//定义获得某个用户信息的函数
		$scope.getAccount = function(id) {
			$scope.loading = true;

				//getitem函数貌似不太行 先用get函数替代
			// Clients.getitem(id)
			// 		// if successful creation, call our get function to get all the new todos
			// 		.success(function(data) {
			// 			$scope.loading = false;
			// 			$scope.account = data; // assign our new list of todos
			// 		});
			Clients.get()
				.success(function(data) {
						$scope.clients = data;
						$scope.loading = false;
					});	

					for(var i=0;i<$scope.clients.length;i++){

						if(id==$scope.clients[i].client_id){

							$scope.account=$scope.clients[i];
						}
					}
		};

		//存款
		$scope.deposit = function() {
			//更改balance
			$scope.new_balance=$scope.account.balance+$scope.money;
			$scope.account.balance=$scope.new_balance;
			$scope.FLAG1=2;
			//删除原来的账号
			Clients.delete($scope.account._id);
			$scope.FLAG1=3;
			//构建新账号
			$scope.temp.client_id=$scope.account.client_id;
			$scope.temp.password=$scope.account.password;
			$scope.temp.client_name=$scope.account.client_name;
			$scope.temp.interest_rate=$scope.account.interest_rate;
			$scope.temp.interest=$scope.account.interest;
			$scope.temp.last_modify_time=$scope.account.last_modify_time;
			$scope.temp.balance=$scope.account.balance;

			//添加新账号
			Clients.create($scope.temp)
			.success(function(data) {
				$scope.loading = false;
				$scope.temp = {}; 
				$scope.clients = data; 
			});
			$scope.FLAG1=4;
			//重新确定当前账号
			for(var i=0;i<$scope.clients.length;i++){
				$scope.FLAG1=5;
				if($scope.client_id==$scope.clients[i].client_id){
					$scope.account=$scope.clients[i];
					$scope.FLAG1=6;
				}
			}
		};


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});





			}


		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		//点击登录键后调用该函数进行数据库数据初始化和账户验证以及跳转
		$scope.check = function(Input) {
			//当无数据时先给数据库加上两条数据
				

			var find=false;
			Clients.get()
			.success(function(data) {
				$scope.clients = data;
				$scope.loading = false;
				$scope.FLAG=3;
			});	
			$scope.FLAG=4;
			for(var i=0;i<$scope.clients.length;i++){
				if(Input.client_id==$scope.clients[i].client_id){
					$scope.FLAG=5;

					if(Input.password==$scope.clients[i].password){

						window.location.href='index_2.html';
						
						//保存当前用于至内存，方便下个页面使用
						localStorage.setItem("account_id", $scope.clients[i].client_id);

						find=true;
						$scope.FLAG=6;
					}
				}

			}
			$scope.FLAG=7;
			if(find==false){
				//给出警告

				var traget=document.getElementById("false-code");
				if(traget.style.display=="none"){
						traget.style.display="inline";
				}else{
						traget.style.display="none";
		
			  }



			}
		};

	}]);


