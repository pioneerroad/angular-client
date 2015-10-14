(function () {
    var app = angular.module('pioneerRoad.Profile');

    app.controller('editProfileController', ['$scope', '$rootScope', '$localStorage', 'loginRedirect', '$location', 'editProfileService', 'viewProfileService', '$sce', function ($scope, $rootScope, $localStorage, loginRedirect, $location, editProfileService, viewProfileService, $sce) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            $rootScope.Title = $sce.trustAsHtml("Edit Profile");
            $rootScope.Link = $sce.trustAsHtml("");
            //stuff for spinning animation 
            var opts = {
                lines: 13 // The number of lines to draw
                , length: 20 // The length of each line
                , width: 13 // The line thickness
                , radius: 42 // The radius of the inner circle
                , scale: 1 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.25 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 60 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '35%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            };
            
            var intialImageLoadP = true; //stops the onloaded image for the intial images
            var intialImageLoadB = true;
            $scope.tmpNickName = "";
            $scope.chosenHomeTown = ""; //the data that is used to set/update the home town on server
            $scope.homeTownSuggestions = [];
            $scope.nickname = "";
            $scope.hometown = "";
            $scope.bio = "";
            $scope.maxChar = 150; //max number of chars in input
            $scope.charsLeft = $scope.maxChar; //number of chars left in bio

            var profileTarget = document.getElementById('editProfilePhoto'); //a position of releative needs to be applied to divs using spinners
            var backgroundTarget = document.getElementById('editBackgroundPhoto');

            var spinner = new Spinner(opts);
            var spinner2 = new Spinner(opts);

            //update the nick name
            $scope.updateNickName = function () {
                if ($('#editnick').attr("disabled")) {
                    $('#editnick').attr("disabled", false);
                    $('#nick').addClass('hidden');
                    $('#nikGly').removeClass("glyphicon-pencil");
                    $('#nikGly').addClass("glyphicon-floppy-disk");
                    //remove the saved icon
                    return;
                }
                else {
                    $('#nikGly').addClass("glyphicon-pencil");
                    $('#nikGly').removeClass("glyphicon-floppy-disk");
                    $('#editnick').attr("disabled", true);
                    if ($scope.nickname === "") {
                        return;
                    }

                }
                editProfileService.changeNickName($scope.nickname)
                        .success(function (response) {
                            console.log("Nick Name changed");
                            tearDown();
                            $scope.tmpNickName = $scope.nickname;
                            $('#nick').removeClass('hidden');
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            //get all the suggestions 
            $scope.getHomeTownSug = function () {
                if ($scope.hometown.length > 2) {
                    //send current $scope.hometown to /town/select/:input
                    editProfileService.getHomeTownSuggestions($scope.hometown)
                            .success(function (response) {
                                $scope.homeTownSuggestions = response;
                                if ($scope.homeTownSuggestions.length === 0) {
                                    return;
                                }
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                }
                else
                    $scope.homeTownSuggestions = [];
            };

            //called when user clicks a suggestion
            $scope.chosenTown = function (town) {
                $scope.hometown = town.label; //set the view hometown to the click town
                $scope.chosenHomeTown = town;
                $scope.getHomeTownSug(); // forces update of suggestions
            };

            //updates home town to server
            $scope.updateHomeTown = function () {

                // $scope.chosenHomeTown.label = $scope.hometown;
                if ($('#editHometownInput').attr("disabled")) {
                    $('#editHometownInput').attr("disabled", false);
                    $('#home').addClass('hidden');
                    $('#homeoGly').removeClass("glyphicon-pencil");
                    $('#homeGly').addClass("glyphicon-floppy-disk");
                    return;
                }
                else {
                    $('#editHometownInput').attr("disabled", true);
                    $('#homeGly').addClass("glyphicon-pencil");
                    $('#homeGly').removeClass("glyphicon-floppy-disk");
                    if ($scope.hometown === "") {
                        return;
                    }
                }
                $scope.getHomeTownSug(); //now there should only be one entry in $scope.homeTownSuggestions
                if ($scope.homeTownSuggestions.length === 0) {
                    return;
                }

                editProfileService.setHomeTown($scope.chosenHomeTown.id)
                        .success(function (response) {
                            $('#home').removeClass('hidden');
                            tearDown();
                            $scope.homeTownSuggestions = [];
                        })
                        .error(function (error) {
                            console.log(error);
                            tearDown();
                        });
            };

            var getCurrentProfile = function () { //get the users profile

                viewProfileService.getData()
                        .success(function (response) {
                            if (response) {
                                $scope.profile = response;
                                $scope.tmpNickName = $scope.profile.nickName;
                                setImages($scope.profile);
                                $('#editBackgroundPhoto').cropit('imageSrc', $scope.background);
                                $('#editProfilePhoto').cropit('imageSrc', $scope.profilepic);

                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            var setEditProfileView = function () {
                getCurrentProfile();
            };

            var setImages = function (data) {

                if (data.profileBackgroundPhoto === null) {

                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/bg-default-img.svg";
                }
                else {
                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + $localStorage.token.id + "/background-photo/" + data.profileBackgroundPhoto.medium;
                }

                if (data.profilePhoto === null) {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                }
                else {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + $localStorage.token.id + "/profile-photo/" + data.profilePhoto.large;
                }
            };

            $scope.updateBio = function () {
                if ($('#editBioInput').attr("disabled")) {
                    $('#editBioInput').attr("disabled", false);
                    $('#bioSaved').addClass('hidden');
                    $('#bioGly').removeClass("glyphicon-pencil");
                    $('#bioGly').addClass("glyphicon-floppy-disk");
                    return; //editing not saving
                }
                else {
                    $('#editBioInput').attr("disabled", true);
                    $('#bioGly').addClass("glyphicon-pencil");
                    $('#bioGly').removeClass("glyphicon-floppy-disk");
                    if ($scope.bio === "") {
                        return;
                    }
                }

                editProfileService.setBio($scope.bio)
                        .success(function (response) {
                            $('#bioSaved').removeClass('hidden');
                            tearDown();
                        })
                        .error(function (error) {
                            console.log(error);
                            tearDown();
                        });

            };

            $scope.getBio = function () {
                $scope.charsLeft = $scope.maxChar - $scope.bio.length;
            };


            //reset all input fields 
            var tearDown = function () {
                $scope.homeTownSuggestions = null;
                $scope.chosenHomeTown = "";
                $scope.hometown = "";
                $scope.nickname = "";
                $scope.charsLeft = $scope.maxChar;
                $scope.bio = "";
                setEditProfileView();
            };

            setSave = function (id) {
                $(id).removeClass('disabled');
            };

            ImageError = function (id) {
                if (id === "#profilePhoto") {
                    $("#PPError").removeClass('hidden');
                }
                else {
                    $("#BGError").removeClass('hidden');
                }
            };


            $('#editProfilePhoto').cropit({AllowCrossOrigin: true, onImageLoaded: function () {
                    setSave('#profilePhoto');
                    spinner.stop();
                }, onImageError: function () {
                    ImageError('#profilePhoto');
                    spinner.stop();
                }
            });
            $('#editBackgroundPhoto').cropit({AllowCrossOrigin: true, onImageLoaded: function () {
                    setSave('#bgPhoto');
                    spinner2.stop();
                }, onImageError: function () {
                    ImageError('#bgPhoto');
                    spinner2.stop();
                }
            });


            $('.btn-file-input').click(function () {
                $(this).closest('.photo-edit-wrapper').children('.cropit-image-input').click();
                if (this.id === "pPhotoInput") {
                    $("#PPsaved").addClass('hidden');
                    $("#PPError").addClass('hidden');
                }
                else {
                    $("#BGPsaved").addClass('hidden');
                    $("#BGError").addClass('hidden');
                }

            });

            $('input[type=file]').change(function (evt) {
                var files = evt.target.files;
                if(files[0] === undefined){ //fixes issue when user closes file selctor without selecting file
                    return;             //and spinner is set to spin
                }
                if (this.id === "pFile") {
                    spinner.spin(profileTarget);
                }
                else if (this.id === "bgFile") {
                    spinner2.spin(backgroundTarget);
                }
            });
            
            $('input[type=file]').error(function () {
                console.log("stopped");
                
            });

            $('.btn-file-upload').click(function () {
                var imageData = $(this).closest('.field-edit-wrapper').cropit('export', {
                    type: 'image/jpeg',
                    quality: .9,
                    originalSize: true
                });
                var formData = new FormData();
                formData.append("imageFile", imageData);
                if (this.id === "profilePhoto") {
                    spinner.spin(profileTarget);
                    editProfileService.putProfilePic(imageData)
                            .success(function (response) {
                                $("#PPsaved").removeClass('hidden');
                                $("#profilePhoto").addClass('disabled');
                                spinner.stop();
                            })
                            .error(function (error) {
                                console.log(error);
                                spinner.stop();
                            });

                }
                else {
                    spinner2.spin(backgroundTarget);
                    editProfileService.putBackgroundPic(imageData)
                            .success(function (response) {
                                $("#BGPsaved").removeClass('hidden');
                                $("#bgPhoto").addClass('disabled');
                                spinner2.stop();
                            })
                            .error(function (error) {
                                console.log(error);
                                spinner2.stop();
                            });
                }

            });
            setEditProfileView();
        }]);
}());