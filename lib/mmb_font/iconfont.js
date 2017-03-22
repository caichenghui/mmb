;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-caidan" viewBox="0 0 1230 1024">' +
    '' +
    '<path d="M1181.427095 1023.958636a35.057203 35.057203 0 0 1-31.289373-18.798196L997.131053 708.607631a377.76593 377.76593 0 0 1-142.481317 27.685361A368.223491 368.223491 0 1 1 1230.08125 368.23332a360.933559 360.933559 0 0 1-59.875737 198.793997l-4.341195 6.634657-0.655275-0.204773a35.589613 35.589613 0 0 1-25.146171 10.443442 34.975293 34.975293 0 0 1-35.221021-34.606701 34.07429 34.07429 0 0 1 8.7643-22.811754 293.604071 293.604071 0 0 0 46.442603-158.044095 304.579925 304.579925 0 1 0-165.825483 266.205394 34.68861 34.68861 0 0 1 2.907782-1.638187 35.38484 35.38484 0 0 1 15.84946-3.726876 34.975293 34.975293 0 0 1 31.207463 18.839151l168.446582 326.285903a33.787608 33.787608 0 0 1 2.047733 26.292902 34.483837 34.483837 0 0 1-17.446692 19.944927 35.548659 35.548659 0 0 1-15.808504 3.317329zM36.457221 1023.958636a34.360973 34.360973 0 1 1 0-68.721946H1022.031496a34.360973 34.360973 0 1 1 0 68.721946H36.457221z m0-477.531521a34.360973 34.360973 0 1 1 0-68.721946h344.019277a34.360973 34.360973 0 1 1 0 68.721946h-344.019277z m0-477.490566a34.360973 34.360973 0 1 1 0-68.721946h450.788117a34.360973 34.360973 0 1 1 0 68.721946H36.457221z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)