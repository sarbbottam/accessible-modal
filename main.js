(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Modal = require('../src/modal');
var modal;

var mainContainer = document.getElementById('main');
var modalContainer = document.getElementById('modal');

var primaryButton = modalContainer.querySelector('.js-button-primary');
var secondaryButton = modalContainer.querySelector('.js-button-secondary');
var closeButton = modalContainer.querySelector('.js-button-close');
var focusableNodeList = Array.prototype.slice.call(modalContainer.querySelectorAll('.js-focusable'));

var showButton = document.getElementById('show-modal');

modal = new Modal({
  mainContainer: mainContainer,
  modalContainer: modalContainer,
  primaryButton: primaryButton,
  secondaryButton: secondaryButton,
  closeButton: closeButton,
  focusableNodeList: focusableNodeList,
  itemToBeFocusedOnModalDismissal: showButton
});

modal.init();

showButton.addEventListener('click', modal.show.bind(modal));

},{"../src/modal":2}],2:[function(require,module,exports){
'use strict';

function Modal(config) {
  var css;

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

  this.focusableNodeList = config.focusableNodeList || null;
  this.focusableIndex = -1;

  this.itemToBeFocusedOnModalDismissal = config.itemToBeFocusedOnModalDismissal;

  css = config.css;

  /* istanbul ignore next */
  this.css = {
    hide: css && css.hide ? css.hide : 'hide'
  };

}

function keydownHandler(e) {
  var focusableNodeList = this.focusableNodeList;
  var focusableIndex = this.focusableIndex;

  if (e.keyCode === 27) {
    this.hide();
    document.removeEventListener('keydown', this.keydownHandler);
  }

  if (focusableNodeList && e.keyCode === 9) {
    e.preventDefault();
    e.stopPropagation();
    if (e.shiftKey) {
      focusableIndex -= 1;
      if (focusableIndex < 0) {
        focusableIndex = focusableNodeList.length - 1;
      }
    } else {
      focusableIndex += 1;
      if (focusableIndex > focusableNodeList.length - 1) {
        focusableIndex = 0;
      }
    }
    focusableNodeList[focusableIndex].focus();
    this.focusableIndex = focusableIndex;
  }
}

Modal.prototype.show = function() {
  this.modalContainer.classList.remove(this.css.hide);
  this.modalContainer.setAttribute('aria-hidden', 'false');
  this.modalContainer.setAttribute('tabindex', '-1');

  this.mainContainer.setAttribute('aria-hidden', 'true');

  this.modalContainer.focus();

  document.addEventListener('keydown', this.keydownHandler);
};

Modal.prototype.hide = function() {
  this.modalContainer.classList.add(this.css.hide);
  this.modalContainer.setAttribute('aria-hidden', 'true');

  this.mainContainer.setAttribute('aria-hidden', 'false');
  if (this.itemToBeFocusedOnModalDismissal) {
    this.itemToBeFocusedOnModalDismissal.focus();
  }
};

Modal.prototype.init = function() {
  var hide = this.hide;
  var primaryFunction = this.primaryFunction;
  var secondaryFunction = this.secondaryFunction;

  var primaryButton = this.primaryButton;
  var secondaryButton = this.secondaryButton;
  var closeButton = this.closeButton;

  this.keydownHandler = keydownHandler.bind(this);

  if (!primaryFunction && typeof primaryFunction !== 'function') {
    primaryFunction = hide;
  }

  if (!secondaryFunction && typeof secondaryFunction !== 'function') {
    secondaryFunction = hide;
  }

  if (primaryButton) {
    primaryButton.addEventListener('click', primaryFunction.bind(this));
  }

  if (secondaryButton) {
    secondaryButton.addEventListener('click', secondaryFunction.bind(this));
  }

  if (closeButton) {
    closeButton.addEventListener('click', hide.bind(this));
  }

};

module.exports = Modal;

},{}]},{},[1]);
