'use strict';
Import('installer');
Package('org.quickcorp.custom.controllers', [
  Class('GridProductsController',Controller,{
    dependencies:[],
    component:null,
    defaulController:null,
    _new_:function (o){
      this.defaulController = New(DataGridController,o);
    },
    done:function (){
      this.defaulController.addSubcomponents();
    }
  }),
  Class('BlogController',Controller,{
    dependencies:[],
    component:null,
    _new_:function (o){
      var controller=this;
      //TODO: Implement
      logger.debug('BlogController INIT');
    },
    addSubcomponents:function (){
      var controller = this;
      controller.component.subcomponents = [];
      controller.component.body.innerHTML = '';
      console.log(controller.component.data);
      try {
        var subcomponentClass = controller.component.body.getAttribute('subcomponentClass');
        if (subcomponentClass != null){
          controller.component.data.map(
            function (record,dataIndex){
                try {
                  var subcomponent = New(ClassFactory(subcomponentClass),{
                    data:record,
                    templateURI:ComponentURI({
                      'COMPONENTS_BASE_PATH':CONFIG.get('componentsBasePath'),
                      'COMPONENT_NAME':ClassFactory(subcomponentClass).name,
                      'TPLEXTENSION':CONFIG.get('tplextension'),
                      'TPL_SOURCE':'default' //here is always default in order to get the right uri
                    }),
                    body:document.createElement('component'),
                    done: function (){
                      this.runComponentHelpers();
                    }
                  });
                  try {
                    if (subcomponent){
                      subcomponent.data.__dataIndex = dataIndex;
                      if (controller.component.data.hasOwnProperty('length')){
                        subcomponent.data.__dataLength = controller.component.data.length;
                      }
                      logger.debug('adding subcomponent to body');
                      controller.component.body.append(subcomponent.body);
                      try {
                        controller.component.subcomponents.push(subcomponent);
                      }catch (e){
                        logger.debug('ERROR LOADING SUBCOMPONENT IN DATAGRID');
                      }
                    } else {
                      logger.debug('ERROR LOADING SUBCOMPONENT IN DATAGRID');
                    }
                  }catch (e){
                    logger.debug('ERROR LOADING SUBCOMPONENT IN DATAGRID');
                  }

                } catch (e) {
                  logger.debug('ERROR LOADING SUBCOMPONENT IN DATAGRID');
                }
            }
          );
        } else {
          logger.debug('NO SUBCOMPONENT CLASS IN COMPONENT');
        }

      } catch (e){
        logger.debug('No data for component');
      }
    },
    done:function (){
      var controller = this;
      var componentInstance = controller.component;
      logger.debug('DataGridController DONE');
      var serviceClass = controller.component.serviceClass;
      if (serviceClass != null){
        var service = serviceLoader(New(ClassFactory(serviceClass),{
            data:componentInstance.serviceData
        })).then(function
          (successfulResponse){
            // This will show the service response as a plain text
            console.log(successfulResponse.service.template);
            var doc = (new DOMParser()).parseFromString(successfulResponse.service.template,'text/xml');
            var items = doc.querySelectorAll('entry');
            componentInstance.data = [];
            for (var i=0;i<items.length;i++){
              componentInstance.data.push({
                'id':items[i].getElementsByTagName('id')[0].innerHTML,
                'title':items[i].getElementsByTagName('title')[0].innerHTML,
                'author':items[i].getElementsByTagName('author')[0].innerHTML,
                'description':items[i].getElementsByTagName('summary')[0].textContent,
                'url':items[i].getElementsByTagName('link')[0].getAttribute('href')
              });
            };
            controller.addSubcomponents.call(controller);

          },
          (failedResponse)=>{
            console.log(failedResponse);
          }).catch ((e)=>{
            console.log(e);
            logger.debug('Something went wrong when calling the service from: '+serviceClass);
          });

      }

    }
  }),
  Class('MainController', Controller, {
    dependencies: [],
    component: null,
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      //TODO: Implement
    },
    done: function() {
      var controller = this;

      //Segment stats
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load("A1XJfy725LtnzUuPYLBobLUujaUXgxl7");
      analytics.page();
      }}();
      // End segment stats


    }
  }),
  Class('PWAController', Object, {
    component: null,
    _new_: function(o) {
      logger.debug('PWAController Element Initialized');
      this.component = o.component;
    },
    done: function() {
      document.head.innerHTML += this.component.body.innerHTML;
      this.component.body.innerHTML = "";
    }
  }),
  Class('SideNavController', Object, {
    dependencies: [],
    component: null,
    visibility: false,
    effect: null,
    open: function() {
      this.component.i18n_translate();
      if (this.effect != null) {
        this.effect.apply(this.component.body, 0, 1);
      }
      this.component.body.style.width = "100%";
      this.component.body.style.overflowX = "visible";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'none';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'block';
      this.visibility = true;
      return this.visibility;
    },
    close: function() {
      if (this.effect != null) {
        this.effect.apply(this.component.body, 1, 0);
      }
      this.component.body.style.width = "0px";
      this.component.body.style.overflowX = "hidden";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'block';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'none';
      this.visibility = false;
      return this.visibility;
    },
    toggle: function() {
      if (this.visibility) {
        this.close();
      } else {
        this.open();
      }
    },
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      global._sdk_.then(function() {
        controller.effect = New(Fade, {
          duration: 300
        });
      });
      global.sideNavController = this;
      global.sideNavController.close();
      //TODO: Implement

    },
    done: function() {}
  }),
  Class('HeaderController', Controller, {
    dependencies: [],
    component: null,
    installer: null,
    loadInstallerButton: function() {
      this.installer = Installer(this.component.body.subelements('#installerbutton')[0]);
    },
    _new_: function(o) {
      this.__new__(o);
      //TODO: Implement
    },
    done: function() {
      this.loadInstallerButton();

			var component = this.component;

    }
  }),
  Class('AskForQuoteButtonController',Controller,{
    dependencies:[],
    component:null,
    clickHandler:function (){
      location.href='/#signup';
    },
    done: function (){
      var controller = this;
      this.component.i18n_translate();
      this.component.body.addEventListener('click',function (){
        controller.clickHandler.call(controller);
      });
    }
  }),
  Class('Controller1', Controller, {
    dependencies: [],
    component: null,
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      //TODO: Implement
    }
  }),
  Class('Controller2', Controller, {
    dependencies: [],
    component: null,
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      //TODO: Implement
    }
  }),
  Class('SignupFormController',Controller,{
    serviceClass: 'QuickCorpCloud',
    formSettings:{
      backRouting:'#',
      loadingRouting:'#loading',
      nextRouting:'#signupsuccessful'
    },
    defaulController:null,
    _new_:function (o){
      o.serviceClass = this.serviceClass;
      o.formSettings = this.formSettings;
      this.defaulController = New(FormController,o);
    },
    done: function (){
      logger.debugEnabled=true;
      var controller = this.defaulController;
      try {
        logger.debug('Trying to execute DONE SignupFormController');
        setTimeout(()=>{
          Tag('.submit').map((element)=>{
            logger.debug('click in submit');
            element.addEventListener((controller.isTouchable())?('touchstart'):('click'),function (e){
              controller.formSaveTouchHandler();
            },{passive:true});
          });
        },3000);
        controller.done.call(controller);
      }catch (e){
        logger.debug('Unable to execute default behavior');
      }
    }
  })
]);
