(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Modal = require('../src/modal');
var modal;

var mainContainer = document.getElementById('main');
var modalContainer = document.getElementById('modal');

var primaryButton = modalContainer.querySelector('.js-button-primary');
var secondaryButton = modalContainer.querySelector('.js-button-secondary');
var closeButton = modalContainer.querySelector('.js-button-close');

var showButton = document.getElementById('show-modal');

// var primaryFunction;
// var secondaryFunction;

modal = new Modal({
  mainContainer: mainContainer,
  modalContainer: modalContainer,
  primaryButton: primaryButton,
  secondaryButton: secondaryButton,
  closeButton: closeButton
});

modal.init();


showButton.addEventListener('click', modal.show.bind(modal));

},{"../src/modal":2}],2:[function(require,module,exports){
'use strict';

function Modal(config) {
  /* containers */
  this.mainContainer = config.mainContainer;
  this.modalContainer = config.modalContainer;
  /* buttons */
  this.primaryButton = config.primaryButton;
  this.secondaryButton = config.secondaryButton;
  this.closeButton = config.closeButton;
  /* functions */
  this.primaryFunction = config.primaryFunction;
  this.secondaryFunction = config.secondaryFunction;
}

Modal.prototype.show = function() {
  this.modalContainer.classList.remove('hide');
  this.modalContainer.setAttribute('aria-hidden', 'false');

  this.mainContainer.setAttribute('aria-hidden', 'true');
};

Modal.prototype.hide = function() {
  this.modalContainer.classList.add('hide');
  this.modalContainer.setAttribute('aria-hidden', 'true');

  this.mainContainer.setAttribute('aria-hidden', 'false');
};

Modal.prototype.init = function() {
  var self = this;
  var primaryFunction = this.primaryFunction;
  var secondaryFunction = this.secondaryFunction;

  var primaryButton = this.primaryButton;
  var secondaryButton = this.secondaryButton;
  var closeButton = this.closeButton;

  if (!primaryFunction && typeof primaryFunction !== 'function') {
    primaryFunction = this.primaryFunction = this.hide;
  }

  if (!secondaryFunction && typeof secondaryFunction !== 'function') {
    secondaryFunction = this.secondaryFunction = this.hide;
  }

  if (primaryButton) {
    primaryButton.addEventListener('click', primaryFunction);
  }

  if (secondaryButton) {
    secondaryButton.addEventListener('click', secondaryFunction);
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      self.hide();
    });
  }

};

module.exports = Modal;

},{}]},{},[1]);
