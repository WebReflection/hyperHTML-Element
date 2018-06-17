var HyperHTMLElement = (function (exports) {
  'use strict';

  const G = document.defaultView;

  // Node.CONSTANTS
  // 'cause some engine has no global Node defined
  // (i.e. Node, NativeScript, basicHTML ... )
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;
  const COMMENT_NODE = 8;
  const DOCUMENT_FRAGMENT_NODE = 11;

  // HTML related constants
  const VOID_ELEMENTS = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;

  // SVG related constants
  const OWNER_SVG_ELEMENT = 'ownerSVGElement';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  // Custom Elements / MutationObserver constants
  const CONNECTED = 'connected';
  const DISCONNECTED = 'dis' + CONNECTED;

  // hyperHTML related constants
  const EXPANDO = '_hyper: ';
  const SHOULD_USE_TEXT_CONTENT = /^style|textarea$/i;
  const UID = EXPANDO + ((Math.random() * new Date) | 0) + ';';
  const UIDC = '<!--' + UID + '-->';

  // you know that kind of basics you need to cover
  // your use case only but you don't want to bloat the library?
  // There's even a package in here:
  // https://www.npmjs.com/package/poorlyfills

  // used to dispatch simple events
  let Event = G.Event;
  try {
    new Event('Event');
  } catch(o_O) {
    Event = function (type) {
      const e = document.createEvent('Event');
      e.initEvent(type, false, false);
      return e;
    };
  }

  // used to store template literals
  /* istanbul ignore next */
  const Map = G.Map || function Map() {
    const keys = [], values = [];
    return {
      get(obj) {
        return values[keys.indexOf(obj)];
      },
      set(obj, value) {
        values[keys.push(obj) - 1] = value;
      }
    };
  };

  // used to store wired content
  let ID = 0;
  const WeakMap = G.WeakMap || function WeakMap() {
    const key = UID + ID++;
    return {
      get(obj) { return obj[key]; },
      set(obj, value) {
        Object.defineProperty(obj, key, {
          configurable: true,
          value
        });
      }
    };
  };

  // used to store hyper.Components
  const WeakSet = G.WeakSet || function WeakSet() {
    const wm = new WeakMap;
    return {
      add(obj) { wm.set(obj, true); },
      has(obj) { return wm.get(obj) === true; }
    };
  };

  // used to be sure IE9 or older Androids work as expected
  const isArray = Array.isArray || (toString =>
    arr => toString.call(arr) === '[object Array]'
  )({}.toString);

  const trim = UID.trim || function () {
    return this.replace(/^\s+|\s+$/g, '');
  };

  // hyperHTML.Component is a very basic class
  // able to create Custom Elements like components
  // including the ability to listen to connect/disconnect
  // events via onconnect/ondisconnect attributes
  // Components can be created imperatively or declaratively.
  // The main difference is that declared components
  // will not automatically render on setState(...)
  // to simplify state handling on render.
  function Component() {
    return this; // this is needed in Edge !!!
  }

  // Component is lazily setup because it needs
  // wire mechanism as lazy content
  function setup(content) {
    // there are various weakly referenced variables in here
    // and mostly are to use Component.for(...) static method.
    const children = new WeakMap;
    const create = Object.create;
    const createEntry = (wm, id, component) => {
      wm.set(id, component);
      return component;
    };
    const get = (Class, info, context, id) => {
      const relation = info.get(Class) || relate(Class, info);
      switch (typeof id) {
        case 'object':
        case 'function':
          const wm = relation.w || (relation.w = new WeakMap);
          return wm.get(id) || createEntry(wm, id, new Class(context));
        default:
          const sm = relation.p || (relation.p = create(null));
          return sm[id] || (sm[id] = new Class(context));
      }
    };
    const relate = (Class, info) => {
      const relation = {w: null, p: null};
      info.set(Class, relation);
      return relation;
    };
    const set = context => {
      const info = new Map;
      children.set(context, info);
      return info;
    };
    // The Component Class
    Object.defineProperties(
      Component,
      {
        // Component.for(context[, id]) is a convenient way
        // to automatically relate data/context to children components
        // If not created yet, the new Component(context) is weakly stored
        // and after that same instance would always be returned.
        for: {
          configurable: true,
          value(context, id) {
            return get(
              this,
              children.get(context) || set(context),
              context,
              id == null ?
                'default' : id
            );
          }
        }
      }
    );
    Object.defineProperties(
      Component.prototype,
      {
        // all events are handled with the component as context
        handleEvent: {value(e) {
          const ct = e.currentTarget;
          this[
            ('getAttribute' in ct && ct.getAttribute('data-call')) ||
            ('on' + e.type)
          ](e);
        }},
        // components will lazily define html or svg properties
        // as soon as these are invoked within the .render() method
        // Such render() method is not provided by the base class
        // but it must be available through the Component extend.
        // Declared components could implement a
        // render(props) method too and use props as needed.
        html: lazyGetter('html', content),
        svg: lazyGetter('svg', content),
        // the state is a very basic/simple mechanism inspired by Preact
        state: lazyGetter('state', function () { return this.defaultState; }),
        // it is possible to define a default state that'd be always an object otherwise
        defaultState: {get() { return {}; }},
        // setting some property state through a new object
        // or a callback, triggers also automatically a render
        // unless explicitly specified to not do so (render === false)
        setState: {value(state, render) {
          const target = this.state;
          const source = typeof state === 'function' ? state.call(this, target) : state;
          for (const key in source) target[key] = source[key];
          if (render !== false) this.render();
          return this;
        }}
      }
    );
  }

  // instead of a secret key I could've used a WeakMap
  // However, attaching a property directly will result
  // into better performance with thousands of components
  // hanging around, and less memory pressure caused by the WeakMap
  const lazyGetter = (type, fn) => {
    const secret = '_' + type + '$';
    return {
      get() {
        return this[secret] || (this[type] = fn.call(this, type));
      },
      set(value) {
        Object.defineProperty(this, secret, {configurable: true, value});
      }
    };
  };

  const intents = {};
  const keys = [];
  const hasOwnProperty = intents.hasOwnProperty;

  let length = 0;

  var Intent = {

    // hyperHTML.define('intent', (object, update) => {...})
    // can be used to define a third parts update mechanism
    // when every other known mechanism failed.
    // hyper.define('user', info => info.name);
    // hyper(node)`<p>${{user}}</p>`;
    define: (intent, callback) => {
      if (!(intent in intents)) {
        length = keys.push(intent);
      }
      intents[intent] = callback;
    },

    // this method is used internally as last resort
    // to retrieve a value out of an object
    invoke: (object, callback) => {
      for (let i = 0; i < length; i++) {
        let key = keys[i];
        if (hasOwnProperty.call(object, key)) {
          return intents[key](object[key], callback);
        }
      }
    }
  };

  // these are tiny helpers to simplify most common operations needed here
  const create = (node, type) => doc(node).createElement(type);
  const doc = node => node.ownerDocument || node;
  const fragment = node => doc(node).createDocumentFragment();
  const text = (node, text) => doc(node).createTextNode(text);

  // TODO:  I'd love to code-cover RegExp too here
  //        these are fundamental for this library

  const spaces = ' \\f\\n\\r\\t';
  const almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
  const attrName = '[ ' + spaces + ']+' + almostEverything;
  const tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
  const attrPartials = '(?:=(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';

  const attrSeeker = new RegExp(
    tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)',
    'g'
  );

  const selfClosing = new RegExp(
    tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)',
    'g'
  );

  const testFragment = fragment(document);

  // DOM4 node.append(...many)
  const hasAppend = 'append' in testFragment;

  // detect old browsers without HTMLTemplateElement content support
  const hasContent = 'content' in create(document, 'template');

  // IE 11 has problems with cloning templates: it "forgets" empty childNodes
  testFragment.appendChild(text(testFragment, 'g'));
  testFragment.appendChild(text(testFragment, ''));
  const hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;

  // old browsers need to fallback to cloneNode
  // Custom Elements V0 and V1 will work polyfilled
  // but native implementations need importNode instead
  // (specially Chromium and its old V0 implementation)
  const hasImportNode = 'importNode' in document;

  // appends an array of nodes
  // to a generic node/fragment
  // When available, uses append passing all arguments at once
  // hoping that's somehow faster, even if append has more checks on type
  const append = hasAppend ?
    (node, childNodes) => {
      node.append.apply(node, childNodes);
    } :
    (node, childNodes) => {
      const length = childNodes.length;
      for (let i = 0; i < length; i++) {
        node.appendChild(childNodes[i]);
      }
    };

  const findAttributes = new RegExp('(' + attrName + '=)([\'"]?)' + UIDC + '\\2', 'gi');
  const comments = ($0, $1, $2, $3) =>
    '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  const replaceAttributes = ($0, $1, $2) => $1 + ($2 || '"') + UID + ($2 || '"');

  // given a node and a generic HTML content,
  // create either an SVG or an HTML fragment
  // where such content will be injected
  const createFragment = (node, html) =>
    (OWNER_SVG_ELEMENT in node ?
      SVGFragment :
      HTMLFragment
    )(node, html.replace(attrSeeker, comments));

  // IE/Edge shenanigans proof cloneNode
  // it goes through all nodes manually
  // instead of relying the engine to suddenly
  // merge nodes together
  const cloneNode = hasDoomedCloneNode ?
    node => {
      const clone = node.cloneNode();
      const childNodes = node.childNodes ||
                        // this is an excess of caution
                        // but some node, in IE, might not
                        // have childNodes property.
                        // The following fallback ensure working code
                        // in older IE without compromising performance
                        // or any other browser/engine involved.
                        /* istanbul ignore next */
                        [];
      const length = childNodes.length;
      for (let i = 0; i < length; i++) {
        clone.appendChild(cloneNode(childNodes[i]));
      }
      return clone;
    } :
    // the following ignore is due code-coverage
    // combination of not having document.importNode
    // but having a working node.cloneNode.
    // This shenario is common on older Android/WebKit browsers
    // but basicHTML here tests just two major cases:
    // with document.importNode or with broken cloneNode.
    /* istanbul ignore next */
    node => node.cloneNode(true);

  // used to import html into fragments
  const importNode = hasImportNode ?
    (doc$$1, node) => doc$$1.importNode(node, true) :
    (doc$$1, node) => cloneNode(node);

  // just recycling a one-off array to use slice
  // in every needed place
  const slice = [].slice;

  // lazy evaluated, returns the unique identity
  // of a template literal, as tempalte literal itself.
  // By default, ES2015 template literals are unique
  // tag`a${1}z` === tag`a${2}z`
  // even if interpolated values are different
  // the template chunks are in a frozen Array
  // that is identical each time you use the same
  // literal to represent same static content
  // around its own interpolations.
  const unique = template => TL(template);

  // TL returns a unique version of the template
  // it needs lazy feature detection
  // (cannot trust literals with transpiled code)
  let TL = t => {
    if (
      // TypeScript template literals are not standard
      t.propertyIsEnumerable('raw') ||
      (
        // Firefox < 55 has not standard implementation neither
        /Firefox\/(\d+)/.test((G.navigator || {}).userAgent) &&
        parseFloat(RegExp.$1) < 55
      )
    ) {
      const T = {};
      TL = t => {
        const k = '^' + t.join('^');
        return T[k] || (T[k] = t);
      };
    } else {
      // make TL an identity like function
      TL = t => t;
    }
    return TL(t);
  };

  // create document fragments via native template
  // with a fallback for browsers that won't be able
  // to deal with some injected element such <td> or others
  const HTMLFragment = hasContent ?
    (node, html) => {
      const container = create(node, 'template');
      container.innerHTML = html;
      return container.content;
    } :
    (node, html) => {
      const container = create(node, 'template');
      const content = fragment(node);
      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        const selector = RegExp.$1;
        container.innerHTML = '<table>' + html + '</table>';
        append(content, slice.call(container.querySelectorAll(selector)));
      } else {
        container.innerHTML = html;
        append(content, slice.call(container.childNodes));
      }
      return content;
    };

  // creates SVG fragment with a fallback for IE that needs SVG
  // within the HTML content
  const SVGFragment = hasContent ?
    (node, html) => {
      const content = fragment(node);
      const container = doc(node).createElementNS(SVG_NAMESPACE, 'svg');
      container.innerHTML = html;
      append(content, slice.call(container.childNodes));
      return content;
    } :
    (node, html) => {
      const content = fragment(node);
      const container = create(node, 'div');
      container.innerHTML = '<svg xmlns="' + SVG_NAMESPACE + '">' + html + '</svg>';
      append(content, slice.call(container.firstChild.childNodes));
      return content;
    };

  function Wire(childNodes) {
    this.childNodes = childNodes;
    this.length = childNodes.length;
    this.first = childNodes[0];
    this.last = childNodes[this.length - 1];
  }

  // when a wire is inserted, all its nodes will follow
  Wire.prototype.insert = function insert() {
    const df = fragment(this.first);
    append(df, this.childNodes);
    return df;
  };

  // when a wire is removed, all its nodes must be removed as well
  Wire.prototype.remove = function remove() {
    const first = this.first;
    const last = this.last;
    if (this.length === 2) {
      last.parentNode.removeChild(last);
    } else {
      const range = doc(first).createRange();
      range.setStartBefore(this.childNodes[1]);
      range.setEndAfter(last);
      range.deleteContents();
    }
    return first;
  };

  // every template literal interpolation indicates
  // a precise target in the DOM the template is representing.
  // `<p id=${'attribute'}>some ${'content'}</p>`
  // hyperHTML finds only once per template literal,
  // hence once per entire application life-cycle,
  // all nodes that are related to interpolations.
  // These nodes are stored as indexes used to retrieve,
  // once per upgrade, nodes that will change on each future update.
  // A path example is [2, 0, 1] representing the operation:
  // node.childNodes[2].childNodes[0].childNodes[1]
  // Attributes are addressed via their owner node and their name.
  const createPath = node => {
    const path = [];
    let parentNode;
    switch (node.nodeType) {
      case ELEMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        parentNode = node;
        break;
      case COMMENT_NODE:
        parentNode = node.parentNode;
        prepend(path, parentNode, node);
        break;
      default:
        parentNode = node.ownerElement;
        break;
    }
    for (
      node = parentNode;
      (parentNode = parentNode.parentNode);
      node = parentNode
    ) {
      prepend(path, parentNode, node);
    }
    return path;
  };

  const prepend = (path, parent, node) => {
    path.unshift(path.indexOf.call(parent.childNodes, node));
  };

  var Path = {
    create: (type, node, name) => ({type, name, node, path: createPath(node)}),
    find: (node, path) => {
      const length = path.length;
      for (let i = 0; i < length; i++) {
        node = node.childNodes[path[i]];
      }
      return node;
    }
  }

  // from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/constants.js
  const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

  // style is handled as both string and object
  // even if the target is an SVG element (consistency)
  var Style = (node, original, isSVG) => {
    if (isSVG) {
      const style = original.cloneNode(true);
      style.value = '';
      node.setAttributeNode(style);
      return update(style, isSVG);
    }
    return update(node.style, isSVG);
  };

  // the update takes care or changing/replacing
  // only properties that are different or
  // in case of string, the whole node
  const update = (style, isSVG) => {
    let oldType, oldValue;
    return newValue => {
      switch (typeof newValue) {
        case 'object':
          if (newValue) {
            if (oldType === 'object') {
              if (!isSVG) {
                if (oldValue !== newValue) {
                  for (const key in oldValue) {
                    if (!(key in newValue)) {
                      style[key] = '';
                    }
                  }
                }
              }
            } else {
              if (isSVG) style.value = '';
              else style.cssText = '';
            }
            const info = isSVG ? {} : style;
            for (const key in newValue) {
              const value = newValue[key];
              info[key] = typeof value === 'number' &&
                          !IS_NON_DIMENSIONAL.test(key) ?
                            (value + 'px') : value;
            }
            oldType = 'object';
            if (isSVG) style.value = toStyle((oldValue = info));
            else oldValue = newValue;
            break;
          }
        default:
          if (oldValue != newValue) {
            oldType = 'string';
            oldValue = newValue;
            if (isSVG) style.value = newValue || '';
            else style.cssText = newValue || '';
          }
          break;
      }
    };
  };

  const hyphen = /([^A-Z])([A-Z]+)/g;
  const ized = ($0, $1, $2) => $1 + '-' + $2.toLowerCase();
  const toStyle = object => {
    const css = [];
    for (const key in object) {
      css.push(key.replace(hyphen, ized), ':', object[key], ';');
    }
    return css.join('');
  };

  /* AUTOMATICALLY IMPORTED, DO NOT MODIFY */
  /*! (c) 2017 Andrea Giammarchi (ISC) */

  /**
   * This code is a revisited port of the snabbdom vDOM diffing logic,
   * the same that fuels as fork Vue.js or other libraries.
   * @credits https://github.com/snabbdom/snabbdom
   */

  const identity = O => O;

  const remove = (parentNode, before, after) => {
    const range = parentNode.ownerDocument.createRange();
    range.setStartBefore(before);
    range.setEndAfter(after);
    range.deleteContents();
  };

  const domdiff = (
    parentNode,     // where changes happen
    currentNodes,   // Array of current items/nodes
    futureNodes,    // Array of future items/nodes
    getNode,        // optional way to retrieve a node from an item
    beforeNode      // optional item/node to use as insertBefore delimiter
  ) => {
    const get = getNode || identity;
    const before = beforeNode == null ? null : get(beforeNode, 0);
    let currentStart = 0, futureStart = 0;
    let currentEnd = currentNodes.length - 1;
    let currentStartNode = currentNodes[0];
    let currentEndNode = currentNodes[currentEnd];
    let futureEnd = futureNodes.length - 1;
    let futureStartNode = futureNodes[0];
    let futureEndNode = futureNodes[futureEnd];
    while (currentStart <= currentEnd && futureStart <= futureEnd) {
      if (currentStartNode == null) {
        currentStartNode = currentNodes[++currentStart];
      }
      else if (currentEndNode == null) {
        currentEndNode = currentNodes[--currentEnd];
      }
      else if (futureStartNode == null) {
        futureStartNode = futureNodes[++futureStart];
      }
      else if (futureEndNode == null) {
        futureEndNode = futureNodes[--futureEnd];
      }
      else if (currentStartNode == futureStartNode) {
        currentStartNode = currentNodes[++currentStart];
        futureStartNode = futureNodes[++futureStart];
      }
      else if (currentEndNode == futureEndNode) {
        currentEndNode = currentNodes[--currentEnd];
        futureEndNode = futureNodes[--futureEnd];
      }
      else if (currentStartNode == futureEndNode) {
        parentNode.insertBefore(
          get(currentStartNode, 1),
          get(currentEndNode, -0).nextSibling
        );
        currentStartNode = currentNodes[++currentStart];
        futureEndNode = futureNodes[--futureEnd];
      }
      else if (currentEndNode == futureStartNode) {
        parentNode.insertBefore(
          get(currentEndNode, 1),
          get(currentStartNode, 0)
        );
        currentEndNode = currentNodes[--currentEnd];
        futureStartNode = futureNodes[++futureStart];
      }
      else {
        let index = currentNodes.indexOf(futureStartNode);
        if (index < 0) {
          parentNode.insertBefore(
            get(futureStartNode, 1),
            get(currentStartNode, 0)
          );
          futureStartNode = futureNodes[++futureStart];
        }
        else {
          let i = index;
          let f = futureStart;
          while (
            i <= currentEnd &&
            f <= futureEnd &&
            currentNodes[i] === futureNodes[f]
          ) {
            i++;
            f++;
          }
          if (1 < (i - index)) {
            if (--index === currentStart) {
              parentNode.removeChild(get(currentStartNode, -1));
            } else {
              remove(
                parentNode,
                get(currentStartNode, -1),
                get(currentNodes[index], -1)
              );
            }
            currentStart = i;
            futureStart = f;
            currentStartNode = currentNodes[i];
            futureStartNode = futureNodes[f];
          } else {
            const el = currentNodes[index];
            currentNodes[index] = null;
            parentNode.insertBefore(get(el, 1), get(currentStartNode, 0));
            futureStartNode = futureNodes[++futureStart];
          }
        }
      }
    }
    if (currentStart <= currentEnd || futureStart <= futureEnd) {
      if (currentStart > currentEnd) {
        const pin = futureNodes[futureEnd + 1];
        const place = pin == null ? before : get(pin, 0);
        if (futureStart === futureEnd) {
          parentNode.insertBefore(get(futureNodes[futureStart], 1), place);
        }
        else {
          const fragment = parentNode.ownerDocument.createDocumentFragment();
          while (futureStart <= futureEnd) {
            fragment.appendChild(get(futureNodes[futureStart++], 1));
          }
          parentNode.insertBefore(fragment, place);
        }
      }
      else {
        if (currentNodes[currentStart] == null) currentStart++;
        if (currentStart === currentEnd) {
          parentNode.removeChild(get(currentNodes[currentStart], -1));
        }
        else {
          remove(
            parentNode,
            get(currentNodes[currentStart], -1),
            get(currentNodes[currentEnd], -1)
          );
        }
      }
    }
    return futureNodes;
  };

  // hyper.Component have a connected/disconnected
  // mechanism provided by MutationObserver
  // This weak set is used to recognize components
  // as DOM node that needs to trigger connected/disconnected events
  const components = new WeakSet;

  // a basic dictionary used to filter already cached attributes
  // while looking for special hyperHTML values.
  function Cache() {}
  Cache.prototype = Object.create(null);

  // returns an intent to explicitly inject content as html
  const asHTML = html => ({html});

  // returns nodes from wires and components
  const asNode = (item, i) => {
    return 'ELEMENT_NODE' in item ?
      item :
      (item.constructor === Wire ?
        // in the Wire case, the content can be
        // removed, post-pended, inserted, or pre-pended and
        // all these cases are handled by domdiff already
        /* istanbul ignore next */
        ((1 / i) < 0 ?
          (i ? item.remove() : item.last) :
          (i ? item.insert() : item.first)) :
        asNode(item.render(), i));
  };

  // returns true if domdiff can handle the value
  const canDiff = value =>  'ELEMENT_NODE' in value ||
  value instanceof Wire ||
  value instanceof Component;

  // updates are created once per context upgrade
  // within the main render function (../hyper/render.js)
  // These are an Array of callbacks to invoke passing
  // each interpolation value.
  // Updates can be related to any kind of content,
  // attributes, or special text-only cases such <style>
  // elements or <textarea>
  const create$1 = (root, paths) => {
    const updates = [];
    const length = paths.length;
    for (let i = 0; i < length; i++) {
      const info = paths[i];
      const node = Path.find(root, info.path);
      switch (info.type) {
        case 'any':
          updates.push(setAnyContent(node, []));
          break;
        case 'attr':
          updates.push(setAttribute(node, info.name, info.node));
          break;
        case 'text':
          updates.push(setTextContent(node));
          node.textContent = '';
          break;
      }
    }
    return updates;
  };

  // finding all paths is a one-off operation performed
  // when a new template literal is used.
  // The goal is to map all target nodes that will be
  // used to update content/attributes every time
  // the same template literal is used to create content.
  // The result is a list of paths related to the template
  // with all the necessary info to create updates as
  // list of callbacks that target directly affected nodes.
  const find = (node, paths, parts) => {
    const childNodes = node.childNodes;
    const length = childNodes.length;
    for (let i = 0; i < length; i++) {
      let child = childNodes[i];
      switch (child.nodeType) {
        case ELEMENT_NODE:
          findAttributes$1(child, paths, parts);
          find(child, paths, parts);
          break;
        case COMMENT_NODE:
          if (child.textContent === UID) {
            parts.shift();
            paths.push(
              // basicHTML or other non standard engines
              // might end up having comments in nodes
              // where they shouldn't, hence this check.
              SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
                Path.create('text', node) :
                Path.create('any', child)
            );
          }
          break;
        case TEXT_NODE:
          // the following ignore is actually covered by browsers
          // only basicHTML ends up on previous COMMENT_NODE case
          // instead of TEXT_NODE because it knows nothing about
          // special style or textarea behavior
          /* istanbul ignore if */
          if (
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
            trim.call(child.textContent) === UIDC
          ) {
            parts.shift();
            paths.push(Path.create('text', node));
          }
          break;
      }
    }
  };

  // attributes are searched via unique hyperHTML id value.
  // Despite HTML being case insensitive, hyperHTML is able
  // to recognize attributes by name in a caseSensitive way.
  // This plays well with Custom Elements definitions
  // and also with XML-like environments, without trusting
  // the resulting DOM but the template literal as the source of truth.
  // IE/Edge has a funny bug with attributes and these might be duplicated.
  // This is why there is a cache in charge of being sure no duplicated
  // attributes are ever considered in future updates.
  const findAttributes$1 = (node, paths, parts) => {
    const cache = new Cache;
    const attributes = node.attributes;
    const array = slice.call(attributes);
    const remove = [];
    const length = array.length;
    for (let i = 0; i < length; i++) {
      const attribute = array[i];
      if (attribute.value === UID) {
        const name = attribute.name;
        // the following ignore is covered by IE
        // and the IE9 double viewBox test
        /* istanbul ignore else */
        if (!(name in cache)) {
          const realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, '$1');
          cache[name] = attributes[realName] ||
                        // the following ignore is covered by browsers
                        // while basicHTML is already case-sensitive
                        /* istanbul ignore next */
                        attributes[realName.toLowerCase()];
          paths.push(Path.create('attr', cache[name], realName));
        }
        remove.push(attribute);
      }
    }
    const len = remove.length;
    for (let i = 0; i < len; i++) {
      // Edge HTML bug #16878726
      const attribute = remove[i];
      if (/^id$/i.test(attribute.name))
        node.removeAttribute(attribute.name);
      // standard browsers would work just fine here
      else
        node.removeAttributeNode(remove[i]);
    }

    // This is a very specific Firefox/Safari issue
    // but since it should be a not so common pattern,
    // it's probably worth patching regardless.
    // Basically, scripts created through strings are death.
    // You need to create fresh new scripts instead.
    // TODO: is there any other node that needs such nonsense?
    const nodeName = node.nodeName;
    if (/^script$/i.test(nodeName)) {
      // this used to be like that
      // const script = createElement(node, nodeName);
      // then Edge arrived and decided that scripts created
      // through template documents aren't worth executing
      // so it became this ... hopefully it won't hurt in the wild
      const script = document.createElement(nodeName);
      for (let i = 0; i < attributes.length; i++) {
        script.setAttributeNode(attributes[i].cloneNode(true));
      }
      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  };

  // when a Promise is used as interpolation value
  // its result must be parsed once resolved.
  // This callback is in charge of understanding what to do
  // with a returned value once the promise is resolved.
  const invokeAtDistance = (value, callback) => {
    callback(value.placeholder);
    if ('text' in value) {
      Promise.resolve(value.text).then(String).then(callback);
    } else if ('any' in value) {
      Promise.resolve(value.any).then(callback);
    } else if ('html' in value) {
      Promise.resolve(value.html).then(asHTML).then(callback);
    } else {
      Promise.resolve(Intent.invoke(value, callback)).then(callback);
    }
  };

  // quick and dirty way to check for Promise/ish values
  const isPromise_ish = value => value != null && 'then' in value;

  // in a hyper(node)`<div>${content}</div>` case
  // everything could happen:
  //  * it's a JS primitive, stored as text
  //  * it's null or undefined, the node should be cleaned
  //  * it's a component, update the content by rendering it
  //  * it's a promise, update the content once resolved
  //  * it's an explicit intent, perform the desired operation
  //  * it's an Array, resolve all values if Promises and/or
  //    update the node with the resulting list of content
  const setAnyContent = (node, childNodes) => {
    let fastPath = false;
    let oldValue;
    const anyContent = value => {
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
          if (fastPath) {
            if (oldValue !== value) {
              oldValue = value;
              childNodes[0].textContent = value;
            }
          } else {
            fastPath = true;
            oldValue = value;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [text(node, value)],
              asNode,
              node
            );
          }
          break;
        case 'object':
        case 'undefined':
          if (value == null) {
            fastPath = false;
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              [],
              asNode,
              node
            );
            break;
          }
        default:
          fastPath = false;
          oldValue = value;
          if (isArray(value)) {
            if (value.length === 0) {
              if (childNodes.length) {
                childNodes = domdiff(
                  node.parentNode,
                  childNodes,
                  [],
                  asNode,
                  node
                );
              }
            } else {
              switch (typeof value[0]) {
                case 'string':
                case 'number':
                case 'boolean':
                  anyContent({html: value});
                  break;
                case 'object':
                  if (isArray(value[0])) {
                    value = value.concat.apply([], value);
                  }
                  if (isPromise_ish(value[0])) {
                    Promise.all(value).then(anyContent);
                    break;
                  }
                default:
                  childNodes = domdiff(
                    node.parentNode,
                    childNodes,
                    value,
                    asNode,
                    node
                  );
                  break;
              }
            }
          } else if (canDiff(value)) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              value.nodeType === DOCUMENT_FRAGMENT_NODE ?
                slice.call(value.childNodes) :
                [value],
              asNode,
              node
            );
          } else if (isPromise_ish(value)) {
            value.then(anyContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, anyContent);
          } else if ('text' in value) {
            anyContent(String(value.text));
          } else if ('any' in value) {
            anyContent(value.any);
          } else if ('html' in value) {
            childNodes = domdiff(
              node.parentNode,
              childNodes,
              slice.call(
                createFragment(
                  node,
                  [].concat(value.html).join('')
                ).childNodes
              ),
              asNode,
              node
            );
          } else if ('length' in value) {
            anyContent(slice.call(value));
          } else {
            anyContent(Intent.invoke(value, anyContent));
          }
          break;
      }
    };
    return anyContent;
  };

  // there are four kind of attributes, and related behavior:
  //  * events, with a name starting with `on`, to add/remove event listeners
  //  * special, with a name present in their inherited prototype, accessed directly
  //  * regular, accessed through get/setAttribute standard DOM methods
  //  * style, the only regular attribute that also accepts an object as value
  //    so that you can style=${{width: 120}}. In this case, the behavior has been
  //    fully inspired by Preact library and its simplicity.
  const setAttribute = (node, name, original) => {
    const isSVG = OWNER_SVG_ELEMENT in node;
    let oldValue;
    // if the attribute is the style one
    // handle it differently from others
    if (name === 'style') {
      return Style(node, original, isSVG);
    }
    // the name is an event one,
    // add/remove event listeners accordingly
    else if (/^on/.test(name)) {
      let type = name.slice(2);
      if (type === CONNECTED || type === DISCONNECTED) {
        if (notObserving) {
          notObserving = false;
          observe();
        }
        components.add(node);
      }
      else if (name.toLowerCase() in node) {
        type = type.toLowerCase();
      }
      return newValue => {
        if (oldValue !== newValue) {
          if (oldValue) node.removeEventListener(type, oldValue, false);
          oldValue = newValue;
          if (newValue) node.addEventListener(type, newValue, false);
        }
      };
    }
    // the attribute is special ('value' in input)
    // and it's not SVG *or* the name is exactly data,
    // in this case assign the value directly
    else if (name === 'data' || (!isSVG && name in node)) {
      return newValue => {
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (node[name] !== newValue) {
            node[name] = newValue;
            if (newValue == null) {
              node.removeAttribute(name);
            }
          }
        }
      };
    }
    // in every other case, use the attribute node as it is
    // update only the value, set it as node only when/if needed
    else {
      let owner = false;
      const attribute = original.cloneNode(true);
      return newValue => {
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (attribute.value !== newValue) {
            if (newValue == null) {
              if (owner) {
                owner = false;
                node.removeAttributeNode(attribute);
              }
              attribute.value = newValue;
            } else {
              attribute.value = newValue;
              if (!owner) {
                owner = true;
                node.setAttributeNode(attribute);
              }
            }
          }
        }
      };
    }
  };

  // style or textareas don't accept HTML as content
  // it's pointless to transform or analyze anything
  // different from text there but it's worth checking
  // for possible defined intents.
  const setTextContent = node => {
    let oldValue;
    const textContent = value => {
      if (oldValue !== value) {
        oldValue = value;
        if (typeof value === 'object' && value) {
          if (isPromise_ish(value)) {
            value.then(textContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, textContent);
          } else if ('text' in value) {
            textContent(String(value.text));
          } else if ('any' in value) {
            textContent(value.any);
          } else if ('html' in value) {
            textContent([].concat(value.html).join(''));
          } else if ('length' in value) {
            textContent(slice.call(value).join(''));
          } else {
            textContent(Intent.invoke(value, textContent));
          }
        } else {
          node.textContent = value == null ? '' : value;
        }
      }
    };
    return textContent;
  };

  var Updates = {create: create$1, find};

  // hyper.Components might need connected/disconnected notifications
  // used by components and their onconnect/ondisconnect callbacks.
  // When one of these callbacks is encountered,
  // the document starts being observed.
  let notObserving = true;
  function observe() {

    // when hyper.Component related DOM nodes
    // are appended or removed from the live tree
    // these might listen to connected/disconnected events
    // This utility is in charge of finding all components
    // involved in the DOM update/change and dispatch
    // related information to them
    const dispatchAll = (nodes, type) => {
      const event = new Event(type);
      const length = nodes.length;
      for (let i = 0; i < length; i++) {
        let node = nodes[i];
        if (node.nodeType === ELEMENT_NODE) {
          dispatchTarget(node, event);
        }
      }
    };

    // the way it's done is via the components weak set
    // and recursively looking for nested components too
    const dispatchTarget = (node, event) => {
      if (components.has(node)) {
        node.dispatchEvent(event);
      }

      const children = node.children;
      const length = children.length;
      for (let i = 0; i < length; i++) {
        dispatchTarget(children[i], event);
      }
    };

    // The MutationObserver is the best way to implement that
    // but there is a fallback to deprecated DOMNodeInserted/Removed
    // so that even older browsers/engines can help components life-cycle
    try {
      (new MutationObserver(records => {
        const length = records.length;
        for (let i = 0; i < length; i++) {
          let record = records[i];
          dispatchAll(record.removedNodes, DISCONNECTED);
          dispatchAll(record.addedNodes, CONNECTED);
        }
      })).observe(document, {subtree: true, childList: true});
    } catch(o_O) {
      document.addEventListener('DOMNodeRemoved', event => {
        dispatchAll([event.target], DISCONNECTED);
      }, false);
      document.addEventListener('DOMNodeInserted', event => {
        dispatchAll([event.target], CONNECTED);
      }, false);
    }
  }

  // a weak collection of contexts that
  // are already known to hyperHTML
  const bewitched = new WeakMap;

  // all unique template literals
  // if the WeakMap is the global one, use it
  // otherwise uses a Map because polyfilled WeakMaps
  // cannot set any property to frozen objects (templates)
  const templates = WeakMap === G.WeakMap ? new WeakMap : new Map;

  // better known as hyper.bind(node), the render is
  // the main tag function in charge of fully upgrading
  // or simply updating, contexts used as hyperHTML targets.
  // The `this` context is either a regular DOM node or a fragment.
  function render(template) {
    const wicked = bewitched.get(this);
    if (wicked && wicked.template === unique(template)) {
      update$1.apply(wicked.updates, arguments);
    } else {
      upgrade.apply(this, arguments);
    }
    return this;
  }

  // an upgrade is in charge of collecting template info,
  // parse it once, if unknown, to map all interpolations
  // as single DOM callbacks, relate such template
  // to the current context, and render it after cleaning the context up
  function upgrade(template) {
    template = unique(template);
    const info =  templates.get(template) ||
                  createTemplate.call(this, template);
    const fragment = importNode(this.ownerDocument, info.fragment);
    const updates = Updates.create(fragment, info.paths);
    bewitched.set(this, {template, updates});
    update$1.apply(updates, arguments);
    this.textContent = '';
    this.appendChild(fragment);
  }

  // an update simply loops over all mapped DOM operations
  function update$1() {
    const length = arguments.length;
    for (let i = 1; i < length; i++) {
      this[i - 1](arguments[i]);
    }
  }

  // a template can be used to create a document fragment
  // aware of all interpolations and with a list
  // of paths used to find once those nodes that need updates,
  // no matter if these are attributes, text nodes, or regular one
  function createTemplate(template) {
    const paths = [];
    const html = template.join(UIDC).replace(SC_RE, SC_PLACE);
    const fragment = createFragment(this, html);
    Updates.find(fragment, paths, template.slice());
    const info = {fragment, paths};
    templates.set(template, info);
    return info;
  }

  // some node could be special though, like a custom element
  // with a self closing tag, which should work through these changes.
  const SC_RE = selfClosing;
  const SC_PLACE = ($0, $1, $2) => {
    return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
  };

  // all wires used per each context
  const wires = new WeakMap;

  // A wire is a callback used as tag function
  // to lazily relate a generic object to a template literal.
  // hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
  // This provides the ability to have a unique DOM structure
  // related to a unique JS object through a reusable template literal.
  // A wire can specify a type, as svg or html, and also an id
  // via html:id or :id convention. Such :id allows same JS objects
  // to be associated to different DOM structures accordingly with
  // the used template literal without losing previously rendered parts.
  const wire = (obj, type) => obj == null ?
    content(type || 'html') :
    weakly(obj, type || 'html');

  // A wire content is a virtual reference to one or more nodes.
  // It's represented by either a DOM node, or an Array.
  // In both cases, the wire content role is to simply update
  // all nodes through the list of related callbacks.
  // In few words, a wire content is like an invisible parent node
  // in charge of updating its content like a bound element would do.
  const content = type => {
    let wire, container, content, template, updates;
    return function (statics) {
      statics = unique(statics);
      let setup = template !== statics;
      if (setup) {
        template = statics;
        content = fragment(document);
        container = type === 'svg' ?
          document.createElementNS(SVG_NAMESPACE, 'svg') :
          content;
        updates = render.bind(container);
      }
      updates.apply(null, arguments);
      if (setup) {
        if (type === 'svg') {
          append(content, slice.call(container.childNodes));
        }
        wire = wireContent(content);
      }
      return wire;
    };
  };

  // wires are weakly created through objects.
  // Each object can have multiple wires associated
  // and this is thanks to the type + :id feature.
  const weakly = (obj, type) => {
    const i = type.indexOf(':');
    let wire = wires.get(obj);
    let id = type;
    if (-1 < i) {
      id = type.slice(i + 1);
      type = type.slice(0, i) || 'html';
    }
    if (!wire) wires.set(obj, wire = {});
    return wire[id] || (wire[id] = content(type));
  };

  // a document fragment loses its nodes as soon
  // as it's appended into another node.
  // This would easily lose wired content
  // so that on a second render call, the parent
  // node wouldn't know which node was there
  // associated to the interpolation.
  // To prevent hyperHTML to forget about wired nodes,
  // these are either returned as Array or, if there's ony one entry,
  // as single referenced node that won't disappear from the fragment.
  // The initial fragment, at this point, would be used as unique reference.
  const wireContent = node => {
    const childNodes = node.childNodes;
    const length = childNodes.length;
    const wireNodes = [];
    for (let i = 0; i < length; i++) {
      let child = childNodes[i];
      if (
        child.nodeType === ELEMENT_NODE ||
        trim.call(child.textContent).length !== 0
      ) {
        wireNodes.push(child);
      }
    }
    return wireNodes.length === 1 ? wireNodes[0] : new Wire(wireNodes);
  };

  /*! (c) Andrea Giammarchi (ISC) */

  // all functions are self bound to the right context
  // you can do the following
  // const {bind, wire} = hyperHTML;
  // and use them right away: bind(node)`hello!`;
  const bind = context => render.bind(context);
  const define = Intent.define;

  hyper.Component = Component;
  hyper.bind = bind;
  hyper.define = define;
  hyper.diff = domdiff;
  hyper.hyper = hyper;
  hyper.wire = wire;

  // the wire content is the lazy defined
  // html or svg property of each hyper.Component
  setup(content);

  // by default, hyperHTML is a smart function
  // that "magically" understands what's the best
  // thing to do with passed arguments
  function hyper(HTML) {
    return arguments.length < 2 ?
      (HTML == null ?
        content('html') :
        (typeof HTML === 'string' ?
          hyper.wire(null, HTML) :
          ('raw' in HTML ?
            content('html')(HTML) :
            ('nodeType' in HTML ?
              hyper.bind(HTML) :
              weakly(HTML, 'html')
            )
          )
        )) :
      ('raw' in HTML ?
        content('html') : hyper.wire
      ).apply(null, arguments);
  }

  /*! (C) 2017-2018 Andrea Giammarchi - ISC Style License */

  // utils to deal with custom elements builtin extends
  const O = Object;
  const classes = [];
  const defineProperty = O.defineProperty;
  const getOwnPropertyDescriptor = O.getOwnPropertyDescriptor;
  const getOwnPropertyNames = O.getOwnPropertyNames;
  const getOwnPropertySymbols = O.getOwnPropertySymbols || (() => []);
  const getPrototypeOf = O.getPrototypeOf || (o => o.__proto__);
  const ownKeys = typeof Reflect === 'object' && Reflect.ownKeys ||
                  (o => getOwnPropertyNames(o).concat(getOwnPropertySymbols(o)));
  const setPrototypeOf = O.setPrototypeOf ||
                        ((o, p) => (o.__proto__ = p, o));

  class HyperHTMLElement extends HTMLElement {

    // define a custom-element in the CustomElementsRegistry
    // class MyEl extends HyperHTMLElement {}
    // MyEl.define('my-el');
    static define(name, options) {
      const Class = this;
      const proto = Class.prototype;

      // if observedAttributes contains attributes to observe
      // HyperHTMLElement will directly reflect get/setAttribute
      // operation once these attributes are used, example:
      // el.observed = 123;
      // will automatically do
      // el.setAttribute('observed', 123);
      // triggering also the attributeChangedCallback
      (Class.observedAttributes || []).forEach(name => {
        if (!(name in proto)) defineProperty(
          proto,
          name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()),
          {
            configurable: true,
            get() { return this.getAttribute(name); },
            set(value) { this.setAttribute(name, value); }
          }
        );
      });

      const onChanged = proto.attributeChangedCallback;
      const hasChange = !!onChanged;

      // created() {} is an initializer method that grants
      // the node is fully known to the browser.
      // It is ensured to run either after DOMContentLoaded,
      // or once there is a next sibling (stream-friendly) so that
      // you have full access to element attributes and/or childNodes.
      const created = proto.created;
      if (created) {
        // used to ensure create() is called once and once only
        defineProperty(
          proto,
          '_init$',
          {
            configurable: true,
            writable: true,
            value: true
          }
        );

        // ⚠️ if you need to overwrite/change attributeChangedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'attributeChangedCallback',
          {
            configurable: true,
            value(name, prev, curr) {
              if (this._init$) {
                checkReady.call(this, created);
              }
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (hasChange && prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          }
        );

        // ⚠️ if you need to overwrite/change connectedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        const onConnected = proto.connectedCallback;
        const hasConnect = !!onConnected;
        defineProperty(
          proto,
          'connectedCallback',
          {
            configurable: true,
            value() {
              if (this._init$) {
                checkReady.call(this, created);
              }
              if (hasConnect) {
                onConnected.apply(this, arguments);
              }
            }
          }
        );
      } else if (hasChange) {
        // ⚠️ if you need to overwrite/change attributeChangedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'attributeChangedCallback',
          {
            configurable: true,
            value(name, prev, curr) {
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          }
        );
      }

      // define lazily all handlers
      // class { handleClick() { ... }
      // render() { `<a onclick=${this.handleClick}>` } }
      getOwnPropertyNames(proto).forEach(key => {
        if (/^handle[A-Z]/.test(key)) {
          const _key$ = '_' + key + '$';
          const method = proto[key];
          defineProperty(proto, key, {
            configurable: true,
            get() {
              return  this[_key$] ||
                      (this[_key$] = method.bind(this));
            }
          });
        }
      });

      // whenever you want to directly use the component itself
      // as EventListener, you can pass it directly.
      // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
      //  class Reactive extends HyperHTMLElement {
      //    oninput(e) { console.log(this, 'changed', e.target.value); }
      //    render() { this.html`<input oninput="${this}">`; }
      //  }
      if (!('handleEvent' in proto)) {
        // ⚠️ if you need to overwrite/change handleEvent method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'handleEvent',
          {
            configurable: true,
            value(event) {
              this[
                (event.currentTarget.dataset || {}).call ||
                ('on' + event.type)
              ](event);
            }
          }
        );
      }

      if (options && options.extends) {
        const Native = document.createElement(options.extends).constructor;
        const Intermediate = class extends Native {};
        const Super = getPrototypeOf(Class);
        ownKeys(Super)
          .filter(key => [
            'length', 'name', 'arguments', 'caller', 'prototype'
          ].indexOf(key) < 0)
          .forEach(key => defineProperty(
            Intermediate,
            key,
            getOwnPropertyDescriptor(Super, key)
          )
        );
        ownKeys(Super.prototype)
          .forEach(key => defineProperty(
            Intermediate.prototype,
            key,
            getOwnPropertyDescriptor(Super.prototype, key)
          )
        );
        setPrototypeOf(Class, Intermediate);
        setPrototypeOf(proto, Intermediate.prototype);
        customElements.define(name, Class, options);
      } else {
        customElements.define(name, Class);
      }
      classes.push(Class);
      return Class;
    }

    // lazily bind once hyperHTML logic
    // to either the shadowRoot, if present and open,
    // the _shadowRoot property, if set due closed shadow root,
    // or the custom-element itself if no Shadow DOM is used.
    get html() {
      return this._html$ || (this.html = bind(
        // in case of Shadow DOM {mode: "open"}, use it
        this.shadowRoot ||
        // in case of Shadow DOM {mode: "close"}, use it
        // this needs the following reference created upfront
        // this._shadowRoot = this.attachShadow({mode: "close"});
        this._shadowRoot ||
        // if no Shadow DOM is used, simply use the component
        // as container for its own content (it just works too)
        this
      ));
    }

    // it can be set too if necessary, it won't invoke render()
    set html(value) {
      defineProperty(this, '_html$', {configurable: true, value: value});
    }

    // ---------------------//
    // Basic State Handling //
    // ---------------------//

    // overwrite this method with your own render
    render() {}

    // define the default state object
    // you could use observed properties too
    get defaultState() { return {}; }

    // the state with a default
    get state() {
      return this._state$ || (this.state = this.defaultState);
    }

    // it can be set too if necessary, it won't invoke render()
    set state(value) {
      defineProperty(this, '_state$', {configurable: true, value: value});
    }

    // currently a state is a shallow copy, like in Preact or other libraries.
    // after the state is updated, the render() method will be invoked.
    // ⚠️ do not ever call this.setState() inside this.render()
    setState(state, render) {
      const target = this.state;
      const source = typeof state === 'function' ? state.call(this, target) : state;
      for (const key in source) target[key] = source[key];
      if (render !== false) this.render();
      return this;
    }

  }
  // exposing hyperHTML utilities
  HyperHTMLElement.Component = Component;
  HyperHTMLElement.bind = bind;
  HyperHTMLElement.intent = define;
  HyperHTMLElement.wire = wire;
  HyperHTMLElement.hyper = hyper;

  try {
    if (Symbol.hasInstance) classes.push(
      defineProperty(HyperHTMLElement, Symbol.hasInstance, {
        enumerable: false,
        configurable: true,
        value(instance) {
          return classes.some(isPrototypeOf, getPrototypeOf(instance));
        }
      }));
  } catch(meh) {}

  // ------------------------------//
  // DOMContentLoaded VS created() //
  // ------------------------------//
  const dom = {
    handleEvent: function (e) {
      if (dom.ready) {
        document.removeEventListener(e.type, dom, false);
        dom.list.splice(0).forEach(function (fn) { fn(); });
      }
    },
    get ready() {
      return document.readyState === 'complete';
    },
    list: []
  };

  if (!dom.ready) {
    document.addEventListener('DOMContentLoaded', dom, false);
  }

  function checkReady(created) {
    if (dom.ready || isReady.call(this, created)) {
      if (this._init$) {
        created.call(defineProperty(this, '_init$', {value: false}));
      }
    } else {
      dom.list.push(checkReady.bind(this, created));
    }
  }

  function isPrototypeOf(Class) {
    return this === Class.prototype;
  }

  function isReady(created) {
    let el = this;
    do { if (el.nextSibling) return true; }
    while (el = el.parentNode);
    setTimeout(checkReady.bind(this, created));
    return false;
  }

  exports.default = HyperHTMLElement;

  return exports.default;

}({}));
