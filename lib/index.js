import Rails from 'rails-ujs';
import * as helpers from './helpers';

let Validator = {};
export default Validator;

/*
* Rails UJS Handlers
*
* These handlers are designed to work with the Rails UJS adapter.
* This applies to things like data-remote forms, data-method links, etc.
*
* See: https://www.npmjs.com/package/rails-ujs
*/
Validator.init = () => {
  Rails.delegate(document,
    'form', 'ajax:before',
    handlers.onRemoteFormBefore);
  Rails.delegate(document,
    'form[data-success], a[data-success]', 'ajax:success',
    handlers.onRemoteFormSuccess);
  Rails.delegate(document,
    'form[data-errors]', 'ajax:error',
    handlers.onRemoteFormErrors);
  if(!window._rails_loaded) {
    Rails.start();
  }
};

const handlers = {};

/*
* Tell the server we want a json response
*/
handlers.onRemoteFormBefore = (event) => {
  let form = event.target;
  if(form.getAttribute('data-type') === null){
    form.setAttribute('data-type', 'json');
  }
};

/*
* Called when a remote form is submitted with a data-success configured
* Redirects to the configured path, or reloads the page if "reload" is passed
*
* ie:
* <form action="..." data-remote="true" data-success="/path/for/success/:id">
*/
handlers.onRemoteFormSuccess = (event) => {
  let form = event.target;
  let successPath = form.getAttribute('data-success');
  if(successPath === 'reload'){
    window.location.reload(true);
  }
  else{
    let json = event.detail[0];
    window.location = helpers.buildSuccessPath(successPath, json);
  }
};

/*
* Called when a remote form is submitted and the server has returned an
* error, only if the form has a data-errors attribute
*
* ie:
* <form action="..." data-remote="true" data-errors="inline">
*   - OR -
* <form action="..." data-remote="true" data-errors="alert">
*/
handlers.onRemoteFormErrors = (event) => {
  let json = event.detail[0];
  let xhr = event.detail[2];
  let form = event.target;
  let errorType = form.getAttribute('data-errors');

  if(xhr.status === 422){
    if(errorType === 'inline'){
      Validator.displayErrorsInline(form, json);
    }
    else{
      Validator.displayErrorsAlert(json);
    }
  }
  else if(xhr.status === 401 || xhr.status === 403){
    window.alert('Error: Access denied.');
  }
  else if(json.location) {
    window.location = json.location;
  }
  else{
    let errorThrown = event.detail[1];
    window.alert('An unexpected error occurred: ' + errorThrown);
  }
};

/*
* Remove inline error messages
*/
Validator.clearErrors = function(form) {
  helpers.querySelectorArray(form,
    '.form-error-inline, .form-error-base').forEach(helpers.removeElement);
};

/*
* Append error text to form input fields and scroll to the first error
*/
Validator.displayErrorsInline = function(form, errors){
  if(typeof errors === 'string') {
    errors = helpers.formatStringAsErrors(errors);
  }

  Validator.clearErrors(form);

  for(let key in errors){
    let messages = errors[key].messages;
    if(key === 'base'){
      for(let i=0; i<messages.length; i++){
        let p = helpers.createErrorParagraph(messages[i], true);
        form.insertBefore(p, form.firstChild);
      }
    }
    else{
      let input, keyArr;
      keyArr = key.split('.');

      if(keyArr.length === 2){
        keyArr[0] += '_attributes';
        input = form.querySelector(`[name$='[${keyArr.join('][')}]']`);
      }
      else{
        let array = helpers.querySelectorArray(form, `[name$='[${key}]']`);
        input = array.filter(function(input){
          // Filter out nested attribute inputs ie model[a][b]
          return !input.name.match(/\]\[/);
        })[0];
        if(input === null && !key.match(/_id$/)){
          input = form.querySelector(`[name$='[${key}_id]']`);
        }
      }

      let message = messages[0];
      if(input){
        input.parentNode.appendChild(helpers.createErrorParagraph(message));
      }
      else{
        // eslint-disable-next-line no-console
        console.warn('Missing input field for key:', key);
        form.insertBefore(
          helpers.createErrorParagraph(key+' '+message), form.firstChild
        );
      }
    }
  }

  let firstError = form.querySelector('.form-error-inline, .form-error-base');
  if(firstError &&
    !helpers.elementIsInView(firstError) &&
    typeof(firstError.scrollIntoView) === 'function'){
    firstError.parentElement.scrollIntoView();
  }
};

/*
* Display errors in a standard window.alert dialog
*/
Validator.displayErrorsAlert = function(errors){
  if(typeof errors === 'string') {
    errors = helpers.formatStringAsErrors(errors);
  }
  let text = 'Please correct the following errors:\n';
  let label, message;
  for(let key in errors){
    label = errors[key].label;
    message = errors[key].messages[0];
    if(key === 'base'){
      text += ` - ${message}\n`;
    }
    else{
      text += ` - ${label} ${message}\n`;
    }
  }
  window.alert(text);
};
