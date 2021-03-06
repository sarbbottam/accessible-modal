'use strict';

describe('Modal', function() {
  var markup = '\
    <div id="main"> \
      <button id="to-be-focused" tabindex="-1">To be  focused</button> \
    </div> \
    <div id="modal" class="modal hide" aria-labelledby="modal-heading" aria-describedby="modal-description" role="dialog"> \
      <div class="modal-content v-a-m"> \
        <input id="button-close" class="button button-close js-button-close js-focusable" type="button" value="X" aria-label="close modal"> \
        <div id="modal-description"  class="clipped">Beginning of dialog window. It begins with a heading 1 called "Modal Heading". Escape will cancel and close the window.</div> \
        <div class="modal-header"> \
          <h1 id="modal-heading" class="text-lg">Modal Heading</h1> \
        </div> \
        <div class="modal-body"> \
          Modal description \
        </div> \
        <div class="row modal-footer"> \
          <div class="col col-1-2 p-e"> \
            <input type="button" class="button button-primary w-100 js-button-primary js-focusable" value="OK"> \
          </div> \
          <div class="col col-1-2 p-s"> \
            <input type="button" class="button button-secondary w-100 js-button-secondary js-focusable" value="Cancel"> \
          </div> \
        </div> \
      </div> \
    </div>';
  var Modal = require('../src/modal');
  var modal;
  var wrapper;
  var event = require('../polyfill/event');
  /* containers */
  var mainContainer;
  var modalContainer;
  var itemToBeFocusedOnModalDismissal;
  /* buttons */
  var primaryButton;
  var secondaryButton;
  var closeButton;

  var primaryFunction;
  var secondaryFunction;

  var focusableNodeList;

  before(function() {
    wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    document.body.appendChild(wrapper);
    /* containers */
    mainContainer = document.getElementById('main');
    modalContainer = document.getElementById('modal');
    itemToBeFocusedOnModalDismissal = document.getElementById('to-be-focused');
    /* buttons */
    primaryButton = modalContainer.querySelector('.js-button-primary');
    secondaryButton = modalContainer.querySelector('.js-button-secondary');
    closeButton = modalContainer.querySelector('.js-button-close');

    focusableNodeList = Array.prototype.slice.call(modalContainer.querySelectorAll('.js-focusable'));

    primaryFunction = function noop() {};
    secondaryFunction = function noop() {};
    modal = new Modal({
      mainContainer: mainContainer,
      modalContainer: modalContainer,
      primaryButton: primaryButton,
      secondaryButton: secondaryButton,
      closeButton: closeButton,
      primaryFunction: primaryFunction,
      secondaryFunction: secondaryFunction,
      itemToBeFocusedOnModalDismissal: itemToBeFocusedOnModalDismissal
    });

    modal.init();

  });

  it('should be a function', function() {
    assert.isFunction(Modal);
  });

  it('should return an object', function() {
    assert.isObject(modal);
  });

  describe('show/hide functionalities', function() {

    it('should show the modal when modal.show() is invoked', function() {
      modal.show();
      assert.isFalse(modalContainer.classList.contains('hide'));
      assert.equal(modalContainer.getAttribute('aria-hidden'), 'false');
      assert.equal(mainContainer.getAttribute('aria-hidden'), 'true');
    });

    it('should hide the modal when modal.hide() is invoked', function() {
      modal.hide();
      assert.isTrue(modalContainer.classList.contains('hide'));
      assert.equal(modalContainer.getAttribute('aria-hidden'), 'true');
      assert.equal(mainContainer.getAttribute('aria-hidden'), 'false');
    });

    it('should not hide the modal when any key other than esc key is pressed', function() {
      modal.show();
      event.triggerKeydownEvent(document.body, 8);
      assert.isFalse(modalContainer.classList.contains('hide'));
    });

    it('should hide the modal when esc key is pressed', function() {
      event.triggerKeydownEvent(document.body, 27);
      assert.isTrue(modalContainer.classList.contains('hide'));
    });

    it('should focus the itemToBeFocusedOnModalDismissal on modal dismisaal', function() {
      modal.show();
      event.triggerKeydownEvent(document.body, 27);
      assert.equal(document.activeElement, itemToBeFocusedOnModalDismissal);
    });

  });

  describe('primary button', function() {

    it('should invoke the primary function, when clicked', function(done) {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer,
        primaryButton: primaryButton,
        primaryFunction: function() {
          assert.isTrue(true);
          done();
        }
      });
      modal.init();
      event.triggerClickEvent(primaryButton);
    });

  });

  describe('secondary button', function() {

    it('should invoke the secondary function, when clicked', function(done) {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer,
        secondaryButton: secondaryButton,
        secondaryFunction: function() {
          assert.isTrue(true);
          done();
        }
      });
      modal.init();
      event.triggerClickEvent(secondaryButton);
    });

  });

  describe('close button', function() {

    it('should hide the modal, when clicked', function() {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer,
        closeButton: closeButton
      });
      modal.init();
      event.triggerClickEvent(closeButton);
      assert.isTrue(modalContainer.classList.contains('hide'));
      assert.equal(modalContainer.getAttribute('aria-hidden'), 'true');
      assert.equal(mainContainer.getAttribute('aria-hidden'), 'false');
    });

  });

  describe('tab navigation', function() {

    it('should focus only the nodes withing the modal', function() {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer,
        primaryButton: primaryButton,
        secondaryButton: secondaryButton,
        closeButton: closeButton,
        focusableNodeList: focusableNodeList
      });
      modal.init();
      modal.show();
      event.triggerKeydownEvent(modalContainer, 9);
      assert.equal(document.activeElement, closeButton);
      event.triggerKeydownEvent(modalContainer, 9);
      assert.equal(document.activeElement, primaryButton);
      event.triggerKeydownEvent(modalContainer, 9);
      assert.equal(document.activeElement, secondaryButton);
      event.triggerKeydownEvent(modalContainer, 9);
      assert.equal(document.activeElement, closeButton);
      event.triggerKeydownEvent(modalContainer, 9, true);
      assert.equal(document.activeElement, secondaryButton);
      event.triggerKeydownEvent(modalContainer, 9, true);
      assert.equal(document.activeElement, primaryButton);
    });

  });

});
