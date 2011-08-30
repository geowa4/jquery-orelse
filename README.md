API
---
This plugin gives you two new functions:

    .orElse( fallback )

The `orElse` function will call your `fallback` function if the size of the 
jQuery object is exactly 0. 

    .getOrElse( [index,] fallback )

If you specify an index, the `getOrElse` function will call your `fallback` 
function if jQuery's `get` method returns `undefined` for that index. If you do
not specify an index, then the `getOrElse` function will call your `fallback` 
function if the array is empty - nothing was selected.

The scope of the `fallback` function is the jQuery object. An example of why 
this is useful is in the Example section below. Additionally, the `fallback` 
function may return something. If it does, that will be returned. If nothing is 
returned, then the jQuery object is returned to enable chaining like other 
jQuery functions.

Examples
--------
For the following code examples, assume this DOM:

    <!DOCTYPE html>
    <html>
      <head>
        <title>jQuery Or Else Demo</title>
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        <script src="jquery.orelse.js"></script>
      </head>
      <body>
        <ul id="my-awesome-list">
          <li class="my-awesome-list-item">This</li>
          <li class="my-awesome-list-item">is</li>
          <li class="my-awesome-list-item">the</li>
          <li class="my-awesome-list-item">best</li>
          <li class="my-awesome-list-item">plugin</li>
          <li class="my-awesome-list-item">ever!</li>
        </ul>
      </body>
    </html>

Let's start with something basic. This will alert to you that nothing has been 
selected:

    $('.nothing').orElse(function() {
        alert('nothing was selected... :-(');
    });

And this one stores the jQuery object for later use:

    var $nothing = $('.nothing').orElse(function() {
        alert('nothing was selected... :-(');
    });

I could also return anything that I wanted from the `orElse` method:

    var msg = $('.nothing').orElse(function() {
        return 'shucks!';
    });

And this does nothing since elements were selected:

    $('.my-awesome-list-item').orElse(function() {
        alert('something is wrong if this fires.');
    });

Remember, `this` in the `fallback` function is the jQuery object itself. The 
following shows how you can interact with the jQuery object in the `fallback`
and return something:

    var $list_items = 
        $('.my-awesome-list-item').filter('.nothing').orElse(function() {
            return this.end();
        });

Here I have reverted the filter, returning the jQuery object to the state it 
was in before I called the filter function. Furthermore, one thing to note 
about this last example is that I have returned the jQuery object. This means 
that I can continue chaining with the reverted object. Had I left off the 
return, the object that would have been returned by default would have been the
one with the filter applied, which matches no elements.