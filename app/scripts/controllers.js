'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
                );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

            $scope.showFeedback = false;
            $scope.message = "Loading ...";

            $scope.feedbackCollection = feedbackFactory.getFeedback().query(
                function(response) {
                    $scope.feedbackCollection = response;
                    $scope.showFeedback = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
                );


                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            var feedback = {
                firstName:"",
                lastName:"",
                tel: {
                    areaCode: "",
                    number: ""
                },
                agree:false,
                email:"",
                mychannel:"",
                comments: ""
                };

            $scope.feedback = feedback;

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

            var feedbackResource = feedbackFactory.getFeedback();
            $scope.feedbackResource = feedbackResource;

            $scope.sendFeedback = function() {
                
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {                    
                    $scope.invalidChannelSelection = false;

                    var keys = Object.keys($scope.feedback);

                    var newFeedback = new feedbackResource();


                    for (var j = 0; j < keys.length; j++) {
                        newFeedback[keys[j]] = $scope.feedback[keys[j]];
                    } 
                    newFeedback.$save();

                    
                    $scope.feedback = {
                                firstName:"",
                                lastName:"",
                                tel: {
                                    areaCode: "",
                                    number: ""
                                },
                                agree:false,
                                email:"",
                                mychannel:"",
                                comments: ""
                                };
                    
                     
                    //$scope.feedback.mychannel ="";

                    // update $scope.feedbackCollection
                    $scope.feedbackCollection = feedbackFactory.getFeedback().query();

                    $scope.feedbackForm.$setPristine();
                    
                }
            };


        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
           
            $scope.showDish = false;
            $scope.message = "Loading ...";

            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                            .$promise.then(
                                    function(response) {
                                        $scope.dish = response;
                                        $scope.showDish = true;
                                    },
                                    function(response) {
                                        $scope.message = "Error: " + response.status + " " + response.statusText;
                                    }
                                    );

            $scope.sort = "";
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.showLeaders = false;
            $scope.message = "Loading ...";

            $scope.members = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.members = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
                );

       

        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            $scope.showPromotion = false;
            $scope.promoMessage = "Loading ...";

            $scope.promotion = menuFactory.getPromotions().get({id: 0})
                                .$promise.then(
                                    function(response) {
                                        $scope.promotion = response;
                                        $scope.showPromotion = true;
                                    },
                                    function(response) {
                                        $scope.promoMessage = "Error: " + response.status + " " + response.statusText;
                                    }
                                    );


            $scope.showChef = false;
            $scope.chefMessage = "Loading ...";

            $scope.chef = corporateFactory.getLeaders().get({id: 3})
                            .$promise.then(
                                function(response) {
                                    $scope.chef = response;
                                    $scope.showChef = true;
                                },
                                function(response) {
                                    $scope.chefMessage = "Error: " + response.status + " " + response.statusText;
                                }
                                );

            
            $scope.showDish = false;
            $scope.message = "Loading ...";

            $scope.feature = menuFactory.getDishes().get({id:0})
                                .$promise.then(
                                    function(response) {
                                        $scope.feature = response;
                                        $scope.showDish = true;
                                    },
                                    function(response) {
                                        $scope.message = "Error: " + response.status + " " + response.statusText;
                                    }
                                    );



        }])



;
