import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { SuccessPage } from './pages/success/success.page';
import { FailedPage } from './pages/failed/failed.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private navController :NavController,
    private router: Router,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDeeplinks();
    });
  }
  setupDeeplinks() {
    // this.deeplinks.route({
    //   '/success': 'success',
    //   '/failed': 'failed',
    // }).subscribe(match => {
    //   // match.$route - the route we matched, which is the matched entry from the arguments to route()
    //   // match.$args - the args passed in the link
    //   // match.$link - the full link data
    //   console.log('Successfully matched route', match.$route);
    // }, nomatch => {
    //   // nomatch.$link - the full link data
    //   console.error('Got a deeplink that didn\'t match', nomatch);
    // });
    this.deeplinks.routeWithNavController(this.navController, {
      '/success': 'success',
      '/failed': 'failed'
    }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        this.navController.navigateForward(match.$route)
        console.log('Successfully matched route', match.$route,match.$link);
      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
  }
}
