import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './header.html';

Template.mainNav.helpers({
  username() {
    if (Meteor.user()) {
      const maxLength = 15;
      let email = Meteor.user().emails[0].address;
      if (email && email.length > maxLength) {
        email = `${email.substring(0, maxLength)}…`;
      }
      return email;
    }
    return 'Login';
  },
});

Template.mainNav.onCreated(function () {
  $(document).ready(() => {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true,
      onOpen(el) { },
      onClose(el) { },
    });
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      startingTop: '0',
    });
  });
});

Template.mainNav.events({
  'click #logoutButton'() {
    Meteor.logout(function() {
      FlowRouter.go('App.login');
    });
  },
  'click .contact-modal-button'() {
    $('#modalContact').modal('open');
  },  
  'click #changePasswordButton'() {
    FlowRouter.go('App.changePwd');
  },
  'click #closeMenuButton'() {
    $('.button-collapse').sideNav('hide');
  },
});
