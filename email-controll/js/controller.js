"use strict"

let model = {
        items: [
            {
                email: "krasnova@gmail.com",
                play: false,
                error: false,
                count: 0
            }
        ]
    },
    keyCodes = {
        comma: 188,
        slash: 191,
        enter: 13,
        ctrlPlusV: 17
    }
const myApp = angular.module("myApp", [])

myApp
    .directive('emailsEditor', function () {
        return {
            template:
                `<div class="emails-editor">
                <div class="box" ng-repeat="item in emailBox.items" ng-class="item.error==true ? 'error':''">
                    <span ng-bind="item.email"></span>
                    <input class="checkbox" type="checkbox" ng-model="item.play" />
                    <label for="checkbox" ng-click="deleteEmails(item)"></label>
                </div> 
                <input class="input" type="text" placeholder="add more people ..." ng-model="emailText" ng-keyup="keyUp()" ng-blur="inputBlur()"  />
            </div>`,
        }
    })
    .controller("jsController", ['$scope', function ($scope) {
        $scope.emailBox = model

        $scope.deleteEmails = text => {
            for (let i = 0; i < $scope.emailBox.items.length; i++) {
                if (text.email === $scope.emailBox.items[i].email)
                    $scope.emailBox.items.splice(i, 1)
            }
        }

        $scope.addEmails = (email = $scope.generateRandom(), error = false) => {
            $scope.emailBox.items.push({
                email,
                play: false,
                count: $scope.emailBox.items.length,
                error
            })
        }

        $scope.generateRandom = () => {
            let str = "",
                strRandom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

            for (let i = 0 ; i < 7; i++)
                str += strRandom.charAt(Math.floor(Math.random() * strRandom.length))

            return str + "@gmail.com"
        }

        $scope.keyUp = () => {
            let codeKey = event.keyCode

            if (codeKey === keyCodes.enter
                || codeKey === keyCodes.slash
                || codeKey === keyCodes.comma
                || codeKey === keyCodes.ctrlPlusV)
            {
                if (codeKey === keyCodes.comma || codeKey === keyCodes.slash) {
                    let emailStr = $scope.emailText
                    $scope.emailText = emailStr.substring(0, emailStr.length - 1)
                }
                $scope.checkEmail($scope.emailText)
            }
        }
        /*
        * Если текстовое поле теряет фокус вызываем функцию проверки емэйла на корректность
        * */
        $scope.inputBlur = () => {
            let text = $scope.emailText

            if (text !== "")
                $scope.checkEmail(text)
        }
        /*
        * Проверка емэйла на корректность ввода и дальнейшее добавление в массив
        * */
        $scope.checkEmail = email => {
            let check = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i,
                error = false

            if (!check.test(email) || email === "")
                error = true

            $scope.addEmails(email,error)

            $scope.emailText = ""
        }

        $scope.getEmailsCount = () => alert("Emails count " + $scope.emailBox.items.length)
    }])