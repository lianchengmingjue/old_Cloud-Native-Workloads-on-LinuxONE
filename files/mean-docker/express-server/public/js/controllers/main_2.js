angular.module('todo2Controller', [])

	// inject the Todo service factory into our controller
	.controller('main2Controller', ['$scope','$http','Todos','Clients','Fmbfs', function($scope, $http, Todos,Clients,Fmbfs) {
		$scope.formData = {};//提前加载的数据
		$scope.formData1 = {};//提前加载的数据
		$scope.temp = {};//临时账户
		$scope.loading = true;
		$scope.input = {};//登录页面的输入
		$scope.FLAG=1;
		$scope.FLAG1=0;
		$scope.FLAG2=0;
		$scope.clients={};//读取client表格的所有内容
		$scope.fmbfs={};//读取fmbf表格的所有内容
		$scope.client_id=localStorage.getItem("account_id");
		$scope.account={};//设置当前用户
		$scope.money;//用于存款和取款
		$scope.currentProduct={};//记录当前选择的理财产品
		$scope.wealth="0";
		$scope.income="0";
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
		$scope.deposit = function(money) {
            //获得当前客户
            Clients.get()
            .success(function(data) {
                    $scope.clients = data;
                    $scope.loading = false;
                });	

                for(var i=0;i<$scope.clients.length;i++){

                    if($scope.client_id==$scope.clients[i].client_id){

                        $scope.account=$scope.clients[i];
                    }
                }
			//更改balance
           
            $scope.new_balance=Number(money)+$scope.account.balance;
			$scope.account.balance=$scope.new_balance;

            //删除原来的账号
            $scope.loading = true;
            Clients.delete($scope.account._id)
            .success(function(data) {
                $scope.loading = false;
                $scope.clients = data; // assign our new list of todos
               
            });
			
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
            //得到当前数组
            Clients.get()
			.success(function(data) {
				$scope.clients = data;
				$scope.loading = false;
			});	
			
			//重新确定当前账号
			for(var i=0;i<$scope.clients.length;i++){
				
				if($scope.client_id==$scope.clients[i].client_id){
                    $scope.account=$scope.clients[i];
                   
					$scope.getAccount($scope.client_id);
				}
			}
		};

		//取款
		$scope.withdrawal = function(money) {
            //获得当前客户
            Clients.get()
            .success(function(data) {
                    $scope.clients = data;
                    $scope.loading = false;
                });	

                for(var i=0;i<$scope.clients.length;i++){

                    if($scope.client_id==$scope.clients[i].client_id){

                        $scope.account=$scope.clients[i];
                    }
				}
				console.log("取款")

			//更改balance
           if($scope.account.balance>=Number(money)){
			console.log("比较钱，取款")

			$scope.new_balance=$scope.account.balance-Number(money);
			$scope.account.balance=$scope.new_balance;

            //删除原来的账号
            $scope.loading = true;
            Clients.delete($scope.account._id)
            .success(function(data) {
                $scope.loading = false;
                $scope.clients = data; // assign our new list of todos
               
            });
			
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
            //得到当前数组
            Clients.get()
			.success(function(data) {
				$scope.clients = data;
				$scope.loading = false;
			});	
			
			//重新确定当前账号
			for(var i=0;i<$scope.clients.length;i++){
				
				if($scope.client_id==$scope.clients[i].client_id){
                    $scope.account=$scope.clients[i];
                   
					$scope.getAccount($scope.client_id);
				}
			}
		   }else{
			   //给出余额不足的警告
			   var traget=document.getElementById("accountLestThanZero");
			   console.log("余额不足")
			   if(traget.style.display=="none"){
					   traget.style.display="inline";
			   }else{
					   traget.style.display="none";
	   
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
		//点击第一个理财产品时触发的更新事件
		$scope.showfb1= function() {
			$scope.type="1";//获得当前理财产品类型
			//得到fmbf表格中对应的信息
			Fmbfs.get()
			.success(function(data) {
				$scope.fmbfs = data;
				$scope.loading = false;
			});			
			for(var i=0;i<$scope.fmbfs.length;i++){

				if($scope.client_id==$scope.fmbfs[i].client_id&&$scope.type==$scope.fmbfs[i].type){

					$scope.currentProduct=$scope.fmbfs[i];
				}
			}

		};

		//点击第二个理财产品时触发的更新事件
		$scope.showfb2= function() {
			$scope.type="2";//获得当前理财产品类型
			//得到fmbf表格中对应的信息
			Fmbfs.get()
			.success(function(data) {
				$scope.fmbfs = data;
				$scope.loading = false;
			});			
			for(var i=0;i<$scope.fmbfs.length;i++){

				if($scope.client_id==$scope.fmbfs[i].client_id&&$scope.type==$scope.fmbfs[i].type){

					$scope.currentProduct=$scope.fmbfs[i];
					$scope.wealth=$scope.currentProduct.balance;
					$scope.income=$scope.currentProduct.interest;
				}
			}

		};
	}]);


