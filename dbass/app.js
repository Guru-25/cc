var app = angular.module("myApp", []);

// Updated DataService
app.factory("DataService", function ($http) {
  return {
      saveData: function (data) {
          return $http.post("http://localhost:3000/api/save", data);
      },
      getData: function () {
          return $http.get("http://localhost:3000/api/retrieve");
      },
      updateData: function (id, data) {
          return $http.put(`http://localhost:3000/api/update/${id}`, data);
      },
      deleteData: function (id) {
          return $http.delete(`http://localhost:3000/api/delete/${id}`);
      }
  };
});

// Updated FormController
app.controller("FormController", function ($scope, DataService) {
  $scope.formData = {};
  $scope.retrievedData = [];
  $scope.searchQuery = "";
  $scope.editMode = false;
  $scope.editingItem = null;

  $scope.submitData = function () {
      if ($scope.editMode) {
          DataService.updateData($scope.editingItem._id, $scope.formData)
              .then(function () {
                  alert("Data updated!");
                  $scope.formData = {};
                  $scope.editMode = false;
                  $scope.editingItem = null;
                  $scope.retrieveData();
              })
              .catch(function (error) {
                  console.error("Error updating data:", error);
                  alert("Error updating data!");
              });
      } else {
          DataService.saveData($scope.formData)
              .then(function () {
                  alert("Data saved!");
                  $scope.formData = {};
                  $scope.retrieveData();
              })
              .catch(function (error) {
                  console.error("Error saving data:", error);
                  alert("Error saving data!");
              });
      }
  };

  $scope.editData = function (item) {
      $scope.editMode = true;
      $scope.editingItem = item;
      $scope.formData = {
        // here
          text: item.text,
          number: item.number,
          gender: item.select,
          medicalHistory: item.text,
          email: item.email
      };
  };

  $scope.cancelEdit = function () {
      $scope.editMode = false;
      $scope.editingItem = null;
      $scope.formData = {};
  };

  $scope.retrieveData = function () {
      DataService.getData()
          .then(function (response) {
              $scope.retrievedData = response.data;
          })
          .catch(function (error) {
              console.error("Error retrieving data:", error);
              alert("Error retrieving data!");
          });
  };

  $scope.deleteData = function (item) {
      if (confirm("Are you sure you want to delete this item?")) {
          DataService.deleteData(item._id)
              .then(function () {
                  alert("Data deleted!");
                  $scope.retrieveData();
              })
              .catch(function (error) {
                  console.error("Error deleting data:", error);
                  alert("Error deleting data!");
              });
      }
  };
});

