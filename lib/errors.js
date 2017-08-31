import * as helpers from './helpers';

/*
* Remove inline error messages
*/
export const clearErrors = function(form) {
  helpers.querySelectorArray(form,
    '.form-error-inline, .form-error-base').forEach(helpers.removeElement);
};

/*
* Append error text to form input fields and scroll to the first error
*/
export const displayErrorsInline = function(form, json){
  if(typeof json === 'string') {
    json = helpers.formatStringAsErrors(json);
  }

  clearErrors(form);
  let errors = json.errors;

  for(let key in errors){
    let messages = errors[key];
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
export const displayErrorsAlert = function(json){
  if(typeof json === 'string') {
    json = helpers.formatStringAsErrors(json);
  }
  let text = 'Please correct the following errors:\n';
  let label, message, errors = json.errors;
  for(let key in errors){
    label = 'todo';
    message = errors[key][0];
    if(key === 'base'){
      text += ` - ${message}\n`;
    }
    else{
      text += ` - ${label} ${message}\n`;
    }
  }
  window.alert(text);
};
