import * as errors from './errors';
import * as helpers from './helpers';

/*
* Tell the server we want a json response
*/
export const onRemoteFormBefore = (event) => {
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
export const onRemoteFormSuccess = (event) => {
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
export const onRemoteFormErrors = (event) => {
  let json = event.detail[0];
  let xhr = event.detail[2];
  let form = event.target;
  let errorType = form.getAttribute('data-errors');

  if(xhr.status === 422){
    if(errorType === 'inline'){
      errors.displayErrorsInline(form, json);
    }
    else{
      errors.displayErrorsAlert(json);
    }
  }
  else if(xhr.status === 401 || xhr.status === 403){
    window.alert('Error: Access denied.');
  }
  else{
    let errorThrown = event.detail[1];
    window.alert('An unexpected error occurred: ' + errorThrown);
  }
};
