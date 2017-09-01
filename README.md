# Rails Validator

This tool provides some basic validation behavior intended to work alongside the [Ruby on Rails unobtrusive scripting adapter](https://www.npmjs.com/package/rails-ujs).

## Installation

Install the module:

```
yarn add rails-validator
```

And load it in your javascript:

```javascript
import 'rails-validator'
import Rails from 'rails-ujs'
Rails.start()
```

## Usage

Create forms with `data-remote=true` to enable the ujs.

**Options**

- `data-errors`: Set to `inline` for inline error messages and `alert` to use a browser alert dialog.
- `data-success`: Set to any string to trigger a redirect on a successful response, or `reload` to reload the current page.

**Example**

```html
<form action="/contact" data-remote="true" data-errors="inline" data-success="/thank-you">
</form>
```

## JSON Responses

The validator assumes you are using standard http status codes and JSON formats in your Rails controllers.

If you are using the [responders](https://github.com/plataformatec/responders) gem, you are likely already sending the correct responses.

**With Responders**

```ruby
class UsersController
  def create
    user = User.create(user_params)
    respond_with user
  end
end
```

**Without Responders**

```ruby
class UsersController
  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end
end
```
