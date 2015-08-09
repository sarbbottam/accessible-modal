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
  focusableNodeList: focusableNodeList
});

modal.init();

showButton.addEventListener('click', modal.show.bind(modal));
