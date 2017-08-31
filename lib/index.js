import Rails from 'rails-ujs';
import * as handlers from './handlers';

const MODULE_LOADED='_rails_validator_loaded';

const init = () => {
  window[MODULE_LOADED] = true;
  Rails.delegate(document,
    'form', 'ajax:before',
    handlers.onRemoteFormBefore);
  Rails.delegate(document,
    'form[data-success], a[data-success]', 'ajax:success',
    handlers.onRemoteFormSuccess);
  Rails.delegate(document,
    'form[data-errors]', 'ajax:error',
    handlers.onRemoteFormErrors);
  Rails.start();
};

if(!window[MODULE_LOADED]) {
  init();
}
