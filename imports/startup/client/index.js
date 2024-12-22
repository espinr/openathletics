import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

// Layouts
import '../../ui/layouts/main-layout/main-layout.js';
import '../../ui/pages/error/error.js';
import '../../ui/pages/not-found/not-found.js';


// Components
import '../../ui/components/opentrack/opentrack';
import '../../ui/components/header/opentrack-header/opentrack-header';
import '../../ui/components/opentrack/categories/categories';
import '../../ui/components/opentrack/clubs/clubs';
import '../../ui/components/opentrack/countries/countries';
import '../../ui/components/opentrack/competitionFeatures/competitionFeatures';
import '../../ui/components/opentrack/federations/federations';
import '../../ui/components/opentrack/athletes/athletes';
import '../../ui/components/opentrack/races/races';
import '../../ui/components/opentrack/disciplines/disciplines';


Template.registerHelper('escapeHTML', (text) => {
    if (text) {
      return new Spacebars.SafeString(text);
    }
    return '';
  });

  

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action(params, queryParams) {
    FlowRouter.render('appMainLayout', { main: 'opentrackMenu', nav: 'opentrackMainHeader' });
  },
});

FlowRouter.notFound = {
  action() {
    this.render('App_body', 'App_notFound');
  },
};