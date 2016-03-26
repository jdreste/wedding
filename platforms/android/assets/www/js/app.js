var app = angular.module('wedding-app', ['onsen']);

app.factory('shareDataFactory', function() {
             var savedData = {};
             function set(data) {
               savedData = data;
             }
             function get() {
              return savedData;
             }

             return {
              set: set,
              get: get
             }

            });