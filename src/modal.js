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