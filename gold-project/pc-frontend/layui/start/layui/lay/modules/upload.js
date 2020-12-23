/** layui-v2.5.7 MIT License */
;
layui.define("layer",
function(e) {
    "use strict";
    var t = layui.$,
    i = layui.layer,
    n = layui.hint(),
    o = layui.device(),
    a = {
        config: {},
        set: function(e) {
            var i = this;
            return i.config = t.extend({},
            i.config, e),
            i
        },
        on: function(e, t) {
            return layui.onevent.call(this, r, e, t)
        }
    },
    l = function() {
        var e = this;
        return {
            upload: function(t) {
                e.upload.call(e, t)
            },
            reload: function(t) {
                e.reload.call(e, t)
            },
            config: e.config
        }
    },
    r = "upload",
    u = "layui-upload-file",
    c = "layui-upload-form",
    f = "layui-upload-iframe",
    s = "layui-upload-choose",
    p = function(e) {
        var i = this;
        i.config = t.extend({},
        i.config, a.config, e),
        i.render()
    };
    p.prototype.config = {
        accept: "images",
        exts: "",
        auto: !0,
        bindAction: "",
        url: "",
        field: "file",
        acceptMime: "",
        method: "post",
        data: {},
        drag: !0,
        size: 0,
        number: 0,
        multiple: !1
    },
    p.prototype.render = function(e) {
        var i = this,
        e = i.config;
        e.elem = t(e.elem),
        e.bindAction = t(e.bindAction),
        i.file(),
        i.events()
    },
    p.prototype.file = function() {
        var e = this,
        i = e.config,
        n = e.elemFile = t(['<input class="' + u + '" type="file" accept="' + i.acceptMime + '" name="' + i.field + '"', i.multiple ? " multiple": "", ">"].join("")),
        a = i.elem.next(); (a.hasClass(u) || a.hasClass(c)) && a.remove(),
        o.ie && o.ie < 10 && i.elem.wrap('<div class="layui-upload-wrap"></div>'),
        e.isFile() ? (e.elemFile = i.elem, i.field = i.elem[0].name) : i.elem.after(n),
        o.ie && o.ie < 10 && e.initIE()
    },
    p.prototype.initIE = function() {
        var e = this,
        i = e.config,
        n = t('<iframe id="' + f + '" class="' + f + '" name="' + f + '" frameborder="0"></iframe>'),
        o = t(['<form target="' + f + '" class="' + c + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + i.url + '">', "</form>"].join(""));
        t("#" + f)[0] || t("body").append(n),
        i.elem.next().hasClass(c) || (e.elemFile.wrap(o), i.elem.next("." + c).append(function() {
            var e = [];
            return layui.each(i.data,
            function(t, i) {
                i = "function" == typeof i ? i() : i,
                e.push('<input type="hidden" name="' + t + '" value="' + i + '">')
            }),
            e.join("")
        } ()))
    },
    p.prototype.msg = function(e) {
        return i.msg(e, {
            icon: 2,
            shift: 6
        })
    },
    p.prototype.isFile = function() {
        var e = this.config.elem[0];
        if (e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type
    },
    p.prototype.preview = function(e) {
        var t = this;
        window.FileReader && layui.each(t.chooseFiles,
        function(t, i) {
            var n = new FileReader;
            n.readAsDataURL(i),
            n.onload = function() {
                e && e(t, i, this.result)
            }
        })
    },
    p.prototype.upload = function(e, i) {
        var n, a = this,
        l = a.config,
        r = a.elemFile[0],
        u = function() {
            var i = 0,
            n = 0,
            o = e || a.files || a.chooseFiles || r.files,
            u = function() {
                l.multiple && i + n === a.fileLength && "function" == typeof l.allDone && l.allDone({
                    total: a.fileLength,
                    successful: i,
                    aborted: n
                })
            };
            layui.each(o,
            function(e, o) {
                var r = new FormData;
                r.append(l.field, o);

                if(l.data.formatData){
                	l.data[l.data.formatData]=t('#'+l.data.formatData).val();
                }
                if(l.data.extendData){
                	l.data=t.extend(l.data,l.data.extendData);
                }
                delete l.data.formatData;
                delete l.data.extendData;
                layui.each(l.data,
                function(e, t) {
                    t = "function" == typeof t ? t() : t,
                    r.append(e, t)
                });
                var c = {
                    url: l.url,
                    type: "post",
                    data: r,
                    contentType: !1,
                    processData: !1,
                    dataType: "json",
                    headers: l.headers || {},
                    success: function(t) {
                        i++,
                        d(e, t),
                        u()
                    },
                    error: function() {
                        n++,
                        a.msg("请求上传接口出现异常"),
                        m(e),
                        u()
                    }
                };
                "function" == typeof l.progress && (c.xhr = function() {
                    var e = t.ajaxSettings.xhr();
                    return e.upload.addEventListener("progress",
                    function(e) {
                        if (e.lengthComputable) {
                            var t = Math.floor(e.loaded / e.total * 100);
                            l.progress(t, l.item[0], e)
                        }
                    }),
                    e
                }),
                t.ajax(c)
            })
        },
        c = function() {
            var e = t("#" + f);
            a.elemFile.parent().submit(),
            clearInterval(p.timer),
            p.timer = setInterval(function() {
                var t, i = e.contents().find("body");
                try {
                    t = i.text()
                } catch(n) {
                    a.msg("获取上传后的响应信息出现异常"),
                    clearInterval(p.timer),
                    m()
                }
                t && (clearInterval(p.timer), i.html(""), d(0, t))
            },
            30)
        },
        d = function(e, t) {
            if (a.elemFile.next("." + s).remove(), r.value = "", "object" != typeof t) try {
                t = JSON.parse(t)
            } catch(i) {
                return t = {},
                a.msg("请对上传接口返回有效JSON")
            }
            "function" == typeof l.done && l.done(t, e || 0,
            function(e) {
                a.upload(e)
            })
        },
        m = function(e) {
            l.auto && (r.value = ""),
            "function" == typeof l.error && l.error(e || 0,
            function(e) {
                a.upload(e)
            })
        },
        h = l.exts,
        v = function() {
            var t = [];
            return layui.each(e || a.chooseFiles,
            function(e, i) {
                t.push(i.name)
            }),
            t
        } (),
        g = {
            preview: function(e) {
                a.preview(e)
            },
            upload: function(e, t) {
                var i = {};
                i[e] = t,
                a.upload(i)
            },
            pushFile: function() {
                return a.files = a.files || {},
                layui.each(a.chooseFiles,
                function(e, t) {
                    a.files[e] = t
                }),
                a.files
            },
            resetFile: function(e, t, i) {
                var n = new File([t], i);
                a.files = a.files || {},
                a.files[e] = n
            }
        },
        y = function() {
            if ("choose" !== i && !l.auto || (l.choose && l.choose(g), "choose" !== i)) return l.before && l.before(g),
            o.ie ? o.ie > 9 ? u() : c() : void u()
        };
        if (v = 0 === v.length ? r.value.match(/[^\/\\]+\..+/g) || [] || "": v, 0 !== v.length) {
            switch (l.accept) {
            case "file":
                if (h && !RegExp("\\w\\.(" + h + ")$", "i").test(escape(v))) return a.msg("选择的文件中包含不支持的格式"),
                r.value = "";
                break;
            case "video":
                if (!RegExp("\\w\\.(" + (h || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(v))) return a.msg("选择的视频中包含不支持的格式"),
                r.value = "";
                break;
            case "audio":
                if (!RegExp("\\w\\.(" + (h || "mp3|wav|mid") + ")$", "i").test(escape(v))) return a.msg("选择的音频中包含不支持的格式"),
                r.value = "";
                break;
            default:
                if (layui.each(v,
                function(e, t) {
                    RegExp("\\w\\.(" + (h || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(t)) || (n = !0)
                }), n) return a.msg("选择的图片中包含不支持的格式"),
                r.value = ""
            }
            if (a.fileLength = function() {
                var t = 0,
                i = e || a.files || a.chooseFiles || r.files;
                return layui.each(i,
                function() {
                    t++
                }),
                t
            } (), l.number && a.fileLength > l.number) return a.msg("同时最多只能上传的数量为：" + l.number);
            if (l.size > 0 && !(o.ie && o.ie < 10)) {
                var F;
                if (layui.each(a.chooseFiles,
                function(e, t) {
                    if (t.size > 1024 * l.size) {
                        var i = l.size / 1024;
                        i = i >= 1 ? i.toFixed(2) + "MB": l.size + "KB",
                        r.value = "",
                        F = i
                    }
                }), F) return a.msg("文件不能超过" + F)
            }
            y()
        }
    },
    p.prototype.reload = function(e) {
        e = e || {},
        delete e.elem,
        delete e.bindAction;
        var i = this,
        e = i.config = t.extend({},
        i.config, a.config, e),
        n = e.elem.next();
        n.attr({
            name: e.name,
            accept: e.acceptMime,
            multiple: e.multiple
        })
    },
    p.prototype.events = function() {
        var e = this,
        i = e.config,
        a = function(t) {
            e.chooseFiles = {},
            layui.each(t,
            function(t, i) {
                var n = (new Date).getTime();
                e.chooseFiles[n + "-" + t] = i
            })
        },
        l = function(t, n) {
            var o = e.elemFile,
            a = t.length > 1 ? t.length + "个文件": (t[0] || {}).name || o[0].value.match(/[^\/\\]+\..+/g) || [] || "";
            o.next().hasClass(s) && o.next().remove(),
            e.upload(null, "choose"),
            e.isFile() || i.choose || o.after('<span class="layui-inline ' + s + '">' + a + "</span>")
        };
        i.elem.off("upload.start").on("upload.start",
        function() {
            var o = t(this),
            a = o.attr("lay-data");
            if (a) try {
                a = new Function("return " + a)(),
                e.config = t.extend({},
                i, a)
            } catch(l) {
                n.error("Upload element property lay-data configuration item has a syntax error: " + a)
            }
            e.config.item = o,
            e.elemFile[0].click()
        }),
        o.ie && o.ie < 10 || i.elem.off("upload.over").on("upload.over",
        function() {
            var e = t(this);
            e.attr("lay-over", "")
        }).off("upload.leave").on("upload.leave",
        function() {
            var e = t(this);
            e.removeAttr("lay-over")
        }).off("upload.drop").on("upload.drop",
        function(n, o) {
            var r = t(this),
            u = o.originalEvent.dataTransfer.files || [];
            r.removeAttr("lay-over"),
            a(u),
            i.auto ? e.upload(u) : l(u)
        }),
        e.elemFile.off("upload.change").on("upload.change",
        function() {
            var t = this.files || [];
            a(t),
            i.auto ? e.upload() : l(t)
        }),
        i.bindAction.off("upload.action").on("upload.action",
        function() {
            e.upload()
        }),
        i.elem.data("haveEvents") || (e.elemFile.on("change",
        function() {
            t(this).trigger("upload.change")
        }), i.elem.on("click",
        function() {
            e.isFile() || t(this).trigger("upload.start")
        }), i.drag && i.elem.on("dragover",
        function(e) {
            e.preventDefault(),
            t(this).trigger("upload.over")
        }).on("dragleave",
        function(e) {
            t(this).trigger("upload.leave")
        }).on("drop",
        function(e) {
            e.preventDefault(),
            t(this).trigger("upload.drop", e)
        }), i.bindAction.on("click",
        function() {
            t(this).trigger("upload.action")
        }), i.elem.data("haveEvents", !0))
    },
    a.render = function(e) {
        var t = new p(e);
        return l.call(t)
    },
    e(r, a)
});