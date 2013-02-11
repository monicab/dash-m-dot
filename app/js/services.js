"use strict";

angular.module('dashMDotServices', ['ngResource']).
    factory('Resume', function($resource){
        return $resource('api/data/resume.json', {}, {
            query: {method:'GET', isArray:true}
        });
    });
