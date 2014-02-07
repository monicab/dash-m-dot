"use strict";

function NavBarCtrl($scope, $location) {

    $scope.navigation = [
        {
            "name": "Home",
            "state": "active",
            "type": "listItem",
            "url": "#/home"
        },
        {
            "name": "Resume",
            "state": "",
            "type": "listItem",
            "url": "#/resume"
        },
        {
            "name": "Projects",
            "state": "",
            "type": "menu",
            "items": [
                {
                    "type": "header",
                    "name": "Random notes",
                    "state": ""
                },
                {
                    "type": "item",
                    "name": "HTML, CSS, Javascript",
                    "url": "#/technical",
                    "state": ""
                }
            ]
        }
    ];

    setTimeout(function(){
        var sectionUrl = "#" + $location.path();
        $scope.setActiveSectionByUrl(sectionUrl);
    }, 1);

    $scope.setActiveSectionByUrl = function(sectionUrl){
        var item;
        for (var i = 0, len = $scope.navigation.length; i < len; i++) {
            item = $scope.navigation[i];
            if (item.url === sectionUrl) {
                item.state = "active";
            }
            else {
                item.state = "";
            }
        }
    };

    $scope.$on('changeView', function(event, params) {
        $scope.setActiveSectionByUrl(params);
    });
}

function HomeCtrl ($scope) {
    $scope.onChangeView = function(view) {
        var changeViewEvent = 'changeView';
        var changeViewArgs = view;
        var $documentScope = angular.element(document).scope();
        $documentScope.$broadcast(changeViewEvent, changeViewArgs);
    }
}

function ResumeCtrl ($scope, Resume) {
    $scope.jobs = Resume.query(function(){
        setTimeout(function() {
            $("body").scrollspy({
                "target":'#resumeNavBar'
            });
        }, 1000);
    });

    $scope.education = [
        {
            id: "university",
            title: "Computer Science",
            longTitle: "Bachelor, Computer Science",
            institution: "Instituto Superior Tecnico",
            institutionUrl: "http://www.ist.utl.pt/en/",
            duration: "1994 - 1999",
            location: "Lisbon, Portugal",
            responsibilities:[
                {description:"5 year degree."}
            ]
        },
        {
            id: "pm",
            title: "Project Management",
            longTitle: "Project Management",
            institution: "UC Berkeley Extension",
            institutionUrl: "http://extension.berkeley.edu/",
            duration: "2008 - 2009",
            location: "San Francisco",
            responsibilities:[
                {description:"Completed project management Berkeley certification."},
                {description:"Classes taken: Project Management, Contract Management, Quality Management, Planning and Control, Team Dynamics and Human Factors and Risk Management."}
            ]
        },
        {
            id: "online",
            title: "Online Classes",
            longTitle: "Online Classes",
            institution: "World Wide Web",
            duration: "On Going",
            location: "From home",
            responsibilities:[
                {
                    title: "Introduction to AI",
                    titleUrl: "https://www.ai-class.com/",
                    description:"Experimental class given by Stanford professor <a href=\"http://en.wikipedia.org/wiki/Sebastian_Thrun\">Sebastian Thrun</a> and Director of Research at Google <a href=\"http://en.wikipedia.org/wiki/Peter_Norvig\">Peter Norvig</a>.<br>I decided to take this class, because I used Peter Norvig's book <a href=\"http://en.wikipedia.org/wiki/Artificial_Intelligence:_A_Modern_Approach\">Artificial Intelligence: A Modern Approach</a> in my AI class back in the day. Click <a href=\"http://www.nytimes.com/2011/08/16/science/16stanford.html?_r=0\">here</a> to read the NY Times article about this class."
                },
                {
                    title: "Web Development",
                    titleUrl: "http://www.udacity.com/overview/Course/cs253/CourseRev/apr2012/",
                    description:"Class taught by <a href=\"http://en.wikipedia.org/wiki/Steve_Huffman\">Steve Huffman</a> (founder of Reddit and Hipmunk). <br>Fun class that reviews the basic concepts of web development. It was particularly interesting to hear some of Steve's stories about Reddit."
                }
            ]
        }

    ];

    $scope.scrollTo = function(id) {
        //prevents adding the a href to be propagated
        event.preventDefault();
        //using jquery to do this. Still need to research how to do it using angularJS with
        //$location.hash(id);
        //$anchorScroll();
        var section = $("section[id='"+ id +"']");
        $('html,body').animate({scrollTop: section.offset().top},'slow');
    };
}

function CoffeeCtrl ($scope, $http) {
    $http.get("/api/data/coffee.json").success(function(data){
        $scope.favoriteSpots = data["favoriteSpots"];
        $scope.favoriteDetails = data["favoriteDetails"];
    });

}

function TechnicalCtrl($scope) {
    setTimeout(function() {
        $("body").scrollspy({
            "target":'#technicalNavBar'
        });
    }, 1000);

    $scope.scrollTo = function(id) {
        //prevents the a href to be propagated
        event.preventDefault();
        var section = $("section[id='"+ id +"']");
        $('html,body').animate({scrollTop: section.offset().top},'slow');
    };
}

