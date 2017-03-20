;
(function(window, undefined){
    'use strict';
    function WorkTabClass() {


        this.currentTab = () => {

        };
        this.setActiveTab = (num) => {

        };
        this.queueTabs = () => {

        };
        this.onTabActivated = () => {

        };
    }

    function saveTab(arr){
        var currentTab = sessionStorage.getItem('currentTab'),
            newMaxVal = Math.max.apply(null, arr) + 1;
        if(currentTab == undefined || currentTab == null){
            sessionStorage.setItem('currentTab', newMaxVal);
        }else{
            arr.forEach(function(elem, i){  //check
                if(parseInt(elem) == parseInt(currentTab)){
                    sessionStorage.setItem('currentTab', newMaxVal);
                    currentTab = newMaxVal;
                    return false;
                }
            });
        }
        arr.push(parseInt(currentTab));
        localStorage.setItem('arrIdInsets', JSON.stringify(arr));
        if(localStorage.getItem('activeTab') == 'null'){
            localStorage.setItem('activeTab', currentTab);
        }
    }

    function queuingAndBehaviorTabs(){ // queuing and behavior tabs after load page
        var arrIdInsets = JSON.parse(localStorage.getItem('arrIdInsets')),
            arrCondition = !('arrIdInsets' in localStorage) || ( arrIdInsets == null) || ( arrIdInsets.length == 0);
        if(arrCondition){
            arrIdInsets = [0];
            localStorage.setItem('arrIdInsets', JSON.stringify(arrIdInsets));
            localStorage.setItem('activeTab', 0);
            sessionStorage.setItem('currentTab', 0);
        }else{
            saveTab(arrIdInsets);
        }
    }

    function storageEventHandler(e) { //communication events between browser tabs

        if((e.key == 'activeTab') && (localStorage.getItem('activeTab') == sessionStorage.getItem('currentTab'))){
            console.log('queue tabs: ' + localStorage.getItem('arrIdInsets'));
        }else if(e.key == 'activeTab'){

        }
    }

    var synchTabs = () => {
        window.addEventListener('storage', storageEventHandler);
        queuingAndBehaviorTabs();
        var thisTab = new WorkTabClass();
        return true;
    };
    window.synchTabs = synchTabs;

})(window);
