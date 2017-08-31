/*
* Build a path for redirection.
*
* - Adds a timestamp GET param for cache busting
* - Inserts an ID attribute if necessary
*/
export const buildSuccessPath = (path, json) => {
  let timestamp = (new Date()).valueOf();
  if(path.indexOf('?') > -1){
    path += ('&t=' + timestamp);
  }
  else{
    path += ('?t=' + timestamp);
  }
  if(json && json.id){
    path = path.replace(':id', json.id);
  }
  return path;
};

/*
* Remote element
*/
export const removeElement = (element) => {
  element.parentElement.removeChild(element);
};

/*
* Create an error element
*/
export const createErrorParagraph = (text, base) => {
  let p = document.createElement('p');
  p.classList.add('form-error');
  p.classList.add(base ? 'form-error-base' : 'form-error-inline');
  p.innerText = text;
  return p;
};

/*
* Convert a query into an array of elements
*/
export const querySelectorArray = (parent, selector) => {
  let query = parent.querySelectorAll(selector);
  let array = Array.prototype.slice.call(query);
  return array;
};

/*
* Take a single error message and format it as if it were
* a json error coming from the server
*/
export const formatStringAsErrors = (errorString) => {
  return { base: { messages: [errorString] } };
};

/*
* Return true if the element is in view
*/
export const elementIsInView = (el) => {
  let rect = el.getBoundingClientRect();
  let w = window, d = document;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (w.innerHeight || d.documentElement.clientHeight) &&
    rect.right <= (w.innerWidth || d.documentElement.clientWidth)
  );
};
