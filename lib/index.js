import * as handlers from './handlers';

const MODULE_LOADED='_rails_validator_loaded';

const init = () => {
  window[MODULE_LOADED] = true;
  addListener('form',
    'ajax:before',
    handlers.onRemoteFormBefore);
  addListener('form[data-success], a[data-success]',
    'ajax:success',
    handlers.onRemoteFormSuccess);
  addListener('form[data-errors]',
    'ajax:error',
    handlers.onRemoteFormErrors);
};

const addListener = (selector, event, fn) => {
  document.addEventListener(event, (e) => {
    if(e.target.matches(selector)){
      e.stopPropagation();
      fn.call(e.target, e);
    }
  });
};

if(!window[MODULE_LOADED]) {
  init();
}
