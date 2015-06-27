'use strict';

describe('Modal', function() {
  var markup = '\
    <div id="main"></div> \
    <div id="modal" class="modal hide" aria-labelledby="modal-heading" aria-describedby="modal-description" role="dialog"> \
      <div class="modal-content v-a-m"> \
        <input id="button-close" class="button button-close js-button-close" type="button" value="X" aria-label="close modal"> \
        <div id="modal-description"  class="clipped">Beginning of dialog window. It begins with a heading 1 called "Modal Heading". Escape will cancel and close the window.</div> \
        <div class="modal-header"> \
          <h1 id="modal-heading" class="text-lg">Modal Heading</h1> \
        </div> \
        <div class="modal-body"> \
          Modal description \
        </div> \
        <div class="row modal-footer"> \
          <div class="col col-1-2 p-e"> \
            <input type="button" class="button button-primary w-100 js-button-primary" value="OK"> \
          </div> \
          <div class="col col-1-2 p-s"> \
            <input type="button" class="button button-secondary w-100 js-button-secondary" value="Cancel"> \
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
  /* buttons */
  var primaryButton;
  var secondaryButton;
  var closeButton;

  var primaryFunction;
  var secondaryFunction;

  before(function() {
    wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    document.body.appendChild(wrapper);
    /* containers */
    mainContainer = document.getElementById('main');
    modalContainer = document.getElementById('modal');
    /* buttons */
    primaryButton = modalContainer.querySelector('.js-button-primary');
    secondaryButton = modalContainer.querySelector('.js-button-secondary');
    closeButton = modalContainer.querySelector('.js-button-close');
  });

  beforeEach(function() {
    primaryFunction = function noop() {};
    secondaryFunction = function noop() {};
    modal = new Modal({
      mainContainer: mainContainer,
      modalContainer: modalContainer,
      primaryButton: primaryButton,
      secondaryButton: secondaryButton,
      closeButton: closeButton,
      primaryFunction: primaryFunction,
      secondaryFunction: secondaryFunction
    });
  });

  it('should be a function', function() {
    assert.isFunction(Modal);
  });

  it('should return an object', function() {
    assert.isObject(modal);
  });

  describe('init', function() {

    it('should attach listeners to the buttons when buttons are available', function() {
      modal.init();
    });

    it('should not attempt to attach listeners if buttons are not available', function() {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer,
        primaryFunction: primaryFunction,
        secondaryFunction: secondaryFunction
      });
      modal.init();
    });

    it('should default to hide function when no functions are passed', function() {
      modal = new Modal({
        mainContainer: mainContainer,
        modalContainer: modalContainer
      });
      modal.init();
    });

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
      event.triggerKeydownEvent(document.body, 8);
    });

    it('should hide the modal when esc key is pressed', function() {
      event.triggerKeydownEvent(document.body, 27);
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

});
