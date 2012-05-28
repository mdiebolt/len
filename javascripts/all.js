;
;
/**
Returns a copy of the array without null and undefined values.

<code><pre>
   [null, undefined, 3, 3, undefined, 5].compact()
=> [3, 3, 5]
</pre></code>

@name compact
@methodOf Array#
@type Array
@returns A new array that contains only the non-null values.
*/var __slice = Array.prototype.slice;
Array.prototype.compact = function() {
  return this.select(function(element) {
    return element != null;
  });
};
/**
Creates and returns a copy of the array. The copy contains
the same objects.

<code><pre>
   a = ["a", "b", "c"]
   b = a.copy()

   # their elements are equal
   a[0] == b[0] && a[1] == b[1] && a[2] == b[2]
=> true

   # but they aren't the same object in memory
   a === b
=> false
</pre></code>

@name copy
@methodOf Array#
@type Array
@returns A new array that is a copy of the array
*/
Array.prototype.copy = function() {
  return this.concat();
};
/**
Empties the array of its contents. It is modified in place.

<code><pre>
   fullArray = [1, 2, 3]
   fullArray.clear()
   fullArray
=> []
</pre></code>

@name clear
@methodOf Array#
@type Array
@returns this, now emptied.
*/
Array.prototype.clear = function() {
  this.length = 0;
  return this;
};
/**
Flatten out an array of arrays into a single array of elements.

<code><pre>
   [[1, 2], [3, 4], 5].flatten()
=> [1, 2, 3, 4, 5]

   # won't flatten twice nested arrays. call
   # flatten twice if that is what you want
   [[1, 2], [3, [4, 5]], 6].flatten()
=> [1, 2, 3, [4, 5], 6]
</pre></code>

@name flatten
@methodOf Array#
@type Array
@returns A new array with all the sub-arrays flattened to the top.
*/
Array.prototype.flatten = function() {
  return this.inject([], function(a, b) {
    return a.concat(b);
  });
};
/**
Invoke the named method on each element in the array
and return a new array containing the results of the invocation.

<code><pre>
   [1.1, 2.2, 3.3, 4.4].invoke("floor")
=> [1, 2, 3, 4]

   ['hello', 'world', 'cool!'].invoke('substring', 0, 3)
=> ['hel', 'wor', 'coo']
</pre></code>

@param {String} method The name of the method to invoke.
@param [arg...] Optional arguments to pass to the method being invoked.

@name invoke
@methodOf Array#
@type Array
@returns A new array containing the results of invoking the
named method on each element.
*/
Array.prototype.invoke = function() {
  var args, method;
  method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return this.map(function(element) {
    return element[method].apply(element, args);
  });
};
/**
Randomly select an element from the array.

@name rand
@methodOf Array#
@type Object
@returns A random element from an array
*/
Array.prototype.rand = function() {
  return this[rand(this.length)];
};
/**
Remove the first occurrence of the given object from the array if it is
present. The array is modified in place.

<code><pre>
   a = [1, 1, "a", "b"]
   a.remove(1)
=> 1

   a
=> [1, "a", "b"]
</pre></code>

@name remove
@methodOf Array#
@param {Object} object The object to remove from the array if present.
@returns The removed object if present otherwise undefined.
*/
Array.prototype.remove = function(object) {
  var index;
  index = this.indexOf(object);
  if (index >= 0) {
    return this.splice(index, 1)[0];
  } else {
    return;
  }
};
/**
Returns true if the element is present in the array.

<code><pre>
   ["a", "b", "c"].include("c")
=> true

   [40, "a"].include(700)
=> false
</pre></code>

@name include
@methodOf Array#
@param {Object} element The element to check if present.
@returns true if the element is in the array, false otherwise.
@type Boolean
*/
Array.prototype.include = function(element) {
  return this.indexOf(element) !== -1;
};
/**
Call the given iterator once for each element in the array,
passing in the element as the first argument, the index of
the element as the second argument, and <code>this</code> array as the
third argument.

<code><pre>
   word = ""
   indices = []
   ["r", "a", "d"].each (letter, index) ->
     word += letter
     indices.push(index)

=> ["r", "a", "d"]

   word
=> "rad"

   indices
=> [0, 1, 2]
</pre></code>

@name each
@methodOf Array#
@param {Function} iterator Function to be called once for
each element in the array.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@type Array
@returns this to enable method chaining.
*/
Array.prototype.each = function(iterator, context) {
  var element, i, _len;
  if (this.forEach) {
    this.forEach(iterator, context);
  } else {
    for (i = 0, _len = this.length; i < _len; i++) {
      element = this[i];
      iterator.call(context, element, i, this);
    }
  }
  return this;
};
/**
Call the given iterator once for each element in the array,
passing in the element as the first argument, the index of
the element as the second argument, and `this` array as the
third argument.

<code><pre>
   [1, 2, 3].map (number) ->
     number * number

=> [1, 4, 9]
</pre></code>

@name map
@methodOf Array#
@param {Function} iterator Function to be called once for
each element in the array.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.
@type Array
@returns An array of the results of the iterator function
being called on the original array elements.
*/
Array.prototype.map || (Array.prototype.map = function(iterator, context) {
  var element, i, results, _len;
  results = [];
  for (i = 0, _len = this.length; i < _len; i++) {
    element = this[i];
    results.push(iterator.call(context, element, i, this));
  }
  return results;
});
/**
Call the given iterator once for each pair of objects in the array.

<code><pre>
  [1, 2, 3, 4].eachPair (a, b) ->
    # 1, 2
    # 1, 3
    # 1, 4
    # 2, 3
    # 2, 4
    # 3, 4
</pre></code>

@name eachPair
@methodOf Array#
@param {Function} iterator Function to be called once for
each pair of elements in the array.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.
*/
Array.prototype.eachPair = function(iterator, context) {
  var a, b, i, j, length, _results;
  length = this.length;
  i = 0;
  _results = [];
  while (i < length) {
    a = this[i];
    j = i + 1;
    i += 1;
    _results.push((function() {
      var _results2;
      _results2 = [];
      while (j < length) {
        b = this[j];
        j += 1;
        _results2.push(iterator.call(context, a, b));
      }
      return _results2;
    }).call(this));
  }
  return _results;
};
/**
Call the given iterator once for each element in the array,
passing in the element as the first argument and the given object
as the second argument. Additional arguments are passed similar to
<code>each</code>.

@see Array#each

@name eachWithObject
@methodOf Array#

@param {Object} object The object to pass to the iterator on each
visit.
@param {Function} iterator Function to be called once for
each element in the array.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@returns this
@type Array
*/
Array.prototype.eachWithObject = function(object, iterator, context) {
  this.each(function(element, i, self) {
    return iterator.call(context, element, object, i, self);
  });
  return object;
};
/**
Call the given iterator once for each group of elements in the array,
passing in the elements in groups of n. Additional argumens are
passed as in each.

<code><pre>
   results = []
   [1, 2, 3, 4].eachSlice 2, (slice) ->
     results.push(slice)
=> [1, 2, 3, 4]

   results
=> [[1, 2], [3, 4]]
</pre></code>

@see Array#each

@name eachSlice
@methodOf Array#

@param {Number} n The number of elements in each group.
@param {Function} iterator Function to be called once for
each group of elements in the array.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@returns this
@type Array
*/
Array.prototype.eachSlice = function(n, iterator, context) {
  var i, len;
  if (n > 0) {
    len = (this.length / n).floor();
    i = -1;
    while (++i < len) {
      iterator.call(context, this.slice(i * n, (i + 1) * n), i * n, this);
    }
  }
  return this;
};
/**
Returns a new array with the elements all shuffled up.

@name shuffle
@methodOf Array#

@returns A new array that is randomly shuffled.
@type Array
*/
Array.prototype.shuffle = function() {
  var shuffledArray;
  shuffledArray = [];
  this.each(function(element) {
    return shuffledArray.splice(rand(shuffledArray.length + 1), 0, element);
  });
  return shuffledArray;
};
/**
Returns the first element of the array, undefined if the array is empty.

<code><pre>
   ["first", "second", "third"].first()
=> "first"
</pre></code>

@name first
@methodOf Array#

@returns The first element, or undefined if the array is empty.
@type Object
*/
Array.prototype.first = function() {
  return this[0];
};
/**
Returns the last element of the array, undefined if the array is empty.

<code><pre>
   ["first", "second", "third"].last()
=> "third"
</pre></code>

@name last
@methodOf Array#

@returns The last element, or undefined if the array is empty.
@type Object
*/
Array.prototype.last = function() {
  return this[this.length - 1];
};
/**
Returns an object containing the extremes of this array.

<code><pre>
   [-1, 3, 0].extremes()
=> {min: -1, max: 3}
</pre></code>

@name extremes
@methodOf Array#

@param {Function} [fn] An optional funtion used to evaluate
each element to calculate its value for determining extremes.
@returns {min: minElement, max: maxElement}
@type Object
*/
Array.prototype.extremes = function(fn) {
  var max, maxResult, min, minResult;
  fn || (fn = function(n) {
    return n;
  });
  min = max = void 0;
  minResult = maxResult = void 0;
  this.each(function(object) {
    var result;
    result = fn(object);
    if (min != null) {
      if (result < minResult) {
        min = object;
        minResult = result;
      }
    } else {
      min = object;
      minResult = result;
    }
    if (max != null) {
      if (result > maxResult) {
        max = object;
        return maxResult = result;
      }
    } else {
      max = object;
      return maxResult = result;
    }
  });
  return {
    min: min,
    max: max
  };
};
/**
Pretend the array is a circle and grab a new array containing length elements.
If length is not given return the element at start, again assuming the array
is a circle.

<code><pre>
   [1, 2, 3].wrap(-1)
=> 3

   [1, 2, 3].wrap(6)
=> 1

   ["l", "o", "o", "p"].wrap(0, 16)
=> ["l", "o", "o", "p", "l", "o", "o", "p", "l", "o", "o", "p", "l", "o", "o", "p"]
</pre></code>

@name wrap
@methodOf Array#

@param {Number} start The index to start wrapping at, or the index of the
sole element to return if no length is given.
@param {Number} [length] Optional length determines how long result
array should be.
@returns The element at start mod array.length, or an array of length elements,
starting from start and wrapping.
@type Object or Array
*/
Array.prototype.wrap = function(start, length) {
  var end, i, result;
  if (length != null) {
    end = start + length;
    i = start;
    result = [];
    while (i++ < end) {
      result.push(this[i.mod(this.length)]);
    }
    return result;
  } else {
    return this[start.mod(this.length)];
  }
};
/**
Partitions the elements into two groups: those for which the iterator returns
true, and those for which it returns false.

@name partition
@methodOf Array#

@param {Function} iterator
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@type Array
@returns An array in the form of [trueCollection, falseCollection]
*/
Array.prototype.partition = function(iterator, context) {
  var falseCollection, trueCollection;
  trueCollection = [];
  falseCollection = [];
  this.each(function(element) {
    if (iterator.call(context, element)) {
      return trueCollection.push(element);
    } else {
      return falseCollection.push(element);
    }
  });
  return [trueCollection, falseCollection];
};
/**
Return the group of elements for which the return value of the iterator is true.

@name select
@methodOf Array#

@param {Function} iterator The iterator receives each element in turn as
the first agument.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@type Array
@returns An array containing the elements for which the iterator returned true.
*/
Array.prototype.select = function(iterator, context) {
  return this.partition(iterator, context)[0];
};
/**
Return the group of elements that are not in the passed in set.

@name without
@methodOf Array#

@param {Array} values List of elements to exclude.

@type Array
@returns An array containing the elements that are not passed in.
*/
Array.prototype.without = function(values) {
  return this.reject(function(element) {
    return values.include(element);
  });
};
/**
Return the group of elements for which the return value of the iterator is false.

@name reject
@methodOf Array#

@param {Function} iterator The iterator receives each element in turn as
the first agument.
@param {Object} [context] Optional context parameter to be
used as `this` when calling the iterator function.

@type Array
@returns An array containing the elements for which the iterator returned false.
*/
Array.prototype.reject = function(iterator, context) {
  return this.partition(iterator, context)[1];
};
/**
Combines all elements of the array by applying a binary operation.
for each element in the arra the iterator is passed an accumulator
value (memo) and the element.

@name inject
@methodOf Array#

@type Object
@returns The result of a
*/
Array.prototype.inject = function(initial, iterator) {
  this.each(function(element) {
    return initial = iterator(initial, element);
  });
  return initial;
};
/**
Add all the elements in the array.

@name sum
@methodOf Array#

@type Number
@returns The sum of the elements in the array.
*/
Array.prototype.sum = function() {
  return this.inject(0, function(sum, n) {
    return sum + n;
  });
};
/**
Multiply all the elements in the array.

@name product
@methodOf Array#

@type Number
@returns The product of the elements in the array.
*/
Array.prototype.product = function() {
  return this.inject(1, function(product, n) {
    return product * n;
  });
};
Array.prototype.zip = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.map(function(element, index) {
    var output;
    output = args.map(function(arr) {
      return arr[index];
    });
    output.unshift(element);
    return output;
  });
};;
/**
Bindable module
@name Bindable
@module
@constructor
*/var Bindable;
var __slice = Array.prototype.slice;
Bindable = function() {
  var eventCallbacks;
  eventCallbacks = {};
  return {
    /**
    The bind method adds a function as an event listener.

    <code><pre>
    # this will call coolEventHandler after
    # yourObject.trigger "someCustomEvent" is called.
    yourObject.bind "someCustomEvent", coolEventHandler

    #or
    yourObject.bind "anotherCustomEvent", ->
      doSomething()
    </pre></code>

    @name bind
    @methodOf Bindable#

    @param {String} event The event to listen to.
    @param {Function} callback The function to be called when the specified event
    is triggered.
    */
    bind: function(event, callback) {
      eventCallbacks[event] = eventCallbacks[event] || [];
      return eventCallbacks[event].push(callback);
    },
    /**
    The unbind method removes a specific event listener, or all event listeners if
    no specific listener is given.

    <code><pre>
    #  removes the handler coolEventHandler from the event
    # "someCustomEvent" while leaving the other events intact.
    yourObject.unbind "someCustomEvent", coolEventHandler

    # removes all handlers attached to "anotherCustomEvent"
    yourObject.unbind "anotherCustomEvent"
    </pre></code>

    @name unbind
    @methodOf Bindable#

    @param {String} event The event to remove the listener from.
    @param {Function} [callback] The listener to remove.
    */
    unbind: function(event, callback) {
      eventCallbacks[event] = eventCallbacks[event] || [];
      if (callback) {
        return eventCallbacks[event].remove(callback);
      } else {
        return eventCallbacks[event] = [];
      }
    },
    /**
    The trigger method calls all listeners attached to the specified event.

    <code><pre>
    # calls each event handler bound to "someCustomEvent"
    yourObject.trigger "someCustomEvent"
    </pre></code>

    @name trigger
    @methodOf Bindable#

    @param {String} event The event to trigger.
    @param {Array} [parameters] Additional parameters to pass to the event listener.
    */
    trigger: function() {
      var callbacks, event, parameters, self;
      event = arguments[0], parameters = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      callbacks = eventCallbacks[event];
      if (callbacks && callbacks.length) {
        self = this;
        return callbacks.each(function(callback) {
          return callback.apply(self, parameters);
        });
      }
    }
  };
};
(typeof exports !== "undefined" && exports !== null ? exports : this)["Bindable"] = Bindable;;
var CommandStack;
CommandStack = function() {
  var index, stack;
  stack = [];
  index = 0;
  return {
    execute: function(command) {
      stack[index] = command;
      command.execute();
      return index += 1;
    },
    undo: function() {
      var command;
      if (this.canUndo()) {
        index -= 1;
        command = stack[index];
        command.undo();
        return command;
      }
    },
    redo: function() {
      var command;
      if (this.canRedo()) {
        command = stack[index];
        command.execute();
        index += 1;
        return command;
      }
    },
    canUndo: function() {
      return index > 0;
    },
    canRedo: function() {
      return stack[index] != null;
    }
  };
};;
/**
The Core class is used to add extended functionality to objects without
extending the object class directly. Inherit from Core to gain its utility
methods.

@name Core
@constructor

@param {Object} I Instance variables
*/var Core;
var __slice = Array.prototype.slice;
Core = function(I) {
  var self;
  I || (I = {});
  return self = {
    /**
      External access to instance variables. Use of this property should be avoided
      in general, but can come in handy from time to time.

    <code><pre>
     I = {
       r: 255
       g: 0
       b: 100
     }

     myObject = Core(I)

     # a bad idea most of the time, but it's
     # pretty convenient to have available.
     myObject.I.r
    => 255

     myObject.I.g
    => 0

     myObject.I.b
    => 100
    </pre></code>

      @name I
      @fieldOf Core#
      */
    I: I,
    /**
      Generates a public jQuery style getter / setter method for each
      String argument.

      <code><pre>
      myObject = Core
        r: 255
        g: 0
        b: 100

      myObject.attrAccessor "r", "g", "b"

      myObject.r(254)
      myObject.r()

     => 254
      </pre></code>

      @name attrAccessor
      @methodOf Core#
      */
    attrAccessor: function() {
      var attrNames;
      attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return attrNames.each(function(attrName) {
        return self[attrName] = function(newValue) {
          if (newValue != null) {
            I[attrName] = newValue;
            return self;
          } else {
            return I[attrName];
          }
        };
      });
    },
    /**
    Generates a public jQuery style getter method for each String argument.

    <code><pre>
    myObject = Core
      r: 255
      g: 0
      b: 100

    myObject.attrReader "r", "g", "b"

    myObject.r()
     => 255

    myObject.g()
     => 0

    myObject.b()
     => 100
    </pre></code>

    @name attrReader
    @methodOf Core#
    */
    attrReader: function() {
      var attrNames;
      attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return attrNames.each(function(attrName) {
        return self[attrName] = function() {
          return I[attrName];
        };
      });
    },
    /**
    Extends this object with methods from the passed in object. `before` and
    `after` are special option names that glue functionality before or after
    existing methods.

    @name extend
    @methodOf Core#
    */
    extend: function(options) {
      var afterMethods, beforeMethods, fn, name;
      afterMethods = options.after;
      beforeMethods = options.before;
      delete options.after;
      delete options.before;
      Object.extend(self, options);
      if (beforeMethods) {
        for (name in beforeMethods) {
          fn = beforeMethods[name];
          self[name] = self[name].withBefore(fn);
        }
      }
      if (afterMethods) {
        for (name in afterMethods) {
          fn = afterMethods[name];
          self[name] = self[name].withAfter(fn);
        }
      }
      return self;
    },
    /**
    Includes a module in this object.

    <code><pre>
    myObject = Core()
    myObject.include(Bindable)

    # now you can bind handlers to functions and
    # y you've hardly written any code
    myObject.bind "someEvent", ->
      alert("wow. that was easy.")
    </pre></code>

    @name include
    @methodOf Core#

    @param {Module} Module the module to include. A module is a constructor
    that takes two parameters, I and self, and returns an object containing the
    public methods to extend the including object with.
    */
    include: function(Module) {
      return self.extend(Module(I, self));
    }
  };
};;
Function.prototype.withBefore = function(interception) {
  var method;
  method = this;
  return function() {
    interception.apply(this, arguments);
    return method.apply(this, arguments);
  };
};
Function.prototype.withAfter = function(interception) {
  var method;
  method = this;
  return function() {
    var result;
    result = method.apply(this, arguments);
    interception.apply(this, arguments);
    return result;
  };
};;
/**
  @name Logging

<code><pre>
  log "Testing123"
  info "Hey, this is happening"
  warn "Be careful, this might be a problem"
  error "Kaboom!"
</pre></code>

  Gives you some convenience methods for outputting data
  while developing.
*/["log", "info", "warn", "error"].each(function(name) {
  if (typeof console !== "undefined") {
    return (typeof exports !== "undefined" && exports !== null ? exports : this)[name] = function(message) {
      if (console[name]) {
        return console[name](message);
      }
    };
  } else {
    return (typeof exports !== "undefined" && exports !== null ? exports : this)[name] = function() {};
  }
});;
/**
* Matrix.js v1.3.0pre
*
* Copyright (c) 2010 STRd6
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* Loosely based on flash:
* http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/geom/Matrix.html
*/(function() {
  /**
  <pre>
     _        _
    | a  c tx  |
    | b  d ty  |
    |_0  0  1 _|
  </pre>
  Creates a matrix for 2d affine transformations.

  concat, inverse, rotate, scale and translate return new matrices with the
  transformations applied. The matrix is not modified in place.

  Returns the identity matrix when called with no arguments.

  @name Matrix
  @param {Number} [a]
  @param {Number} [b]
  @param {Number} [c]
  @param {Number} [d]
  @param {Number} [tx]
  @param {Number} [ty]
  @constructor
  */  var Matrix;
  Matrix = function(a, b, c, d, tx, ty) {
    return {
      __proto__: Matrix.prototype,
      /**
      @name a
      @fieldOf Matrix#
      */
      a: a != null ? a : 1,
      /**
      @name b
      @fieldOf Matrix#
      */
      b: b || 0,
      /**
      @name c
      @fieldOf Matrix#
      */
      c: c || 0,
      /**
      @name d
      @fieldOf Matrix#
      */
      d: d != null ? d : 1,
      /**
      @name tx
      @fieldOf Matrix#
      */
      tx: tx || 0,
      /**
      @name ty
      @fieldOf Matrix#
      */
      ty: ty || 0
    };
  };
  Matrix.prototype = {
    /**
      Returns the result of this matrix multiplied by another matrix
      combining the geometric effects of the two. In mathematical terms,
      concatenating two matrixes is the same as combining them using matrix multiplication.
      If this matrix is A and the matrix passed in is B, the resulting matrix is A x B
      http://mathworld.wolfram.com/MatrixMultiplication.html
      @name concat
      @methodOf Matrix#

      @param {Matrix} matrix The matrix to multiply this matrix by.
      @returns The result of the matrix multiplication, a new matrix.
      @type Matrix
      */
    concat: function(matrix) {
      return Matrix(this.a * matrix.a + this.c * matrix.b, this.b * matrix.a + this.d * matrix.b, this.a * matrix.c + this.c * matrix.d, this.b * matrix.c + this.d * matrix.d, this.a * matrix.tx + this.c * matrix.ty + this.tx, this.b * matrix.tx + this.d * matrix.ty + this.ty);
    },
    /**
    Given a point in the pretransform coordinate space, returns the coordinates of
    that point after the transformation occurs. Unlike the standard transformation
    applied using the transformPoint() method, the deltaTransformPoint() method
    does not consider the translation parameters tx and ty.
    @name deltaTransformPoint
    @methodOf Matrix#
    @see #transformPoint

    @return A new point transformed by this matrix ignoring tx and ty.
    @type Point
    */
    deltaTransformPoint: function(point) {
      return Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
    },
    /**
    Returns the inverse of the matrix.
    http://mathworld.wolfram.com/MatrixInverse.html
    @name inverse
    @methodOf Matrix#

    @returns A new matrix that is the inverse of this matrix.
    @type Matrix
    */
    inverse: function() {
      var determinant;
      determinant = this.a * this.d - this.b * this.c;
      return Matrix(this.d / determinant, -this.b / determinant, -this.c / determinant, this.a / determinant, (this.c * this.ty - this.d * this.tx) / determinant, (this.b * this.tx - this.a * this.ty) / determinant);
    },
    /**
    Returns a new matrix that corresponds this matrix multiplied by a
    a rotation matrix.
    @name rotate
    @methodOf Matrix#
    @see Matrix.rotation

    @param {Number} theta Amount to rotate in radians.
    @param {Point} [aboutPoint] The point about which this rotation occurs. Defaults to (0,0).
    @returns A new matrix, rotated by the specified amount.
    @type Matrix
    */
    rotate: function(theta, aboutPoint) {
      return this.concat(Matrix.rotation(theta, aboutPoint));
    },
    /**
    Returns a new matrix that corresponds this matrix multiplied by a
    a scaling matrix.
    @name scale
    @methodOf Matrix#
    @see Matrix.scale

    @param {Number} sx
    @param {Number} [sy]
    @param {Point} [aboutPoint] The point that remains fixed during the scaling
    @type Matrix
    */
    scale: function(sx, sy, aboutPoint) {
      return this.concat(Matrix.scale(sx, sy, aboutPoint));
    },
    /**
    Returns the result of applying the geometric transformation represented by the
    Matrix object to the specified point.
    @name transformPoint
    @methodOf Matrix#
    @see #deltaTransformPoint

    @returns A new point with the transformation applied.
    @type Point
    */
    transformPoint: function(point) {
      return Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);
    },
    /**
    Translates the matrix along the x and y axes, as specified by the tx and ty parameters.
    @name translate
    @methodOf Matrix#
    @see Matrix.translation

    @param {Number} tx The translation along the x axis.
    @param {Number} ty The translation along the y axis.
    @returns A new matrix with the translation applied.
    @type Matrix
    */
    translate: function(tx, ty) {
      return this.concat(Matrix.translation(tx, ty));
    }
    /**
    Creates a matrix transformation that corresponds to the given rotation,
    around (0,0) or the specified point.
    @see Matrix#rotate

    @param {Number} theta Rotation in radians.
    @param {Point} [aboutPoint] The point about which this rotation occurs. Defaults to (0,0).
    @returns
    @type Matrix
    */
  };
  Matrix.rotate = Matrix.rotation = function(theta, aboutPoint) {
    var rotationMatrix;
    rotationMatrix = Matrix(Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta));
    if (aboutPoint != null) {
      rotationMatrix = Matrix.translation(aboutPoint.x, aboutPoint.y).concat(rotationMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
    }
    return rotationMatrix;
  };
  /**
  Returns a matrix that corresponds to scaling by factors of sx, sy along
  the x and y axis respectively.
  If only one parameter is given the matrix is scaled uniformly along both axis.
  If the optional aboutPoint parameter is given the scaling takes place
  about the given point.
  @see Matrix#scale

  @param {Number} sx The amount to scale by along the x axis or uniformly if no sy is given.
  @param {Number} [sy] The amount to scale by along the y axis.
  @param {Point} [aboutPoint] The point about which the scaling occurs. Defaults to (0,0).
  @returns A matrix transformation representing scaling by sx and sy.
  @type Matrix
  */
  Matrix.scale = function(sx, sy, aboutPoint) {
    var scaleMatrix;
    sy = sy || sx;
    scaleMatrix = Matrix(sx, 0, 0, sy);
    if (aboutPoint) {
      scaleMatrix = Matrix.translation(aboutPoint.x, aboutPoint.y).concat(scaleMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
    }
    return scaleMatrix;
  };
  /**
  Returns a matrix that corresponds to a translation of tx, ty.
  @see Matrix#translate

  @param {Number} tx The amount to translate in the x direction.
  @param {Number} ty The amount to translate in the y direction.
  @return A matrix transformation representing a translation by tx and ty.
  @type Matrix
  */
  Matrix.translate = Matrix.translation = function(tx, ty) {
    return Matrix(1, 0, 0, 1, tx, ty);
  };
  /**
  A constant representing the identity matrix.
  @name IDENTITY
  @fieldOf Matrix
  */
  Matrix.IDENTITY = Matrix();
  /**
  A constant representing the horizontal flip transformation matrix.
  @name HORIZONTAL_FLIP
  @fieldOf Matrix
  */
  Matrix.HORIZONTAL_FLIP = Matrix(-1, 0, 0, 1);
  /**
  A constant representing the vertical flip transformation matrix.
  @name VERTICAL_FLIP
  @fieldOf Matrix
  */
  Matrix.VERTICAL_FLIP = Matrix(1, 0, 0, -1);
  if (Object.freeze) {
    Object.freeze(Matrix.IDENTITY);
    Object.freeze(Matrix.HORIZONTAL_FLIP);
    Object.freeze(Matrix.VERTICAL_FLIP);
  }
  return (typeof exports !== "undefined" && exports !== null ? exports : this)["Matrix"] = Matrix;
})();;
/**
Returns the absolute value of this number.

<code><pre>
   (-4).abs()
=> 4
</pre></code>

@name abs
@methodOf Number#

@type Number
@returns The absolute value of the number.
*/Number.prototype.abs = function() {
  return Math.abs(this);
};
/**
Returns the mathematical ceiling of this number.

<code><pre>
   4.9.ceil()
=> 5

   4.2.ceil()
=> 5

   (-1.2).ceil()
=> -1
</pre></code>

@name ceil
@methodOf Number#

@type Number
@returns The number truncated to the nearest integer of greater than or equal value.
*/
Number.prototype.ceil = function() {
  return Math.ceil(this);
};
/**
Returns the mathematical floor of this number.

<code><pre>
   4.9.floor()
=> 4

   4.2.floor()
=> 4

   (-1.2).floor()
=> -2
</pre></code>

@name floor
@methodOf Number#

@type Number
@returns The number truncated to the nearest integer of less than or equal value.
*/
Number.prototype.floor = function() {
  return Math.floor(this);
};
/**
Returns this number rounded to the nearest integer.

<code><pre>
   4.5.round()
=> 5

   4.4.round()
=> 4
</pre></code>

@name round
@methodOf Number#

@type Number
@returns The number rounded to the nearest integer.
*/
Number.prototype.round = function() {
  return Math.round(this);
};
/**
Returns a number whose value is limited to the given range.

<code><pre>
   # limit the output of this computation to between 0 and 255
   (2 * 255).clamp(0, 255)
=> 255
</pre></code>

@name clamp
@methodOf Number#

@param {Number} min The lower boundary of the output range
@param {Number} max The upper boundary of the output range

@type Number
@returns A number in the range [min, max]
*/
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
/**
A mod method useful for array wrapping. The range of the function is
constrained to remain in bounds of array indices.

<code><pre>
   (-1).mod(5)
=> 4
</pre></code>

@name mod
@methodOf Number#

@param {Number} base
@type Number
@returns An integer between 0 and (base - 1) if base is positive.
*/
Number.prototype.mod = function(base) {
  var result;
  result = this % base;
  if (result < 0 && base > 0) {
    result += base;
  }
  return result;
};
/**
Get the sign of this number as an integer (1, -1, or 0).

<code><pre>
   (-5).sign()
=> -1

   0.sign()
=> 0

   5.sign()
=> 1
</pre></code>

@name sign
@methodOf Number#

@type Number
@returns The sign of this number, 0 if the number is 0.
*/
Number.prototype.sign = function() {
  if (this > 0) {
    return 1;
  } else if (this < 0) {
    return -1;
  } else {
    return 0;
  }
};
/**
Returns true if this number is even (evenly divisible by 2).

<code><pre>
   2.even()
=> true

   3.even()
=> false

   0.even()
=> true
</pre></code>

@name even
@methodOf Number#

@type Boolean
@returns true if this number is an even integer, false otherwise.
*/
Number.prototype.even = function() {
  return this % 2 === 0;
};
/**
Returns true if this number is odd (has remainder of 1 when divided by 2).

<code><pre>
   2.odd()
=> false

   3.odd()
=> true

   0.odd()
=> false
</pre></code>

@name odd
@methodOf Number#

@type Boolean
@returns true if this number is an odd integer, false otherwise.
*/
Number.prototype.odd = function() {
  if (this > 0) {
    return this % 2 === 1;
  } else {
    return this % 2 === -1;
  }
};
/**
Calls iterator the specified number of times, passing in the number of the
current iteration as a parameter: 0 on first call, 1 on the second call, etc.

<code><pre>
   output = []

   5.times (n) ->
     output.push(n)

   output
=> [0, 1, 2, 3, 4]
</pre></code>

@name times
@methodOf Number#

@param {Function} iterator The iterator takes a single parameter, the number
of the current iteration.
@param {Object} [context] The optional context parameter specifies an object
to treat as <code>this</code> in the iterator block.

@type Number
@returns The number of times the iterator was called.
*/
Number.prototype.times = function(iterator, context) {
  var i;
  i = -1;
  while (++i < this) {
    iterator.call(context, i);
  }
  return i;
};
/**
Returns the the nearest grid resolution less than or equal to the number.

<code><pre>
    7.snap(8)
=> 0

    4.snap(8)
=> 0

   12.snap(8)
=> 8
</pre></code>

@name snap
@methodOf Number#

@param {Number} resolution The grid resolution to snap to.
@type Number
@returns The nearest multiple of resolution lower than the number.
*/
Number.prototype.snap = function(resolution) {
  var n;
  n = this / resolution;
  1 / 1;
  return n.floor() * resolution;
};
/**
In number theory, integer factorization or prime factorization is the
breaking down of a composite number into smaller non-trivial divisors,
which when multiplied together equal the original integer.

Floors the number for purposes of factorization.

<code><pre>
   60.primeFactors()
=> [2, 2, 3, 5]

   37.primeFactors()
=> [37]
</pre></code>

@name primeFactors
@methodOf Number#

@type Array
@returns An array containing the factorization of this number.
*/
Number.prototype.primeFactors = function() {
  var factors, i, iSquared, n;
  factors = [];
  n = Math.floor(this);
  if (n === 0) {
    return;
  }
  if (n < 0) {
    factors.push(-1);
    n /= -1;
  }
  i = 2;
  iSquared = i * i;
  while (iSquared < n) {
    while ((n % i) === 0) {
      factors.push(i);
      n /= i;
    }
    i += 1;
    iSquared = i * i;
  }
  if (n !== 1) {
    factors.push(n);
  }
  return factors;
};
/**
Returns the two character hexidecimal
representation of numbers 0 through 255.

<code><pre>
   255.toColorPart()
=> "ff"

   0.toColorPart()
=> "00"

   200.toColorPart()
=> "c8"
</pre></code>

@name toColorPart
@methodOf Number#

@type String
@returns Hexidecimal representation of the number
*/
Number.prototype.toColorPart = function() {
  var s;
  s = parseInt(this.clamp(0, 255), 10).toString(16);
  if (s.length === 1) {
    s = '0' + s;
  }
  return s;
};
/**
Returns a number that is maxDelta closer to target.

<code><pre>
   255.approach(0, 5)
=> 250

   5.approach(0, 10)
=> 0
</pre></code>

@name approach
@methodOf Number#

@type Number
@returns A number maxDelta toward target
*/
Number.prototype.approach = function(target, maxDelta) {
  return (target - this).clamp(-maxDelta, maxDelta) + this;
};
/**
Returns a number that is closer to the target by the ratio.

<code><pre>
   255.approachByRatio(0, 0.1)
=> 229.5
</pre></code>

@name approachByRatio
@methodOf Number#

@type Number
@returns A number toward target by the ratio
*/
Number.prototype.approachByRatio = function(target, ratio) {
  return this.approach(target, this * ratio);
};
/**
Returns a number that is closer to the target angle by the delta.

<code><pre>
   Math.PI.approachRotation(0, Math.PI/4)
=> 2.356194490192345 # this is (3/4) * Math.PI, which is (1/4) * Math.PI closer to 0 from Math.PI
</pre></code>

@name approachRotation
@methodOf Number#

@type Number
@returns A number toward the target angle by maxDelta
*/
Number.prototype.approachRotation = function(target, maxDelta) {
  while (target > this + Math.PI) {
    target -= Math.TAU;
  }
  while (target < this - Math.PI) {
    target += Math.TAU;
  }
  return (target - this).clamp(-maxDelta, maxDelta) + this;
};
/**
Constrains a rotation to between -PI and PI.

<code><pre>
   (9/4 * Math.PI).constrainRotation()
=> 0.7853981633974483 # this is (1/4) * Math.PI
</pre></code>

@name constrainRotation
@methodOf Number#

@type Number
@returns This number constrained between -PI and PI.
*/
Number.prototype.constrainRotation = function() {
  var target;
  target = this;
  while (target > Math.PI) {
    target -= Math.TAU;
  }
  while (target < -Math.PI) {
    target += Math.TAU;
  }
  return target;
};
/**
The mathematical d operator. Useful for simulating dice rolls.

@name d
@methodOf Number#

@type Number
@returns The sum of rolling <code>this</code> many <code>sides</code>-sided dice
*/
Number.prototype.d = function(sides) {
  var sum;
  sum = 0;
  this.times(function() {
    return sum += rand(sides) + 1;
  });
  return sum;
};
/**
The mathematical circle constant of 1 turn.

@name TAU
@fieldOf Math
*/
Math.TAU = 2 * Math.PI;;
/**
Checks whether an object is an array.

<code><pre>
   Object.isArray([1, 2, 4])
=> true

   Object.isArray({key: "value"})
=> false
</pre></code>

@name isArray
@methodOf Object

@param {Object} object The object to check for array-ness.
@type Boolean
@returns A boolean expressing whether the object is an instance of Array

*/var __slice = Array.prototype.slice;
Object.isArray = function(object) {
  return Object.prototype.toString.call(object) === '[object Array]';
};
/**
Merges properties from objects into target without overiding.
First come, first served.

<code><pre>
   I = {
     a: 1
     b: 2
     c: 3
   }

   Object.reverseMerge I, {
     c: 6
     d: 4
   }

   I

=> {a: 1, b:2, c:3, d: 4}
</pre></code>

@name reverseMerge
@methodOf Object

@param {Object} target The object to merge the properties into.
@type Object
@returns target
*/
Object.reverseMerge = function() {
  var name, object, objects, target, _i, _len;
  target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = objects.length; _i < _len; _i++) {
    object = objects[_i];
    for (name in object) {
      if (!target.hasOwnProperty(name)) {
        target[name] = object[name];
      }
    }
  }
  return target;
};
/**
Merges properties from sources into target with overiding.
Last in covers earlier properties.

<code><pre>
   I = {
     a: 1
     b: 2
     c: 3
   }

   Object.extend I, {
     c: 6
     d: 4
   }

   I

=> {a: 1, b:2, c:6, d: 4}
</pre></code>

@name extend
@methodOf Object

@param {Object} target The object to merge the properties into.
@type Object
@returns target
*/
Object.extend = function() {
  var name, source, sources, target, _i, _len;
  target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = sources.length; _i < _len; _i++) {
    source = sources[_i];
    for (name in source) {
      target[name] = source[name];
    }
  }
  return target;
};;
(function() {
  /**
  Create a new point with given x and y coordinates. If no arguments are given
  defaults to (0, 0).
  @name Point
  @param {Number} [x]
  @param {Number} [y]
  @constructor ASFsdfASD
  */  var Point;
  Point = function(x, y) {
    return {
      __proto__: Point.prototype,
      /**
      The x coordinate of this point.
      @name x
      @fieldOf Point#
      */
      x: x || 0,
      /**
      The y coordinate of this point.
      @name y
      @fieldOf Point#
      */
      y: y || 0
    };
  };
  Point.prototype = {
    /**
      Creates a copy of this point.

      @name copy
      @methodOf Point#
      @type Point
      @returns A new point with the same x and y value as this point.

      <code><pre>
        point = Point(1, 1)
        pointCopy = point.copy()

        point.equal(pointCopy)
        => true

        point == pointCopy
        => false
      </pre></code>
      */
    copy: function() {
      return Point(this.x, this.y);
    },
    /**
    Adds a point to this one and returns the new point. You may
    also use a two argument call like <code>point.add(x, y)</code>
    to add x and y values without a second point object.
    @name add
    @methodOf Point#

    @param {Point} other The point to add this point to.
    @returns A new point, the sum of both.
    @type Point
    */
    add: function(first, second) {
      return this.copy().add$(first, second);
    },
    add$: function(first, second) {
      if (second != null) {
        this.x += first;
        this.y += second;
      } else {
        this.x += first.x;
        this.y += first.y;
      }
      return this;
    },
    /**
    Subtracts a point to this one and returns the new point.
    @name subtract
    @methodOf Point#

    @param {Point} other The point to subtract from this point.
    @returns A new point, this - other.
    @type Point
    */
    subtract: function(first, second) {
      return this.copy().subtract$(first, second);
    },
    subtract$: function(first, second) {
      if (second != null) {
        this.x -= first;
        this.y -= second;
      } else {
        this.x -= first.x;
        this.y -= first.y;
      }
      return this;
    },
    /**
    Scale this Point (Vector) by a constant amount.
    @name scale
    @methodOf Point#

    @param {Number} scalar The amount to scale this point by.
    @returns A new point, this * scalar.
    @type Point
    */
    scale: function(scalar) {
      return this.copy().scale$(scalar);
    },
    scale$: function(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    },
    /**
    The norm of a vector is the unit vector pointing in the same direction. This method
    treats the point as though it is a vector from the origin to (x, y).
    @name norm
    @methodOf Point#

    @returns The unit vector pointing in the same direction as this vector.
    @type Point
    */
    norm: function(length) {
      if (length == null) {
        length = 1.0;
      }
      return this.copy().norm$(length);
    },
    norm$: function(length) {
      var m;
      if (length == null) {
        length = 1.0;
      }
      if (m = this.length()) {
        return this.scale$(length / m);
      } else {
        return this;
      }
    },
    /**
    Floor the x and y values, returning a new point.

    @name floor
    @methodOf Point#
    @returns A new point, with x and y values each floored to the largest previous integer.
    @type Point
    */
    floor: function() {
      return this.copy().floor$();
    },
    floor$: function() {
      this.x = this.x.floor();
      this.y = this.y.floor();
      return this;
    },
    /**
    Determine whether this point is equal to another point.
    @name equal
    @methodOf Point#

    @param {Point} other The point to check for equality.
    @returns true if the other point has the same x, y coordinates, false otherwise.
    @type Boolean
    */
    equal: function(other) {
      return this.x === other.x && this.y === other.y;
    },
    /**
    Computed the length of this point as though it were a vector from (0,0) to (x,y)
    @name length
    @methodOf Point#

    @returns The length of the vector from the origin to this point.
    @type Number
    */
    length: function() {
      return Math.sqrt(this.dot(this));
    },
    /**
    Calculate the magnitude of this Point (Vector).
    @name magnitude
    @methodOf Point#

    @returns The magnitude of this point as if it were a vector from (0, 0) -> (x, y).
    @type Number
    */
    magnitude: function() {
      return this.length();
    },
    /**
    Returns the direction in radians of this point from the origin.
    @name direction
    @methodOf Point#

    @type Number
    */
    direction: function() {
      return Math.atan2(this.y, this.x);
    },
    /**
    Calculate the dot product of this point and another point (Vector).
    @name dot
    @methodOf Point#

    @param {Point} other The point to dot with this point.
    @returns The dot product of this point dot other as a scalar value.
    @type Number
    */
    dot: function(other) {
      return this.x * other.x + this.y * other.y;
    },
    /**
    Calculate the cross product of this point and another point (Vector).
    Usually cross products are thought of as only applying to three dimensional vectors,
    but z can be treated as zero. The result of this method is interpreted as the magnitude
    of the vector result of the cross product between [x1, y1, 0] x [x2, y2, 0]
    perpendicular to the xy plane.
    @name cross
    @methodOf Point#

    @param {Point} other The point to cross with this point.
    @returns The cross product of this point with the other point as scalar value.
    @type Number
    */
    cross: function(other) {
      return this.x * other.y - other.x * this.y;
    },
    /**
    Computed the Euclidean between this point and another point.
    @name distance
    @methodOf Point#

    @param {Point} other The point to compute the distance to.
    @returns The distance between this point and another point.
    @type Number
    */
    distance: function(other) {
      return Point.distance(this, other);
    }
    /**
    @name distance
    @methodOf Point
    @param {Point} p1
    @param {Point} p2
    @type Number
    @returns The Euclidean distance between two points.
    */
  };
  Point.distance = function(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  /**
  Construct a point on the unit circle for the given angle.

  @name fromAngle
  @methodOf Point

  @param {Number} angle The angle in radians
  @type Point
  @returns The point on the unit circle.
  */
  Point.fromAngle = function(angle) {
    return Point(Math.cos(angle), Math.sin(angle));
  };
  /**
  If you have two dudes, one standing at point p1, and the other
  standing at point p2, then this method will return the direction
  that the dude standing at p1 will need to face to look at p2.

  @name direction
  @methodOf Point

  @param {Point} p1 The starting point.
  @param {Point} p2 The ending point.
  @type Number
  @returns The direction from p1 to p2 in radians.
  */
  Point.direction = function(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  };
  /**
  @name ZERO
  @fieldOf Point

  @type Point
  */
  Point.ZERO = Point();
  if (Object.freeze) {
    Object.freeze(Point.ZERO);
  }
  return (typeof exports !== "undefined" && exports !== null ? exports : this)["Point"] = Point;
})();;
(function() {
  /**
  @name Random
  @namespace Some useful methods for generating random things.
  */  (typeof exports !== "undefined" && exports !== null ? exports : this)["Random"] = {
    /**
      Returns a random angle, uniformly distributed, between 0 and 2pi.

      @name angle
      @methodOf Random
      @type Number
      */
    angle: function() {
      return rand() * Math.TAU;
    },
    color: function() {
      return Color.random();
    },
    often: function() {
      return rand(3);
    },
    sometimes: function() {
      return !rand(3);
    }
    /**
    Returns random integers from [0, n) if n is given.
    Otherwise returns random float between 0 and 1.

    @name rand
    @methodOf window

    @param {Number} n
    @type Number
    */
  };
  return (typeof exports !== "undefined" && exports !== null ? exports : this)["rand"] = function(n) {
    if (n) {
      return Math.floor(n * Math.random());
    } else {
      return Math.random();
    }
  };
})();;
/**
Returns true if this string only contains whitespace characters.

@name blank
@methodOf String#

@returns Whether or not this string is blank.
@type Boolean
*/String.prototype.blank = function() {
  return /^\s*$/.test(this);
};
/**
Returns a new string that is a camelCase version.

@name camelize
@methodOf String#
*/
String.prototype.camelize = function() {
  return this.trim().replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
    if (chr) {
      return chr.toUpperCase();
    } else {
      return '';
    }
  });
};
/**
Returns a new string with the first letter capitalized and the rest lower cased.

@name capitalize
@methodOf String#
*/
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
};
/**
Return the class or constant named in this string.

@name constantize
@methodOf String#

@returns The class or constant named in this string.
@type Object
*/
String.prototype.constantize = function() {
  if (this.match(/[A-Z][A-Za-z0-9]*/)) {
    eval("var that = " + this);
    return that;
  } else {
    throw "String#constantize: '" + this + "' is not a valid constant name.";
  }
};
/**
Returns a new string that is a more human readable version.

@name humanize
@methodOf String#
*/
String.prototype.humanize = function() {
  return this.replace(/_id$/, "").replace(/_/g, " ").capitalize();
};
/**
Returns true.

@name isString
@methodOf String#
@type Boolean
@returns true
*/
String.prototype.isString = function() {
  return true;
};
/**
Parse this string as though it is JSON and return the object it represents. If it
is not valid JSON returns the string itself.

@name parse
@methodOf String#

@returns Returns an object from the JSON this string contains. If it
is not valid JSON returns the string itself.
@type Object
*/
String.prototype.parse = function() {
  try {
    return JSON.parse(this.toString());
  } catch (e) {
    return this.toString();
  }
};
/**
Returns a new string in Title Case.
@name titleize
@methodOf String#
*/
String.prototype.titleize = function() {
  return this.split(/[- ]/).map(function(word) {
    return word.capitalize();
  }).join(' ');
};
/**
Underscore a word, changing camelCased with under_scored.
@name underscore
@methodOf String#
*/
String.prototype.underscore = function() {
  return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
};
/**
Assumes the string is something like a file name and returns the
contents of the string without the extension.

"neat.png".witouthExtension() => "neat"

@name withoutExtension
@methodOf String#
*/
String.prototype.withoutExtension = function() {
  return this.replace(/\.[^\.]*$/, '');
};;
/**
Non-standard



@name toSource
@methodOf Boolean#
*/
/**
Returns a string representing the specified Boolean object.

<code><em>bool</em>.toString()</code>

@name toString
@methodOf Boolean#
*/
/**
Returns the primitive value of a Boolean object.

<code><em>bool</em>.valueOf()</code>

@name valueOf
@methodOf Boolean#
*/
/**
Returns a string representing the Number object in exponential notation

<code><i>number</i>.toExponential( [<em>fractionDigits</em>] )</code>
@param  fractionDigits
An integer specifying the number of digits after the decimal point. Defaults
to as many digits as necessary to specify the number.
@name toExponential
@methodOf Number#
*/
/**
Formats a number using fixed-point notation

<code><i>number</i>.toFixed( [<em>digits</em>] )</code>
@param  digits   The number of digits to appear after the decimal point; this
may be a value between 0 and 20, inclusive, and implementations may optionally
support a larger range of values. If this argument is omitted, it is treated as
0.
@name toFixed
@methodOf Number#
*/
/**
number.toLocaleString();



@name toLocaleString
@methodOf Number#
*/
/**
Returns a string representing the Number object to the specified precision.

<code><em>number</em>.toPrecision( [ <em>precision</em> ] )</code>
@param precision An integer specifying the number of significant digits.
@name toPrecision
@methodOf Number#
*/
/**
Non-standard



@name toSource
@methodOf Number#
*/
/**
Returns a string representing the specified Number object

<code><i>number</i>.toString( [<em>radix</em>] )</code>
@param  radix
An integer between 2 and 36 specifying the base to use for representing
numeric values.
@name toString
@methodOf Number#
*/
/**
Returns the primitive value of a Number object.



@name valueOf
@methodOf Number#
*/
/**
Returns the specified character from a string.

<code><em>string</em>.charAt(<em>index</em>)</code>
@param index  An integer between 0 and 1 less than the length of the string.
@name charAt
@methodOf String#
*/
/**
Returns the numeric Unicode value of the character at the given index (except
for unicode codepoints > 0x10000).


@param index  An integer greater than 0 and less than the length of the string;
if it is not a number, it defaults to 0.
@name charCodeAt
@methodOf String#
*/
/**
Combines the text of two or more strings and returns a new string.

<code><em>string</em>.concat(<em>string2</em>, <em>string3</em>[, ..., <em>stringN</em>])</code>
@param string2...stringN  Strings to concatenate to this string.
@name concat
@methodOf String#
*/
/**
Returns the index within the calling String object of the first occurrence of
the specified value, starting the search at fromIndex,
returns -1 if the value is not found.

<code><em>string</em>.indexOf(<em>searchValue</em>[, <em>fromIndex</em>]</code>
@param searchValue  A string representing the value to search for.
@param fromIndex  The location within the calling string to start the search
from. It can be any integer between 0 and the length of the string. The default
value is 0.
@name indexOf
@methodOf String#
*/
/**
Returns the index within the calling String object of the last occurrence of the
specified value, or -1 if not found. The calling string is searched backward,
starting at fromIndex.

<code><em>string</em>.lastIndexOf(<em>searchValue</em>[, <em>fromIndex</em>])</code>
@param searchValue  A string representing the value to search for.
@param fromIndex  The location within the calling string to start the search
from, indexed from left to right. It can be any integer between 0 and the length
of the string. The default value is the length of the string.
@name lastIndexOf
@methodOf String#
*/
/**
Returns a number indicating whether a reference string comes before or after or
is the same as the given string in sort order.

<code> localeCompare(compareString) </code>

@name localeCompare
@methodOf String#
*/
/**
Used to retrieve the matches when matching a string against a regular
expression.

<code><em>string</em>.match(<em>regexp</em>)</code>
@param regexp A regular expression object. If a non-RegExp object obj is passed,
it is implicitly converted to a RegExp by using new RegExp(obj).
@name match
@methodOf String#
*/
/**
Non-standard



@name quote
@methodOf String#
*/
/**
Returns a new string with some or all matches of a pattern replaced by a
replacement.  The pattern can be a string or a RegExp, and the replacement can
be a string or a function to be called for each match.

<code><em>str</em>.replace(<em>regexp|substr</em>, <em>newSubStr|function[</em>, </code><code><em>flags]</em>);</code>
@param regexp  A RegExp object. The match is replaced by the return value of
parameter #2.
@param substr  A String that is to be replaced by newSubStr.
@param newSubStr  The String that replaces the substring received from parameter
#1. A number of special replacement patterns are supported; see the "Specifying
a string as a parameter" section below.
@param function  A function to be invoked to create the new substring (to put in
place of the substring received from parameter #1). The arguments supplied to
this function are described in the "Specifying a function as a parameter"
section below.
@param flags gimy

Non-standardThe use of the flags parameter in the String.replace method is
non-standard. For cross-browser compatibility, use a RegExp object with
corresponding flags.A string containing any combination of the RegExp flags: g
global match i ignore case m match over multiple lines y Non-standard
sticky global matchignore casematch over multiple linesNon-standard     sticky
@name replace
@methodOf String#
*/
/**
Executes the search for a match between a regular expression and this String
object.

<code><em>string</em>.search(<em>regexp</em>)</code>
@param regexp  A  regular expression object. If a non-RegExp object obj is
passed, it is implicitly converted to a RegExp by using new RegExp(obj).
@name search
@methodOf String#
*/
/**
Extracts a section of a string and returns a new string.

<code><em>string</em>.slice(<em>beginslice</em>[, <em>endSlice</em>])</code>
@param beginSlice  The zero-based index at which to begin extraction.
@param endSlice  The zero-based index at which to end extraction. If omitted,
slice extracts to the end of the string.
@name slice
@methodOf String#
*/
/**
Splits a String object into an array of strings by separating the string into
substrings.

<code><em>string</em>.split([<em>separator</em>][, <em>limit</em>])</code>
@param separator  Specifies the character to use for separating the string. The
separator is treated as a string or a regular expression. If separator is
omitted, the array returned contains one element consisting of the entire
string.
@param limit  Integer specifying a limit on the number of splits to be found.
@name split
@methodOf String#
*/
/**
Returns the characters in a string beginning at the specified location through
the specified number of characters.

<code><em>string</em>.substr(<em>start</em>[, <em>length</em>])</code>
@param start  Location at which to begin extracting characters.
@param length  The number of characters to extract.
@name substr
@methodOf String#
*/
/**
Returns a subset of a string between one index and another, or through the end
of the string.

<code><em>string</em>.substring(<em>indexA</em>[, <em>indexB</em>])</code>
@param indexA  An integer between 0 and one less than the length of the string.
@param indexB  (optional) An integer between 0 and the length of the string.
@name substring
@methodOf String#
*/
/**
Returns the calling string value converted to lower case, according to any
locale-specific case mappings.

<code> toLocaleLowerCase() </code>

@name toLocaleLowerCase
@methodOf String#
*/
/**
Returns the calling string value converted to upper case, according to any
locale-specific case mappings.

<code> toLocaleUpperCase() </code>

@name toLocaleUpperCase
@methodOf String#
*/
/**
Returns the calling string value converted to lowercase.

<code><em>string</em>.toLowerCase()</code>

@name toLowerCase
@methodOf String#
*/
/**
Non-standard



@name toSource
@methodOf String#
*/
/**
Returns a string representing the specified object.

<code><em>string</em>.toString()</code>

@name toString
@methodOf String#
*/
/**
Returns the calling string value converted to uppercase.

<code><em>string</em>.toUpperCase()</code>

@name toUpperCase
@methodOf String#
*/
/**
Removes whitespace from both ends of the string.

<code><em>string</em>.trim()</code>

@name trim
@methodOf String#
*/
/**
Non-standard



@name trimLeft
@methodOf String#
*/
/**
Non-standard



@name trimRight
@methodOf String#
*/
/**
Returns the primitive value of a String object.

<code><em>string</em>.valueOf()</code>

@name valueOf
@methodOf String#
*/
/**
Non-standard



@name anchor
@methodOf String#
*/
/**
Non-standard



@name big
@methodOf String#
*/
/**
Non-standard

<code>BLINK</code>

@name blink
@methodOf String#
*/
/**
Non-standard



@name bold
@methodOf String#
*/
/**
Non-standard



@name fixed
@methodOf String#
*/
/**
Non-standard

<code>&lt;FONT COLOR="<i>color</i>"&gt;</code>

@name fontcolor
@methodOf String#
*/
/**
Non-standard

<code>&lt;FONT SIZE="<i>size</i>"&gt;</code>

@name fontsize
@methodOf String#
*/
/**
Non-standard



@name italics
@methodOf String#
*/
/**
Non-standard



@name link
@methodOf String#
*/
/**
Non-standard



@name small
@methodOf String#
*/
/**
Non-standard



@name strike
@methodOf String#
*/
/**
Non-standard



@name sub
@methodOf String#
*/
/**
Non-standard



@name sup
@methodOf String#
*/
/**
Removes the last element from an array and returns that element.

<code>
<i>array</i>.pop()
</code>

@name pop
@methodOf Array#
*/
/**
Mutates an array by appending the given elements and returning the new length of
the array.

<code><em>array</em>.push(<em>element1</em>, ..., <em>elementN</em>)</code>
@param element1, ..., elementN The elements to add to the end of the array.
@name push
@methodOf Array#
*/
/**
Reverses an array in place.  The first array element becomes the last and the
last becomes the first.

<code><em>array</em>.reverse()</code>

@name reverse
@methodOf Array#
*/
/**
Removes the first element from an array and returns that element. This method
changes the length of the array.

<code><em>array</em>.shift()</code>

@name shift
@methodOf Array#
*/
/**
Sorts the elements of an array in place.

<code><em>array</em>.sort([<em>compareFunction</em>])</code>
@param compareFunction  Specifies a function that defines the sort order. If
omitted, the array is sorted lexicographically (in dictionary order) according
to the string conversion of each element.
@name sort
@methodOf Array#
*/
/**
Changes the content of an array, adding new elements while removing old
elements.

<code><em>array</em>.splice(<em>index</em>, <em>howMany</em>[, <em>element1</em>[, ...[, <em>elementN</em>]]])</code>
@param index  Index at which to start changing the array. If negative, will
begin that many elements from the end.
@param howMany  An integer indicating the number of old array elements to
remove. If howMany is 0, no elements are removed. In this case, you should
specify at least one new element. If no howMany parameter is specified (second
syntax above, which is a SpiderMonkey extension), all elements after index are
removed.
@param element1, ..., elementN  The elements to add to the array. If you don't
specify any elements, splice simply removes elements from the array.
@name splice
@methodOf Array#
*/
/**
Adds one or more elements to the beginning of an array and returns the new
length of the array.

<code><em>arrayName</em>.unshift(<em>element1</em>, ..., <em>elementN</em>) </code>
@param element1, ..., elementN The elements to add to the front of the array.
@name unshift
@methodOf Array#
*/
/**
Returns a new array comprised of this array joined with other array(s) and/or
value(s).

<code><em>array</em>.concat(<em>value1</em>, <em>value2</em>, ..., <em>valueN</em>)</code>
@param valueN  Arrays and/or values to concatenate to the resulting array.
@name concat
@methodOf Array#
*/
/**
Joins all elements of an array into a string.

<code><em>array</em>.join(<em>separator</em>)</code>
@param separator  Specifies a string to separate each element of the array. The
separator is converted to a string if necessary. If omitted, the array elements
are separated with a comma.
@name join
@methodOf Array#
*/
/**
Returns a one-level deep copy of a portion of an array.

<code><em>array</em>.slice(<em>begin</em>[, <em>end</em>])</code>
@param begin  Zero-based index at which to begin extraction.As a negative index,
start indicates an offset from the end of the sequence. slice(-2) extracts the
second-to-last element and the last element in the sequence.
@param end  Zero-based index at which to end extraction. slice extracts up to
but not including end.slice(1,4) extracts the second element through the fourth
element (elements indexed 1, 2, and 3).As a negative index, end indicates an
offset from the end of the sequence. slice(2,-1) extracts the third element
through the second-to-last element in the sequence.If end is omitted, slice
extracts to the end of the sequence.
@name slice
@methodOf Array#
*/
/**
Non-standard



@name toSource
@methodOf Array#
*/
/**
Returns a string representing the specified array and its elements.

<code><em>array</em>.toString()</code>

@name toString
@methodOf Array#
*/
/**
Returns the first index at which a given element can be found in the array, or
-1 if it is not present.

<code><em>array</em>.indexOf(<em>searchElement</em>[, <em>fromIndex</em>])</code>
@param searchElement fromIndex  Element to locate in the array.The index at
which to begin the search. Defaults to 0, i.e. the whole array will be searched.
If the index is greater than or equal to the length of the array, -1 is
returned, i.e. the array will not be searched. If negative, it is taken as the
offset from the end of the array. Note that even when the index is negative, the
array is still searched from front to back. If the calculated index is less than
0, the whole array will be searched.
@name indexOf
@methodOf Array#
*/
/**
Returns the last index at which a given element can be found in the array, or -1
if it is not present. The array is searched backwards, starting at fromIndex.

<code><em>array</em>.lastIndexOf(<em>searchElement</em>[, <em>fromIndex</em>])</code>
@param searchElement fromIndex  Element to locate in the array.The index at
which to start searching backwards. Defaults to the array's length, i.e. the
whole array will be searched. If the index is greater than or equal to the
length of the array, the whole array will be searched. If negative, it is taken
as the offset from the end of the array. Note that even when the index is
negative, the array is still searched from back to front. If the calculated
index is less than 0, -1 is returned, i.e. the array will not be searched.
@name lastIndexOf
@methodOf Array#
*/
/**
Creates a new array with all elements that pass the test implemented by the
provided function.

<code><em>array</em>.filter(<em>callback</em>[, <em>thisObject</em>])</code>
@param callback thisObject  Function to test each element of the array.Object to
use as this when executing callback.
@name filter
@methodOf Array#
*/
/**
Executes a provided function once per array element.

<code><em>array</em>.forEach(<em>callback</em>[, <em>thisObject</em>])</code>
@param callback thisObject  Function to execute for each element.Object to use
as this when executing callback.
@name forEach
@methodOf Array#
*/
/**
Tests whether all elements in the array pass the test implemented by the
provided function.

<code><em>array</em>.every(<em>callback</em>[, <em>thisObject</em>])</code>
@param callbackthisObject Function to test for each element.Object to use as
this when executing callback.
@name every
@methodOf Array#
*/
/**
Creates a new array with the results of calling a provided function on every
element in this array.

<code><em>array</em>.map(<em>callback</em>[, <em>thisObject</em>])</code>
@param callbackthisObject Function that produces an element of the new Array
from an element of the current one.Object to use as this when executing
callback.
@name map
@methodOf Array#
*/
/**
Tests whether some element in the array passes the test implemented by the
provided function.

<code><em>array</em>.some(<em>callback</em>[, <em>thisObject</em>])</code>
@param callback thisObject  Function to test for each element.Object to use as
this when executing callback.
@name some
@methodOf Array#
*/
/**
Apply a function against an accumulator and each value of the array (from
left-to-right) as to reduce it to a single value.

<code><em>array</em>.reduce(<em>callback</em>[, <em>initialValue</em>])</code>
@param callbackinitialValue Function to execute on each value in the
array.Object to use as the first argument to the first call of the callback.
@name reduce
@methodOf Array#
*/
/**
Apply a function simultaneously against two values of the array (from
right-to-left) as to reduce it to a single value.

<code><em>array</em>.reduceRight(<em>callback</em>[, <em>initialValue</em>])</code>
@param callback initialValue  Function to execute on each value in the
array.Object to use as the first argument to the first call of the callback.
@name reduceRight
@methodOf Array#
*/
/**
Returns a boolean indicating whether the object has the specified property.

<code><em>obj</em>.hasOwnProperty(<em>prop</em>)</code>
@param prop The name of the property to test.
@name hasOwnProperty
@methodOf Object#
*/
/**
Calls a function with a given this value and arguments provided as an array.

<code><em>fun</em>.apply(<em>thisArg</em>[, <em>argsArray</em>])</code>
@param thisArg  Determines the value of this inside fun. If thisArg is null or
undefined, this will be the global object. Otherwise, this will be equal to
Object(thisArg) (which is thisArg if thisArg is already an object, or a String,
Boolean, or Number if thisArg is a primitive value of the corresponding type).
Therefore, it is always true that typeof this == "object" when the function
executes.
@param argsArray  An argument array for the object, specifying the arguments
with which fun should be called, or null or undefined if no arguments should be
provided to the function.
@name apply
@methodOf Function#
*/
/**
Creates a new function that, when called, itself calls this function in the
context of the provided this value, with a given sequence of arguments preceding
any provided when the new function was called.

<code><em>fun</em>.bind(<em>thisArg</em>[, <em>arg1</em>[, <em>arg2</em>[, ...]]])</code>
@param thisValuearg1, arg2, ... The value to be passed as the this parameter to
the target function when the bound function is called.  The value is ignored if
the bound function is constructed using the new operator.Arguments to prepend to
arguments provided to the bound function when invoking the target function.
@name bind
@methodOf Function#
*/
/**
Calls a function with a given this value and arguments provided individually.

<code><em>fun</em>.call(<em>thisArg</em>[, <em>arg1</em>[, <em>arg2</em>[, ...]]])</code>
@param thisArg  Determines the value of this inside fun. If thisArg is null or
undefined, this will be the global object. Otherwise, this will be equal to
Object(thisArg) (which is thisArg if thisArg is already an object, or a String,
Boolean, or Number if thisArg is a primitive value of the corresponding type).
Therefore, it is always true that typeof this == "object" when the function
executes.
@param arg1, arg2, ...  Arguments for the object.
@name call
@methodOf Function#
*/
/**
Non-standard



@name toSource
@methodOf Function#
*/
/**
Returns a string representing the source code of the function.

<code><em>function</em>.toString(<em>indentation</em>)</code>
@param indentation Non-standard     The amount of spaces to indent the string
representation of the source code. If indentation is less than or equal to -1,
most unnecessary spaces are removed.
@name toString
@methodOf Function#
*/
/**
Executes a search for a match in a specified string. Returns a result array, or
null.


@param regexp  The name of the regular expression. It can be a variable name or
a literal.
@param str  The string against which to match the regular expression.
@name exec
@methodOf RegExp#
*/
/**
Executes the search for a match between a regular expression and a specified
string. Returns true or false.

<code> <em>regexp</em>.test([<em>str</em>]) </code>
@param regexp  The name of the regular expression. It can be a variable name or
a literal.
@param str  The string against which to match the regular expression.
@name test
@methodOf RegExp#
*/
/**
Non-standard



@name toSource
@methodOf RegExp#
*/
/**
Returns a string representing the specified object.

<code><i>regexp</i>.toString()</code>

@name toString
@methodOf RegExp#
*/
/**
Returns a reference to the Date function that created the instance's prototype.
Note that the value of this property is a reference to the function itself, not
a string containing the function's name.



@name constructor
@methodOf Date#
*/
/**
Returns the day of the month for the specified date according to local time.

<code>
getDate()
</code>

@name getDate
@methodOf Date#
*/
/**
Returns the day of the week for the specified date according to local time.

<code>
getDay()
</code>

@name getDay
@methodOf Date#
*/
/**
Returns the year of the specified date according to local time.

<code>
getFullYear()
</code>

@name getFullYear
@methodOf Date#
*/
/**
Returns the hour for the specified date according to local time.

<code>
getHours()
</code>

@name getHours
@methodOf Date#
*/
/**
Returns the milliseconds in the specified date according to local time.

<code>
getMilliseconds()
</code>

@name getMilliseconds
@methodOf Date#
*/
/**
Returns the minutes in the specified date according to local time.

<code>
getMinutes()
</code>

@name getMinutes
@methodOf Date#
*/
/**
Returns the month in the specified date according to local time.

<code>
getMonth()
</code>

@name getMonth
@methodOf Date#
*/
/**
Returns the seconds in the specified date according to local time.

<code>
getSeconds()
</code>

@name getSeconds
@methodOf Date#
*/
/**
Returns the numeric value corresponding to the time for the specified date
according to universal time.

<code> getTime() </code>

@name getTime
@methodOf Date#
*/
/**
Returns the time-zone offset from UTC, in minutes, for the current locale.

<code> getTimezoneOffset() </code>

@name getTimezoneOffset
@methodOf Date#
*/
/**
Returns the day (date) of the month in the specified date according to universal
time.

<code>
getUTCDate()
</code>

@name getUTCDate
@methodOf Date#
*/
/**
Returns the day of the week in the specified date according to universal time.

<code>
getUTCDay()
</code>

@name getUTCDay
@methodOf Date#
*/
/**
Returns the year in the specified date according to universal time.

<code>
getUTCFullYear()
</code>

@name getUTCFullYear
@methodOf Date#
*/
/**
Returns the hours in the specified date according to universal time.

<code>
getUTCHours
</code>

@name getUTCHours
@methodOf Date#
*/
/**
Returns the milliseconds in the specified date according to universal time.

<code>
getUTCMilliseconds()
</code>

@name getUTCMilliseconds
@methodOf Date#
*/
/**
Returns the minutes in the specified date according to universal time.

<code>
getUTCMinutes()
</code>

@name getUTCMinutes
@methodOf Date#
*/
/**
Returns the month of the specified date according to universal time.

<code>
getUTCMonth()
</code>

@name getUTCMonth
@methodOf Date#
*/
/**
Returns the seconds in the specified date according to universal time.

<code>
getUTCSeconds()
</code>

@name getUTCSeconds
@methodOf Date#
*/
/**
Deprecated



@name getYear
@methodOf Date#
*/
/**
Sets the day of the month for a specified date according to local time.

<code> setDate(<em>dayValue</em>) </code>
@param dayValue  An integer from 1 to 31, representing the day of the month.
@name setDate
@methodOf Date#
*/
/**
Sets the full year for a specified date according to local time.

<code>
setFullYear(<i>yearValue</i>[, <i>monthValue</i>[, <em>dayValue</em>]])
</code>
@param  yearValue   An integer specifying the numeric value of the year, for
example, 1995.
@param  monthValue   An integer between 0 and 11 representing the months January
through December.
@param  dayValue   An integer between 1 and 31 representing the day of the
month. If you specify the dayValue parameter, you must also specify the
monthValue.
@name setFullYear
@methodOf Date#
*/
/**
Sets the hours for a specified date according to local time.

<code>
setHours(<i>hoursValue</i>[, <i>minutesValue</i>[, <i>secondsValue</i>[, <em>msValue</em>]]])
</code>
@param  hoursValue   An integer between 0 and 23, representing the hour.
@param  minutesValue   An integer between 0 and 59, representing the minutes.
@param  secondsValue   An integer between 0 and 59, representing the seconds. If
you specify the secondsValue parameter, you must also specify the minutesValue.
@param  msValue   A number between 0 and 999, representing the milliseconds. If
you specify the msValue parameter, you must also specify the minutesValue and
secondsValue.
@name setHours
@methodOf Date#
*/
/**
Sets the milliseconds for a specified date according to local time.

<code>
setMilliseconds(<i>millisecondsValue</i>)
</code>
@param  millisecondsValue   A number between 0 and 999, representing the
milliseconds.
@name setMilliseconds
@methodOf Date#
*/
/**
Sets the minutes for a specified date according to local time.

<code>
setMinutes(<i>minutesValue</i>[, <i>secondsValue</i>[, <em>msValue</em>]])
</code>
@param  minutesValue   An integer between 0 and 59, representing the minutes.
@param  secondsValue   An integer between 0 and 59, representing the seconds. If
you specify the secondsValue parameter, you must also specify the minutesValue.
@param  msValue   A number between 0 and 999, representing the milliseconds. If
you specify the msValue parameter, you must also specify the minutesValue and
secondsValue.
@name setMinutes
@methodOf Date#
*/
/**
Set the month for a specified date according to local time.

<code>
setMonth(<i>monthValue</i>[, <em>dayValue</em>])
</code>
@param  monthValue   An integer between 0 and 11 (representing the months
January through December).
@param  dayValue   An integer from 1 to 31, representing the day of the month.
@name setMonth
@methodOf Date#
*/
/**
Sets the seconds for a specified date according to local time.

<code>
setSeconds(<i>secondsValue</i>[, <em>msValue</em>])
</code>
@param  secondsValue   An integer between 0 and 59.
@param  msValue   A number between 0 and 999, representing the milliseconds.
@name setSeconds
@methodOf Date#
*/
/**
Sets the Date object to the time represented by a number of milliseconds since
January 1, 1970, 00:00:00 UTC.

<code>
setTime(<i>timeValue</i>)
</code>
@param  timeValue   An integer representing the number of milliseconds since 1
January 1970, 00:00:00 UTC.
@name setTime
@methodOf Date#
*/
/**
Sets the day of the month for a specified date according to universal time.

<code>
setUTCDate(<i>dayValue</i>)
</code>
@param  dayValue   An integer from 1 to 31, representing the day of the month.
@name setUTCDate
@methodOf Date#
*/
/**
Sets the full year for a specified date according to universal time.

<code>
setUTCFullYear(<i>yearValue</i>[, <i>monthValue</i>[, <em>dayValue</em>]])
</code>
@param  yearValue   An integer specifying the numeric value of the year, for
example, 1995.
@param  monthValue   An integer between 0 and 11 representing the months January
through December.
@param  dayValue   An integer between 1 and 31 representing the day of the
month. If you specify the dayValue parameter, you must also specify the
monthValue.
@name setUTCFullYear
@methodOf Date#
*/
/**
Sets the hour for a specified date according to universal time.

<code>
setUTCHours(<i>hoursValue</i>[, <i>minutesValue</i>[, <i>secondsValue</i>[, <em>msValue</em>]]])
</code>
@param  hoursValue   An integer between 0 and 23, representing the hour.
@param  minutesValue   An integer between 0 and 59, representing the minutes.
@param  secondsValue   An integer between 0 and 59, representing the seconds. If
you specify the secondsValue parameter, you must also specify the minutesValue.
@param  msValue   A number between 0 and 999, representing the milliseconds. If
you specify the msValue parameter, you must also specify the minutesValue and
secondsValue.
@name setUTCHours
@methodOf Date#
*/
/**
Sets the milliseconds for a specified date according to universal time.

<code>
setUTCMilliseconds(<i>millisecondsValue</i>)
</code>
@param  millisecondsValue   A number between 0 and 999, representing the
milliseconds.
@name setUTCMilliseconds
@methodOf Date#
*/
/**
Sets the minutes for a specified date according to universal time.

<code>
setUTCMinutes(<i>minutesValue</i>[, <i>secondsValue</i>[, <em>msValue</em>]])
</code>
@param  minutesValue   An integer between 0 and 59, representing the minutes.
@param  secondsValue   An integer between 0 and 59, representing the seconds. If
you specify the secondsValue parameter, you must also specify the minutesValue.
@param  msValue   A number between 0 and 999, representing the milliseconds. If
you specify the msValue parameter, you must also specify the minutesValue and
secondsValue.
@name setUTCMinutes
@methodOf Date#
*/
/**
Sets the month for a specified date according to universal time.

<code>
setUTCMonth(<i>monthValue</i>[, <em>dayValue</em>])
</code>
@param  monthValue   An integer between 0 and 11, representing the months
January through December.
@param  dayValue   An integer from 1 to 31, representing the day of the month.
@name setUTCMonth
@methodOf Date#
*/
/**
Sets the seconds for a specified date according to universal time.

<code>
setUTCSeconds(<i>secondsValue</i>[, <em>msValue</em>])
</code>
@param  secondsValue   An integer between 0 and 59.
@param  msValue   A number between 0 and 999, representing the milliseconds.
@name setUTCSeconds
@methodOf Date#
*/
/**
Deprecated



@name setYear
@methodOf Date#
*/
/**
Returns the date portion of a Date object in human readable form in American
English.

<code><em>date</em>.toDateString()</code>

@name toDateString
@methodOf Date#
*/
/**
Returns a JSON representation of the Date object.

<code><em>date</em>.prototype.toJSON()</code>

@name toJSON
@methodOf Date#
*/
/**
Deprecated



@name toGMTString
@methodOf Date#
*/
/**
Converts a date to a string, returning the "date" portion using the operating
system's locale's conventions.

<code>
toLocaleDateString()
</code>

@name toLocaleDateString
@methodOf Date#
*/
/**
Non-standard



@name toLocaleFormat
@methodOf Date#
*/
/**
Converts a date to a string, using the operating system's locale's conventions.

<code>
toLocaleString()
</code>

@name toLocaleString
@methodOf Date#
*/
/**
Converts a date to a string, returning the "time" portion using the current
locale's conventions.

<code> toLocaleTimeString() </code>

@name toLocaleTimeString
@methodOf Date#
*/
/**
Non-standard



@name toSource
@methodOf Date#
*/
/**
Returns a string representing the specified Date object.

<code> toString() </code>

@name toString
@methodOf Date#
*/
/**
Returns the time portion of a Date object in human readable form in American
English.

<code><em>date</em>.toTimeString()</code>

@name toTimeString
@methodOf Date#
*/
/**
Converts a date to a string, using the universal time convention.

<code> toUTCString() </code>

@name toUTCString
@methodOf Date#
*/
/**
Returns the primitive value of a Date object.

<code>
valueOf()
</code>

@name valueOf
@methodOf Date#
*/;
/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/**
Generate a random uuid.

USAGE: Math.uuid(length, radix)

EXAMPLES:
  // No arguments  - returns RFC4122, version 4 ID
  Math.uuid()
  "92329D39-6F5C-4520-ABFC-AAB64544E172"

  // One argument - returns ID of the specified length
  Math.uuid(15)     // 15 character ID (default base=62)
  "VcydxgltxrVZSTV"

  // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
  Math.uuid(8, 2)  // 8 character ID (base=2)
  "01001010"
  Math.uuid(8, 10) // 8 character ID (base=10)
  "47473046"
  Math.uuid(8, 16) // 8 character ID (base=16)
  "098F4D35"

@name uuid
@methodOf Math
@param length The desired number of characters
@param radix  The number of allowable values for each character.
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };
})();;
;
(function() {

  window.lenses = ["# Lens #1: The Lens of Essential Experience\nTo use this lens, you stop thinking about your game and start thinking about the experience of the player. Ask yourself these questions:\n\n- What experience do I want the player to have?\n- What is essential to that experience?\n- How can my game capture that essence?\n\nIf there is a big difference between the experience you want to create and the one you are actually creating, your game needs to change: You need to clearly state the essential experience you desire, and find as many ways as possible to instill this essence into your game.", "# Lens #2: The Lens of Surprise\nSurprise is so basic that we can easily forget about it. Use this lens to remind yourself to fill your game with interesting surprises. Ask yourself these questions:\n\n- What will surprise players when they play my game?\n- Does the story in my game have surprises? Do the game rules? Does the artwork? The technology?\n- Do your rules give players ways to surprise each other?\n- Do your rules give players ways to surprise themselves?\n\nSurprise is a crucial part of all entertainment — it is at the root of humor, strategy, and problem solving. Our brains are hardwired to enjoy surprises. In an experiment where participants received sprays of sugar water or plain water into their mouths, the participants who received random sprays consid- ered the experience much more pleasurable than participants who received the sprays according to a fixed pattern, even though the same amount of sugar was delivered. In other experiments, brain scans revealed that even during unpleasant surprises, the pleasure centers of the brain are triggered.", "# Lens #3: The Lens of Fun\nFun is desirable in nearly every game, although sometimes fun defies analysis. To maximize your game’s fun, ask yourself these questions:\n\n- What parts of my game are fun? Why?\n- What parts need to be more fun?", "# Lens #4: The Lens of Curiosity\nTo use this lens, think about the player’s true motivations — not just the goals your game has set forth, but the reason the player wants to achieve those goals. Ask yourself these questions:\n\n- What questions does my game put into the player’s mind?\n- What am I doing to make them care about these questions?\n- What can I do to make them invent even more questions?\n\nFor example, a maze-finding videogame might have a time-limit goal such that at each level, players are trying to answer the question: “Can I find my way through this maze in 30 seconds?” A way to make them care more would be to play interesting animations when they solve each maze, so players might also ask the question: “I wonder what the next animation will be?”", "# Lens #5: The Lens of Endogenous Value\nTo use this lens, think about your players’ feelings about items, objects, and scoring in your game. Ask yourself these questions:\n\n- What is valuable to the players in my game?\n- How can I make it more valuable to them?\n- What is the relationship between value in the game and the player’s motivations?\n\nRemember, the value of the items and score in the game is a direct reflection of how much players care about succeeding in your game. By thinking about what the players really care about and why, you can often get insights about how your game can improve.", "# Lens #6: The Lens of Problem Solving\nTo use this lens, think about the problems your players must solve to suc- ceed at your game, for every game has problems to solve. Ask yourself these questions:\n\n- What problems does my game ask the player to solve?\n- Are there hidden problems to solve that arise as part of gameplay?\n- How can my game generate new problems so that players keep coming back?", "# Lens #7: The Lens of the Elemental Tetrad\nTo use this lens, take stock of what your game is truly made of. Consider each element separately, and then all of them together as a whole.\n\nAsk yourself these questions:\n\n- Is my game design using elements of all four types?\n- Could my design be improved by enhancing elements in one or more of the categories?\n- Are the four elements in harmony, reinforcing each other, and working together toward a common theme?", "# Lens #8: The Lens of Holographic Design\nTo use this lens, you must see everything in your game at once: the four ele- ments and the player experience, as well as how they interrelate. It is accepta- ble to shift your focus from skin to skeleton and back again, but it is far better to view your game and experience holographically.\n\nAsk yourself these questions:\n\n- What elements of the game make the experience enjoyable?\n- What elements of the game detract from the experience?\n- How can I change game elements to improve the experience?", "# Lens #9: The Lens of Unification\nTo use this lens, consider the reason behind it all. Ask yourself these questions:\n\n- What is my theme?\n- Am I using every means possible to reinforce that theme?\n\nThe Lens of Unification works very well with the Lens of the Elemental Tetrad. Use the tetrad to separate out the elements of your game, so you can more easily study them from the perspective of a unified theme.", "# Lens #10: The Lens of Resonance\nTo use the Lens of Resonance, you must look for hidden power. Ask yourself these questions:\n\n- What is it about my game that feels powerful and special?\n- When I describe my game to people, what ideas get them really excited?\n- If I had no constraints of any kind, what would this game be like?\n- I have certain instincts about how this game should be. What is driving those instincts?\n\nThe Lens of Resonance is a quiet, delicate instrument. It is a tool for listening to yourself and listening to others. We bury important things deep inside our- selves, and when something causes them to resonate, it shakes us to our very core. The fact that these things are hidden gives them power, but also makes them hard for us to find.", "# Lens #11: The Lens of Infinite Inspiration\n> When you know how to listen, everybody is the guru.\n> – Ram Dass To you use this lens, stop looking at your game, and stop looking at games\n> like it. Instead, look everywhere else.\n\nAsk yourself these questions:\n\n- What is an experience I have had in my life that I would want to share with others?\n- In what small way can I capture the essence of that experience and put it into my game?", "# Lens #12: The Lens of the Problem Statement\nTo use this lens, think of your game as the solution to a problem. Ask yourself these questions:\n\n- What problem, or problems, am I really trying to solve?\n- Have I been making assumptions about this game that really have nothing to do with its true purpose?\n- Is a game really the best solution? Why?\n- How will I be able to tell if the problem is solved?\n\nDefining the constraints and goals for your game as a problem statement can help move you to a clear game design much more quickly.", "# Lens #13: The Lens of the Eight Filters\nTo use this lens, you must consider the many constraints your design must satisfy. You can only call your design finished when it can pass through all eight filters without requiring a change.\n\nAsk yourself the eight key questions:\n\n- Does this game feel right?\n- Will the intended audience like this game enough?\n- Is this a well-designed game?\n- Is this game novel enough?\n- Will this game sell?\n- Is it technically possible to build this game?\n- Does this game meet our social and community goals?\n- Do the playtesters enjoy this game enough?\n\nIn some situations, there may be still more filters; for example, an educa- tional game will also have to answer questions like “Does this game teach what it is supposed to?” If your design requires more filters, don’t neglect them.", "# Lens #14: The Lens of Risk Mitigation\nTo use this lens, stop thinking positively, and start seriously considering the things that could go horribly wrong with your game.\n\nAsk yourself these questions:\n\n- What could keep this game from being great?\n- How can we stop that from happening?\n\nRisk management is hard. It means you have to face up to the problems you would most like to avoid, and solve them immediately. But if you disci- pline yourself to do it, you’ll loop more times, and more usefully, and get a better game as a result. It is tempting to ignore potential problems and just work on the parts of your game you feel most confident about. You must resist this temptation and focus on the parts of your game that are in danger.", "# Lens #15: The Lens of the Toy\nTo use this lens, stop thinking about whether your game is fun to play, and start thinking about whether it is fun to play with.\n\nAsk yourself these questions:\n\n- If my game had no goal, would it be fun at all? If not, how can I change that?\n- When people see my game, do they want to start interacting with it, even before they know what to do? If not, how can I change that?\n\nThere are two ways to use the Lens of the Toy. One way is to use it on an existing game, to figure out how to add more toy-like qualities to it — that is, how to make it more approachable, and more fun to manipulate. But the sec- ond way, the braver way, is to use it to invent and create new toys before you even have any idea what games will be played with them. This is risky if you are on a schedule — but if you are not, it can be a great “divining rod” to help you find wonderful games you might not have discovered otherwise.", "# Lens #16: The Lens of the Player\nTo use this lens, stop thinking about your game, and start thinking about your player.\n\nAsk yourself these questions about the people who will play your game:\n\n- In general, what do they like?\n- What don’t they like? Why?\n- What do they expect to see in a game?\n- If I were in their place, what would I want to see in a game?\n- What would they like or dislike about my game in particular?\n\nA good game designer should always be thinking of the player, and should be an advocate for the player. Skilled designers hold The Lens of the Player and the Lens of Holographic Design in the same hand, thinking about the player, the experience of the game, and the mechanics of the game all at the same time. Thinking about the player is useful, but even more useful is watch- ing them play your game. The more you observe them playing, the more eas- ily you’ll be able to predict what they are going to enjoy.", "# Lens #17: The Lens of Pleasure\nTo use this lens, think about the kinds of pleasure your game does and does not provide.\n\nAsk yourself these questions:\n\n- What pleasures does your game give to players? Can these be improved?\n- What pleasures are missing from your experience? Why? Can they be added?\n\nUltimately, the job of a game is to give pleasure. By going through lists of known pleasures, and considering how well your game delivers each one, you may be inspired to make changes to your game that will increase your players’ enjoyment. Always be on the lookout, though, for unique, unclassified pleas- ures not found in most games — for one of these might be what gives your game the unique quality it needs.", "# Lens #18: The Lens of Flow\nTo use this lens, consider what is holding your player’s focus. Ask yourself these questions:\n\n- Does my game have clear goals? If not, how can I fix that?\n- Are the goals of the player the same goals I intended?\n- Are there parts of the game that distract players to the point they forget their goal? If so, can these distractions be reduced, or tied into the game goals?\n- Does my game provide a steady stream of not-too-easy, not-too-hard chal- lenges, taking into account the fact that the player’s skills may be gradually improving?\n- Are the player’s skills improving at the rate I had hoped? If not, how can I change that?", "# Lens #19: The Lens of Needs\nTo use this lens, stop thinking about your game, and start thinking about what basic human needs it fulfills.\n\nAsk yourself these questions:\n\n- On which levels of Maslow’s hierarchy is my game operating?\n- How can I make my game fulfill more basic needs than it already is?\n- On the levels my game is currently operating, how can it fulfill those needs even better?\n\nIt sounds strange to talk about a game fulfilling basic human needs, but every- thing that people do is an attempt to fulfill these needs in some way. And keep in mind, some games fulfill needs better than others — your game can’t just promise the need, it must deliver fulfillment of the need. If a player imagines that playing your game is going to make them feel better about themselves, or get to know their friends better, and your game doesn’t deliver on these needs, your player will move on to a game that does.", "# Lens #20: The Lens of Judgment\nTo decide if your game is a good judge of the players, ask yourself these questions:\n\n- What does your game judge about the players?\n- How does it communicate this judgment?\n- Do players feel the judgment is fair?\n- Do they care about the judgment?\n- Does the judgment make them want to improve?", "# Lens #21: The Lens of Functional Space\nTo use this lens, think about the space in which your game really takes place when all surface elements are stripped away.\n\nAsk yourself these questions:\n\n- Is the space of this game discrete or continuous?\n- How many dimensions does it have?\n- What are the boundaries of the space?\n- Are there sub-spaces? How are they connected?\n- Is there more than one useful way to abstractly model the space of this game?", "# Lens #22: The Lens of Dynamic State\nTo use this lens, think about what information changes during your game, and who is aware of it. Ask yourself these questions:\n\n- What are the objects in my game?\n- What are the attributes of the objects?\n- What are the possible states for each attribute? What triggers the state changes for each attribute?\n- What state is known by the game only?\n- What state is known by all players?\n- What state is known by some, or only one player?\n- Would changing who knows what state improve my game in some way?\n\nGame playing is decision making. Decisions are made based on information. Deciding the different attributes, their states, and who knows about them is core to the mechanics of your game. Small changes to who knows what infor- mation can radically change a game, sometimes for the better, sometimes for the worse. Who knows about what attributes can even change over the course of a game — a great way to create drama in your game is to make an impor- tant piece of private information suddenly become public.", "# Lens #23: The Lens of Emergence\nTo make sure your game has interesting qualities of emergence, ask yourself these questions:\n\n- How many verbs do my players have?\n- How many objects can each verb act on?\n- How many ways can players achieve their goals?\n- How many subjects do the players control?\n- How do side effects change constraints?", "# Lens #24: The Lens of Action\nTo use this lens, think about what your players can do and what they can’t, and why.\n\nAsk yourself these questions:\n\n- What are the operational actions in my game?\n- What are the resultant actions?\n- What resultant actions would I like to see? How can I change my game in order to make those possible?\n- Am I happy with the ratio of resultant to operational actions?\n- What actions do players wish they could do in my game that they cannot? Can I somehow enable these, either as operational or resultant actions?\n\nA game without actions is like a sentence without verbs — nothing happens. Deciding the actions in your game will be the most fundamental decision you can make as a game designer. Tiny changes to these actions will have tre- mendous ripple effects with the possibility of either creating marvelous emer- gent gameplay or making a game that is predictable and tedious. Choose your actions carefully, and learn to listen to your game and your players to learn what is made possible by your choices.", "# Lens #25: The Lens of Goals\nTo ensure the goals of your game are appropriate and well-balanced, ask your- self these questions:\n\n- What is the ultimate goal of my game?\n- Is that goal clear to players?\n- If there is a series of goals, do the players understand that?\n- Are the different goals related to each other in a meaningful way?\n- Are my goals concrete, achievable, and rewarding?\n- Do I have a good balance of short- and long-term goals?\n- Do players have a chance to decide on their own goals?", "# Lens #26: The Lens of Rules\nTo use this lens, look deep into your game, until you can make out its most basic structure. Ask yourself these questions:\n\n- What are the foundational rules of my game? How do these differ from the operational rules?\n- Are there “laws” or “house rules” that are forming as the game develops? Should these be incorporated into my game directly?\n- Are there different modes in my game? Do these modes make things sim- pler, or more complex? Would the game be better with fewer modes? More modes?\n- Who enforces the rules?\n- Are the rules easy to understand, or is there confusion about them? If there is confusion, should I fix it by changing the rules or by explaining them more clearly?\n\nThere is a common misconception that designers make games by sitting down and writing a set of rules. This usually isn’t how it happens at all. A game’s rules are arrived at gradually and experimentally. The designer’s mind gener- ally works in the domain of “operational rules,” occasionally switching to the perspective of “foundational rules” when thinking about how to change or improve the game. The “written rules” usually come toward the end, once the game is playable. Part of the designer’s job is to make sure there are rules that cover every circumstance. Be sure to take careful notes as you playtest, because it is during these tests that holes in your rules will appear — if you just patch them quickly and don’t make a note, the same hole will just show up again later. A game is its rules — give them the time and consideration that they deserve.", "# Lens #27: The Lens of Skill\nTo use this lens, stop looking at your game, and start looking at the skills you are asking of your players.\n\nAsk yourself these questions:\n\n- What skills does my game require from the player?\n- Are there categories of skill that this game is missing?\n- Which skills are dominant?\n- Are these skills creating the experience I want?\n- Are some players much better at these skills than others? Does this make the game feel unfair?\n- Can players improve their skills with practice?\n- Does this game demand the right level of skill?\n\nExercising skills can be a joyful thing — it is one of the reasons that people love games. Of course, it is only joyful if the skills are interesting and reward- ing, and if the challenge level strikes that ideal balance between “too easy” and “too hard.” Even dull skills (such as pushing buttons) can be made more interesting by dressing them up as virtual skills and providing the right level of challenge. Use this lens as a window into the experience the player is having. Because skills do so much to define experience, the Lens of Skill works quite well in conjunction with Lens #1: The Lens of Essential Experience.", "# Lens #28: The Lens of Expected Value\nTo use this lens, think about the chance of different events occurring in your game, and what those mean to your player.\n\nAsk yourself these questions:\n\n- What is the actual chance of a certain event occurring?\n- What is the perceived chance?\n- What value does the outcome of that event have? Can the value be quanti- fied? Are there intangible aspects of value that I am not considering?\n- Each action a player can take has a different expected value when I add up all the possible outcomes. Am I happy with these values? Do they give the player interesting choices? Are they too rewarding, or too punishing?\n\nExpected value is one of your most valuable tools for analyzing game balance. The challenge of using it is finding a way to numerically represent everything that can happen to a player. Gaining and losing money is easy to represent. But what is the numerical value of “boots of speed” that let you run faster, or a “warp gate” that lets you skip two levels? These are difficult to quantify per- fectly — but that doesn’t mean you can’t take a guess. As we’ll see in Chapter 11, as you go through multiple iterations of game testing, tweaking parameters and values in your game, you will also be tweaking your own estimations of the values of different outcomes. Quantifying these less tangible elements can be quite enlightening, because it makes you think concretely about what is valuable to the player and why — and this concrete knowledge will put you in control of the balance of your game.", "# Lens #29: The Lens of Chance\nTo use this lens focus on the parts of your game that involve randomness and risk, keeping in mind that those two things are not the same.\n\nAsk yourself these questions:\n\n- What in my game is truly random? What parts just feel random?\n- Does the randomness give the players positive feelings of excitement and challenge, or does it give them negative feelings of hopelessness and lack of control?\n- Would changing my probability distribution curves improve my game?\n- Do players have the opportunity to take interesting risks in the game?\n- What is the relationship between chance and skill in my game? Are there ways I can make random elements feel more like the exercise of a skill? Are there ways I can make exercising skills feel more like risk-taking?\n\nRisk and randomness are like spices. A game without any hint of them can be completely bland, but put in too much and they overwhelm everything else. But get them just right, and they bring out the flavor of everything else in your game. Unfortunately, using them in your game is not as simple as sprinkling them on top. You must look into your game to see where elements of risk and randomness naturally arise, and then decide how you can best tame them to do your bidding. Don’t fall into the trap of thinking that elements of chance only occur around die rolls or randomly generated numbers. On the contrary, you can find them wherever a player encounters the unknown.", "# Lens #30: The Lens of Fairness\nTo use the Lens of Fairness, think carefully about the game from each player’s point of view. Taking into account each player’s skill level, find a way to give each player a chance of winning that each will consider to be fair.\n\nAsk yourself these questions:\n\n- Should my game be symmetrical? Why?\n- Should my game be asymmetrical? Why?\n- Which is more important: that my game is a reliable measure of who has the most skill, or that it provide an interesting challenge to all players?\n- If I want players of different skill levels to play together, what means will I use to make the game interesting and challenging for everyone?\n\nFairness can be a slippery subject. There are some cases where one side has an advantage over the other, and the game still seems fair. Sometimes this is so that players of unequal skill can play together, but there can be other reasons. In the game Alien vs. Predator, for example, it is generally recognized that in multiplayer mode, Predators have a significant advantage over the Aliens. Players do not consider it to be unfair, however, because it is in keeping with the Alien vs. Predator story world, and they accept that if they play as an Alien, they will be at a disadvantage and will need to compensate for that with extra skill. It is a badge of pride among players to be able to win the game when playing as an Alien.", "# Lens #31: The Lens of Challenge\nChallenge is at the core of almost all gameplay. You could even say that a game is defined by its goals and its challenges. When examining the chal- lenges in your game, ask yourself these questions:\n\n- What are the challenges in my game?\n- Are they too easy, too hard, or just right?\n- Can my challenges accommodate a wide variety of skill levels?\n- How does the level of challenge increase as the player succeeds?\n- Is there enough variety in the challenges?\n- What is the maximum level of challenge in my game?", "# Lens #32: The Lens of Meaningful Choices\nWhen we make meaningful choices, it lets us feel like the things we do matter. To use this lens, ask yourself these questions:\n\n- What choices am I asking the player to make?\n- Are they meaningful? How?\n- Am I giving the player the right number of choices? Would more make them feel more powerful? Would less make the game clearer?\n- Are there any dominant strategies in my game?", "# Lens #33: The Lens of Triangularity\nGiving a player the choice to play it safe for a low reward, or to take a risk for a big reward is a great way to make your game interesting and exciting. To use the Lens of Triangularity, ask yourself these questions:\n\n- Do I have triangularity now? If not, how can I get it?\n- Is my attempt at triangularity balanced? That is, are the rewards commensurate with the risks?\n\nOnce you start looking for triangularity in games, you will see it everywhere. A dull, monotonous game can quickly become exciting and rewarding when you add a dash of triangularity.", "# Lens #34: The Lens of Skill vs. Chance\nTo help determine how to balance skill and chance in your game, ask yourself these questions:\n\n- Are my players here to be judged (skill), or to take risks (chance)?\n- Skill tends to be more serious than chance: Is my game serious or casual?\n- Are parts of my game tedious? If so, will adding elements of chance enliven them?\n- Do parts of my game feel too random? If so, will replacing elements of chance with elements of skill or strategy make the players feel more in control?", "# Lens #35: The Lens of Head and Hands\nYogi Berra once said “Baseball is 90% mental. The other half is physical.” To make sure your game has a more realistic balance of mental and physical ele- ments, use the Lens of Head and Hands. Ask yourself these questions:\n\n- Are my players looking for mindless action, or an intellectual challenge?\n- Would adding more places that involve puzzle-solving in my game make it more interesting?\n- Are there places where the player can relax their brain, and just play the game without thinking?\n- Can I give the player a choice — either succeed by exercising a high level of dexterity, or by finding a clever strategy that works with a minimum of physical skill?\n- If “1” means all physical, and “10” means all mental, what number would my game get?\n- This lens works particularly well when used in conjunction with Lens #16: Lens of the Player.", "# Lens #36: The Lens of Competition\nDetermining who is most skilled at something is a basic human urge. Games of competition can satisfy that urge. Use this lens to be sure your competitive game makes people want to win it. Ask yourself these questions:\n\n- Does my game give a fair measurement of player skill?\n- Do people want to win my game? Why?\n- Is winning this game something people can be proud of? Why?\n- Can novices meaningfully compete at my game?\n- Can experts meaningfully compete at my game?\n- Can experts generally be sure they will defeat novices?", "# Lens #37: The Lens of Cooperation\nCollaborating and succeeding as a team is a special pleasure that can create lasting social bonds. Use this lens to study the cooperative aspects of your game. Ask these questions:\n\n- Cooperation requires communication. Do my players have enough opportu- nity to communicate? How could communication be enhanced?\n- Are my players friends already, or are they strangers? If they are strangers, can I help them break the ice?\n- Is there synergy (2 + 2 = 5) or antergy (2 + 2 = 3)when the players work together? Why?\n- Do all the players have the same role, or do they have special jobs?\n- Cooperation is greatly enhanced when there is no way an individual can do a task alone. Does my game have tasks like that?\n- Tasks that force communication inspire cooperation. Do any of my tasks force communication?", "# Lens #38: The Lens of Competition vs. Cooperation\nBalancing competition and cooperation can be done in many interesting ways. Use this lens to decide whether they are balanced properly in your game. Ask these questions:\n\n- If “1” is Competition and “10” is Cooperation, what number should my game get?\n- Can I give players a choice whether to play cooperatively or competitively?\n- Does my audience prefer competition, cooperation, or a mix?\n- Is team competition something that makes sense for my game? Is my game more fun with team competition, or with solo competition?", "# Lens #39: The Lens of Time\nIt is said that “timing is everything.” Our goal as designers is to create experi- ences, and experiences are easily spoiled when they are too short or too long. Ask these questions to make yours just the right length:\n\n- What is it that determines the length of my gameplay activities?\n- Are my players frustrated because the game ends too early? How can I change that?\n- Are my players bored because the game goes on for too long? How can I change that?\n- Setting a time limit can make gameplay more exciting. Is it a good idea for my game?\n- Would a hierarchy of time structures help my game? That is, several short rounds that together comprise a larger round? Timing can be very difficult to get right, but it can make or break a game. Often, it makes sense to follow the old vaudevillian adage of “Leave ’em want- ing more.”", "# Lens #40: The Lens of Reward\nEveryone likes to be told they are doing a good job. Ask these questions to determine if your game is giving out the right rewards in the right amounts at the right times:\n\n- What rewards is my game giving out now? Can it give out others as well?\n- Are players excited when they get rewards in my game, or are they bored by them? Why?\n- Getting a reward you don’t understand is like getting no reward at all. Do my players understand the rewards they are getting?\n- Are the rewards my game gives out too regular? Can they be given out in a more variable way?\n- How are my rewards related to one another? Is there a way that they could be better connected?\n- How are my rewards building? Too fast, too slow, or just right? Balancing rewards is different for every game. Not only does a designer have to worry about giving out the right ones, but giving them at the right times in the right amounts. This can only be determined through trial and error — even then, it probably won’t be right for everyone. When trying to balance rewards, it is hard to be perfect — you often have to settle for “good enough.”", "# Lens #41: The Lens of Punishment\nPunishment must be used delicately, since after all, players are in a game of their own free will. Balanced appropriately, it will give everything in your game more meaning, and players will have a real sense of pride when they succeed at your game. To examine the punishment in your game, ask yourself these questions:\n\n- What are the punishments in my game?\n- Why am I punishing the players? What do I hope to achieve by it?\n- Do my punishments seem fair to the players? Why or why not?\n- Is there a way to turn these punishments into rewards and get the same, or a better effect?\n- Are my strong punishments balanced against commensurately strong rewards?", "# Lens #42: The Lens of Simplicity/Complexity\nStriking the right balance between simplicity and complexity is difficult and must be done for the right reasons. Use this lens to help your game become one in which meaningful complexity arises out of a simple system. Ask your- self these questions:\n\n- What elements of innate complexity do I have in my game?\n- Is there a way this innate complexity could be turned into emergent complexity?\n- Do elements of emergent complexity arise from my game? If not, why not?\n- Are there elements of my game that are too simple?", "# Lens #43: The Lens of Elegance\nMost “classic games” are considered to be masterpieces of elegance. Use this lens to make your game as elegant as possible. Ask yourself these questions:\n\n● What are the elements of my game?\n● What are the purposes of each element? Count these up to give the element an “elegance rating.”\n● For elements with only one or two purposes, can some of these be com- bined into each other, or removed altogether?\n● For elements with several purposes, is it possible for them to take on even more?", "# Lens #44: The Lens of Character\nElegance and character are opposites. They are like miniature versions of sim- plicity and complexity, and must be kept in balance. To make sure your game has lovable, defining quirks, ask yourself these questions:\n\n● Is there anything strange in my game that players talk about excitedly?\n● Does my game have funny qualities that make it unique?\n● Does my game have flaws that players like?", "# Lens #45: The Lens of Imagination\nAll games have some element of imagination and some element of connection to reality. Use this lens to help find the balance between detail and imagina- tion. Ask yourself these questions:\n\n● What must the player understand to play my game?\n● Can some element of imagination help them understand that better?\n● What high-quality, realistic details can we provide in this game?\n● What details would be low quality if we provided them? Can imagination fill the gap instead?\n● Can I give details that the imagination will be able to reuse again and again?\n● What details I provide inspire imagination?\n● What details I provide stifle imagination?", "# Lens #46: The Lens of Economy\nGiving a game an economy can give it surprising depth and a life all its own. But like all living things, it can be difficult to control. Use this lens to keep your economy in balance:\n\n● How can my players earn money? Should there be other ways?\n● What can my players buy? Why?\n● Is money too easy to get? Too hard? How can I change this?\n● Are choices about earning and spending meaningful ones?\n● Is a universal currency a good idea in my game, or should there be special- ized currencies?", "# Lens #47: The Lens of Balance\nThere are many types of game balance, and each is important. However, it is easy to get lost in the details and forget the big picture. Use this simple lens to get out of the mire, and ask yourself the only important question:\n\n● Does my game feel right? Why or why not?", "# Lens #48: The Lens of Accessibility\nWhen you present a puzzle to players (or a game of any kind), they should be able to clearly visualize what their first few steps would be. Ask yourself these questions:\n\n● How will players know how to begin solving my puzzle, or playing my game? Do I need to explain it, or is it self-evident?\n● Does my puzzle or game act like something they have seen before? If it does, how can I draw attention to that similarity. If it does not, how can I make them understand how it does behave?\n● Does my puzzle or game draw people in, and make them want to touch it and manipulate it? If not, how I can I change it so that it does?", "# Lens #49: The Lens of Visible Progress\nPlayers need to see that they are making progress when solving a difficult prob- lem. To make sure they are getting this feedback, ask yourself these questions:\n\n● What does it mean to make progress in my game or puzzle?\n● Is there enough progress in my game? Is there a way I can add more interim steps of progressive success?\n● What progress is visible, and what progress is hidden? Can I find a way to reveal what is hidden?", "# Lens #50: The Lens of Parallelism\nParallelism in your puzzle brings parallel benefits to the player’s experience. To use this lens, ask yourself these questions:\n\n● Are there bottlenecks in my design where players are unable to proceed if they cannot solve a particular challenge? If so, can I add parallel challenges for a player to work on when this challenge stumps them?\n● If parallel challenges are too similar, the parallelism offers little benefit. Are my parallel challenges different enough from each other to give players the benefit of variety?\n● Can my parallel challenges be connected somehow? Is there a way that making progress on one can make it easier to solve the others?", "# Lens #51: The Lens of the Pyramid\nPyramids fascinate us because they have a singular highest point. To give your puzzle the allure of the ancient pyramids, ask yourself these questions:\n\n● Is there a way all the pieces of my puzzle can feed into a singular challenge at the end?\n● Big pyramids are often made of little pyramids — can I have a hierarchy of ever more challenging puzzle elements, gradually leading to a final challenge?\n● Is the challenge at the top of my pyramid interesting, compelling, and clear? Does it make people want to work in order to get to it?", "# Lens #52: The Lens of the Puzzle\nPuzzles make the player stop and think. To ensure your puzzles are doing eve- rything you want to shape the player experience, ask yourself these questions:\n\n● What are the puzzles in my game?\n● Should I have more puzzles, or less? Why?\n● Which of the ten puzzle principles apply to each of my puzzles?\n● Do I have any incongruous puzzles? How can I better integrate them into the game? (Use Lens #43: The Lens of Elegance to help do this).\n\nIn the last few chapters, we have focused on game internals — it is now time to consider an external element — the interface of the game.?", "# Lens #53: The Lens of Control\nThis lens has uses beyond just examining your interface, since meaningful control is essential for immersive interactivity. To use this lens, ask yourself these questions:\n\n● When players use the interface, does it do what is expected? If not, why not?\n● Intuitive interfaces give a feeling of control. Is your interface easy to master, or hard to master?\n● Do your players feel they have a strong influence over the outcome of the game? If not, how can you change that?\n● Feeling powerful  feeling in control. Do your players feel powerful? Can you make them feel more powerful somehow?", "#Lens #54: The Lens of Physical Interface\nSomehow, the player has a physical interaction with your game. Copying exist- ing physical interfaces is an easy trap to fall into. Use this lens to be sure that your physical interface is well-suited to your game by asking these questions:\n\n● What does the player pick up and touch? Can this be made more pleasing?\n● How does this map to the actions in the game world? Can the mapping be more direct?\n● If you can’t create a custom physical interface, what metaphor are you using when you map the inputs to the game world?\n● How does the physical interface look under the Lens of the Toy?\n● How does the player see, hear, and touch the world of the game? Is there a way to include a physical output device that will make the world become more real in the player’s imagination? The world of videogames occasionally goes through dry spells where designers feel it is not feasible to create custom physical interfaces. But the marketplace thrives on experimentation and novelty, and suddenly specially crafted physical interfaces, like the Dance Dance Revolution mat, the Guitar Hero guitar, and the Wiimote appear, bringing new life to old gameplay by giv- ing players a new way to interact with old game mechanics.", "# Lens #55: The Lens of Virtual Interface\nDesigning virtual interfaces can be very tricky. Done poorly, they become a wall between the player and the game world. Done well, they amplify the power and control a player has in the game world. Ask these questions to make sure that your virtual interface is enhancing player experience as much as possible:\n\n● What information does a player need to receive that isn’t obvious just by looking at the game world?\n● When does the player need this information? All the time? Only occasion- ally? Only at the end of a level?\n● How can this information be delivered to the player in a way that won’t interfere with the player’s interactions with the game world?", "# Lens #56: The Lens of Transparency\nThe ideal interface becomes invisible to the player letting the player’s imagi- nation be completely immersed in the game world. To ensure invisibility, ask yourself these questions:\n\n● What are the players desires? Does the interface let the players do what they want?\n● Is the interface simple enough that with practice, players will be able to use it without thinking?\n● Do new players find the interface intuitive? If not, can it be made more intui- tive, somehow? Would allowing players to customize the controls help, or hurt?\n● Does the interface work well in all situations, or are there cases (near a corner, going very fast, etc.) when it behaves in ways that will confuse the player?\n● Can players continue to use the interface well in stressful situations, or do they start fumbling with the controls, or missing crucial information? If so, how can this be improved?\n● Does something confuse players about the interface? On which of the six interface arrows is it happening?", "# Lens #57: The Lens of Feedback\nThe feedback a player gets from the game is many things: judgment, reward, instruction, encouragement, and challenge. Use this lens to be sure your feed- back loop is creating the experience you want by asking these questions at every moment in your game:\n\n● What do players need to know at this moment?\n● What do players want to know at this moment?\n● What do you want players to feel at this moment? How can you give feed- back that creates that feeling?\n● What do the players want to feel at this moment? Is there an opportunity for them to create a situation where they will feel that?\n● What is the player’s goal at this moment? What feedback will help them toward that goal?\n\nUsing this lens takes some effort, since feedback in a game is continuous, but needs to be different in different situations. It takes a lot of mental effort to use this lens in every moment of your game, but it is time well spent, because it will help guarantee that the game is clear, challenging, and rewarding.", "# Lens #58: The Lens of Juiciness\nTo call an interface “juicy” might seem kind of silly — although it is very com- mon to hear an interface with very little feedback described as “dry.” Juicy interfaces are fun the moment you pick them up. To maximize juiciness, ask yourself these questions:\n\n● Is my interface giving the player continuous feedback for their actions? If not, why not?\n● Is second-order motion created by the actions of the player? Is this motion powerful and interesting?\n● Juicy systems reward the player many ways at once. When I give the player a reward, how many ways am I simultaneously rewarding them? Can I find more ways?", "# Lens #59: The Lens of Channels and Dimensions\nChoosing how to map game information to channels and dimensions is the heart of designing your game interface. Use this lens to make sure you do it thoughtfully and well. Ask yourself these questions:\n\n● What data need to travel to and from the player?\n● Which data are most important?\n● What channels do I have available to transmit this data?\n● Which channels are most appropriate for which data? Why?\n● Which dimensions are available on the different channels?\n● How should I use those dimensions?", "# Lens #60: The Lens of Modes\nAn interface of any complexity is going to require modes. To make sure your modes make the player feel powerful and in control and do not confuse or overwhelm, ask yourself these questions:\n\n● What modes do I need in my game? Why?\n● Can any modes be collapsed, or combined?\n● Are any of the modes overlapping? If so, can I put them on different input channels?\n● When the game changes modes, how does the player know that? Can the game communicate the mode change in more than one way?", "# Lens #61: The Lens of the Interest Curve\nExactly what captivates the human mind often seems different for every per- son, but the most pleasurable patterns of that captivation are remarkably similar for everyone. To see how a player’s interest in your experience changes over time, ask yourself these questions:\n\n● If I draw an interest curve of my experience, how is it generally shaped?\n● Does it have a hook?\n● Does it have gradually rising interest, punctuated by periods of rest?\n● Is there a grand finale, more interesting than everything else?\n● What changes would give me a better interest curve?\n● Is there a fractal structure to my interest curve? Should there be?\n● Do my intuitions about the interest curve match the observed interest of the players? If I ask playtesters to draw an interest curve, what does it look like? Since all players are different, you may find it quite useful to use the Lens of the Interest Curve and Lens #16: The Lens of the Player at the same time, creating a unique interest curve for each of the types of players your game is trying to reach.", "# Lens #62: The Lens of Inherent Interest\nSome things are just interesting. Use this lens to be sure your game has inher- ently interesting qualities by asking these questions:\n\n● What aspects of my game will capture the interest of a player immediately?\n● Does my game let the player see or do something they have never seen or done before?\n● What base instincts does my game appeal to? Can it appeal to more of them?\n● What higher instincts does my game appeal to? Can it appeal to more of those?\n● Does dramatic change and anticipation of dramatic change happen in my game? How can it be more dramatic?", "# Lens #63: The Lens of Beauty\nWe love to experience things of great beauty. Use this lens to make your game a joy forever by asking yourself these questions:\n\n● What elements make up my game? How can each one can be more beautiful?\n● Some things are not beautiful in themselves, but are beautiful in combi- nation. How can the elements of my game be composed in a way that is poetic and beautiful?\n● What does beauty mean within the context of my game?", "# Lens #64: The Lens of Projection\nOne key indicator that someone is enjoying an experience is that they have projected their imaginations into it. When they do this, their enjoyment of the experience increases significantly, in a sort of virtuous circle. To examine whether your game is well-suited to induce projection from your players, ask yourself these questions:\n\n● What is there in my game that players can relate to? What else can I add?\n● What is there in my game that will capture a player’s imagination? What else can I add?\n● Are there places in the game that players have always wanted to visit?\n● Does the player get to be a character they could imagine themselves to be?\n● Are there other characters in the game that the players would be interested to meet (or to spy on)?\n● Do the players get to do things that they would like to do in real life, but can’t?\n● Is there an activity in the game that once a player starts doing, it is hard to stop?", "# Lens #65: The Lens of the Story Machine\nA good game is a machine that generates stories when people play it. To make sure your story machine is as productive as possible, ask yourself these questions:\n\n● When players have different choices about how to achieve goals, new and different stories can arise. How can I add more of these choices?\n● Different conflicts lead to different stories. How can I allow more types of conflict to arise from my game?\n● When players can personalize the characters and setting, they will care more about story outcomes, and similar stories can start to feel very differ- ent. How can I let players personalize the story?\n● Good stories have good interest curves. Do my rules lead to stories with good interest curves?\n● A story is only good if you can tell it. Who can your players tell the story to that will actually care?", "# Lens #66: The Lens of the Obstacle\nA goal with no obstacles is not worth pursuing. Use this lens to make sure your obstacles are ones that your players will want to overcome.\n\n● What is the relationship between the main character and the goal? Why does the character care about it?\n● What are the obstacles between the character and the goal?\n● Is there an antagonist who is behind the obstacles? What is the relationship between the protagonist and the antagonist?\n● Do the obstacles gradually increase in difficulty?\n● Some say “The bigger the obstacle, the better the story.” Are your obstacles big enough? Can they be bigger?\n● Great stories often involve the protagonist transforming in order to over- come the obstacle. How does your protagonist transform?", "# Lens #67: The Lens of Simplicity and Transcendence\nTo make sure you have the right mix of simplicity and transcendence, ask yourself these questions:\n\n● How is my world simpler than the real world? Can it be simpler in other ways?\n● What kind of transcendent power do I give to the player? How can I give even more without removing challenge from the game?\n● Is my combination of simplicity and transcendence contrived, or does it provide my players with a special kind of wish fulfillment?", "# Lens #68: The Lens of the Hero’s Journey\nMany heroic stories have similar structure. Use this lens to make sure you haven’t missed out on any elements that might improve your story. Ask your- self these questions:\n\n● Does my story have elements that qualify it as a heroic story?\n● If so, how does it match up with the structure of the Hero’s Journey?\n● Would my story be improved by including more archetypical elements?\n● Does my story match this form so closely that it feels hackneyed?", "# Lens #69: The Lens of the Weirdest Thing\nHaving weird things in your story can help give meaning to unusual game mechanics — it can capture the interest of the player, and it can make your world seem special. Too many things that are too weird, though, will render your story puzzling and inaccessible. To make sure your story is the good kind of weird, ask yourself these questions:\n\n● What’s the weirdest thing in my story?\n● How can I make sure that the weirdest thing doesn’t confuse or alienate the player?\n● If there are multiple weird things, should I may be get rid of, or coalesce, some of them?\n● If there is nothing weird in my story, is the story still interesting?", "# Lens #70: The Lens of Story\nAsk yourself these questions:\n\n● Does my game really need a story? Why?\n● Why will players be interested in this story?\n● How does the story support the other parts of the tetrad (aesthetics, tech- nology, gameplay)? Can it do a better job?\n● How do the other parts of the tetrad support the story? Can they do a better job?\n● How can my story be better?", "# Lens #71: The Lens of Freedom\nA feeling of freedom is one of the things that separates games from other forms of entertainment. To make sure your players feel as free as possible, ask yourself these questions:\n\n● When do my players have freedom of action? Do they feel free at these times?\n● When are they constrained? Do they feel constrained at these times?\n● Are there any places I can let them feel more free than they do now?\n● Are there any places where they are overwhelmed by too much freedom?"];

}).call(this);
// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function Markdown(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if (dialect in Markdown.dialects) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = require('util');
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if (line != undefined)
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf('\n', i+1) ) !== -1) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  // [\s\S] matches _anything_ (newline or space)
  var re = /([\s\S]+?)($|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if (typeof print !== "undefined")
      print.apply( print, args );
  if (typeof console !== "undefined" && typeof console.log !== "undefined")
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if (b.length) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if (next.length) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, '').substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while (true);

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if (loose) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if (nl && li.length > 1) inline.unshift(nl);

        for (var i=0; i < inline.length; i++) {
          var what = inline[i],
              is_str = typeof what == "string";
          if (is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          break;
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if (last_li[1] instanceof Array && last_li[1][0] == "para") {
          return;
        }
        if (i+1 == stack.length) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for (var line_no=0; line_no < lines.length; line_no++) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for (i = 0; i < stack.length; i++) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1 );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if (wanted_depth <= stack.length) {
                    stack.splice(wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if (l.length > m[0].length) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if (contained.length > 0) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if (hr) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [];

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
        }

        // reassemble!
        block = lines.join( "\n" );
        jsonml.push.apply( jsonml, this.processBlock( prev.join( "\n" ), [] ) );
      }

      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = new String(block + block.trailing + b);
        block.trailing = b.trailing;
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, '' ),
          old_tree = this.tree;
      jsonml.push( this.toTree( input, [ "blockquote" ] ) );

      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if (m[4] !== undefined)
          ref.title = m[4];
        else if (m[5] !== undefined)
          ref.title = m[5];

      } );

      if (b.length)
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if (typeof x == "string" && typeof out[out.length-1] == "string")
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( text.match( /^\\[\\`\*_{}\[\]()#\+.!\-]/ ) )
        return [ 2, text[1] ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), ']' );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, '[' ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == '<' && url[url.length-1] == '>' )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for (var len = 0; len < url.length; len++) {
            switch ( url[len] ) {
            case '(':
              open_parens++;
              break;
            case ')':
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the '['
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if (this[state_slot][0] == md) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if (last instanceof CloseTag) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if (pattern != undefined) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text[ consumed ] == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr['class'] ) {
        attr['class'] = attr['class'] + meta[ i ].replace( /./, " " );
      }
      else {
        attr['class'] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( arguments.callee( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if (typeof options.preprocessTreeNode === "function") {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
      i = 2;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = arguments.callee( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      arguments.callee( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( typeof exports === "undefined" ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );
