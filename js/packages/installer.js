var Installer = function (root) {

    var install = function (e) {
      console.log('INSTALL LOG');
      console.log(e);
      logger.debug('installer actioned');
        if (global.get('promptEvent')) {
          logger.debug('prompt event');

            global.get('promptEvent').prompt();
            global.get('promptEvent').userChoice
                .then(function (choiceResult) {
                    // The user actioned the prompt (good or bad).
                    // good is handled in
                    global.set('promptEvent',null);
 //                   root.classList.remove('available');
                })
                .catch(function (installError) {
                    // Boo. update the UI.
                    console.log('Your browser does not support Installer UI');
                    global.set('promptEvent',null);
                    root.classList.remove('available');
                });
        } else {
          logger.debug('not asking for install');
        }
    };

    var installed = function (e) {
      console.log(e);
        logger.debug('app is already installed');
        global.set('promptEvent',null);
//         This fires after onbeforinstallprompt OR after manual add to homescreen.
        root.classList.remove('available');
    };

    var beforeinstallprompt = function (e) {
        root.style.display='block';
        logger.debug('registering installer event');
        global.set('promptEvent',e);
        global.get('promptEvent').preventDefault();
        root.classList.add('available');
        return true;
    };
    root.style.display='none';

    window.addEventListener('beforeinstallprompt', beforeinstallprompt,false);
    window.addEventListener('appinstalled', installed,false);

    root.addEventListener('click', install.bind(this));
    root.addEventListener('touchend', install.bind(this));
};
