"use strict";

angular.module('dashMDot', ['dashMDotServices']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: '/app/partials/home.html', controller: HomeCtrl}).
            when('/resume', {templateUrl: '/app/partials/resume.html', controller: ResumeCtrl}).
            when('/coffee', {templateUrl: '/app/partials/coffee.html', controller: CoffeeCtrl}).
            when('/technical', {templateUrl: '/app/partials/technical.html', controller: TechnicalCtrl}).
            otherwise({redirectTo: '/home'});
    }]).
    config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });