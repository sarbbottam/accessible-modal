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
  this.modalContainer.setAttribute('tabindex', '-1');

  this.mainContainer.setAttribute('aria-hidden', 'true');

  this.modalContainer.focus();

  function keydownHandler(e) {
    if (e.keyCode === 27) {
      document.removeEventListener('keydown', keydownHandler);
    }
  }
  document.addEventListener('keydown', keydownHandler.bind(this));
};

Modal.prototype.hide = function() {
  this.modalContainer.classList.add('hide');
  this.modalContainer.setAttribute('aria-hidden', 'true');

  this.mainContainer.setAttribute('aria-hidden', 'false');
};

Modal.prototype.init = function() {
  var hide = this.hide;
  var primaryFunction = this.primaryFunction;
  var secondaryFunction = this.secondaryFunction;

  var primaryButton = this.primaryButton;
  var secondaryButton = this.secondaryButton;
  var closeButton = this.closeButton;

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
