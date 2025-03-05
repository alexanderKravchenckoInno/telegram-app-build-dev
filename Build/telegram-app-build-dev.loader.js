function createUnityInstance(t, r, c) {
  function d(e, t) {
    if (!d.aborted && r.showBanner)
      return "error" == t && (d.aborted = !0), r.showBanner(e, t);
    switch (t) {
      case "error":
        console.error(e);
        break;
      case "warning":
        console.warn(e);
        break;
      default:
        console.log(e);
    }
  }
  function n(e) {
    var t = e.reason || e.error,
      r = t ? t.toString() : e.message || e.reason || "",
      n = t && t.stack ? t.stack.toString() : "";
    (r += "\n" + (n = n.startsWith(r) ? n.substring(r.length) : n).trim()) &&
      m.stackTraceRegExp &&
      m.stackTraceRegExp.test(r) &&
      C(
        r,
        e.filename || (t && (t.fileName || t.sourceURL)) || "",
        e.lineno || (t && (t.lineNumber || t.line)) || 0
      );
  }
  function e(e, t, r) {
    var n = e[t];
    (void 0 !== n && n) ||
      (console.warn(
        'Config option "' +
          t +
          '" is missing or empty. Falling back to default value: "' +
          r +
          '". Consider updating your WebGL template to include the missing config option.'
      ),
      (e[t] = r));
  }
  c = c || function () {};
  var o,
    m = {
      canvas: t,
      webglContextAttributes: { preserveDrawingBuffer: !1, powerPreference: 2 },
      wasmFileSize: 65606164,
      cacheControl: function (e) {
        return e && (e == m.dataUrl || e.match(/\.bundle/))
          ? "must-revalidate"
          : "no-store";
      },
      streamingAssetsUrl: "StreamingAssets",
      downloadProgress: {},
      deinitializers: [],
      intervals: {},
      setInterval: function (e, t) {
        e = window.setInterval(e, t);
        return (this.intervals[e] = !0), e;
      },
      clearInterval: function (e) {
        delete this.intervals[e], window.clearInterval(e);
      },
      preRun: [],
      postRun: [],
      print: function (e) {
        console.log(e);
      },
      printErr: function (e) {
        console.error(e),
          "string" == typeof e &&
            -1 != e.indexOf("wasm streaming compile failed") &&
            (-1 != e.toLowerCase().indexOf("mime")
              ? d(
                  'HTTP Response Header "Content-Type" configured incorrectly on the server for file ' +
                    m.codeUrl +
                    ' , should be "application/wasm". Startup time performance will suffer.',
                  "warning"
                )
              : d(
                  'WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' +
                    m.codeUrl +
                    ", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.",
                  "warning"
                ));
      },
      locateFile: function (e) {
        return e;
      },
      disabledCanvasEvents: ["contextmenu", "dragstart"],
    };
  for (o in (e(r, "companyName", "Unity"),
  e(r, "productName", "WebGL Player"),
  e(r, "productVersion", "1.0"),
  r))
    m[o] = r[o];
  m.streamingAssetsUrl = new URL(m.streamingAssetsUrl, document.URL).href;
  var a = m.disabledCanvasEvents.slice();
  function i(e) {
    e.preventDefault();
  }
  a.forEach(function (e) {
    t.addEventListener(e, i);
  }),
    window.addEventListener("error", n),
    window.addEventListener("unhandledrejection", n);
  var s = "",
    l = "";
  function u(e) {
    document.webkitCurrentFullScreenElement === t
      ? t.style.width &&
        ((s = t.style.width),
        (l = t.style.height),
        (t.style.width = "100%"),
        (t.style.height = "100%"))
      : s && ((t.style.width = s), (t.style.height = l), (l = s = ""));
  }
  document.addEventListener("webkitfullscreenchange", u),
    m.deinitializers.push(function () {
      for (var e in (m.disableAccessToMediaDevices(),
      a.forEach(function (e) {
        t.removeEventListener(e, i);
      }),
      window.removeEventListener("error", n),
      window.removeEventListener("unhandledrejection", n),
      document.removeEventListener("webkitfullscreenchange", u),
      m.intervals))
        window.clearInterval(e);
      m.intervals = {};
    }),
    (m.QuitCleanup = function () {
      for (var e = 0; e < m.deinitializers.length; e++) m.deinitializers[e]();
      (m.deinitializers = []), "function" == typeof m.onQuit && m.onQuit();
    });
  var h,
    f,
    p,
    g,
    b,
    v,
    w,
    y,
    S,
    U = {
      Module: m,
      SetFullscreen: function () {
        if (m.SetFullscreen) return m.SetFullscreen.apply(m, arguments);
        m.print("Failed to set Fullscreen mode: Player not loaded yet.");
      },
      SendMessage: function () {
        if (m.SendMessage) return m.SendMessage.apply(m, arguments);
        m.print("Failed to execute SendMessage: Player not loaded yet.");
      },
      Quit: function () {
        return new Promise(function (e, t) {
          (m.shouldQuit = !0), (m.onQuit = e);
        });
      },
      GetMetricsInfo: function () {
        var e = Number(m._getMetricsInfo()) >>> 0,
          t = 4 + e,
          r = 4 + t,
          n = 8 + r,
          o = 8 + n,
          a = 4 + o,
          i = 4 + a,
          s = 8 + i,
          c = 8 + s,
          d = 4 + c,
          l = 4 + d,
          u = 4 + l;
        return {
          totalWASMHeapSize: m.HEAPU32[e >> 2],
          usedWASMHeapSize: m.HEAPU32[t >> 2],
          totalJSHeapSize: m.HEAPF64[r >> 3],
          usedJSHeapSize: m.HEAPF64[n >> 3],
          pageLoadTime: m.HEAPU32[o >> 2],
          pageLoadTimeToFrame1: m.HEAPU32[a >> 2],
          fps: m.HEAPF64[i >> 3],
          movingAverageFps: m.HEAPF64[s >> 3],
          assetLoadTime: m.HEAPU32[c >> 2],
          webAssemblyStartupTime:
            m.HEAPU32[d >> 2] - (m.webAssemblyTimeStart || 0),
          codeDownloadTime: m.HEAPU32[l >> 2],
          gameStartupTime: m.HEAPU32[u >> 2],
          numJankedFrames: m.HEAPU32[(4 + u) >> 2],
        };
      },
    };
  function C(e, t, r) {
    -1 == e.indexOf("fullscreen error") &&
      (m.startupErrorHandler
        ? m.startupErrorHandler(e, t, r)
        : (m.errorHandler && m.errorHandler(e, t, r)) ||
          (console.log("Invoking error handler due to\n" + e),
          "function" == typeof dump &&
            dump("Invoking error handler due to\n" + e),
          C.didShowErrorMessage ||
            (-1 !=
            (e =
              "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" +
              e).indexOf("DISABLE_EXCEPTION_CATCHING")
              ? (e =
                  "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.")
              : -1 != e.indexOf("Cannot enlarge memory arrays")
              ? (e =
                  "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.")
              : (-1 == e.indexOf("Invalid array buffer length") &&
                  -1 == e.indexOf("Invalid typed array length") &&
                  -1 == e.indexOf("out of memory") &&
                  -1 == e.indexOf("could not allocate memory")) ||
                (e =
                  "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),
            alert(e),
            (C.didShowErrorMessage = !0))));
  }
  function P(e, t) {
    if ("symbolsUrl" != e) {
      var r = m.downloadProgress[e],
        n =
          ((r =
            r ||
            (m.downloadProgress[e] = {
              started: !1,
              finished: !1,
              lengthComputable: !1,
              total: 0,
              loaded: 0,
            })),
          "object" != typeof t ||
            ("progress" != t.type && "load" != t.type) ||
            (r.started ||
              ((r.started = !0), (r.lengthComputable = t.lengthComputable)),
            (r.total = t.total),
            (r.loaded = t.loaded),
            "load" == t.type && (r.finished = !0)),
          0),
        o = 0,
        a = 0,
        i = 0,
        s = 0;
      for (e in m.downloadProgress) {
        if (!(r = m.downloadProgress[e]).started) return;
        a++,
          r.lengthComputable
            ? ((n += r.loaded), (o += r.total), i++)
            : r.finished || s++;
      }
      c(0.9 * (a ? (a - s - (o ? (i * (o - n)) / o : 0)) / a : 0));
    }
  }
  function k() {
    var e = this;
    (this.isConnected = this.connect().then(function () {
      return e.cleanUpCache();
    })),
      this.isConnected.catch(function (e) {
        (e = "Error when initializing cache: " + e),
          console.log("[UnityCache] " + e);
      });
  }
  function E(e) {
    console.log("[UnityCache] " + e);
  }
  function T(e) {
    return (
      (T.link = T.link || document.createElement("a")),
      (T.link.href = e),
      T.link.href
    );
  }
  (m.SystemInfo = (function () {
    var e,
      t,
      r,
      n,
      o,
      a = navigator.userAgent + " ",
      i = [
        ["Firefox", "Firefox"],
        ["OPR", "Opera"],
        ["Edg", "Edge"],
        ["SamsungBrowser", "Samsung Browser"],
        ["Trident", "Internet Explorer"],
        ["MSIE", "Internet Explorer"],
        ["Chrome", "Chrome"],
        ["CriOS", "Chrome on iOS Safari"],
        ["FxiOS", "Firefox on iOS Safari"],
        ["Safari", "Safari"],
      ];
    function s(e, t, r) {
      return (e = RegExp(e, "i").exec(t)) && e[r];
    }
    for (var c = 0; c < i.length; ++c)
      if ((t = s(i[c][0] + "[/ ](.*?)[ \\)]", a, 1))) {
        e = i[c][1];
        break;
      }
    "Safari" == e && (t = s("Version/(.*?) ", a, 1)),
      "Internet Explorer" == e && (t = s("rv:(.*?)\\)? ", a, 1) || t);
    for (
      var d = [
          ["Windows (.*?)[;)]", "Windows"],
          ["Android ([0-9_.]+)", "Android"],
          ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
          ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
          ["FreeBSD( )", "FreeBSD"],
          ["OpenBSD( )", "OpenBSD"],
          ["Linux|X11()", "Linux"],
          ["Mac OS X ([0-9_\\.]+)", "MacOS"],
          ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"],
        ],
        l = 0;
      l < d.length;
      ++l
    )
      if ((n = s(d[l][0], a, 1))) {
        (r = d[l][1]), (n = n.replace(/_/g, "."));
        break;
      }
    var u;
    function h() {
      try {
        return window.WebAssembly
          ? WebAssembly.validate(
              new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5,
                3, 1, 0, 1, 10, 13, 1, 11, 0, 65, 0, 65, 0, 65, 1, 252, 11, 0,
                11,
              ])
            )
            ? WebAssembly.validate(
                new Uint8Array([
                  0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0,
                  10, 11, 1, 9, 1, 1, 125, 32, 0, 252, 0, 26, 11,
                ])
              )
              ? WebAssembly.validate(
                  new Uint8Array([
                    0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0,
                    10, 10, 1, 8, 1, 1, 126, 32, 0, 194, 26, 11,
                  ])
                )
                ? WebAssembly.validate(
                    new Uint8Array([
                      0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1,
                      0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11,
                    ])
                  )
                  ? !!WebAssembly.validate(
                      new Uint8Array([
                        0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1,
                        0, 10, 10, 1, 8, 0, 6, 64, 1, 25, 1, 11, 11,
                      ])
                    ) || "wasm-exceptions"
                  : "wasm-simd128"
                : "sign-extend"
              : "non-trapping fp-to-int"
            : "bulk-memory"
          : "WebAssembly";
      } catch (e) {
        return "Exception: " + e;
      }
    }
    (n =
      {
        "NT 5.0": "2000",
        "NT 5.1": "XP",
        "NT 5.2": "Server 2003",
        "NT 6.0": "Vista",
        "NT 6.1": "7",
        "NT 6.2": "8",
        "NT 6.3": "8.1",
        "NT 10.0": "10",
      }[n] || n),
      (webgpuVersion = 0),
      (f = document.createElement("canvas")) &&
        ((u = (p = f.getContext("webgl2")) ? 2 : 0),
        p || ((p = f && f.getContext("webgl")) && (u = 1)),
        p &&
          (o =
            (p.getExtension("WEBGL_debug_renderer_info") &&
              p.getParameter(37446)) ||
            p.getParameter(7937)));
    var f = "undefined" != typeof SharedArrayBuffer,
      p =
        "object" == typeof WebAssembly &&
        "function" == typeof WebAssembly.compile,
      m = p && !0 === h();
    return {
      width: screen.width,
      height: screen.height,
      userAgent: a.trim(),
      browser: e || "Unknown browser",
      browserVersion: t || "Unknown version",
      mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
      os: r || "Unknown OS",
      osVersion: n || "Unknown OS Version",
      gpu: o || "Unknown GPU",
      language: navigator.userLanguage || navigator.language,
      hasWebGL: u,
      hasWebGPU: webgpuVersion,
      hasCursorLock: !!document.body.requestPointerLock,
      hasFullscreen:
        !!document.body.requestFullscreen ||
        !!document.body.webkitRequestFullscreen,
      hasThreads: f,
      hasWasm: p,
      hasWasm2023: m,
      missingWasm2023Feature: m ? null : h(),
      hasWasmThreads: !1,
    };
  })()),
    (m.abortHandler = function (e) {
      return C(e, "", 0), !0;
    }),
    (Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50)),
    (m.readBodyWithProgress = function (a, i, s) {
      var e = a.body ? a.body.getReader() : void 0,
        c = void 0 !== a.headers.get("Content-Length"),
        d = (function (e, t) {
          if (!t) return 0;
          var t = e.headers.get("Content-Encoding"),
            r = parseInt(e.headers.get("Content-Length"));
          switch (t) {
            case "br":
              return Math.round(5 * r);
            case "gzip":
              return Math.round(4 * r);
            default:
              return r;
          }
        })(a, c),
        l = new Uint8Array(d),
        u = [],
        h = 0,
        f = 0;
      return (
        c ||
          console.warn(
            "[UnityCache] Response is served without Content-Length header. Please reconfigure server to include valid Content-Length for better download performance."
          ),
        (function o() {
          return void 0 === e
            ? a.arrayBuffer().then(function (e) {
                var t = new Uint8Array(e);
                return (
                  i({
                    type: "progress",
                    response: a,
                    total: e.length,
                    loaded: 0,
                    lengthComputable: c,
                    chunk: s ? t : null,
                  }),
                  t
                );
              })
            : e.read().then(function (e) {
                if (e.done) {
                  if (h === d) return l;
                  if (h < d) return l.slice(0, h);
                  for (
                    var t = new Uint8Array(h), r = (t.set(l, 0), f), n = 0;
                    n < u.length;
                    ++n
                  )
                    t.set(u[n], r), (r += u[n].length);
                  return t;
                }
                return (
                  h + e.value.length <= l.length
                    ? (l.set(e.value, h), (f = h + e.value.length))
                    : u.push(e.value),
                  (h += e.value.length),
                  i({
                    type: "progress",
                    response: a,
                    total: Math.max(d, h),
                    loaded: h,
                    lengthComputable: c,
                    chunk: s ? e.value : null,
                  }),
                  o()
                );
              });
        })().then(function (e) {
          return (
            i({
              type: "load",
              response: a,
              total: e.length,
              loaded: e.length,
              lengthComputable: c,
              chunk: null,
            }),
            (a.parsedBody = e),
            a
          );
        })
      );
    }),
    (m.fetchWithProgress = function (e, t) {
      var r = function () {};
      return (
        t && t.onProgress && (r = t.onProgress),
        fetch(e, t).then(function (e) {
          return m.readBodyWithProgress(e, r, t.enableStreamingDownload);
        })
      );
    }),
    (m.UnityCache =
      ((h = { name: "UnityCache", version: 4 }),
      (f = { name: "RequestMetaDataStore", version: 1 }),
      (p = "RequestStore"),
      (g = "WebAssembly"),
      (b =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB),
      (v = null),
      (k.getInstance = function () {
        return (v = v || new k());
      }),
      (k.destroyInstance = function () {
        return v
          ? v.close().then(function () {
              v = null;
            })
          : Promise.resolve();
      }),
      (k.prototype.clearCache = function () {
        var n = this;
        return this.isConnected
          .then(function () {
            return n.execute(f.name, "clear", []);
          })
          .then(function () {
            return n.cache.keys();
          })
          .then(function e(t) {
            var r;
            return 0 === t.length
              ? Promise.resolve()
              : ((r = t.pop()),
                n.cache.delete(r).then(function () {
                  return e(t);
                }));
          });
      }),
      (k.UnityCacheDatabase = h),
      (k.RequestMetaDataStore = f),
      (k.MaximumCacheSize = 1073741824),
      (k.prototype.loadRequest = function (e) {
        var t = this;
        return t.isConnected
          .then(function () {
            return Promise.all([t.cache.match(e), t.loadRequestMetaData(e)]);
          })
          .then(function (e) {
            if (void 0 !== e[0] && void 0 !== e[1])
              return { response: e[0], metaData: e[1] };
          });
      }),
      (k.prototype.loadRequestMetaData = function (e) {
        e = "string" == typeof e ? e : e.url;
        return this.execute(f.name, "get", [e]);
      }),
      (k.prototype.updateRequestMetaData = function (e) {
        return this.execute(f.name, "put", [e]);
      }),
      (k.prototype.storeRequest = function (e, t) {
        var r = this;
        return r.isConnected.then(function () {
          return r.cache.put(e, t);
        });
      }),
      (k.prototype.close = function () {
        return this.isConnected.then(
          function () {
            this.database && (this.database.close(), (this.database = null)),
              this.cache && (this.cache = null);
          }.bind(this)
        );
      }),
      (k.prototype.connect = function () {
        var o = this;
        return void 0 === b
          ? Promise.reject(
              new Error(
                "Could not connect to cache: IndexedDB is not supported."
              )
            )
          : void 0 === window.caches
          ? Promise.reject(
              new Error(
                "Could not connect to cache: Cache API is not supported."
              )
            )
          : new Promise(function (t, r) {
              try {
                function n() {
                  o.openDBTimeout &&
                    (clearTimeout(o.openDBTimeout), (o.openDBTimeout = null));
                }
                o.openDBTimeout = setTimeout(function () {
                  void 0 === o.database &&
                    r(
                      new Error("Could not connect to cache: Database timeout.")
                    );
                }, 2e4);
                var e = b.open(h.name, h.version);
                (e.onupgradeneeded = o.upgradeDatabase.bind(o)),
                  (e.onsuccess = function (e) {
                    n(), (o.database = e.target.result), t();
                  }),
                  (e.onerror = function (e) {
                    n(),
                      (o.database = null),
                      r(new Error("Could not connect to database."));
                  });
              } catch (e) {
                n(),
                  (o.database = null),
                  (o.cache = null),
                  r(
                    new Error(
                      "Could not connect to cache: Could not connect to database."
                    )
                  );
              }
            })
              .then(function () {
                var e = h.name + "_" + m.companyName + "_" + m.productName;
                return caches.open(e);
              })
              .then(function (e) {
                o.cache = e;
              });
      }),
      (k.prototype.upgradeDatabase = function (e) {
        var t,
          e = e.target.result;
        e.objectStoreNames.contains(f.name) ||
          ((t = e.createObjectStore(f.name, { keyPath: "url" })),
          ["accessedAt", "updatedAt"].forEach(function (e) {
            t.createIndex(e, e);
          })),
          e.objectStoreNames.contains(p) && e.deleteObjectStore(p),
          e.objectStoreNames.contains(g) && e.deleteObjectStore(g);
      }),
      (k.prototype.execute = function (a, i, s) {
        return this.isConnected.then(
          function () {
            return new Promise(
              function (t, r) {
                try {
                  var e, n, o;
                  null === this.database
                    ? r(new Error("indexedDB access denied"))
                    : ((e =
                        -1 != ["put", "delete", "clear"].indexOf(i)
                          ? "readwrite"
                          : "readonly"),
                      (n = this.database.transaction([a], e).objectStore(a)),
                      "openKeyCursor" == i &&
                        ((n = n.index(s[0])), (s = s.slice(1))),
                      ((o = n[i].apply(n, s)).onsuccess = function (e) {
                        t(e.target.result);
                      }),
                      (o.onerror = function (e) {
                        r(e);
                      }));
                } catch (e) {
                  r(e);
                }
              }.bind(this)
            );
          }.bind(this)
        );
      }),
      (k.prototype.getMetaDataEntries = function () {
        var n = this,
          o = 0,
          a = [];
        return new Promise(function (t, r) {
          var e = n.database
            .transaction([f.name], "readonly")
            .objectStore(f.name)
            .openCursor();
          (e.onsuccess = function (e) {
            e = e.target.result;
            e
              ? ((o += e.value.size), a.push(e.value), e.continue())
              : t({ metaDataEntries: a, cacheSize: o });
          }),
            (e.onerror = function (e) {
              r(e);
            });
        });
      }),
      (k.prototype.cleanUpCache = function () {
        var i = this;
        return this.getMetaDataEntries().then(function (e) {
          for (
            var t = e.metaDataEntries, r = e.cacheSize, n = [], o = [], a = 0;
            a < t.length;
            ++a
          )
            t[a].version == m.productVersion
              ? o.push(t[a])
              : (n.push(t[a]), (r -= t[a].size));
          o.sort(function (e, t) {
            return e.accessedAt - t.accessedAt;
          });
          for (a = 0; a < o.length && !(r < k.MaximumCacheSize); ++a)
            n.push(o[a]), (r -= o[a].size);
          return (function e() {
            var t;
            return 0 === n.length
              ? Promise.resolve()
              : ((t = n.pop()),
                i.cache
                  .delete(t.url)
                  .then(function (e) {
                    if (e)
                      return (
                        (n = t.url),
                        new Promise(function (e, t) {
                          var r = i.database.transaction([f.name], "readwrite");
                          r.objectStore(f.name).delete(n),
                            (r.oncomplete = e),
                            (r.onerror = t);
                        })
                      );
                    var n;
                  })
                  .then(e));
          })();
        });
      }),
      k)),
    (m.cachedFetch =
      ((w = m.UnityCache),
      (y = m.fetchWithProgress),
      (S = m.readBodyWithProgress),
      function (o, a) {
        var e,
          t,
          i = w.getInstance(),
          s = T("string" == typeof o ? o : o.url),
          c = {
            enabled:
              ((e = s),
              (!(t = a) || !t.method || "GET" === t.method) &&
                (!t ||
                  -1 != ["must-revalidate", "immutable"].indexOf(t.control)) &&
                !!e.match("^https?://")),
          };
        function d(r, n) {
          return fetch(r, n).then(function (e) {
            var t;
            return !c.enabled || c.revalidated
              ? e
              : 304 === e.status
              ? ((c.revalidated = !0),
                i
                  .updateRequestMetaData(c.metaData)
                  .then(function () {
                    E(
                      "'" +
                        c.metaData.url +
                        "' successfully revalidated and served from the browser cache"
                    );
                  })
                  .catch(function (e) {
                    E(
                      "'" +
                        c.metaData.url +
                        "' successfully revalidated but not stored in the browser cache due to the error: " +
                        e
                    );
                  }),
                S(c.response, n.onProgress, n.enableStreamingDownload))
              : 200 == e.status
              ? ((c.response = e),
                (c.metaData.updatedAt = c.metaData.accessedAt),
                (c.revalidated = !0),
                (t = e.clone()),
                S(e, n.onProgress, n.enableStreamingDownload).then(function (
                  e
                ) {
                  return (
                    (c.metaData.size = e.parsedBody.length),
                    Promise.all([
                      i.storeRequest(r, t),
                      i.updateRequestMetaData(c.metaData),
                    ])
                      .then(function () {
                        E(
                          "'" +
                            s +
                            "' successfully downloaded and stored in the browser cache"
                        );
                      })
                      .catch(function (e) {
                        E(
                          "'" +
                            s +
                            "' successfully downloaded but not stored in the browser cache due to the error: " +
                            e
                        );
                      }),
                    e
                  );
                }))
              : (E(
                  "'" +
                    s +
                    "' request failed with status: " +
                    e.status +
                    " " +
                    e.statusText
                ),
                S(e, n.onProgress, n.enableStreamingDownload));
          });
        }
        return (
          a &&
            ((c.control = a.control),
            (c.companyName = a.companyName),
            (c.productName = a.productName),
            (c.productVersion = a.productVersion)),
          (c.revalidated = !1),
          (c.metaData = {
            url: s,
            accessedAt: Date.now(),
            version: c.productVersion,
          }),
          (c.response = null),
          c.enabled
            ? i
                .loadRequest(s)
                .then(function (e) {
                  var r, n, t;
                  return e
                    ? ((r = e.response),
                      (n = e.metaData),
                      (c.response = r),
                      (c.metaData.size = n.size),
                      (c.metaData.updatedAt = n.updatedAt),
                      "immutable" == c.control
                        ? ((c.revalidated = !0),
                          i.updateRequestMetaData(n).then(function () {
                            E(
                              "'" +
                                c.metaData.url +
                                "' served from the browser cache without revalidation"
                            );
                          }),
                          S(r, a.onProgress, a.enableStreamingDownload))
                        : ((e = s),
                          ((t =
                            window.location.href.match(/^[a-z]+:\/\/[^\/]+/)) &&
                            !e.lastIndexOf(t[0], 0)) ||
                          (!r.headers.get("Last-Modified") &&
                            !r.headers.get("ETag"))
                            ? ((e = (a = a || {}).headers || {}),
                              (a.headers = e),
                              r.headers.get("Last-Modified")
                                ? ((e["If-Modified-Since"] =
                                    r.headers.get("Last-Modified")),
                                  (e["Cache-Control"] = "no-cache"))
                                : r.headers.get("ETag") &&
                                  ((e["If-None-Match"] = r.headers.get("ETag")),
                                  (e["Cache-Control"] = "no-cache")),
                              d(o, a))
                            : fetch(s, { method: "HEAD" }).then(function (t) {
                                return (
                                  (c.revalidated = [
                                    "Last-Modified",
                                    "ETag",
                                  ].every(function (e) {
                                    return (
                                      !r.headers.get(e) ||
                                      r.headers.get(e) == t.headers.get(e)
                                    );
                                  })),
                                  c.revalidated
                                    ? (i
                                        .updateRequestMetaData(n)
                                        .then(function () {
                                          E(
                                            "'" +
                                              c.metaData.url +
                                              "' successfully revalidated and served from the browser cache"
                                          );
                                        }),
                                      S(
                                        c.response,
                                        a.onProgress,
                                        a.enableStreamingDownload
                                      ))
                                    : d(o, a)
                                );
                              })))
                    : d(o, a);
                })
                .catch(function (e) {
                  return (
                    E(
                      "Failed to load '" +
                        c.metaData.url +
                        "' from browser cache due to the error: " +
                        e
                    ),
                    y(o, a)
                  );
                })
            : y(o, a)
        );
      }));
  var x = {
    gzip: {
      hasUnityMarker: function (e) {
        var t = 10,
          r = "UnityWeb Compressed Content (gzip)";
        if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
        var n = e[3];
        if (4 & n) {
          if (t + 2 > e.length) return !1;
          if ((t += 2 + e[t] + (e[t + 1] << 8)) > e.length) return !1;
        }
        if (8 & n) {
          for (; t < e.length && e[t]; ) t++;
          if (t + 1 > e.length) return !1;
          t++;
        }
        return (
          16 & n &&
          String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) ==
            r + "\0"
        );
      },
    },
    br: {
      hasUnityMarker: function (e) {
        var t = "UnityWeb Compressed Content (brotli)";
        if (!e.length) return !1;
        var r = 1 & e[0] ? (14 & e[0] ? 4 : 7) : 1,
          n = e[0] & ((1 << r) - 1),
          o = 1 + ((Math.log(t.length - 1) / Math.log(2)) >> 3);
        if (
          ((commentOffset = (1 + r + 2 + 1 + 2 + (o << 3) + 7) >> 3),
          17 == n || commentOffset > e.length)
        )
          return !1;
        for (
          var a = n + ((6 + (o << 4) + ((t.length - 1) << 6)) << r), i = 0;
          i < commentOffset;
          i++, a >>>= 8
        )
          if (e[i] != (255 & a)) return !1;
        return (
          String.fromCharCode.apply(
            null,
            e.subarray(commentOffset, commentOffset + t.length)
          ) == t
        );
      },
    },
  };
  function D(t) {
    P(t);
    var e = m.cacheControl(m[t]),
      r = m.companyName && m.productName ? m.cachedFetch : m.fetchWithProgress,
      n = m[t],
      o = /file:\/\//.exec(n) ? "same-origin" : void 0;
    return r(m[t], {
      method: "GET",
      companyName: m.companyName,
      productName: m.productName,
      productVersion: m.productVersion,
      control: e,
      mode: o,
      onProgress: function (e) {
        P(t, e);
      },
    })
      .then(function (e) {
        return (
          (i = e.parsedBody),
          (s = m[t]),
          new Promise(function (e, t) {
            try {
              for (var r in x) {
                var n, o, a;
                if (x[r].hasUnityMarker(i))
                  return (
                    s &&
                      console.log(
                        'You can reduce startup time if you configure your web server to add "Content-Encoding: ' +
                          r +
                          '" response header when serving "' +
                          s +
                          '" file.'
                      ),
                    (n = x[r]).worker ||
                      ((o = URL.createObjectURL(
                        new Blob(
                          [
                            "this.require = ",
                            n.require.toString(),
                            "; this.decompress = ",
                            n.decompress.toString(),
                            "; this.onmessage = ",
                            function (e) {
                              e = {
                                id: e.data.id,
                                decompressed: this.decompress(
                                  e.data.compressed
                                ),
                              };
                              postMessage(
                                e,
                                e.decompressed ? [e.decompressed.buffer] : []
                              );
                            }.toString(),
                            "; postMessage({ ready: true });",
                          ],
                          { type: "application/javascript" }
                        )
                      )),
                      (n.worker = new Worker(o)),
                      (n.worker.onmessage = function (e) {
                        e.data.ready
                          ? URL.revokeObjectURL(o)
                          : (this.callbacks[e.data.id](e.data.decompressed),
                            delete this.callbacks[e.data.id]);
                      }),
                      (n.worker.callbacks = {}),
                      (n.worker.nextCallbackId = 0)),
                    (a = n.worker.nextCallbackId++),
                    (n.worker.callbacks[a] = e),
                    void n.worker.postMessage({ id: a, compressed: i }, [
                      i.buffer,
                    ])
                  );
              }
              e(i);
            } catch (e) {
              t(e);
            }
          })
        );
        var i, s;
      })
      .catch(function (e) {
        var t = "Failed to download file " + n;
        "file:" == location.protocol
          ? d(
              t +
                ". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.",
              "error"
            )
          : console.error(t);
      });
  }
  function A() {
    var t = performance.now(),
      p =
        (Promise.all([
          D("frameworkUrl").then(function (e) {
            var s = URL.createObjectURL(
              new Blob([e], { type: "application/javascript" })
            );
            return new Promise(function (a, e) {
              var i = document.createElement("script");
              (i.src = s),
                (i.onload = function () {
                  if ("undefined" == typeof unityFramework || !unityFramework) {
                    var e,
                      t = [
                        ["br", "br"],
                        ["gz", "gzip"],
                      ];
                    for (e in t) {
                      var r,
                        n = t[e];
                      if (m.frameworkUrl.endsWith("." + n[0]))
                        return (
                          (r = "Unable to parse " + m.frameworkUrl + "!"),
                          "file:" == location.protocol
                            ? void d(
                                r +
                                  " Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.",
                                "error"
                              )
                            : ((r +=
                                ' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: ' +
                                n[1] +
                                '" present. Check browser Console and Devtools Network tab to debug.'),
                              "br" == n[0] &&
                                "http:" == location.protocol &&
                                ((n =
                                  -1 !=
                                  ["localhost", "127.0.0.1"].indexOf(
                                    location.hostname
                                  )
                                    ? ""
                                    : "Migrate your server to use HTTPS."),
                                (r = /Firefox/.test(navigator.userAgent)
                                  ? "Unable to parse " +
                                    m.frameworkUrl +
                                    '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. ' +
                                    n +
                                    ' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.'
                                  : "Unable to parse " +
                                    m.frameworkUrl +
                                    '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.')),
                              void d(r, "error"))
                        );
                    }
                    d(
                      "Unable to parse " +
                        m.frameworkUrl +
                        "! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)",
                      "error"
                    );
                  }
                  var o = unityFramework;
                  (unityFramework = null),
                    (i.onload = null),
                    URL.revokeObjectURL(s),
                    a(o);
                }),
                (i.onerror = function (e) {
                  d(
                    "Unable to load file " +
                      m.frameworkUrl +
                      "! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)",
                    "error"
                  );
                }),
                document.body.appendChild(i),
                m.deinitializers.push(function () {
                  document.body.removeChild(i);
                });
            });
          }),
          D("codeUrl"),
          D("workerUrl").then(function (e) {
            var t = URL.createObjectURL(
              new Blob([e], { type: "application/javascript" })
            );
            (m.compressedWorkerUrl = m.workerUrl),
              (m.workerUrl = t),
              m.deinitializers.push(function () {
                URL.revokeObjectURL(t);
              });
          }),
        ]).then(function (e) {
          (m.wasmBinary = e[1]),
            e[0](m),
            (m.codeDownloadTimeEnd = performance.now() - t);
        }),
        performance.now()),
      e = D("dataUrl");
    m.preRun.push(function () {
      m.addRunDependency("dataUrl"),
        e.then(function (t) {
          var e = new TextDecoder("utf-8"),
            r = 0;
          function n() {
            var e =
              (t[r] | (t[r + 1] << 8) | (t[r + 2] << 16) | (t[r + 3] << 24)) >>>
              0;
            return (r += 4), e;
          }
          function o(e) {
            if (x.gzip.hasUnityMarker(t))
              throw (
                e +
                '. Failed to parse binary data file, because it is still gzip-compressed and should have been uncompressed by the browser. Web server has likely provided gzip-compressed data without specifying the HTTP Response Header "Content-Encoding: gzip" with it to instruct the browser to decompress it. Please verify your web server hosting configuration.'
              );
            if (x.br.hasUnityMarker(t))
              throw (
                e +
                '. Failed to parse binary data file, because it is still brotli-compressed and should have been uncompressed by the browser. Web server has likely provided brotli-compressed data without specifying the HTTP Response Header "Content-Encoding: br" with it to instruct the browser to decompress it. Please verify your web server hosting configuration.'
              );
            throw e;
          }
          var a = "UnityWebData1.0\0",
            i = e.decode(t.subarray(0, a.length)),
            s =
              (i != a && o('Unknown data format (id="' + i + '")'),
              (r += a.length),
              n());
          for (
            r + s > t.length &&
            o(
              "Invalid binary data file header! (pos=" +
                r +
                ", headerSize=" +
                s +
                ", file length=" +
                t.length +
                ")"
            );
            r < s;

          ) {
            var c = n(),
              d = n(),
              l =
                (c + d > t.length &&
                  o(
                    "Invalid binary data file size! (offset=" +
                      c +
                      ", size=" +
                      d +
                      ", file length=" +
                      t.length +
                      ")"
                  ),
                n()),
              u =
                (r + l > t.length &&
                  o(
                    "Invalid binary data file path name! (pos=" +
                      r +
                      ", length=" +
                      l +
                      ", file length=" +
                      t.length +
                      ")"
                  ),
                e.decode(t.subarray(r, r + l)));
            r += l;
            for (
              var h = 0, f = u.indexOf("/", h) + 1;
              0 < f;
              h = f, f = u.indexOf("/", h) + 1
            )
              m.FS_createPath(u.substring(0, h), u.substring(h, f - 1), !0, !0);
            m.FS_createDataFile(u, null, t.subarray(c, c + d), !0, !0, !0);
          }
          m.removeRunDependency("dataUrl"),
            (m.dataUrlLoadEndTime = performance.now() - p);
        });
    });
  }
  return new Promise(function (e, t) {
    var r;
    m.SystemInfo.hasWebGL
      ? 1 == m.SystemInfo.hasWebGL
        ? ((r =
            'Your browser does not support graphics API "WebGL 2" which is required for this content.'),
          "Safari" == m.SystemInfo.browser &&
            parseInt(m.SystemInfo.browserVersion) < 15 &&
            (m.SystemInfo.mobile || 1 < navigator.maxTouchPoints
              ? (r += "\nUpgrade to iOS 15 or later.")
              : (r += "\nUpgrade to Safari 15 or later.")),
          t(r))
        : m.SystemInfo.hasWasm
        ? ((m.startupErrorHandler = t),
          c(0),
          m.postRun.push(function () {
            c(1),
              m.WebPlayer.WaitForInitialization().then(function () {
                delete m.startupErrorHandler,
                  e(U),
                  (m.pageStartupTime = performance.now());
              });
          }),
          (m.SystemInfo.hasWebGPU = !1),
          Promise.resolve(!1).then(function () {
            A();
          }))
        : t("Your browser does not support WebAssembly.")
      : t("Your browser does not support WebGL.");
  });
}
