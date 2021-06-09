/*! jQuery Validation Plugin - v1.16.0 - 12/2/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
! function(a) { "function" === typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) { a.extend(a.fn, { validate: function(b) { if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")); var c = a.data(this[0], "validator"); return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) { c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function(b) {
                function d() { var d, e; return !c.settings.submitHandler || (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e && e) } return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1) })), c) }, valid: function() { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b }, rules: function(b, c) { var d, e, f, g, h, i, j = this[0]; if (null != j && null != j.form) { if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages)); break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) { i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required") }), i) : (delete e[j.name], f) }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g } } }), a.extend(a.expr.pseudos || a.expr[":"], { blank: function(b) { return !a.trim("" + a(b).val()) }, filled: function(b) { var c = a(b).val(); return null !== c && !!a.trim("" + c) }, unchecked: function(b) { return !a(b).prop("checked") } }), a.validator = function(b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function(b, c) { return 1 === arguments.length ? function() { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() { return c }) }), b) }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function(a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function(a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) }, onkeyup: function(b, c) { var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b) }, onclick: function(a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) }, unhighlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) } }, setDefaults: function(b) { a.extend(a.validator.defaults, b) }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function() {
                function b(b) {!this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]); var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b) }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function(b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true") }, form: function() { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function() { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() }, element: function(b) { var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0; return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h)) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h }, showErrors: function(b) { if (b) { var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function(a) { return !(a.name in b) }) }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function() { a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors(); var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b) }, resetElements: function(a) { var b; if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass) }, numberOfInvalids: function() { return this.objectLength(this.invalid) }, objectLength: function(a) { var b, c = 0; for (b in a) a[b] && c++; return c }, hideErrors: function() { this.hideThese(this.toHide) }, hideThese: function(a) { a.not(this.containers).text(""), this.addWrapper(a).hide() }, valid: function() { return 0 === this.size() }, size: function() { return this.errorList.length }, focusInvalid: function() { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) {} }, findLastActive: function() { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function(a) { return a.element.name === b.name }).length && b }, elements: function() { var b = this,
                    c = {}; return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() { var d = this.name || a(this).attr("name"); return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0) }) }, clean: function(b) { return a(b)[0] }, errors: function() { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) }, resetInternals: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) }, reset: function() { this.resetInternals(), this.currentElements = a([]) }, prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function(a) { this.reset(), this.toHide = this.errorsFor(a) }, elementValue: function(b) { var c, d, e = a(b),
                    f = b.type; return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c) }, check: function(b) { b = this.validationTargetFor(this.clean(b)); var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) { return b }).length,
                    h = !1,
                    i = this.elementValue(b); if ("function" == typeof f.normalizer) { if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
                    delete f.normalizer } for (d in f) { e = { method: d, parameters: f[d] }; try { if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) { h = !0; continue } if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (j) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j } } if (!h) return this.objectLength(f) && this.successList.push(b), !0 }, customDataMessage: function(b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") }, customMessage: function(a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) }, findDefined: function() { for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a] }, defaultMessage: function(b, c) { "string" == typeof c && (c = { method: c }); var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g; return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d }, formatAndAdd: function(a, b) { var c = this.defaultMessage(a, b);
                this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c }, addWrapper: function(a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a }, defaultShowErrors: function() { var a, b, c; for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message); if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]); if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function() { return this.currentElements.not(this.invalidElements()) }, invalidElements: function() { return a(this.errorList).map(function() { return this.element }) }, showLabel: function(b, c) { var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h) }, errorsFor: function(b) { var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *"; return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e) }, escapeCssMeta: function(a) { return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1") }, idOrName: function(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function(b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] }, checkable: function(a) { return /radio|checkbox/i.test(a.type) }, findByName: function(b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") }, getLength: function(b, c) { switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length } return b.length }, depend: function(a, b) { return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b) }, dependTypes: { "boolean": function(a) { return a }, string: function(b, c) { return !!a(b, c.form).length }, "function": function(a, b) { return a(b) } }, optional: function(b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" }, startRequest: function(b) { this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) }, stopRequest: function(b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function(b, c) { return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) }, destroy: function() { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function(b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) }, classRules: function(b) { var c = {},
                d = a(b).attr("class"); return d && a.each(d.split(" "), function() { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c }, normalizeAttributeRule: function(a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) }, attributeRules: function(b) { var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type"); for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d); return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e }, dataRules: function(b) { var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type"); for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d); return e }, staticRules: function(b) { var c = {},
                d = a.data(b.form, "validator"); return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c }, normalizeRules: function(b, c) { return a.each(b, function(d, e) { if (e === !1) return void delete b[d]; if (e.param || e.depends) { var f = !0; switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length; break;
                        case "function":
                            f = e.depends.call(c, c) }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]) } }), a.each(b, function(d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function() { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function() { var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])])) }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b }, normalizeRule: function(b) { if ("string" == typeof b) { var c = {};
                a.each(b.split(/\s/), function() { c[this] = !0 }), b = c } return b }, addMethod: function(b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) }, methods: { required: function(b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0 }, email: function(a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function(a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a) }, date: function(a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) }, dateISO: function(a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function(a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function(a, b) { return this.optional(b) || /^\d+$/.test(a) }, minlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d }, maxlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e <= d }, rangelength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] }, min: function(a, b, c) { return this.optional(b) || a >= c }, max: function(a, b, c) { return this.optional(b) || a <= c }, range: function(a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] }, step: function(b, c, d) { var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) { var b = ("" + a).match(/(?:\.(\d+))?$/); return b && b[1] ? b[1].length : 0 },
                    l = function(a) { return Math.round(a * Math.pow(10, e)) },
                    m = !0; if (j) throw new Error(g); return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m }, equalTo: function(b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() { a(c).valid() }), b === e.val() }, remote: function(b, c, d, e) { if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote"; var f, g, h, i = this.previousValue(c, e); return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function(a) { var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j) } }, d)), "pending") } } }); var b, c = {}; return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function(d) { var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port; return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments) }), a });
window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e, t) { t = t || window; for (var o = 0; o < this.length; o++) e.call(t, this[o], o, this) }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) { for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; 0 <= --o && t.item(o) !== this;); return -1 < o }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) { var t = this;
    do { if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode } while (null !== t && 1 === t.nodeType); return null }), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(e) { e.hasOwnProperty("prepend") || Object.defineProperty(e, "prepend", { configurable: !0, enumerable: !0, writable: !0, value: function() { var e = Array.prototype.slice.call(arguments),
                o = document.createDocumentFragment();
            e.forEach(function(e) { var t = e instanceof Node;
                o.appendChild(t ? e : document.createTextNode(String(e))) }), this.insertBefore(o, this.firstChild) } }) }), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(e) { e.hasOwnProperty("append") || Object.defineProperty(e, "append", { configurable: !0, enumerable: !0, writable: !0, value: function() { var e = Array.prototype.slice.call(arguments),
                o = document.createDocumentFragment();
            e.forEach(function(e) { var t = e instanceof Node;
                o.appendChild(t ? e : document.createTextNode(String(e))) }), this.appendChild(o) } }) }), [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function(e) { e.hasOwnProperty("before") || Object.defineProperty(e, "before", { configurable: !0, enumerable: !0, writable: !0, value: function() { var e = Array.prototype.slice.call(arguments),
                o = document.createDocumentFragment();
            e.forEach(function(e) { var t = e instanceof Node;
                o.appendChild(t ? e : document.createTextNode(String(e))) }), this.parentNode.insertBefore(o, this) } }) }), [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function(e) { e.hasOwnProperty("remove") || Object.defineProperty(e, "remove", { configurable: !0, enumerable: !0, writable: !0, value: function() { null !== this.parentNode && this.parentNode.removeChild(this) } }) });
! function(e) { var t = {};

    function n(i) { if (t[i]) return t[i].exports; var s = t[i] = { i: i, l: !1, exports: {} }; return e[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports }
    n.m = e, n.c = t, n.d = function(e, t, i) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i }) }, n.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function(e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var i = Object.create(null); if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
            for (var s in e) n.d(i, s, function(t) { return e[t] }.bind(null, s)); return i }, n.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return n.d(t, "a", t), t }, n.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 1) }([function(e) { e.exports = JSON.parse('{"a":"8.5.16"}') }, function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0),
        s = { hooks: {}, extensions: [], wrappers: [], navbar: { add: !0, sticky: !0, title: "Menu", titleLink: "parent" }, onClick: { close: null, preventDefault: null, setSelected: !0 }, slidingSubmenus: !0 },
        a = { classNames: { inset: "Inset", nolistview: "NoListview", nopanel: "NoPanel", panel: "Panel", selected: "Selected", vertical: "Vertical" }, language: null, openingInterval: 25, panelNodetype: ["ul", "ol", "div"], transitionDuration: 400 };

    function o(e, t) { for (var n in "object" != r(e) && (e = {}), "object" != r(t) && (t = {}), t) t.hasOwnProperty(n) && (void 0 === e[n] ? e[n] = t[n] : "object" == r(e[n]) && o(e[n], t[n])); return e }

    function r(e) { return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase() }

    function c(e, t, n) { if ("function" == typeof t) { var i = t.call(e); if (void 0 !== i) return i } return null !== t && "function" != typeof t && void 0 !== t || void 0 === n ? t : n }

    function m(e, t, n) { var i = !1,
            s = function(n) { void 0 !== n && n.target !== e || (i || (e.removeEventListener("transitionend", s), e.removeEventListener("webkitTransitionEnd", s), t.call(e)), i = !0) };
        e.addEventListener("transitionend", s), e.addEventListener("webkitTransitionEnd", s), setTimeout(s, 1.1 * n) }

    function l() { return "mm-" + d++ }
    var d = 0;

    function p(e) { return "mm-" == e.slice(0, 3) ? e.slice(3) : e }
    var u = {};

    function f(e, t) { void 0 === u[t] && (u[t] = {}), o(u[t], e) }
    var h = { Menu: "منو" },
        v = { Menu: "Menü" },
        b = { Menu: "Меню" };

    function g(e) { var t = e.split("."),
            n = document.createElement(t.shift()); return t.forEach((function(e) { n.classList.add(e) })), n }

    function _(e, t) { return Array.prototype.slice.call(e.querySelectorAll(t)) }

    function y(e, t) { var n = Array.prototype.slice.call(e.children); return t ? n.filter((function(e) { return e.matches(t) })) : n }

    function L(e, t) { for (var n = [], i = e.parentElement; i;) n.push(i), i = i.parentElement; return t ? n.filter((function(e) { return e.matches(t) })) : n }

    function w(e) { return e.filter((function(e) { return !e.matches(".mm-hidden") })) }

    function E(e) { var t = []; return w(e).forEach((function(e) { t.push.apply(t, y(e, "a.mm-listitem__text")) })), t.filter((function(e) { return !e.matches(".mm-btn_next") })) }

    function x(e, t, n) { e.matches("." + t) && (e.classList.remove(t), e.classList.add(n)) }
    var P = {};

    function k(e, t, n) { "number" == typeof e && (e = "(min-width: " + e + "px)"), P[e] = P[e] || [], P[e].push({ yes: t, no: n }) }

    function S(e, t) { for (var n = t.matches ? "yes" : "no", i = 0; i < P[e].length; i++) P[e][i][n]() }
    f({ Menu: "Menu" }, "nl"), f(h, "fa"), f(v, "de"), f(b, "ru");
    var M = function() {
            function e(t, n, i) { return this.opts = o(n, e.options), this.conf = o(i, e.configs), this._api = ["bind", "initPanel", "initListview", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.node = {}, this.vars = {}, this.hook = {}, this.clck = [], this.node.menu = "string" == typeof t ? document.querySelector(t) : t, "function" == typeof this._deprecatedWarnings && this._deprecatedWarnings(), this._initWrappers(), this._initAddons(), this._initExtensions(), this._initHooks(), this._initAPI(), this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(),
                    function() { var e = function(e) { var t = window.matchMedia(e);
                            S(e, t), t.onchange = function(n) { S(e, t) } }; for (var t in P) e(t) }(), this } return e.prototype.openPanel = function(e, t) { var n = this; if (this.trigger("openPanel:before", [e]), e && (e.matches(".mm-panel") || (e = e.closest(".mm-panel")), e)) { if ("boolean" != typeof t && (t = !0), e.parentElement.matches(".mm-listitem_vertical")) { L(e, ".mm-listitem_vertical").forEach((function(e) { e.classList.add("mm-listitem_opened"), y(e, ".mm-panel").forEach((function(e) { e.classList.remove("mm-hidden") })) })); var i = L(e, ".mm-panel").filter((function(e) { return !e.parentElement.matches(".mm-listitem_vertical") }));
                        this.trigger("openPanel:start", [e]), i.length && this.openPanel(i[0]), this.trigger("openPanel:finish", [e]) } else { if (e.matches(".mm-panel_opened")) return; var s = y(this.node.pnls, ".mm-panel"),
                            a = y(this.node.pnls, ".mm-panel_opened")[0];
                        s.filter((function(t) { return t !== e })).forEach((function(e) { e.classList.remove("mm-panel_opened-parent") })); for (var o = e.mmParent; o;)(o = o.closest(".mm-panel")) && (o.parentElement.matches(".mm-listitem_vertical") || o.classList.add("mm-panel_opened-parent"), o = o.mmParent);
                        s.forEach((function(e) { e.classList.remove("mm-panel_highest") })), s.filter((function(e) { return e !== a })).filter((function(t) { return t !== e })).forEach((function(e) { e.classList.add("mm-hidden") })), e.classList.remove("mm-hidden"); var r = function() { a && a.classList.remove("mm-panel_opened"), e.classList.add("mm-panel_opened"), e.matches(".mm-panel_opened-parent") ? (a && a.classList.add("mm-panel_highest"), e.classList.remove("mm-panel_opened-parent")) : (a && a.classList.add("mm-panel_opened-parent"), e.classList.add("mm-panel_highest")), n.trigger("openPanel:start", [e]) },
                            c = function() { a && (a.classList.remove("mm-panel_highest"), a.classList.add("mm-hidden")), e.classList.remove("mm-panel_highest"), n.trigger("openPanel:finish", [e]) };
                        t && !e.matches(".mm-panel_noanimation") ? setTimeout((function() { m(e, (function() { c() }), n.conf.transitionDuration), r() }), this.conf.openingInterval) : (r(), c()) }
                    this.trigger("openPanel:after", [e]) } }, e.prototype.closePanel = function(e) { this.trigger("closePanel:before", [e]); var t = e.parentElement;
                t.matches(".mm-listitem_vertical") && (t.classList.remove("mm-listitem_opened"), e.classList.add("mm-hidden"), this.trigger("closePanel", [e])), this.trigger("closePanel:after", [e]) }, e.prototype.closeAllPanels = function(e) { this.trigger("closeAllPanels:before"), this.node.pnls.querySelectorAll(".mm-listitem").forEach((function(e) { e.classList.remove("mm-listitem_selected"), e.classList.remove("mm-listitem_opened") })); var t = y(this.node.pnls, ".mm-panel"),
                    n = e || t[0];
                y(this.node.pnls, ".mm-panel").forEach((function(e) { e !== n && (e.classList.remove("mm-panel_opened"), e.classList.remove("mm-panel_opened-parent"), e.classList.remove("mm-panel_highest"), e.classList.add("mm-hidden")) })), this.openPanel(n, !1), this.trigger("closeAllPanels:after") }, e.prototype.togglePanel = function(e) { var t = e.parentElement;
                t.matches(".mm-listitem_vertical") && this[t.matches(".mm-listitem_opened") ? "closePanel" : "openPanel"](e) }, e.prototype.setSelected = function(e) { this.trigger("setSelected:before", [e]), _(this.node.menu, ".mm-listitem_selected").forEach((function(e) { e.classList.remove("mm-listitem_selected") })), e.classList.add("mm-listitem_selected"), this.trigger("setSelected:after", [e]) }, e.prototype.bind = function(e, t) { this.hook[e] = this.hook[e] || [], this.hook[e].push(t) }, e.prototype.trigger = function(e, t) { if (this.hook[e])
                    for (var n = 0, i = this.hook[e].length; n < i; n++) this.hook[e][n].apply(this, t) }, e.prototype._initAPI = function() { var e = this,
                    t = this;
                this.API = {}, this._api.forEach((function(n) { e.API[n] = function() { var e = t[n].apply(t, arguments); return void 0 === e ? t.API : e } })), this.node.menu.mmApi = this.API }, e.prototype._initHooks = function() { for (var e in this.opts.hooks) this.bind(e, this.opts.hooks[e]) }, e.prototype._initWrappers = function() { this.trigger("initWrappers:before"); for (var t = 0; t < this.opts.wrappers.length; t++) { var n = e.wrappers[this.opts.wrappers[t]]; "function" == typeof n && n.call(this) }
                this.trigger("initWrappers:after") }, e.prototype._initAddons = function() { for (var t in this.trigger("initAddons:before"), e.addons) e.addons[t].call(this);
                this.trigger("initAddons:after") }, e.prototype._initExtensions = function() { var e = this;
                this.trigger("initExtensions:before"), "array" == r(this.opts.extensions) && (this.opts.extensions = { all: this.opts.extensions }), Object.keys(this.opts.extensions).forEach((function(t) { var n = e.opts.extensions[t].map((function(e) { return "mm-menu_" + e }));
                    n.length && k(t, (function() { n.forEach((function(t) { e.node.menu.classList.add(t) })) }), (function() { n.forEach((function(t) { e.node.menu.classList.remove(t) })) })) })), this.trigger("initExtensions:after") }, e.prototype._initMenu = function() { var e = this;
                this.trigger("initMenu:before"), this.node.wrpr = this.node.wrpr || this.node.menu.parentElement, this.node.wrpr.classList.add("mm-wrapper"), this.node.menu.id = this.node.menu.id || l(); var t = g("div.mm-panels");
                y(this.node.menu).forEach((function(n) { e.conf.panelNodetype.indexOf(n.nodeName.toLowerCase()) > -1 && t.append(n) })), this.node.menu.append(t), this.node.pnls = t, this.node.menu.classList.add("mm-menu"), this.trigger("initMenu:after") }, e.prototype._initPanels = function() { var e = this;
                this.trigger("initPanels:before"), this.clck.push((function(t, n) { if (n.inMenu) { var i = t.getAttribute("href"); if (i && i.length > 1 && "#" == i.slice(0, 1)) try { var s = _(e.node.menu, i)[0]; if (s && s.matches(".mm-panel")) return t.parentElement.matches(".mm-listitem_vertical") ? e.togglePanel(s) : e.openPanel(s), !0 } catch (e) {} } })), y(this.node.pnls).forEach((function(t) { e.initPanel(t) })), this.trigger("initPanels:after") }, e.prototype.initPanel = function(e) { var t = this,
                    n = this.conf.panelNodetype.join(", "); if (e.matches(n) && (e.matches(".mm-panel") || (e = this._initPanel(e)), e)) { var i = [];
                    i.push.apply(i, y(e, "." + this.conf.classNames.panel)), y(e, ".mm-listview").forEach((function(e) { y(e, ".mm-listitem").forEach((function(e) { i.push.apply(i, y(e, n)) })) })), i.forEach((function(e) { t.initPanel(e) })) } }, e.prototype._initPanel = function(e) { var t = this; if (this.trigger("initPanel:before", [e]), x(e, this.conf.classNames.panel, "mm-panel"), x(e, this.conf.classNames.nopanel, "mm-nopanel"), x(e, this.conf.classNames.inset, "mm-listview_inset"), e.matches(".mm-listview_inset") && e.classList.add("mm-nopanel"), e.matches(".mm-nopanel")) return null; var n = e.id || l(),
                    i = e.matches("." + this.conf.classNames.vertical) || !this.opts.slidingSubmenus; if (e.classList.remove(this.conf.classNames.vertical), e.matches("ul, ol")) { e.removeAttribute("id"); var s = g("div");
                    e.before(s), s.append(e), e = s }
                e.id = n, e.classList.add("mm-panel"), e.classList.add("mm-hidden"); var a = [e.parentElement].filter((function(e) { return e.matches("li") }))[0]; if (i ? a && a.classList.add("mm-listitem_vertical") : this.node.pnls.append(e), a && (a.mmChild = e, e.mmParent = a, a && a.matches(".mm-listitem") && !y(a, ".mm-btn").length)) { var o = y(a, ".mm-listitem__text")[0]; if (o) { var r = g("a.mm-btn.mm-btn_next.mm-listitem__btn");
                        r.setAttribute("href", "#" + e.id), o.matches("span") ? (r.classList.add("mm-listitem__text"), r.innerHTML = o.innerHTML, a.insertBefore(r, o.nextElementSibling), o.remove()) : a.insertBefore(r, y(a, ".mm-panel")[0]) } } return this._initNavbar(e), y(e, "ul, ol").forEach((function(e) { t.initListview(e) })), this.trigger("initPanel:after", [e]), e }, e.prototype._initNavbar = function(e) { if (this.trigger("initNavbar:before", [e]), !y(e, ".mm-navbar").length) { var t = null,
                        n = null; if (e.getAttribute("data-mm-parent") ? n = _(this.node.pnls, e.getAttribute("data-mm-parent"))[0] : (t = e.mmParent) && (n = t.closest(".mm-panel")), !t || !t.matches(".mm-listitem_vertical")) { var i = g("div.mm-navbar"); if (this.opts.navbar.add ? this.opts.navbar.sticky && i.classList.add("mm-navbar_sticky") : i.classList.add("mm-hidden"), n) { var s = g("a.mm-btn.mm-btn_prev.mm-navbar__btn");
                            s.setAttribute("href", "#" + n.id), i.append(s) } var a = null;
                        t ? a = y(t, ".mm-listitem__text")[0] : n && (a = _(n, 'a[href="#' + e.id + '"]')[0]); var o = g("a.mm-navbar__title"),
                            r = g("span"); switch (o.append(r), r.innerHTML = e.getAttribute("data-mm-title") || (a ? a.textContent : "") || this.i18n(this.opts.navbar.title) || this.i18n("Menu"), this.opts.navbar.titleLink) {
                            case "anchor":
                                a && o.setAttribute("href", a.getAttribute("href")); break;
                            case "parent":
                                n && o.setAttribute("href", "#" + n.id) }
                        i.append(o), e.prepend(i), this.trigger("initNavbar:after", [e]) } } }, e.prototype.initListview = function(e) { var t = this;
                this.trigger("initListview:before", [e]), x(e, this.conf.classNames.nolistview, "mm-nolistview"), e.matches(".mm-nolistview") || (e.classList.add("mm-listview"), y(e).forEach((function(e) { e.classList.add("mm-listitem"), x(e, t.conf.classNames.selected, "mm-listitem_selected"), y(e, "a, span").forEach((function(e) { e.matches(".mm-btn") || e.classList.add("mm-listitem__text") })) }))), this.trigger("initListview:after", [e]) }, e.prototype._initOpened = function() { this.trigger("initOpened:before"); var e = this.node.pnls.querySelectorAll(".mm-listitem_selected"),
                    t = null;
                e.forEach((function(e) { t = e, e.classList.remove("mm-listitem_selected") })), t && t.classList.add("mm-listitem_selected"); var n = t ? t.closest(".mm-panel") : y(this.node.pnls, ".mm-panel")[0];
                this.openPanel(n, !1), this.trigger("initOpened:after") }, e.prototype._initAnchors = function() { var e = this;
                this.trigger("initAnchors:before"), document.addEventListener("click", (function(t) { var n = t.target.closest("a[href]"); if (n) { for (var i = { inMenu: n.closest(".mm-menu") === e.node.menu, inListview: n.matches(".mm-listitem > a"), toExternal: n.matches('[rel="external"]') || n.matches('[target="_blank"]') }, s = { close: null, setSelected: null, preventDefault: "#" == n.getAttribute("href").slice(0, 1) }, a = 0; a < e.clck.length; a++) { var m = e.clck[a].call(e, n, i); if (m) { if ("boolean" == typeof m) return void t.preventDefault(); "object" == r(m) && (s = o(m, s)) } }
                        i.inMenu && i.inListview && !i.toExternal && (c(n, e.opts.onClick.setSelected, s.setSelected) && e.setSelected(n.parentElement), c(n, e.opts.onClick.preventDefault, s.preventDefault) && t.preventDefault(), c(n, e.opts.onClick.close, s.close) && e.opts.offCanvas && "function" == typeof e.close && e.close()) } }), !0), this.trigger("initAnchors:after") }, e.prototype.i18n = function(e) { return function(e, t) { return "string" == typeof t && void 0 !== u[t] && u[t][e] || e }(e, this.conf.language) }, e.version = i.a, e.options = s, e.configs = a, e.addons = {}, e.wrappers = {}, e.node = {}, e.vars = {}, e }(),
        A = { blockUI: !0, moveBackground: !0 };
    var T = { clone: !1, menu: { insertMethod: "prepend", insertSelector: "body" }, page: { nodetype: "div", selector: null, noSelector: [] } };

    function C(e) { return e ? e.charAt(0).toUpperCase() + e.slice(1) : "" }

    function N(e, t, n) { var i = t.split(".");
        e[t = "mmEvent" + C(i[0]) + C(i[1])] = e[t] || [], e[t].push(n), e.addEventListener(i[0], n) }

    function H(e, t) { var n = t.split(".");
        t = "mmEvent" + C(n[0]) + C(n[1]), (e[t] || []).forEach((function(t) { e.removeEventListener(n[0], t) })) }
    M.options.offCanvas = A, M.configs.offCanvas = T;
    M.prototype.open = function() { var e = this;
        this.trigger("open:before"), this.vars.opened || (this._openSetup(), setTimeout((function() { e._openStart() }), this.conf.openingInterval), this.trigger("open:after")) }, M.prototype._openSetup = function() { var e = this,
            t = this.opts.offCanvas;
        this.closeAllOthers(),
            function(e, t, n) { var i = t.split(".");
                (e[t = "mmEvent" + C(i[0]) + C(i[1])] || []).forEach((function(e) { e(n || {}) })) }(window, "resize.page", { force: !0 }); var n = ["mm-wrapper_opened"];
        t.blockUI && n.push("mm-wrapper_blocking"), "modal" == t.blockUI && n.push("mm-wrapper_modal"), t.moveBackground && n.push("mm-wrapper_background"), n.forEach((function(t) { e.node.wrpr.classList.add(t) })), setTimeout((function() { e.vars.opened = !0 }), this.conf.openingInterval), this.node.menu.classList.add("mm-menu_opened") }, M.prototype._openStart = function() { var e = this;
        m(M.node.page, (function() { e.trigger("open:finish") }), this.conf.transitionDuration), this.trigger("open:start"), this.node.wrpr.classList.add("mm-wrapper_opening") }, M.prototype.close = function() { var e = this;
        this.trigger("close:before"), this.vars.opened && (m(M.node.page, (function() { e.node.menu.classList.remove("mm-menu_opened");
            ["mm-wrapper_opened", "mm-wrapper_blocking", "mm-wrapper_modal", "mm-wrapper_background"].forEach((function(t) { e.node.wrpr.classList.remove(t) })), e.vars.opened = !1, e.trigger("close:finish") }), this.conf.transitionDuration), this.trigger("close:start"), this.node.wrpr.classList.remove("mm-wrapper_opening"), this.trigger("close:after")) }, M.prototype.closeAllOthers = function() { var e = this;
        _(document.body, ".mm-menu_offcanvas").forEach((function(t) { if (t !== e.node.menu) { var n = t.mmApi;
                n && n.close && n.close() } })) }, M.prototype.setPage = function(e) { this.trigger("setPage:before", [e]); var t = this.conf.offCanvas; if (!e) { var n = "string" == typeof t.page.selector ? _(document.body, t.page.selector) : y(document.body, t.page.nodetype); if (n = n.filter((function(e) { return !e.matches(".mm-menu, .mm-wrapper__blocker") })), t.page.noSelector.length && (n = n.filter((function(e) { return !e.matches(t.page.noSelector.join(", ")) }))), n.length > 1) { var i = g("div");
                n[0].before(i), n.forEach((function(e) { i.append(e) })), n = [i] }
            e = n[0] }
        e.classList.add("mm-page"), e.classList.add("mm-slideout"), e.id = e.id || l(), M.node.page = e, this.trigger("setPage:after", [e]) };
    var j = function() { var e = this;
            H(document.body, "keydown.tabguard"), N(document.body, "keydown.tabguard", (function(t) { 9 == t.keyCode && e.node.wrpr.matches(".mm-wrapper_opened") && t.preventDefault() })) },
        D = function() { var e = this;
            this.trigger("initBlocker:before"); var t = this.opts.offCanvas,
                n = this.conf.offCanvas; if (t.blockUI) { if (!M.node.blck) { var i = g("div.mm-wrapper__blocker.mm-slideout");
                    i.innerHTML = "<a></a>", document.querySelector(n.menu.insertSelector).append(i), M.node.blck = i } var s = function(t) { t.preventDefault(), t.stopPropagation(), e.node.wrpr.matches(".mm-wrapper_modal") || e.close() };
                M.node.blck.addEventListener("mousedown", s), M.node.blck.addEventListener("touchstart", s), M.node.blck.addEventListener("touchmove", s), this.trigger("initBlocker:after") } },
        O = { aria: !0, text: !0 };
    var I = { text: { closeMenu: "Close menu", closeSubmenu: "Close submenu", openSubmenu: "Open submenu", toggleSubmenu: "Toggle submenu" } },
        q = { "Close menu": "بستن منو", "Close submenu": "بستن زیرمنو", "Open submenu": "بازکردن زیرمنو", "Toggle submenu": "سوییچ زیرمنو" },
        B = { "Close menu": "Menü schließen", "Close submenu": "Untermenü schließen", "Open submenu": "Untermenü öffnen", "Toggle submenu": "Untermenü wechseln" },
        z = { "Close menu": "Закрыть меню", "Close submenu": "Закрыть подменю", "Open submenu": "Открыть подменю", "Toggle submenu": "Переключить подменю" };
    f({ "Close menu": "Menu sluiten", "Close submenu": "Submenu sluiten", "Open submenu": "Submenu openen", "Toggle submenu": "Submenu wisselen" }, "nl"), f(q, "fa"), f(B, "de"), f(z, "ru"), M.options.screenReader = O, M.configs.screenReader = I;
    var R;
    R = function(e, t, n) { e[t] = n, n ? e.setAttribute(t, n.toString()) : e.removeAttribute(t) }, M.sr_aria = function(e, t, n) { R(e, "aria-" + t, n) }, M.sr_role = function(e, t) { R(e, "role", t) }, M.sr_text = function(e) { return '<span class="mm-sronly">' + e + "</span>" };
    var U = { fix: !0 };
    var W = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1;
    M.options.scrollBugFix = U;
    var Y = { height: "default" };
    M.options.autoHeight = Y;
    var F = { close: !1, open: !1 };
    M.options.backButton = F;
    var X = { add: !1, visible: { min: 1, max: 3 } };
    M.options.columns = X;
    var V = { add: !1, addTo: "panels", count: !1 };
    M.options.counters = V, M.configs.classNames.counters = { counter: "Counter" };
    var Z = { add: !1, addTo: "panels" };
    M.options.dividers = Z, M.configs.classNames.divider = "Divider";
    var G = { open: !1, node: null };
    var J = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1,
        K = { top: 0, right: 0, bottom: 0, left: 0 },
        Q = { start: 15, swipe: 15 },
        $ = { x: ["Right", "Left"], y: ["Down", "Up"] },
        ee = 0,
        te = 1,
        ne = 2,
        ie = function(e, t) { return "string" == typeof e && "%" == e.slice(-1) && (e = t * ((e = parseInt(e.slice(0, -1), 10)) / 100)), e },
        se = function() {
            function e(e, t, n) { this.surface = e, this.area = o(t, K), this.treshold = o(n, Q), this.surface.mmHasDragEvents || (this.surface.addEventListener(J ? "touchstart" : "mousedown", this.start.bind(this)), this.surface.addEventListener(J ? "touchend" : "mouseup", this.stop.bind(this)), this.surface.addEventListener(J ? "touchleave" : "mouseleave", this.stop.bind(this)), this.surface.addEventListener(J ? "touchmove" : "mousemove", this.move.bind(this))), this.surface.mmHasDragEvents = !0 } return e.prototype.start = function(e) { this.currentPosition = { x: e.touches ? e.touches[0].pageX : e.pageX || 0, y: e.touches ? e.touches[0].pageY : e.pageY || 0 }; var t = this.surface.clientWidth,
                    n = this.surface.clientHeight,
                    i = ie(this.area.top, n); if (!("number" == typeof i && this.currentPosition.y < i)) { var s = ie(this.area.right, t); if (!("number" == typeof s && (s = t - s, this.currentPosition.x > s))) { var a = ie(this.area.bottom, n); if (!("number" == typeof a && (a = n - a, this.currentPosition.y > a))) { var o = ie(this.area.left, t); "number" == typeof o && this.currentPosition.x < o || (this.startPosition = { x: this.currentPosition.x, y: this.currentPosition.y }, this.state = te) } } } }, e.prototype.stop = function(e) { if (this.state == ne) { var t = this._dragDirection(),
                        n = this._eventDetail(t); if (this._dispatchEvents("drag*End", n), Math.abs(this.movement[this.axis]) > this.treshold.swipe) { var i = this._swipeDirection();
                        n.direction = i, this._dispatchEvents("swipe*", n) } }
                this.state = ee }, e.prototype.move = function(e) { switch (this.state) {
                    case te:
                    case ne:
                        var t = { x: e.changedTouches ? e.touches[0].pageX : e.pageX || 0, y: e.changedTouches ? e.touches[0].pageY : e.pageY || 0 };
                        this.movement = { x: t.x - this.currentPosition.x, y: t.y - this.currentPosition.y }, this.distance = { x: t.x - this.startPosition.x, y: t.y - this.startPosition.y }, this.currentPosition = { x: t.x, y: t.y }, this.axis = Math.abs(this.distance.x) > Math.abs(this.distance.y) ? "x" : "y"; var n = this._dragDirection(),
                            i = this._eventDetail(n);
                        this.state == te && Math.abs(this.distance[this.axis]) > this.treshold.start && (this._dispatchEvents("drag*Start", i), this.state = ne), this.state == ne && this._dispatchEvents("drag*Move", i) } }, e.prototype._eventDetail = function(e) { var t = this.distance.x,
                    n = this.distance.y; return "x" == this.axis && (t -= t > 0 ? this.treshold.start : 0 - this.treshold.start), "y" == this.axis && (n -= n > 0 ? this.treshold.start : 0 - this.treshold.start), { axis: this.axis, direction: e, movementX: this.movement.x, movementY: this.movement.y, distanceX: t, distanceY: n } }, e.prototype._dispatchEvents = function(e, t) { var n = new CustomEvent(e.replace("*", ""), { detail: t });
                this.surface.dispatchEvent(n); var i = new CustomEvent(e.replace("*", this.axis.toUpperCase()), { detail: t });
                this.surface.dispatchEvent(i); var s = new CustomEvent(e.replace("*", t.direction), { detail: t });
                this.surface.dispatchEvent(s) }, e.prototype._dragDirection = function() { return $[this.axis][this.distance[this.axis] > 0 ? 0 : 1] }, e.prototype._swipeDirection = function() { return $[this.axis][this.movement[this.axis] > 0 ? 0 : 1] }, e }(),
        ae = null,
        oe = null,
        re = 0,
        ce = function(e) { var t = this,
                n = {},
                i = !1,
                s = function() { var e = Object.keys(t.opts.extensions);
                    e.length ? (k(e.join(", "), (function() {}), (function() { n = me(n, [], t.node.menu) })), e.forEach((function(e) { k(e, (function() { n = me(n, t.opts.extensions[e], t.node.menu) }), (function() {})) }))) : n = me(n, [], t.node.menu) };
            oe && (H(oe, "dragStart"), H(oe, "dragMove"), H(oe, "dragEnd")), ae = new se(oe = e), s(), s = function() {}, oe && (N(oe, "dragStart", (function(e) { e.detail.direction == n.direction && (i = !0, t.node.wrpr.classList.add("mm-wrapper_dragging"), t._openSetup(), t.trigger("open:start"), re = t.node.menu["x" == n.axis ? "clientWidth" : "clientHeight"]) })), N(oe, "dragMove", (function(e) { if (e.detail.axis == n.axis && i) { var t = e.detail["distance" + n.axis.toUpperCase()]; switch (n.position) {
                        case "right":
                        case "bottom":
                            t = Math.min(Math.max(t, -re), 0); break;
                        default:
                            t = Math.max(Math.min(t, re), 0) } if ("front" == n.zposition) switch (n.position) {
                        case "right":
                        case "bottom":
                            t += re; break;
                        default:
                            t -= re }
                    n.slideOutNodes.forEach((function(e) { e.style.transform = "translate" + n.axis.toUpperCase() + "(" + t + "px)" })) } })), N(oe, "dragEnd", (function(e) { if (e.detail.axis == n.axis && i) { i = !1, t.node.wrpr.classList.remove("mm-wrapper_dragging"), n.slideOutNodes.forEach((function(e) { e.style.transform = "" })); var s = Math.abs(e.detail["distance" + n.axis.toUpperCase()]) >= .75 * re; if (!s) { var a = e.detail["movement" + n.axis.toUpperCase()]; switch (n.position) {
                            case "right":
                            case "bottom":
                                s = a <= 0; break;
                            default:
                                s = a >= 0 } }
                    s ? t._openStart() : t.close() } }))) },
        me = function(e, t, n) { switch (e.position = "left", e.zposition = "back", ["right", "top", "bottom"].forEach((function(n) { t.indexOf("position-" + n) > -1 && (e.position = n) })), ["front", "top", "bottom"].forEach((function(n) { t.indexOf("position-" + n) > -1 && (e.zposition = "front") })), ae.area = { top: "bottom" == e.position ? "75%" : 0, right: "left" == e.position ? "75%" : 0, bottom: "top" == e.position ? "75%" : 0, left: "right" == e.position ? "75%" : 0 }, e.position) {
                case "top":
                case "bottom":
                    e.axis = "y"; break;
                default:
                    e.axis = "x" } switch (e.position) {
                case "top":
                    e.direction = "Down"; break;
                case "right":
                    e.direction = "Left"; break;
                case "bottom":
                    e.direction = "Up"; break;
                default:
                    e.direction = "Right" } switch (e.zposition) {
                case "front":
                    e.slideOutNodes = [n]; break;
                default:
                    e.slideOutNodes = _(document.body, ".mm-slideout") } return e };
    M.options.drag = G;
    var le = { drop: !1, fitViewport: !0, event: "click", position: {}, tip: !0 };
    var de = { offset: { button: { x: -5, y: 5 }, viewport: { x: 20, y: 20 } }, height: { max: 880 }, width: { max: 440 } };
    M.options.dropdown = le, M.configs.dropdown = de;
    var pe = { insertMethod: "append", insertSelector: "body" };
    M.configs.fixedElements = pe, M.configs.classNames.fixedElements = { fixed: "Fixed" };
    var ue = { use: !1, top: [], bottom: [], position: "left", type: "default" };
    M.options.iconbar = ue;
    var fe = { add: !1, blockPanel: !0, hideDivider: !1, hideNavbar: !0, visible: 3 };
    M.options.iconPanels = fe;
    var he = { enable: !1, enhance: !1 };
    M.options.keyboardNavigation = he;
    var ve = function(e) { var t = this;
            H(document.body, "keydown.tabguard"), H(document.body, "focusin.tabguard"), N(document.body, "focusin.tabguard", (function(e) { if (t.node.wrpr.matches(".mm-wrapper_opened")) { var n = e.target; if (n.matches(".mm-tabend")) { var i = void 0;
                        n.parentElement.matches(".mm-menu") && M.node.blck && (i = M.node.blck), n.parentElement.matches(".mm-wrapper__blocker") && (i = _(document.body, ".mm-menu_offcanvas.mm-menu_opened")[0]), i || (i = n.parentElement), i && y(i, ".mm-tabstart")[0].focus() } } })), H(document.body, "keydown.navigate"), N(document.body, "keydown.navigate", (function(t) { var n = t.target,
                    i = n.closest(".mm-menu"); if (i) { i.mmApi; if (!n.matches("input, textarea")) switch (t.keyCode) {
                        case 13:
                            (n.matches(".mm-toggle") || n.matches(".mm-check")) && n.dispatchEvent(new Event("click")); break;
                        case 32:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            t.preventDefault() }
                    if (e)
                        if (n.matches("input")) switch (t.keyCode) {
                            case 27:
                                n.value = "" } else { var s = i.mmApi; switch (t.keyCode) {
                                case 8:
                                    var a = _(i, ".mm-panel_opened")[0].mmParent;
                                    a && s.openPanel(a.closest(".mm-panel")); break;
                                case 27:
                                    i.matches(".mm-menu_offcanvas") && s.close() } } } })) },
        be = { load: !1 };
    M.options.lazySubmenus = be;
    var ge = [];
    var _e = { breadcrumbs: { separator: "/", removeFirst: !1 } };

    function ye() { var e = this,
            t = this.opts.navbars; if (void 0 !== t) { t instanceof Array || (t = [t]); var n = {};
            t.length && (t.forEach((function(t) { if (!(t = function(e) { return "boolean" == typeof e && e && (e = {}), "object" != typeof e && (e = {}), void 0 === e.content && (e.content = ["prev", "title"]), e.content instanceof Array || (e.content = [e.content]), void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), e }(t)).use) return !1; var i = g("div.mm-navbar"),
                    s = t.position; "bottom" !== s && (s = "top"), n[s] || (n[s] = g("div.mm-navbars_" + s)), n[s].append(i); for (var a = 0, o = t.content.length; a < o; a++) { var r, c = t.content[a]; if ("string" == typeof c)
                        if ("function" == typeof(r = ye.navbarContents[c])) r.call(e, i);
                        else { var m = g("span");
                            m.innerHTML = c; var l = y(m);
                            1 == l.length && (m = l[0]), i.append(m) }
                    else i.append(c) } "string" == typeof t.type && ("function" == typeof(r = ye.navbarTypes[t.type]) && r.call(e, i)); "boolean" != typeof t.use && k(t.use, (function() { i.classList.remove("mm-hidden"), M.sr_aria(i, "hidden", !1) }), (function() { i.classList.add("mm-hidden"), M.sr_aria(i, "hidden", !0) })) })), this.bind("initMenu:after", (function() { for (var t in n) e.node.menu["bottom" == t ? "append" : "prepend"](n[t]) }))) } }
    M.options.navbars = ge, M.configs.navbars = _e, M.configs.classNames.navbars = { panelPrev: "Prev", panelTitle: "Title" }, ye.navbarContents = { breadcrumbs: function(e) { var t = this,
                n = g("div.mm-navbar__breadcrumbs");
            e.append(n), this.bind("initNavbar:after", (function(e) { if (!e.querySelector(".mm-navbar__breadcrumbs")) { y(e, ".mm-navbar")[0].classList.add("mm-hidden"); for (var n = [], i = g("span.mm-navbar__breadcrumbs"), s = e, a = !0; s;) { if (!(s = s.closest(".mm-panel")).parentElement.matches(".mm-listitem_vertical")) { var o = _(s, ".mm-navbar__title span")[0]; if (o) { var r = o.textContent;
                                r.length && n.unshift(a ? "<span>" + r + "</span>" : '<a href="#' + s.id + '">' + r + "</a>") }
                            a = !1 }
                        s = s.mmParent }
                    t.conf.navbars.breadcrumbs.removeFirst && n.shift(), i.innerHTML = n.join('<span class="mm-separator">' + t.conf.navbars.breadcrumbs.separator + "</span>"), y(e, ".mm-navbar")[0].append(i) } })), this.bind("openPanel:start", (function(e) { var t = e.querySelector(".mm-navbar__breadcrumbs");
                n.innerHTML = t ? t.innerHTML : "" })), this.bind("initNavbar:after:sr-aria", (function(e) { _(e, ".mm-breadcrumbs a").forEach((function(e) { M.sr_aria(e, "owns", e.getAttribute("href").slice(1)) })) })) }, close: function(e) { var t = this,
                n = g("a.mm-btn.mm-btn_close.mm-navbar__btn");
            e.append(n), this.bind("setPage:after", (function(e) { n.setAttribute("href", "#" + e.id) })), this.bind("setPage:after:sr-text", (function() { n.innerHTML = M.sr_text(t.i18n(t.conf.screenReader.text.closeMenu)), M.sr_aria(n, "owns", n.getAttribute("href").slice(1)) })) }, prev: function(e) { var t, n, i, s = this,
                a = g("a.mm-btn.mm-btn_prev.mm-navbar__btn");
            e.append(a), this.bind("initNavbar:after", (function(e) { y(e, ".mm-navbar")[0].classList.add("mm-hidden") })), this.bind("openPanel:start", (function(e) { e.parentElement.matches(".mm-listitem_vertical") || ((t = e.querySelector("." + s.conf.classNames.navbars.panelPrev)) || (t = e.querySelector(".mm-navbar__btn.mm-btn_prev")), n = t ? t.getAttribute("href") : "", i = t ? t.innerHTML : "", n ? a.setAttribute("href", n) : a.removeAttribute("href"), a.classList[n || i ? "remove" : "add"]("mm-hidden"), a.innerHTML = i) })), this.bind("initNavbar:after:sr-aria", (function(e) { M.sr_aria(e.querySelector(".mm-navbar"), "hidden", !0) })), this.bind("openPanel:start:sr-aria", (function(e) { M.sr_aria(a, "hidden", a.matches(".mm-hidden")), M.sr_aria(a, "owns", (a.getAttribute("href") || "").slice(1)) })) }, searchfield: function(e) { "object" != r(this.opts.searchfield) && (this.opts.searchfield = {}); var t = g("div.mm-navbar__searchfield");
            e.append(t), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = [t] }, title: function(e) { var t, n, i, s, a = this,
                o = g("a.mm-navbar__title"),
                r = g("span");
            o.append(r), e.append(o), this.bind("openPanel:start", (function(e) { e.parentElement.matches(".mm-listitem_vertical") || ((i = e.querySelector("." + a.conf.classNames.navbars.panelTitle)) || (i = e.querySelector(".mm-navbar__title span")), (t = i && i.closest("a") ? i.closest("a").getAttribute("href") : "") ? o.setAttribute("href", t) : o.removeAttribute("href"), n = i ? i.innerHTML : "", r.innerHTML = n) })), this.bind("openPanel:start:sr-aria", (function(e) { if (a.opts.screenReader.text) { if (!s) y(a.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach((function(e) { var t = e.querySelector(".mm-btn_prev");
                        t && (s = t) })); if (s) { var t = !0; "parent" == a.opts.navbar.titleLink && (t = !s.matches(".mm-hidden")), M.sr_aria(o, "hidden", t) } } })) } }, ye.navbarTypes = { tabs: function(e) { var t = this;
            e.classList.add("mm-navbar_tabs"), e.parentElement.classList.add("mm-navbars_has-tabs"); var n = y(e, "a");
            e.addEventListener("click", (function(e) { var n = e.target; if (n.matches("a"))
                    if (n.matches(".mm-navbar__tab_selected")) e.stopImmediatePropagation();
                    else try { t.openPanel(t.node.menu.querySelector(n.getAttribute("href")), !1), e.stopImmediatePropagation() } catch (e) {} })), this.bind("openPanel:start", (function e(t) { n.forEach((function(e) { e.classList.remove("mm-navbar__tab_selected") })); var i = n.filter((function(e) { return e.matches('[href="#' + t.id + '"]') }))[0]; if (i) i.classList.add("mm-navbar__tab_selected");
                else { var s = t.mmParent;
                    s && e.call(this, s.closest(".mm-panel")) } })) } };
    var Le = { scroll: !1, update: !1 };
    var we = { scrollOffset: 0, updateOffset: 50 };
    M.options.pageScroll = Le, M.configs.pageScroll = we;
    var Ee = { add: !1, addTo: "panels", cancel: !1, noResults: "No results found.", placeholder: "Search", panel: { add: !1, dividers: !0, fx: "none", id: null, splash: null, title: "Search" }, search: !0, showTextItems: !1, showSubPanels: !0 };
    var xe = { clear: !1, form: !1, input: !1, submit: !1 },
        Pe = { Search: "جستجو", "No results found.": "نتیجه‌ای یافت نشد.", cancel: "انصراف" },
        ke = { Search: "Suche", "No results found.": "Keine Ergebnisse gefunden.", cancel: "beenden" },
        Se = { Search: "Найти", "No results found.": "Ничего не найдено.", cancel: "отменить" },
        Me = function() { for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length; var i = Array(e),
                s = 0; for (t = 0; t < n; t++)
                for (var a = arguments[t], o = 0, r = a.length; o < r; o++, s++) i[s] = a[o]; return i };
    f({ Search: "Zoeken", "No results found.": "Geen resultaten gevonden.", cancel: "annuleren" }, "nl"), f(Pe, "fa"), f(ke, "de"), f(Se, "ru"), M.options.searchfield = Ee, M.configs.searchfield = xe;
    var Ae = function() { var e = this.opts.searchfield,
                t = (this.conf.searchfield, y(this.node.pnls, ".mm-panel_search")[0]); if (t) return t;
            t = g("div.mm-panel.mm-panel_search.mm-hidden"), e.panel.id && (t.id = e.panel.id), e.panel.title && t.setAttribute("data-mm-title", e.panel.title); var n = g("ul"); switch (t.append(n), this.node.pnls.append(t), this.initListview(n), this._initNavbar(t), e.panel.fx) {
                case !1:
                    break;
                case "none":
                    t.classList.add("mm-panel_noanimation"); break;
                default:
                    t.classList.add("mm-panel_fx-" + e.panel.fx) } if (e.panel.splash) { var i = g("div.mm-panel__content");
                i.innerHTML = e.panel.splash, t.append(i) } return t.classList.add("mm-panel"), t.classList.add("mm-hidden"), this.node.pnls.append(t), t },
        Te = function(e) { var t = this.opts.searchfield,
                n = this.conf.searchfield; if (e.parentElement.matches(".mm-listitem_vertical")) return null; if (a = _(e, ".mm-searchfield")[0]) return a;

            function i(e, t) { if (t)
                    for (var n in t) e.setAttribute(n, t[n]) } var s, a = g((n.form ? "form" : "div") + ".mm-searchfield"),
                o = g("div.mm-searchfield__input"),
                r = g("input");
            (r.type = "text", r.autocomplete = "off", r.placeholder = this.i18n(t.placeholder), o.append(r), a.append(o), e.prepend(a), i(r, n.input), n.clear) && ((s = g("a.mm-btn.mm-btn_close.mm-searchfield__btn")).setAttribute("href", "#"), o.append(s));
            (i(a, n.form), n.form && n.submit && !n.clear) && ((s = g("a.mm-btn.mm-btn_next.mm-searchfield__btn")).setAttribute("href", "#"), o.append(s));
            t.cancel && ((s = g("a.mm-searchfield__cancel")).setAttribute("href", "#"), s.textContent = this.i18n("cancel"), a.append(s)); return a },
        Ce = function(e) { var t = this,
                n = this.opts.searchfield,
                i = (this.conf.searchfield, {});
            e.closest(".mm-panel_search") ? (i.panels = _(this.node.pnls, ".mm-panel"), i.noresults = [e.closest(".mm-panel")]) : e.closest(".mm-panel") ? (i.panels = [e.closest(".mm-panel")], i.noresults = i.panels) : (i.panels = _(this.node.pnls, ".mm-panel"), i.noresults = [this.node.menu]), i.panels = i.panels.filter((function(e) { return !e.matches(".mm-panel_search") })), i.panels = i.panels.filter((function(e) { return !e.parentElement.matches(".mm-listitem_vertical") })), i.listitems = [], i.dividers = [], i.panels.forEach((function(e) { var t, n;
                (t = i.listitems).push.apply(t, _(e, ".mm-listitem")), (n = i.dividers).push.apply(n, _(e, ".mm-divider")) })); var s = y(this.node.pnls, ".mm-panel_search")[0],
                a = _(e, "input")[0],
                o = _(e, ".mm-searchfield__cancel")[0];
            a.mmSearchfield = i, n.panel.add && n.panel.splash && (H(a, "focus.splash"), N(a, "focus.splash", (function(e) { t.openPanel(s) }))), n.cancel && (H(a, "focus.cancel"), N(a, "focus.cancel", (function(e) { o.classList.add("mm-searchfield__cancel-active") })), H(o, "click.splash"), N(o, "click.splash", (function(e) { if (e.preventDefault(), o.classList.remove("mm-searchfield__cancel-active"), s.matches(".mm-panel_opened")) { var n = y(t.node.pnls, ".mm-panel_opened-parent");
                    n.length && t.openPanel(n[n.length - 1]) } }))), n.panel.add && "panel" == n.addTo && this.bind("openPanel:finish", (function(e) { e === s && a.focus() })), H(a, "input.search"), N(a, "input.search", (function(e) { switch (e.keyCode) {
                    case 9:
                    case 16:
                    case 17:
                    case 18:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        break;
                    default:
                        t.search(a) } })), this.search(a) },
        Ne = function(e) { if (e) { var t = this.opts.searchfield;
                this.conf.searchfield; if (e.closest(".mm-panel") || (e = y(this.node.pnls, ".mm-panel")[0]), !y(e, ".mm-panel__noresultsmsg").length) { var n = g("div.mm-panel__noresultsmsg.mm-hidden");
                    n.innerHTML = this.i18n(t.noResults), e.append(n) } } };
    M.prototype.search = function(e, t) { var n, i = this,
            s = this.opts.searchfield;
        this.conf.searchfield;
        t = (t = t || "" + e.value).toLowerCase().trim(); var a = e.mmSearchfield,
            o = _(e.closest(".mm-searchfield"), ".mm-btn"),
            r = y(this.node.pnls, ".mm-panel_search")[0],
            c = a.panels,
            m = a.noresults,
            l = a.listitems,
            d = a.dividers; if (l.forEach((function(e) { e.classList.remove("mm-listitem_nosubitems"), e.classList.remove("mm-listitem_onlysubitems"), e.classList.remove("mm-hidden") })), r && (y(r, ".mm-listview")[0].innerHTML = ""), c.forEach((function(e) { e.scrollTop = 0 })), t.length) { d.forEach((function(e) { e.classList.add("mm-hidden") })), l.forEach((function(e) { var n, i = y(e, ".mm-listitem__text")[0],
                    a = !1;
                i && (n = i, Array.prototype.slice.call(n.childNodes).filter((function(e) { return 3 == e.nodeType })).map((function(e) { return e.textContent })).join(" ")).toLowerCase().indexOf(t) > -1 && (i.matches(".mm-listitem__btn") ? s.showSubPanels && (a = !0) : (i.matches("a") || s.showTextItems) && (a = !0)), a || e.classList.add("mm-hidden") })); var p = l.filter((function(e) { return !e.matches(".mm-hidden") })).length; if (s.panel.add) { var u = [];
                c.forEach((function(e) { var t = w(_(e, ".mm-listitem")); if ((t = t.filter((function(e) { return !e.matches(".mm-hidden") }))).length) { if (s.panel.dividers) { var n = g("li.mm-divider"),
                                i = _(e, ".mm-navbar__title")[0];
                            i && (n.innerHTML = i.innerHTML, u.push(n)) }
                        t.forEach((function(e) { u.push(e.cloneNode(!0)) })) } })), u.forEach((function(e) { e.querySelectorAll(".mm-toggle, .mm-check").forEach((function(e) { e.remove() })) })), (n = y(r, ".mm-listview")[0]).append.apply(n, u), this.openPanel(r) } else s.showSubPanels && c.forEach((function(e) { w(_(e, ".mm-listitem")).forEach((function(e) { var t = e.mmChild;
                    t && _(t, ".mm-listitem").forEach((function(e) { e.classList.remove("mm-hidden") })) })) })), Me(c).reverse().forEach((function(t, n) { var s = t.mmParent;
                s && (w(_(t, ".mm-listitem")).length ? (s.matches(".mm-hidden") && s.classList.remove("mm-hidden"), s.classList.add("mm-listitem_onlysubitems")) : e.closest(".mm-panel") || ((t.matches(".mm-panel_opened") || t.matches(".mm-panel_opened-parent")) && setTimeout((function() { i.openPanel(s.closest(".mm-panel")) }), (n + 1) * (1.5 * i.conf.openingInterval)), s.classList.add("mm-listitem_nosubitems"))) })), c.forEach((function(e) { w(_(e, ".mm-listitem")).forEach((function(e) { L(e, ".mm-listitem_vertical").forEach((function(e) { e.matches(".mm-hidden") && (e.classList.remove("mm-hidden"), e.classList.add("mm-listitem_onlysubitems")) })) })) })), c.forEach((function(e) { w(_(e, ".mm-listitem")).forEach((function(e) { var t = function(e, t) { for (var n = [], i = e.previousElementSibling; i;) t && !i.matches(t) || n.push(i), i = i.previousElementSibling; return n }(e, ".mm-divider")[0];
                    t && t.classList.remove("mm-hidden") })) }));
            o.forEach((function(e) { return e.classList.remove("mm-hidden") })), m.forEach((function(e) { _(e, ".mm-panel__noresultsmsg").forEach((function(e) { return e.classList[p ? "add" : "remove"]("mm-hidden") })) })), s.panel.add && (s.panel.splash && _(r, ".mm-panel__content").forEach((function(e) { return e.classList.add("mm-hidden") })), l.forEach((function(e) { return e.classList.remove("mm-hidden") })), d.forEach((function(e) { return e.classList.remove("mm-hidden") }))) } else if (l.forEach((function(e) { return e.classList.remove("mm-hidden") })), d.forEach((function(e) { return e.classList.remove("mm-hidden") })), o.forEach((function(e) { return e.classList.add("mm-hidden") })), m.forEach((function(e) { _(e, ".mm-panel__noresultsmsg").forEach((function(e) { return e.classList.add("mm-hidden") })) })), s.panel.add)
            if (s.panel.splash) _(r, ".mm-panel__content").forEach((function(e) { return e.classList.remove("mm-hidden") }));
            else if (!e.closest(".mm-panel_search")) { var f = y(this.node.pnls, ".mm-panel_opened-parent");
            this.openPanel(f.slice(-1)[0]) }
        this.trigger("updateListview") };
    var He = { add: !1, addTo: "panels" };
    M.options.sectionIndexer = He;
    var je = { current: !0, hover: !1, parent: !1 };
    M.options.setSelected = je;
    var De = { collapsed: { use: !1, blockMenu: !0, hideDivider: !1, hideNavbar: !0 }, expanded: { use: !1, initial: "open" } };
    M.options.sidebar = De;
    M.configs.classNames.toggles = { toggle: "Toggle", check: "Check" };
    /*!
     * mmenu.js
     * mmenujs.com
     *
     * Copyright (c) Fred Heusschen
     * frebsite.nl
     *
     * License: CC-BY-NC-4.0
     * http://creativecommons.org/licenses/by-nc/4.0/
     */
    M.addons = { offcanvas: function() { var e = this; if (this.opts.offCanvas) { var t = function(e) { return "object" != typeof e && (e = {}), e }(this.opts.offCanvas);
                this.opts.offCanvas = o(t, M.options.offCanvas); var n = this.conf.offCanvas;
                this._api.push("open", "close", "setPage"), this.vars.opened = !1, this.bind("initMenu:before", (function() { n.clone && (e.node.menu = e.node.menu.cloneNode(!0), e.node.menu.id && (e.node.menu.id = "mm-" + e.node.menu.id), _(e.node.menu, "[id]").forEach((function(e) { e.id = "mm-" + e.id }))), e.node.wrpr = document.body, document.querySelector(n.menu.insertSelector)[n.menu.insertMethod](e.node.menu) })), this.bind("initMenu:after", (function() { D.call(e), e.setPage(M.node.page), j.call(e), e.node.menu.classList.add("mm-menu_offcanvas"); var t = window.location.hash; if (t) { var n = p(e.node.menu.id);
                        n && n == t.slice(1) && setTimeout((function() { e.open() }), 1e3) } })), this.bind("setPage:after", (function(e) { M.node.blck && y(M.node.blck, "a").forEach((function(t) { t.setAttribute("href", "#" + e.id) })) })), this.bind("open:start:sr-aria", (function() { M.sr_aria(e.node.menu, "hidden", !1) })), this.bind("close:finish:sr-aria", (function() { M.sr_aria(e.node.menu, "hidden", !0) })), this.bind("initMenu:after:sr-aria", (function() { M.sr_aria(e.node.menu, "hidden", !0) })), this.bind("initBlocker:after:sr-text", (function() { y(M.node.blck, "a").forEach((function(t) { t.innerHTML = M.sr_text(e.i18n(e.conf.screenReader.text.closeMenu)) })) })), this.clck.push((function(t, n) { var i = p(e.node.menu.id); if (i && t.matches('[href="#' + i + '"]')) { if (n.inMenu) return e.open(), !0; var s = t.closest(".mm-menu"); if (s) { var a = s.mmApi; if (a && a.close) return a.close(), m(s, (function() { e.open() }), e.conf.transitionDuration), !0 } return e.open(), !0 } if ((i = M.node.page.id) && t.matches('[href="#' + i + '"]')) return e.close(), !0 })) } }, screenReader: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { aria: e, text: e }), "object" != typeof e && (e = {}), e }(this.opts.screenReader);
            this.opts.screenReader = o(t, M.options.screenReader); var n = this.conf.screenReader;
            t.aria && (this.bind("initAddons:after", (function() { e.bind("initMenu:after", (function() { this.trigger("initMenu:after:sr-aria", [].slice.call(arguments)) })), e.bind("initNavbar:after", (function() { this.trigger("initNavbar:after:sr-aria", [].slice.call(arguments)) })), e.bind("openPanel:start", (function() { this.trigger("openPanel:start:sr-aria", [].slice.call(arguments)) })), e.bind("close:start", (function() { this.trigger("close:start:sr-aria", [].slice.call(arguments)) })), e.bind("close:finish", (function() { this.trigger("close:finish:sr-aria", [].slice.call(arguments)) })), e.bind("open:start", (function() { this.trigger("open:start:sr-aria", [].slice.call(arguments)) })), e.bind("initOpened:after", (function() { this.trigger("initOpened:after:sr-aria", [].slice.call(arguments)) })) })), this.bind("updateListview", (function() { e.node.pnls.querySelectorAll(".mm-listitem").forEach((function(e) { M.sr_aria(e, "hidden", e.matches(".mm-hidden")) })) })), this.bind("openPanel:start", (function(t) { var n = _(e.node.pnls, ".mm-panel").filter((function(e) { return e !== t })).filter((function(e) { return !e.parentElement.matches(".mm-panel") })),
                    i = [t];
                _(t, ".mm-listitem_vertical .mm-listitem_opened").forEach((function(e) { i.push.apply(i, y(e, ".mm-panel")) })), n.forEach((function(e) { M.sr_aria(e, "hidden", !0) })), i.forEach((function(e) { M.sr_aria(e, "hidden", !1) })) })), this.bind("closePanel", (function(e) { M.sr_aria(e, "hidden", !0) })), this.bind("initPanel:after", (function(e) { _(e, ".mm-btn").forEach((function(e) { M.sr_aria(e, "haspopup", !0); var t = e.getAttribute("href");
                    t && M.sr_aria(e, "owns", t.replace("#", "")) })) })), this.bind("initNavbar:after", (function(e) { var t = y(e, ".mm-navbar")[0],
                    n = t.matches(".mm-hidden");
                M.sr_aria(t, "hidden", n) })), t.text && "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", (function(e) { var t = y(e, ".mm-navbar")[0],
                    n = !!t.querySelector(".mm-btn_prev");
                M.sr_aria(_(t, ".mm-navbar__title")[0], "hidden", n) }))), t.text && (this.bind("initAddons:after", (function() { e.bind("setPage:after", (function() { this.trigger("setPage:after:sr-text", [].slice.call(arguments)) })), e.bind("initBlocker:after", (function() { this.trigger("initBlocker:after:sr-text", [].slice.call(arguments)) })) })), this.bind("initNavbar:after", (function(t) { var i = y(t, ".mm-navbar")[0]; if (i) { var s = y(i, ".mm-btn_prev")[0];
                    s && (s.innerHTML = M.sr_text(e.i18n(n.text.closeSubmenu))) } })), this.bind("initListview:after", (function(t) { var i = t.closest(".mm-panel").mmParent; if (i) { var s = y(i, ".mm-btn_next")[0]; if (s) { var a = e.i18n(n.text[s.parentElement.matches(".mm-listitem_vertical") ? "toggleSubmenu" : "openSubmenu"]);
                        s.innerHTML += M.sr_text(a) } } }))) }, scrollBugFix: function() { var e = this; if (W && this.opts.offCanvas && this.opts.offCanvas.blockUI) { var t = function(e) { return "boolean" == typeof e && (e = { fix: e }), "object" != typeof e && (e = {}), e }(this.opts.scrollBugFix); if (this.opts.scrollBugFix = o(t, M.options.scrollBugFix), t.fix) { var n, i, s = (n = this.node.menu, i = "", n.addEventListener("touchmove", (function(e) { i = "", e.movementY > 0 ? i = "down" : e.movementY < 0 && (i = "up") })), { get: function() { return i } });
                    this.node.menu.addEventListener("scroll", a, { passive: !1 }), this.node.menu.addEventListener("touchmove", (function(e) { var t = e.target.closest(".mm-panel, .mm-iconbar__top, .mm-iconbar__bottom");
                        t && t.closest(".mm-listitem_vertical") && (t = L(t, ".mm-panel").pop()), t ? (t.scrollHeight === t.offsetHeight || 0 == t.scrollTop && "down" == s.get() || t.scrollHeight == t.scrollTop + t.offsetHeight && "up" == s.get()) && a(e) : a(e) }), { passive: !1 }), this.bind("open:start", (function() { var t = y(e.node.pnls, ".mm-panel_opened")[0];
                        t && (t.scrollTop = 0) })), window.addEventListener("orientationchange", (function(t) { var n = y(e.node.pnls, ".mm-panel_opened")[0];
                        n && (n.scrollTop = 0, n.style["-webkit-overflow-scrolling"] = "auto", n.style["-webkit-overflow-scrolling"] = "touch") })) } }

            function a(e) { e.preventDefault(), e.stopPropagation() } }, autoHeight: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && e && (e = { height: "auto" }), "string" == typeof e && (e = { height: e }), "object" != typeof e && (e = {}), e }(this.opts.autoHeight); if (this.opts.autoHeight = o(t, M.options.autoHeight), "auto" == t.height || "highest" == t.height) { var n, i = (n = function(e) { return e.parentElement.matches(".mm-listitem_vertical") && (e = L(e, ".mm-panel").filter((function(e) { return !e.parentElement.matches(".mm-listitem_vertical") }))[0]), e }, function() { if (!e.opts.offCanvas || e.vars.opened) { var i, s, a = 0,
                            o = e.node.menu.offsetHeight - e.node.pnls.offsetHeight;
                        e.node.menu.classList.add("mm-menu_autoheight-measuring"), "auto" == t.height ? ((s = y(e.node.pnls, ".mm-panel_opened")[0]) && (s = n(s)), s || (s = y(e.node.pnls, ".mm-panel")[0]), a = s.scrollHeight) : "highest" == t.height && (i = 0, y(e.node.pnls, ".mm-panel").forEach((function(e) { e = n(e), i = Math.max(i, e.scrollHeight) })), a = i), e.node.menu.style.height = a + o + "px", e.node.menu.classList.remove("mm-menu_autoheight-measuring") } });
                this.bind("initMenu:after", (function() { e.node.menu.classList.add("mm-menu_autoheight") })), this.opts.offCanvas && this.bind("open:start", i), "highest" == t.height && this.bind("initPanels:after", i), "auto" == t.height && (this.bind("updateListview", i), this.bind("openPanel:start", i)) } }, backButton: function() { var e = this; if (this.opts.offCanvas) { var t = function(e) { return "boolean" == typeof e && (e = { close: e }), "object" != typeof e && (e = {}), e }(this.opts.backButton);
                this.opts.backButton = o(t, M.options.backButton); var n = "#" + this.node.menu.id; if (t.close) { var i = [],
                        s = function() { i = [n], y(e.node.pnls, ".mm-panel_opened, .mm-panel_opened-parent").forEach((function(e) { i.push("#" + e.id) })) };
                    this.bind("open:finish", (function() { history.pushState(null, document.title, n) })), this.bind("open:finish", s), this.bind("openPanel:finish", s), this.bind("close:finish", (function() { i = [], history.back(), history.pushState(null, document.title, location.pathname + location.search) })), window.addEventListener("popstate", (function(t) { if (e.vars.opened && i.length) { var s = (i = i.slice(0, -1))[i.length - 1];
                            s == n ? e.close() : (e.openPanel(e.node.menu.querySelector(s)), history.pushState(null, document.title, n)) } })) }
                t.open && window.addEventListener("popstate", (function(t) { e.vars.opened || location.hash != n || e.open() })) } }, columns: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e }), "number" == typeof e && (e = { add: !0, visible: e }), "object" != typeof e && (e = {}), "number" == typeof e.visible && (e.visible = { min: e.visible, max: e.visible }), e }(this.opts.columns); if (this.opts.columns = o(t, M.options.columns), t.add) { t.visible.min = Math.max(1, Math.min(6, t.visible.min)), t.visible.max = Math.max(t.visible.min, Math.min(6, t.visible.max)); for (var n = [], i = [], s = ["mm-panel_opened", "mm-panel_opened-parent", "mm-panel_highest"], a = 0; a <= t.visible.max; a++) n.push("mm-menu_columns-" + a), i.push("mm-panel_columns-" + a);
                s.push.apply(s, i), this.bind("openPanel:before", (function(t) { var n; if (t && (n = t.mmParent), n && !n.classList.contains("mm-listitem_vertical") && (n = n.closest(".mm-panel"))) { var i = n.className; if (i.length && (i = i.split("mm-panel_columns-")[1]))
                            for (var a = parseInt(i.split(" ")[0], 10) + 1; a > 0;) { if (!(t = y(e.node.pnls, ".mm-panel_columns-" + a)[0])) { a = -1; break }
                                a++, t.classList.add("mm-hidden"), s.forEach((function(e) { t.classList.remove(e) })) } } })), this.bind("openPanel:start", (function(s) { if (s) { var a = s.mmParent; if (a && a.classList.contains("mm-listitem_vertical")) return } var o = y(e.node.pnls, ".mm-panel_opened-parent").length;
                    s.matches(".mm-panel_opened-parent") || o++, o = Math.min(t.visible.max, Math.max(t.visible.min, o)), n.forEach((function(t) { e.node.menu.classList.remove(t) })), e.node.menu.classList.add("mm-menu_columns-" + o); var r = [];
                    y(e.node.pnls, ".mm-panel").forEach((function(e) { i.forEach((function(t) { e.classList.remove(t) })), e.matches(".mm-panel_opened-parent") && r.push(e) })), r.push(s), r.slice(-t.visible.max).forEach((function(e, t) { e.classList.add("mm-panel_columns-" + t) })) })) } }, counters: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e, addTo: "panels", count: e }), "object" != typeof e && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), e }(this.opts.counters); if (this.opts.counters = o(t, M.options.counters), this.bind("initListview:after", (function(t) { var n = e.conf.classNames.counters.counter;
                    _(t, "." + n).forEach((function(e) { x(e, n, "mm-counter") })) })), t.add && this.bind("initListview:after", (function(e) { if (e.matches(t.addTo)) { var n = e.closest(".mm-panel").mmParent; if (n && !_(n, ".mm-counter").length) { var i = y(n, ".mm-btn")[0];
                            i && i.prepend(g("span.mm-counter")) } } })), t.count) { var n = function(t) {
                    (t ? [t.closest(".mm-panel")] : y(e.node.pnls, ".mm-panel")).forEach((function(e) { var t = e.mmParent; if (t) { var n = _(t, ".mm-counter")[0]; if (n) { var i = [];
                                y(e, ".mm-listview").forEach((function(e) { i.push.apply(i, y(e)) })), n.innerHTML = w(i).length.toString() } } })) };
                this.bind("initListview:after", n), this.bind("updateListview", n) } }, dividers: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e }), "object" != typeof e && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), e }(this.opts.dividers);
            this.opts.dividers = o(t, M.options.dividers), this.bind("initListview:after", (function(t) { y(t).forEach((function(t) { x(t, e.conf.classNames.divider, "mm-divider"), t.matches(".mm-divider") && t.classList.remove("mm-listitem") })) })), t.add && this.bind("initListview:after", (function(e) { if (e.matches(t.addTo)) { _(e, ".mm-divider").forEach((function(e) { e.remove() })); var n = "";
                    w(y(e)).forEach((function(t) { var i = y(t, ".mm-listitem__text")[0].textContent.trim().toLowerCase()[0]; if (i.length && i != n) { n = i; var s = g("li.mm-divider");
                            s.textContent = i, e.insertBefore(s, t) } })) } })) }, drag: function() { var e = this; if (this.opts.offCanvas) { var t = function(e) { return "boolean" == typeof e && (e = { open: e }), "object" != typeof e && (e = {}), e }(this.opts.drag);
                this.opts.drag = o(t, M.options.drag), t.open && this.bind("setPage:after", (function(n) { ce.call(e, t.node || n) })) } }, dropdown: function() { var e = this; if (this.opts.offCanvas) { var t = function(e) { return "boolean" == typeof e && e && (e = { drop: e }), "object" != typeof e && (e = {}), "string" == typeof e.position && (e.position = { of: e.position }), e }(this.opts.dropdown);
                this.opts.dropdown = o(t, M.options.dropdown); var n = this.conf.dropdown; if (t.drop) { var i;
                    this.bind("initMenu:after", (function() { if (e.node.menu.classList.add("mm-menu_dropdown"), "string" != typeof t.position.of) { var n = p(e.node.menu.id);
                            n && (t.position.of = '[href="#' + n + '"]') } if ("string" == typeof t.position.of) { i = _(document.body, t.position.of)[0]; var s = t.event.split(" ");
                            1 == s.length && (s[1] = s[0]), "hover" == s[0] && i.addEventListener("mouseenter", (function() { e.open() }), { passive: !0 }), "hover" == s[1] && e.node.menu.addEventListener("mouseleave", (function() { e.close() }), { passive: !0 }) } })), this.bind("open:start", (function() { e.node.menu.mmStyle = e.node.menu.getAttribute("style"), e.node.wrpr.classList.add("mm-wrapper_dropdown") })), this.bind("close:finish", (function() { e.node.menu.setAttribute("style", e.node.menu.mmStyle), e.node.wrpr.classList.remove("mm-wrapper_dropdown") })); var s = function(e, s) { var a, o, r, c = s[0],
                            m = s[1],
                            l = "x" == e ? "offsetWidth" : "offsetHeight",
                            d = "x" == e ? "left" : "top",
                            p = "x" == e ? "right" : "bottom",
                            u = "x" == e ? "width" : "height",
                            f = "x" == e ? "innerWidth" : "innerHeight",
                            h = "x" == e ? "maxWidth" : "maxHeight",
                            v = null,
                            b = (a = d, i.getBoundingClientRect()[a] + document.body["left" === a ? "scrollLeft" : "scrollTop"]),
                            g = b + i[l],
                            _ = window[f],
                            y = n.offset.button[e] + n.offset.viewport[e]; if (t.position[e]) switch (t.position[e]) {
                            case "left":
                            case "bottom":
                                v = "after"; break;
                            case "right":
                            case "top":
                                v = "before" }
                        return null === v && (v = b + (g - b) / 2 < _ / 2 ? "after" : "before"), "after" == v ? (r = _ - ((o = "x" == e ? b : g) + y), c[d] = o + n.offset.button[e] + "px", c[p] = "auto", t.tip && m.push("mm-menu_tip-" + ("x" == e ? "left" : "top"))) : (r = (o = "x" == e ? g : b) - y, c[p] = "calc( 100% - " + (o - n.offset.button[e]) + "px )", c[d] = "auto", t.tip && m.push("mm-menu_tip-" + ("x" == e ? "right" : "bottom"))), t.fitViewport && (c[h] = Math.min(n[u].max, r) + "px"), [c, m] };
                    this.bind("open:start", a), window.addEventListener("resize", (function(t) { a.call(e) }), { passive: !0 }), this.opts.offCanvas.blockUI || window.addEventListener("scroll", (function(t) { a.call(e) }), { passive: !0 }) } }

            function a() { var e = this; if (this.vars.opened) { this.node.menu.setAttribute("style", this.node.menu.mmStyle); var n = [{},
                        []
                    ]; for (var i in n = s.call(this, "y", n), (n = s.call(this, "x", n))[0]) this.node.menu.style[i] = n[0][i]; if (t.tip) {
                        ["mm-menu_tip-left", "mm-menu_tip-right", "mm-menu_tip-top", "mm-menu_tip-bottom"].forEach((function(t) { e.node.menu.classList.remove(t) })), n[1].forEach((function(t) { e.node.menu.classList.add(t) })) } } } }, fixedElements: function() { var e = this; if (this.opts.offCanvas) { var t, n, i = this.conf.fixedElements;
                this.bind("setPage:after", (function(s) { t = e.conf.classNames.fixedElements.fixed, n = _(document, i.insertSelector)[0], _(s, "." + t).forEach((function(e) { x(e, t, "mm-slideout"), n[i.insertMethod](e) })) })) } }, iconbar: function() { var e, t = this,
                n = function(e) { return "array" == r(e) && (e = { use: !0, top: e }), "object" != r(e) && (e = {}), void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), e }(this.opts.iconbar); if ((this.opts.iconbar = o(n, M.options.iconbar), n.use) && (["top", "bottom"].forEach((function(t, i) { var s = n[t]; "array" != r(s) && (s = [s]); for (var a = g("div.mm-iconbar__" + t), o = 0, c = s.length; o < c; o++) "string" == typeof s[o] ? a.innerHTML += s[o] : a.append(s[o]);
                    a.children.length && (e || (e = g("div.mm-iconbar")), e.append(a)) })), e)) { this.bind("initMenu:after", (function() { t.node.menu.prepend(e) })); var i = "mm-menu_iconbar-" + n.position,
                    s = function() { t.node.menu.classList.add(i), M.sr_aria(e, "hidden", !1) }; if ("boolean" == typeof n.use ? this.bind("initMenu:after", s) : k(n.use, s, (function() { t.node.menu.classList.remove(i), M.sr_aria(e, "hidden", !0) })), "tabs" == n.type) { e.classList.add("mm-iconbar_tabs"), e.addEventListener("click", (function(e) { var n = e.target; if (n.matches("a"))
                            if (n.matches(".mm-iconbar__tab_selected")) e.stopImmediatePropagation();
                            else try { var i = t.node.menu.querySelector(n.getAttribute("href"))[0];
                                i && i.matches(".mm-panel") && (e.preventDefault(), e.stopImmediatePropagation(), t.openPanel(i, !1)) } catch (e) {} })); var a = function(t) { _(e, "a").forEach((function(e) { e.classList.remove("mm-iconbar__tab_selected") })); var n = _(e, '[href="#' + t.id + '"]')[0]; if (n) n.classList.add("mm-iconbar__tab_selected");
                        else { var i = t.mmParent;
                            i && a(i.closest(".mm-panel")) } };
                    this.bind("openPanel:start", a) } } }, iconPanels: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e }), "number" != typeof e && "string" != typeof e || (e = { add: !0, visible: e }), "object" != typeof e && (e = {}), e }(this.opts.iconPanels);
            this.opts.iconPanels = o(t, M.options.iconPanels); var n = !1; if ("first" == t.visible && (n = !0, t.visible = 1), t.visible = Math.min(3, Math.max(1, t.visible)), t.visible++, t.add) { this.bind("initMenu:after", (function() { var n = ["mm-menu_iconpanel"];
                    t.hideNavbar && n.push("mm-menu_hidenavbar"), t.hideDivider && n.push("mm-menu_hidedivider"), n.forEach((function(t) { e.node.menu.classList.add(t) })) })); var i = []; if (!n)
                    for (var s = 0; s <= t.visible; s++) i.push("mm-panel_iconpanel-" + s);
                this.bind("openPanel:start", (function(s) { var a = y(e.node.pnls, ".mm-panel"); if (!(s = s || a[0]).parentElement.matches(".mm-listitem_vertical"))
                        if (n) a.forEach((function(e, t) { e.classList[0 == t ? "add" : "remove"]("mm-panel_iconpanel-first") }));
                        else { a.forEach((function(e) { i.forEach((function(t) { e.classList.remove(t) })) })), a = a.filter((function(e) { return e.matches(".mm-panel_opened-parent") })); var o = !1;
                            a.forEach((function(e) { s === e && (o = !0) })), o || a.push(s), a.forEach((function(e) { e.classList.remove("mm-hidden") })), (a = a.slice(-t.visible)).forEach((function(e, t) { e.classList.add("mm-panel_iconpanel-" + t) })) } })), this.bind("initPanel:after", (function(e) { if (t.blockPanel && !e.parentElement.matches(".mm-listitem_vertical") && !y(e, ".mm-panel__blocker")[0]) { var n = g("a.mm-panel__blocker");
                        n.setAttribute("href", "#" + e.closest(".mm-panel").id), e.prepend(n) } })) } }, keyboardNavigation: function() { var e = this; if (!W) { var t = function(e) { return "boolean" != typeof e && "string" != typeof e || (e = { enable: e }), "object" != typeof e && (e = {}), e }(this.opts.keyboardNavigation); if (this.opts.keyboardNavigation = o(t, M.options.keyboardNavigation), t.enable) { var n = g("button.mm-tabstart.mm-sronly"),
                        i = g("button.mm-tabend.mm-sronly"),
                        s = g("button.mm-tabend.mm-sronly");
                    this.bind("initMenu:after", (function() { t.enhance && e.node.menu.classList.add("mm-menu_keyboardfocus"), ve.call(e, t.enhance) })), this.bind("initOpened:before", (function() { e.node.menu.prepend(n), e.node.menu.append(i), y(e.node.menu, ".mm-navbars-top, .mm-navbars-bottom").forEach((function(e) { e.querySelectorAll(".mm-navbar__title").forEach((function(e) { e.setAttribute("tabindex", "-1") })) })) })), this.bind("initBlocker:after", (function() { M.node.blck.append(s), y(M.node.blck, "a")[0].classList.add("mm-tabstart") })); var a = "input, select, textarea, button, label, a[href]",
                        r = function(n) { n = n || y(e.node.pnls, ".mm-panel_opened")[0]; var i = null,
                                s = document.activeElement.closest(".mm-navbar"); if (!s || s.closest(".mm-menu") != e.node.menu) { if ("default" == t.enable && ((i = _(n, ".mm-listview a[href]:not(.mm-hidden)")[0]) || (i = _(n, a + ":not(.mm-hidden)")[0]), !i)) { var o = [];
                                    y(e.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach((function(e) { o.push.apply(o, _(e, a + ":not(.mm-hidden)")) })), i = o[0] }
                                i || (i = y(e.node.menu, ".mm-tabstart")[0]), i && i.focus() } };
                    this.bind("open:finish", r), this.bind("openPanel:finish", r), this.bind("initOpened:after:sr-aria", (function() {
                        [e.node.menu, M.node.blck].forEach((function(e) { y(e, ".mm-tabstart, .mm-tabend").forEach((function(e) { M.sr_aria(e, "hidden", !0), M.sr_role(e, "presentation") })) })) })) } } }, lazySubmenus: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { load: e }), "object" != typeof e && (e = {}), e }(this.opts.lazySubmenus);
            this.opts.lazySubmenus = o(t, M.options.lazySubmenus), t.load && (this.bind("initPanels:before", (function() { var t = [];
                _(e.node.pnls, "li").forEach((function(n) { t.push.apply(t, y(n, e.conf.panelNodetype.join(", "))) })), t.filter((function(e) { return !e.matches(".mm-listview_inset") })).filter((function(e) { return !e.matches(".mm-nolistview") })).filter((function(e) { return !e.matches(".mm-nopanel") })).forEach((function(e) {
                    ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach((function(t) { e.classList.add(t) })) })) })), this.bind("initPanels:before", (function() { var t = [];
                _(e.node.pnls, "." + e.conf.classNames.selected).forEach((function(e) { t.push.apply(t, L(e, ".mm-panel_lazysubmenu")) })), t.length && t.forEach((function(e) { console.log(e);
                    ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach((function(t) { e.classList.remove(t) })) })) })), this.bind("openPanel:before", (function(t) { var n = _(t, ".mm-panel_lazysubmenu").filter((function(e) { return !e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu") }));
                t.matches(".mm-panel_lazysubmenu") && n.unshift(t), n.forEach((function(t) {
                    ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach((function(e) { t.classList.remove(e) })), e.initPanel(t) })) }))) }, navbars: ye, pageScroll: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { scroll: e }), "object" != typeof e && (e = {}), e }(this.opts.pageScroll);
            this.opts.pageScroll = o(t, M.options.pageScroll); var n, i = this.conf.pageScroll;

            function s() { n && window.scrollTo({ top: n.getBoundingClientRect().top + document.scrollingElement.scrollTop - i.scrollOffset, behavior: "smooth" }), n = null }

            function a(e) { try { return "#" != e && "#" == e.slice(0, 1) ? M.node.page.querySelector(e) : null } catch (e) { return null } } if (t.scroll && this.bind("close:finish", (function() { s() })), this.opts.offCanvas && t.scroll && this.clck.push((function(t, i) { if (n = null, i.inMenu) { var o = t.getAttribute("href"); if (n = a(o)) return e.node.menu.matches(".mm-menu_sidebar-expanded") && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") ? void s() : { close: !0 } } })), t.update) { var r = [];
                this.bind("initListview:after", (function(e) { E(y(e, ".mm-listitem")).forEach((function(e) { var t = a(e.getAttribute("href"));
                        t && r.unshift(t) })) })); var c = -1;
                window.addEventListener("scroll", (function(t) { for (var n = window.scrollY, s = 0; s < r.length; s++)
                        if (r[s].offsetTop < n + i.updateOffset) { if (c !== s) { c = s; var a = E(_(y(e.node.pnls, ".mm-panel_opened")[0], ".mm-listitem"));
                                (a = a.filter((function(e) { return e.matches('[href="#' + r[s].id + '"]') }))).length && e.setSelected(a[0].parentElement) } break } })) } }, searchfield: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e }), "object" != typeof e && (e = {}), "boolean" == typeof e.panel && (e.panel = { add: e.panel }), "object" != typeof e.panel && (e.panel = {}), "panel" == e.addTo && (e.panel.add = !0), e.panel.add && (e.showSubPanels = !1, e.panel.splash && (e.cancel = !0)), e }(this.opts.searchfield);
            this.opts.searchfield = o(t, M.options.searchfield);
            this.conf.searchfield;
            t.add && (this.bind("close:start", (function() { _(e.node.menu, ".mm-searchfield").forEach((function(e) { e.blur() })) })), this.bind("initPanel:after", (function(n) { var i = null;
                t.panel.add && (i = Ae.call(e)); var s = null; switch (t.addTo) {
                    case "panels":
                        s = [n]; break;
                    case "panel":
                        s = [i]; break;
                    default:
                        "string" == typeof t.addTo ? s = _(e.node.menu, t.addTo) : "array" == r(t.addTo) && (s = t.addTo) }
                s.forEach((function(n) { n = Te.call(e, n), t.search && n && Ce.call(e, n) })), t.noResults && Ne.call(e, t.panel.add ? i : n) })), this.clck.push((function(t, n) { if (n.inMenu && t.matches(".mm-searchfield__btn")) { if (t.matches(".mm-btn_close")) { var i = _(s = t.closest(".mm-searchfield"), "input")[0]; return i.value = "", e.search(i), !0 } var s; if (t.matches(".mm-btn_next")) return (s = t.closest("form")) && s.submit(), !0 } }))) }, sectionIndexer: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { add: e }), "object" != typeof e && (e = {}), e }(this.opts.sectionIndexer);
            this.opts.sectionIndexer = o(t, M.options.sectionIndexer), t.add && this.bind("initPanels:after", (function() { if (!e.node.indx) { var t = ""; "abcdefghijklmnopqrstuvwxyz".split("").forEach((function(e) { t += '<a href="#">' + e + "</a>" })); var n = g("div.mm-sectionindexer");
                    n.innerHTML = t, e.node.pnls.prepend(n), e.node.indx = n, e.node.indx.addEventListener("click", (function(e) { e.target.matches("a") && e.preventDefault() })); var i = function(t) { if (t.target.matches("a")) { var n = t.target.textContent,
                                i = y(e.node.pnls, ".mm-panel_opened")[0],
                                s = -1,
                                a = i.scrollTop;
                            i.scrollTop = 0, _(i, ".mm-divider").filter((function(e) { return !e.matches(".mm-hidden") })).forEach((function(e) { s < 0 && n == e.textContent.trim().slice(0, 1).toLowerCase() && (s = e.offsetTop) })), i.scrollTop = s > -1 ? s : a } };
                    W ? (e.node.indx.addEventListener("touchstart", i), e.node.indx.addEventListener("touchmove", i)) : e.node.indx.addEventListener("mouseover", i) }
                e.bind("openPanel:start", (function(t) { var n = _(t, ".mm-divider").filter((function(e) { return !e.matches(".mm-hidden") })).length;
                    e.node.indx.classList[n ? "add" : "remove"]("mm-sectionindexer_active") })) })) }, setSelected: function() { var e = this,
                t = function(e) { return "boolean" == typeof e && (e = { hover: e, parent: e }), "object" != typeof e && (e = {}), e }(this.opts.setSelected); if (this.opts.setSelected = o(t, M.options.setSelected), "detect" == t.current) { var n = function(t) { t = t.split("?")[0].split("#")[0]; var i = e.node.menu.querySelector('a[href="' + t + '"], a[href="' + t + '/"]'); if (i) e.setSelected(i.parentElement);
                    else { var s = t.split("/").slice(0, -1);
                        s.length && n(s.join("/")) } };
                this.bind("initMenu:after", (function() { n.call(e, window.location.href) })) } else t.current || this.bind("initListview:after", (function(e) { y(e, ".mm-listitem_selected").forEach((function(e) { e.classList.remove("mm-listitem_selected") })) }));
            t.hover && this.bind("initMenu:after", (function() { e.node.menu.classList.add("mm-menu_selected-hover") })), t.parent && (this.bind("openPanel:finish", (function(t) { _(e.node.pnls, ".mm-listitem_selected-parent").forEach((function(e) { e.classList.remove("mm-listitem_selected-parent") })); for (var n = t.mmParent; n;) n.matches(".mm-listitem_vertical") || n.classList.add("mm-listitem_selected-parent"), n = (n = n.closest(".mm-panel")).mmParent })), this.bind("initMenu:after", (function() { e.node.menu.classList.add("mm-menu_selected-parent") }))) }, sidebar: function() { var e = this; if (this.opts.offCanvas) { var t = function(e) { return ("string" == typeof e || "boolean" == typeof e && e || "number" == typeof e) && (e = { expanded: e }), "object" != typeof e && (e = {}), "boolean" == typeof e.collapsed && e.collapsed && (e.collapsed = { use: !0 }), "string" != typeof e.collapsed && "number" != typeof e.collapsed || (e.collapsed = { use: e.collapsed }), "object" != typeof e.collapsed && (e.collapsed = {}), "boolean" == typeof e.expanded && e.expanded && (e.expanded = { use: !0 }), "string" != typeof e.expanded && "number" != typeof e.expanded || (e.expanded = { use: e.expanded }), "object" != typeof e.expanded && (e.expanded = {}), e }(this.opts.sidebar); if (this.opts.sidebar = o(t, M.options.sidebar), t.collapsed.use) { this.bind("initMenu:after", (function() { if (e.node.menu.classList.add("mm-menu_sidebar-collapsed"), t.collapsed.blockMenu && e.opts.offCanvas && !y(e.node.menu, ".mm-menu__blocker")[0]) { var n = g("a.mm-menu__blocker");
                            n.setAttribute("href", "#" + e.node.menu.id), e.node.menu.prepend(n) }
                        t.collapsed.hideNavbar && e.node.menu.classList.add("mm-menu_hidenavbar"), t.collapsed.hideDivider && e.node.menu.classList.add("mm-menu_hidedivider") })); var n = function() { e.node.wrpr.classList.add("mm-wrapper_sidebar-collapsed") },
                        i = function() { e.node.wrpr.classList.remove("mm-wrapper_sidebar-collapsed") }; "boolean" == typeof t.collapsed.use ? this.bind("initMenu:after", n) : k(t.collapsed.use, n, i) } if (t.expanded.use) { this.bind("initMenu:after", (function() { e.node.menu.classList.add("mm-menu_sidebar-expanded") }));
                    n = function() { e.node.wrpr.classList.add("mm-wrapper_sidebar-expanded"), e.node.wrpr.matches(".mm-wrapper_sidebar-closed") || e.open() }, i = function() { e.node.wrpr.classList.remove("mm-wrapper_sidebar-expanded"), e.close() }; "boolean" == typeof t.expanded.use ? this.bind("initMenu:after", n) : k(t.expanded.use, n, i), this.bind("close:start", (function() { e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.add("mm-wrapper_sidebar-closed"), "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "closed")) })), this.bind("open:start", (function() { e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.remove("mm-wrapper_sidebar-closed"), "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "open")) })); var s = t.expanded.initial; if ("remember" == t.expanded.initial) { var a = window.localStorage.getItem("mmenuExpandedState"); switch (a) {
                            case "open":
                            case "closed":
                                s = a } } "closed" == s && this.bind("initMenu:after", (function() { e.node.wrpr.classList.add("mm-wrapper_sidebar-closed") })), this.clck.push((function(n, i) { if (i.inMenu && i.inListview && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")) return { close: "closed" == t.expanded.initial } })) } } }, toggles: function() { var e = this;
            this.bind("initPanel:after", (function(t) { _(t, "input").forEach((function(t) { x(t, e.conf.classNames.toggles.toggle, "mm-toggle"), x(t, e.conf.classNames.toggles.check, "mm-check") })) })) } }, M.wrappers = { angular: function() { this.opts.onClick = { close: !0, preventDefault: !1, setSelected: !0 } }, bootstrap: function() { var e = this; if (this.node.menu.matches(".navbar-collapse")) { this.conf.offCanvas && (this.conf.offCanvas.clone = !1); var t = g("nav"),
                    n = g("div");
                t.append(n), y(this.node.menu).forEach((function(t) { switch (!0) {
                        case t.matches(".navbar-nav"):
                            n.append(function(e) { var t = g("ul"); return _(e, ".nav-item").forEach((function(e) { var n = g("li"); if (e.matches(".active") && n.classList.add("Selected"), !e.matches(".nav-link")) { var i = y(e, ".dropdown-menu")[0];
                                        i && n.append(o(i)), e = y(e, ".nav-link")[0] }
                                    n.prepend(a(e)), t.append(n) })), t }(t)); break;
                        case t.matches(".dropdown-menu"):
                            n.append(o(t)); break;
                        case t.matches(".form-inline"):
                            e.conf.searchfield.form = { action: t.getAttribute("action") || null, method: t.getAttribute("method") || null }, e.conf.searchfield.input = { name: t.querySelector("input").getAttribute("name") || null }, e.conf.searchfield.clear = !1, e.conf.searchfield.submit = !0; break;
                        default:
                            n.append(t.cloneNode(!0)) } })), this.bind("initMenu:before", (function() { document.body.prepend(t), e.node.menu = t })); var i = this.node.menu.parentElement; if (i) { var s = i.querySelector(".navbar-toggler");
                    s && (s.removeAttribute("data-target"), s.removeAttribute("aria-controls"), s.outerHTML = s.outerHTML, (s = i.querySelector(".navbar-toggler")).addEventListener("click", (function(t) { t.preventDefault(), t.stopImmediatePropagation(), e[e.vars.opened ? "close" : "open"]() }))) } }

            function a(e) { for (var t = g(e.matches("a") ? "a" : "span"), n = ["href", "title", "target"], i = 0; i < n.length; i++) e.getAttribute(n[i]) && t.setAttribute(n[i], e.getAttribute(n[i])); return t.innerHTML = e.innerHTML, _(t, ".sr-only").forEach((function(e) { e.remove() })), t }

            function o(e) { var t = g("ul"); return y(e).forEach((function(e) { var n = g("li");
                    e.matches(".dropdown-divider") ? n.classList.add("Divider") : e.matches(".dropdown-item") && n.append(a(e)), t.append(n) })), t } }, olark: function() { this.conf.offCanvas.page.noSelector.push("#olark") }, turbolinks: function() { var e;
            document.addEventListener("turbolinks:before-visit", (function(t) { e = document.querySelector(".mm-wrapper").className.split(" ").filter((function(e) { return /mm-/.test(e) })) })), document.addEventListener("turbolinks:load", (function(t) { void 0 !== e && (document.querySelector(".mm-wrapper").className = e) })) }, wordpress: function() { this.conf.classNames.selected = "current-menu-item"; var e = document.getElementById("wpadminbar");
            e && (e.style.position = "fixed", e.classList.add("mm-slideout")) } };
    var Oe;
    t.default = M;
    window && (window.Mmenu = M), (Oe = window.jQuery || window.Zepto || null) && (Oe.fn.mmenu = function(e, t) { var n = Oe(); return this.each((function(i, s) { if (!s.mmApi) { var a = new M(s, e, t),
                    o = Oe(a.node.menu);
                o.data("mmenu", a.API), n = n.add(o) } })), n })
}]);
/*
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
! function(t) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery) }(function(t) {
    var e = -1,
        o = -1,
        n = function(t) { return parseFloat(t) || 0 },
        a = function(e) { var o = 1,
                a = t(e),
                i = null,
                r = []; return a.each(function() { var e = t(this),
                    a = e.offset().top - n(e.css("margin-top")),
                    s = r.length > 0 ? r[r.length - 1] : null;
                null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a }), r },
        i = function(e) {
            var o = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
        },
        r = t.fn.matchHeight = function(e) { var o = i(e); if (o.remove) { var n = this; return this.css(o.property, ""), t.each(r._groups, function(t, e) { e.elements = e.elements.not(n) }), this } return this.length <= 1 && !o.target ? this : (r._groups.push({ elements: this, options: o }), r._apply(this, o), this) };
    r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
        r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function(e, o) {
            var s = i(o),
                h = t(e),
                l = [h],
                c = t(window).scrollTop(),
                p = t("html").outerHeight(!0),
                u = h.parents().filter(":hidden");
            return u.each(function() { var e = t(this);
                    e.data("style-cache", e.attr("style")) }), u.css("display", "block"), s.byRow && !s.target && (h.each(function() {
                    var e = t(this),
                        o = e.css("display");
                    "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                        display: o,
                        "padding-top": "0",
                        "padding-bottom": "0",
                        "margin-top": "0",
                        "margin-bottom": "0",
                        "border-top-width": "0",
                        "border-bottom-width": "0",
                        height: "100px",
                        overflow: "hidden"
                    })
                }), l = a(h), h.each(function() { var e = t(this);
                    e.attr("style", e.data("style-cache") || "") })), t.each(l, function(e, o) {
                    var a = t(o),
                        i = 0;
                    if (s.target) i = s.target.outerHeight(!1);
                    else {
                        if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                        a.each(function() {
                            var e = t(this),
                                o = e.attr("style"),
                                n = e.css("display");
                            "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                            var a = {
                                display: n
                            };
                            a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
                        })
                    }
                    a.each(function() { var e = t(this),
                            o = 0;
                        s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px")) })
                }), u.each(function() { var e = t(this);
                    e.attr("style", e.data("style-cache") || null) }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
                this
        }, r._applyDataApi = function() { var e = {};
            t("[data-match-height], [data-mh]").each(function() { var o = t(this),
                    n = o.attr("data-mh") || o.attr("data-match-height");
                n in e ? e[n] = e[n].add(o) : e[n] = o }), t.each(e, function() { this.matchHeight(!0) }) };
    var s = function(e) { r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() { r._apply(this.elements, this.options) }), r._afterUpdate && r._afterUpdate(e, r._groups) };
    r._update = function(n, a) {
        if (a && "resize" === a.type) {
            var i = t(window).width();
            if (i === e) return;
            e = i;
        }
        n ? o === -1 && (o = setTimeout(function() { s(a), o = -1 }, r._throttle)) : s(a)
    }, t(r._applyDataApi);
    var h = t.fn.on ? "on" : "bind";
    t(window)[h]("load", function(t) { r._update(!1, t) }), t(window)[h]("resize orientationchange", function(t) { r._update(!0, t) })
});
/*! Select2 4.1.0-beta.1 | https://github.com/select2/select2/blob/master/LICENSE.md */
! function(n) { "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) { return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t), t } : n(jQuery) }(function(u) { var e = function() { if (u && u.fn && u.fn.select2 && u.fn.select2.amd) var e = u.fn.select2.amd; var t, n, i, h, s, o, f, g, m, v, y, _, r, a, b;

            function w(e, t) { return r.call(e, t) }

            function l(e, t) { var n, i, r, s, o, a, l, c, u, d, p, h = t && t.split("/"),
                    f = y.map,
                    g = f && f["*"] || {}; if (e) { for (o = (e = e.split("/")).length - 1, y.nodeIdCompat && b.test(e[o]) && (e[o] = e[o].replace(b, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), u = 0; u < e.length; u++)
                        if ("." === (p = e[u])) e.splice(u, 1), u -= 1;
                        else if (".." === p) { if (0 === u || 1 === u && ".." === e[2] || ".." === e[u - 1]) continue;
                        0 < u && (e.splice(u - 1, 2), u -= 2) }
                    e = e.join("/") } if ((h || g) && f) { for (u = (n = e.split("/")).length; 0 < u; u -= 1) { if (i = n.slice(0, u).join("/"), h)
                            for (d = h.length; 0 < d; d -= 1)
                                if (r = (r = f[h.slice(0, d).join("/")]) && r[i]) { s = r, a = u; break }
                        if (s) break;!l && g && g[i] && (l = g[i], c = u) }!s && l && (s = l, a = c), s && (n.splice(0, a, s), e = n.join("/")) } return e }

            function x(t, n) { return function() { var e = a.call(arguments, 0); return "string" != typeof e[0] && 1 === e.length && e.push(null), o.apply(h, e.concat([t, n])) } }

            function A(t) { return function(e) { m[t] = e } }

            function D(e) { if (w(v, e)) { var t = v[e];
                    delete v[e], _[e] = !0, s.apply(h, t) } if (!w(m, e) && !w(_, e)) throw new Error("No " + e); return m[e] }

            function c(e) { var t, n = e ? e.indexOf("!") : -1; return -1 < n && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e] }

            function S(e) { return e ? c(e) : [] } return e && e.requirejs || (e ? n = e : e = {}, m = {}, v = {}, y = {}, _ = {}, r = Object.prototype.hasOwnProperty, a = [].slice, b = /\.js$/, f = function(e, t) { var n, i = c(e),
                    r = i[0],
                    s = t[1]; return e = i[1], r && (n = D(r = l(r, s))), r ? e = n && n.normalize ? n.normalize(e, function(t) { return function(e) { return l(e, t) } }(s)) : l(e, s) : (r = (i = c(e = l(e, s)))[0], e = i[1], r && (n = D(r))), { f: r ? r + "!" + e : e, n: e, pr: r, p: n } }, g = { require: function(e) { return x(e) }, exports: function(e) { var t = m[e]; return void 0 !== t ? t : m[e] = {} }, module: function(e) { return { id: e, uri: "", exports: m[e], config: function(e) { return function() { return y && y.config && y.config[e] || {} } }(e) } } }, s = function(e, t, n, i) { var r, s, o, a, l, c, u, d = [],
                    p = typeof n; if (c = S(i = i || e), "undefined" == p || "function" == p) { for (t = !t.length && n.length ? ["require", "exports", "module"] : t, l = 0; l < t.length; l += 1)
                        if ("require" === (s = (a = f(t[l], c)).f)) d[l] = g.require(e);
                        else if ("exports" === s) d[l] = g.exports(e), u = !0;
                    else if ("module" === s) r = d[l] = g.module(e);
                    else if (w(m, s) || w(v, s) || w(_, s)) d[l] = D(s);
                    else { if (!a.p) throw new Error(e + " missing " + s);
                        a.p.load(a.n, x(i, !0), A(s), {}), d[l] = m[s] }
                    o = n ? n.apply(m[e], d) : void 0, e && (r && r.exports !== h && r.exports !== m[e] ? m[e] = r.exports : o === h && u || (m[e] = o)) } else e && (m[e] = n) }, t = n = o = function(e, t, n, i, r) { if ("string" == typeof e) return g[e] ? g[e](t) : D(f(e, S(t)).f); if (!e.splice) { if ((y = e).deps && o(y.deps, y.callback), !t) return;
                    t.splice ? (e = t, t = n, n = null) : e = h } return t = t || function() {}, "function" == typeof n && (n = i, i = r), i ? s(h, e, t, n) : setTimeout(function() { s(h, e, t, n) }, 4), o }, o.config = function(e) { return o(e) }, t._defined = m, (i = function(e, t, n) { if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                t.splice || (n = t, t = []), w(m, e) || w(v, e) || (v[e] = [e, t, n]) }).amd = { jQuery: !0 }, e.requirejs = t, e.require = n, e.define = i), e.define("almond", function() {}), e.define("jquery", [], function() { var e = u || $; return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e }), e.define("select2/utils", ["jquery"], function(s) { var r = {};

                function u(e) { var t = e.prototype,
                        n = []; for (var i in t) { "function" == typeof t[i] && "constructor" !== i && n.push(i) } return n }
                r.Extend = function(e, t) { var n = {}.hasOwnProperty;

                    function i() { this.constructor = e } for (var r in t) n.call(t, r) && (e[r] = t[r]); return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e }, r.Decorate = function(i, r) { var e = u(r),
                        t = u(i);

                    function s() { var e = Array.prototype.unshift,
                            t = r.prototype.constructor.length,
                            n = i.prototype.constructor;
                        0 < t && (e.call(arguments, i.prototype.constructor), n = r.prototype.constructor), n.apply(this, arguments) }
                    r.displayName = i.displayName, s.prototype = new function() { this.constructor = s }; for (var n = 0; n < t.length; n++) { var o = t[n];
                        s.prototype[o] = i.prototype[o] }

                    function a(e) { var t = function() {};
                        e in s.prototype && (t = s.prototype[e]); var n = r.prototype[e]; return function() { return Array.prototype.unshift.call(arguments, t), n.apply(this, arguments) } } for (var l = 0; l < e.length; l++) { var c = e[l];
                        s.prototype[c] = a(c) } return s };

                function e() { this.listeners = {} }
                e.prototype.on = function(e, t) { this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t] }, e.prototype.trigger = function(e) { var t = Array.prototype.slice,
                        n = t.call(arguments, 1);
                    this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), (n[0]._type = e) in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments) }, e.prototype.invoke = function(e, t) { for (var n = 0, i = e.length; n < i; n++) e[n].apply(this, t) }, r.Observable = e, r.generateChars = function(e) { for (var t = "", n = 0; n < e; n++) { t += Math.floor(36 * Math.random()).toString(36) } return t }, r.bind = function(e, t) { return function() { e.apply(t, arguments) } }, r._convertData = function(e) { for (var t in e) { var n = t.split("-"),
                            i = e; if (1 !== n.length) { for (var r = 0; r < n.length; r++) { var s = n[r];
                                (s = s.substring(0, 1).toLowerCase() + s.substring(1)) in i || (i[s] = {}), r == n.length - 1 && (i[s] = e[t]), i = i[s] }
                            delete e[t] } } return e }, r.hasScroll = function(e, t) { var n = s(t),
                        i = t.style.overflowX,
                        r = t.style.overflowY; return (i !== r || "hidden" !== r && "visible" !== r) && ("scroll" === i || "scroll" === r || (n.innerHeight() < t.scrollHeight || n.innerWidth() < t.scrollWidth)) }, r.escapeMarkup = function(e) { var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) { return t[e] }) }, r.__cache = {}; var n = 0; return r.GetUniqueElementId = function(e) { var t = e.getAttribute("data-select2-id"); return null != t || (t = e.id ? "select2-data-" + e.id : "select2-data-" + (++n).toString() + "-" + r.generateChars(4), e.setAttribute("data-select2-id", t)), t }, r.StoreData = function(e, t, n) { var i = r.GetUniqueElementId(e);
                    r.__cache[i] || (r.__cache[i] = {}), r.__cache[i][t] = n }, r.GetData = function(e, t) { var n = r.GetUniqueElementId(e); return t ? r.__cache[n] && null != r.__cache[n][t] ? r.__cache[n][t] : s(e).data(t) : r.__cache[n] }, r.RemoveData = function(e) { var t = r.GetUniqueElementId(e);
                    null != r.__cache[t] && delete r.__cache[t], e.removeAttribute("data-select2-id") }, r.copyNonInternalCssClasses = function(e, t) { var n = e.getAttribute("class").trim().split(/\s+/);
                    n = n.filter(function(e) { return 0 === e.indexOf("select2-") }); var i = t.getAttribute("class").trim().split(/\s+/);
                    i = i.filter(function(e) { return 0 !== e.indexOf("select2-") }); var r = n.concat(i);
                    e.setAttribute("class", r.join(" ")) }, r }), e.define("select2/results", ["jquery", "./utils"], function(h, f) {
                function i(e, t, n) { this.$element = e, this.data = n, this.options = t, i.__super__.constructor.call(this) } return f.Extend(i, f.Observable), i.prototype.render = function() { var e = h('<ul class="select2-results__options" role="listbox"></ul>'); return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e }, i.prototype.clear = function() { this.$results.empty() }, i.prototype.displayMessage = function(e) { var t = this.options.get("escapeMarkup");
                    this.clear(), this.hideLoading(); var n = h('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),
                        i = this.options.get("translations").get(e.message);
                    n.append(t(i(e.args))), n[0].className += " select2-results__message", this.$results.append(n) }, i.prototype.hideMessages = function() { this.$results.find(".select2-results__message").remove() }, i.prototype.append = function(e) { this.hideLoading(); var t = []; if (null != e.results && 0 !== e.results.length) { e.results = this.sort(e.results); for (var n = 0; n < e.results.length; n++) { var i = e.results[n],
                                r = this.option(i);
                            t.push(r) }
                        this.$results.append(t) } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }) }, i.prototype.position = function(e, t) { t.find(".select2-results").append(e) }, i.prototype.sort = function(e) { return this.options.get("sorter")(e) }, i.prototype.highlightFirstItem = function() { var e = this.$results.find(".select2-results__option--selectable"),
                        t = e.filter(".select2-results__option--selected");
                    0 < t.length ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible() }, i.prototype.setClasses = function() { var t = this;
                    this.data.current(function(e) { var i = e.map(function(e) { return e.id.toString() });
                        t.$results.find(".select2-results__option--selectable").each(function() { var e = h(this),
                                t = f.GetData(this, "data"),
                                n = "" + t.id;
                            null != t.element && t.element.selected || null == t.element && -1 < i.indexOf(n) ? (this.classList.add("select2-results__option--selected"), e.attr("aria-selected", "true")) : (this.classList.remove("select2-results__option--selected"), e.attr("aria-selected", "false")) }) }) }, i.prototype.showLoading = function(e) { this.hideLoading(); var t = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(e) },
                        n = this.option(t);
                    n.className += " loading-results", this.$results.prepend(n) }, i.prototype.hideLoading = function() { this.$results.find(".loading-results").remove() }, i.prototype.option = function(e) { var t = document.createElement("li");
                    t.classList.add("select2-results__option"), t.classList.add("select2-results__option--selectable"); var n = { role: "option" },
                        i = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector; for (var r in (null != e.element && i.call(e.element, ":disabled") || null == e.element && e.disabled) && (n["aria-disabled"] = "true", t.classList.remove("select2-results__option--selectable"), t.classList.add("select2-results__option--disabled")), null == e.id && t.classList.remove("select2-results__option--selectable"), null != e._resultId && (t.id = e._resultId), e.title && (t.title = e.title), e.children && (n.role = "group", n["aria-label"] = e.text, t.classList.remove("select2-results__option--selectable"), t.classList.add("select2-results__option--group")), n) { var s = n[r];
                        t.setAttribute(r, s) } if (e.children) { var o = h(t),
                            a = document.createElement("strong");
                        a.className = "select2-results__group", this.template(e, a); for (var l = [], c = 0; c < e.children.length; c++) { var u = e.children[c],
                                d = this.option(u);
                            l.push(d) } var p = h("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                        p.append(l), o.append(a), o.append(p) } else this.template(e, t); return f.StoreData(t, "data", e), t }, i.prototype.bind = function(t, e) { var l = this,
                        n = t.id + "-results";
                    this.$results.attr("id", n), t.on("results:all", function(e) { l.clear(), l.append(e.data), t.isOpen() && (l.setClasses(), l.highlightFirstItem()) }), t.on("results:append", function(e) { l.append(e.data), t.isOpen() && l.setClasses() }), t.on("query", function(e) { l.hideMessages(), l.showLoading(e) }), t.on("select", function() { t.isOpen() && (l.setClasses(), l.options.get("scrollAfterSelect") && l.highlightFirstItem()) }), t.on("unselect", function() { t.isOpen() && (l.setClasses(), l.options.get("scrollAfterSelect") && l.highlightFirstItem()) }), t.on("open", function() { l.$results.attr("aria-expanded", "true"), l.$results.attr("aria-hidden", "false"), l.setClasses(), l.ensureHighlightVisible() }), t.on("close", function() { l.$results.attr("aria-expanded", "false"), l.$results.attr("aria-hidden", "true"), l.$results.removeAttr("aria-activedescendant") }), t.on("results:toggle", function() { var e = l.getHighlightedResults();
                        0 !== e.length && e.trigger("mouseup") }), t.on("results:select", function() { var e = l.getHighlightedResults(); if (0 !== e.length) { var t = f.GetData(e[0], "data");
                            e.hasClass("select2-results__option--selected") ? l.trigger("close", {}) : l.trigger("select", { data: t }) } }), t.on("results:previous", function() { var e = l.getHighlightedResults(),
                            t = l.$results.find(".select2-results__option--selectable"),
                            n = t.index(e); if (!(n <= 0)) { var i = n - 1;
                            0 === e.length && (i = 0); var r = t.eq(i);
                            r.trigger("mouseenter"); var s = l.$results.offset().top,
                                o = r.offset().top,
                                a = l.$results.scrollTop() + (o - s);
                            0 === i ? l.$results.scrollTop(0) : o - s < 0 && l.$results.scrollTop(a) } }), t.on("results:next", function() { var e = l.getHighlightedResults(),
                            t = l.$results.find(".select2-results__option--selectable"),
                            n = t.index(e) + 1; if (!(n >= t.length)) { var i = t.eq(n);
                            i.trigger("mouseenter"); var r = l.$results.offset().top + l.$results.outerHeight(!1),
                                s = i.offset().top + i.outerHeight(!1),
                                o = l.$results.scrollTop() + s - r;
                            0 === n ? l.$results.scrollTop(0) : r < s && l.$results.scrollTop(o) } }), t.on("results:focus", function(e) { e.element[0].classList.add("select2-results__option--highlighted"), e.element[0].setAttribute("aria-selected", "true") }), t.on("results:message", function(e) { l.displayMessage(e) }), h.fn.mousewheel && this.$results.on("mousewheel", function(e) { var t = l.$results.scrollTop(),
                            n = l.$results.get(0).scrollHeight - t + e.deltaY,
                            i = 0 < e.deltaY && t - e.deltaY <= 0,
                            r = e.deltaY < 0 && n <= l.$results.height();
                        i ? (l.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : r && (l.$results.scrollTop(l.$results.get(0).scrollHeight - l.$results.height()), e.preventDefault(), e.stopPropagation()) }), this.$results.on("mouseup", ".select2-results__option--selectable", function(e) { var t = h(this),
                            n = f.GetData(this, "data");
                        t.hasClass("select2-results__option--selected") ? l.options.get("multiple") ? l.trigger("unselect", { originalEvent: e, data: n }) : l.trigger("close", {}) : l.trigger("select", { originalEvent: e, data: n }) }), this.$results.on("mouseenter", ".select2-results__option--selectable", function(e) { var t = f.GetData(this, "data");
                        l.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"), l.trigger("results:focus", { data: t, element: h(this) }) }) }, i.prototype.getHighlightedResults = function() { return this.$results.find(".select2-results__option--highlighted") }, i.prototype.destroy = function() { this.$results.remove() }, i.prototype.ensureHighlightVisible = function() { var e = this.getHighlightedResults(); if (0 !== e.length) { var t = this.$results.find(".select2-results__option--selectable").index(e),
                            n = this.$results.offset().top,
                            i = e.offset().top,
                            r = this.$results.scrollTop() + (i - n),
                            s = i - n;
                        r -= 2 * e.outerHeight(!1), t <= 2 ? this.$results.scrollTop(0) : (s > this.$results.outerHeight() || s < 0) && this.$results.scrollTop(r) } }, i.prototype.template = function(e, t) { var n = this.options.get("templateResult"),
                        i = this.options.get("escapeMarkup"),
                        r = n(e, t);
                    null == r ? t.style.display = "none" : "string" == typeof r ? t.innerHTML = i(r) : h(t).append(r) }, i }), e.define("select2/keys", [], function() { return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 } }), e.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(n, i, r) {
                function s(e, t) { this.$element = e, this.options = t, s.__super__.constructor.call(this) } return i.Extend(s, i.Observable), s.prototype.render = function() { var e = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != i.GetData(this.$element[0], "old-tabindex") ? this._tabindex = i.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), e.attr("aria-disabled", "false"), this.$selection = e }, s.prototype.bind = function(e, t) { var n = this,
                        i = e.id + "-results";
                    this.container = e, this.$selection.on("focus", function(e) { n.trigger("focus", e) }), this.$selection.on("blur", function(e) { n._handleBlur(e) }), this.$selection.on("keydown", function(e) { n.trigger("keypress", e), e.which === r.SPACE && e.preventDefault() }), e.on("results:focus", function(e) { n.$selection.attr("aria-activedescendant", e.data._resultId) }), e.on("selection:update", function(e) { n.update(e.data) }), e.on("open", function() { n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", i), n._attachCloseHandler(e) }), e.on("close", function() { n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.trigger("focus"), n._detachCloseHandler(e) }), e.on("enable", function() { n.$selection.attr("tabindex", n._tabindex), n.$selection.attr("aria-disabled", "false") }), e.on("disable", function() { n.$selection.attr("tabindex", "-1"), n.$selection.attr("aria-disabled", "true") }) }, s.prototype._handleBlur = function(e) { var t = this;
                    window.setTimeout(function() { document.activeElement == t.$selection[0] || n.contains(t.$selection[0], document.activeElement) || t.trigger("blur", e) }, 1) }, s.prototype._attachCloseHandler = function(e) { n(document.body).on("mousedown.select2." + e.id, function(e) { var t = n(e.target).closest(".select2");
                        n(".select2.select2-container--open").each(function() { this != t[0] && i.GetData(this, "element").select2("close") }) }) }, s.prototype._detachCloseHandler = function(e) { n(document.body).off("mousedown.select2." + e.id) }, s.prototype.position = function(e, t) { t.find(".selection").append(e) }, s.prototype.destroy = function() { this._detachCloseHandler(this.container) }, s.prototype.update = function(e) { throw new Error("The `update` method must be defined in child classes.") }, s.prototype.isEnabled = function() { return !this.isDisabled() }, s.prototype.isDisabled = function() { return this.options.get("disabled") }, s }), e.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, n, i) {
                function r() { r.__super__.constructor.apply(this, arguments) } return n.Extend(r, t), r.prototype.render = function() { var e = r.__super__.render.call(this); return e[0].classList.add("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e }, r.prototype.bind = function(t, e) { var n = this;
                    r.__super__.bind.apply(this, arguments); var i = t.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", i).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", i), this.$selection.on("mousedown", function(e) { 1 === e.which && n.trigger("toggle", { originalEvent: e }) }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), t.on("focus", function(e) { t.isOpen() || n.$selection.trigger("focus") }) }, r.prototype.clear = function() { var e = this.$selection.find(".select2-selection__rendered");
                    e.empty(), e.removeAttr("title") }, r.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, r.prototype.selectionContainer = function() { return e("<span></span>") }, r.prototype.update = function(e) { if (0 !== e.length) { var t = e[0],
                            n = this.$selection.find(".select2-selection__rendered"),
                            i = this.display(t, n);
                        n.empty().append(i); var r = t.title || t.text;
                        r ? n.attr("title", r) : n.removeAttr("title") } else this.clear() }, r }), e.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(r, e, d) {
                function s(e, t) { s.__super__.constructor.apply(this, arguments) } return d.Extend(s, e), s.prototype.render = function() { var e = s.__super__.render.call(this); return e[0].classList.add("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e }, s.prototype.bind = function(e, t) { var i = this;
                    s.__super__.bind.apply(this, arguments); var n = e.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", n), this.$selection.on("click", function(e) { i.trigger("toggle", { originalEvent: e }) }), this.$selection.on("click", ".select2-selection__choice__remove", function(e) { if (!i.isDisabled()) { var t = r(this).parent(),
                                n = d.GetData(t[0], "data");
                            i.trigger("unselect", { originalEvent: e, data: n }) } }), this.$selection.on("keydown", ".select2-selection__choice__remove", function(e) { i.isDisabled() || e.stopPropagation() }) }, s.prototype.clear = function() { var e = this.$selection.find(".select2-selection__rendered");
                    e.empty(), e.removeAttr("title") }, s.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, s.prototype.selectionContainer = function() { return r('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>') }, s.prototype.update = function(e) { if (this.clear(), 0 !== e.length) { for (var t = [], n = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", i = 0; i < e.length; i++) { var r = e[i],
                                s = this.selectionContainer(),
                                o = this.display(r, s),
                                a = n + d.generateChars(4) + "-";
                            r.id ? a += r.id : a += d.generateChars(4), s.find(".select2-selection__choice__display").append(o).attr("id", a); var l = r.title || r.text;
                            l && s.attr("title", l); var c = this.options.get("translations").get("removeItem"),
                                u = s.find(".select2-selection__choice__remove");
                            u.attr("title", c()), u.attr("aria-label", c()), u.attr("aria-describedby", a), d.StoreData(s[0], "data", r), t.push(s) }
                        this.$selection.find(".select2-selection__rendered").append(t) } }, s }), e.define("select2/selection/placeholder", [], function() {
                function e(e, t, n) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n) } return e.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, e.prototype.createPlaceholder = function(e, t) { var n = this.selectionContainer(); return n.html(this.display(t)), n[0].classList.add("select2-selection__placeholder"), n[0].classList.remove("select2-selection__choice"), n }, e.prototype.update = function(e, t) { var n = 1 == t.length && t[0].id != this.placeholder.id; if (1 < t.length || n) return e.call(this, t);
                    this.clear(); var i = this.createPlaceholder(this.placeholder);
                    this.$selection.find(".select2-selection__rendered").append(i) }, e }), e.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(s, i, a) {
                function e() {} return e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(e) { i._handleClear(e) }), t.on("keypress", function(e) { i._handleKeyboardClear(e, t) }) }, e.prototype._handleClear = function(e, t) { if (!this.isDisabled()) { var n = this.$selection.find(".select2-selection__clear"); if (0 !== n.length) { t.stopPropagation(); var i = a.GetData(n[0], "data"),
                                r = this.$element.val();
                            this.$element.val(this.placeholder.id); var s = { data: i }; if (this.trigger("clear", s), s.prevented) this.$element.val(r);
                            else { for (var o = 0; o < i.length; o++)
                                    if (s = { data: i[o] }, this.trigger("unselect", s), s.prevented) return void this.$element.val(r);
                                this.$element.trigger("input").trigger("change"), this.trigger("toggle", {}) } } } }, e.prototype._handleKeyboardClear = function(e, t, n) { n.isOpen() || t.which != i.DELETE && t.which != i.BACKSPACE || this._handleClear(t) }, e.prototype.update = function(e, t) { if (e.call(this, t), this.$selection.find(".select2-selection__clear").remove(), !(0 < this.$selection.find(".select2-selection__placeholder").length || 0 === t.length)) { var n = this.$selection.find(".select2-selection__rendered").attr("id"),
                            i = this.options.get("translations").get("removeAllItems"),
                            r = s('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>');
                        r.attr("title", i()), r.attr("aria-label", i()), r.attr("aria-describedby", n), a.StoreData(r[0], "data", t), this.$selection.prepend(r) } }, e }), e.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(i, l, c) {
                function e(e, t, n) { e.call(this, t, n) } return e.prototype.render = function(e) { var t = i('<span class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
                    this.$searchContainer = t, this.$search = t.find("input"), this.$search.prop("autocomplete", this.options.get("autocomplete")); var n = e.call(this); return this._transferTabIndex(), n.append(this.$searchContainer), n }, e.prototype.bind = function(e, t, n) { var i = this,
                        r = t.id + "-results",
                        s = t.id + "-container";
                    e.call(this, t, n), i.$search.attr("aria-describedby", s), t.on("open", function() { i.$search.attr("aria-controls", r), i.$search.trigger("focus") }), t.on("close", function() { i.$search.val(""), i.resizeSearch(), i.$search.removeAttr("aria-controls"), i.$search.removeAttr("aria-activedescendant"), i.$search.trigger("focus") }), t.on("enable", function() { i.$search.prop("disabled", !1), i._transferTabIndex() }), t.on("disable", function() { i.$search.prop("disabled", !0) }), t.on("focus", function(e) { i.$search.trigger("focus") }), t.on("results:focus", function(e) { e.data._resultId ? i.$search.attr("aria-activedescendant", e.data._resultId) : i.$search.removeAttr("aria-activedescendant") }), this.$selection.on("focusin", ".select2-search--inline", function(e) { i.trigger("focus", e) }), this.$selection.on("focusout", ".select2-search--inline", function(e) { i._handleBlur(e) }), this.$selection.on("keydown", ".select2-search--inline", function(e) { if (e.stopPropagation(), i.trigger("keypress", e), i._keyUpPrevented = e.isDefaultPrevented(), e.which === c.BACKSPACE && "" === i.$search.val()) { var t = i.$selection.find(".select2-selection__choice").last(); if (0 < t.length) { var n = l.GetData(t[0], "data");
                                i.searchRemoveChoice(n), e.preventDefault() } } }), this.$selection.on("click", ".select2-search--inline", function(e) { i.$search.val() && e.stopPropagation() }); var o = document.documentMode,
                        a = o && o <= 11;
                    this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) { a ? i.$selection.off("input.search input.searchcheck") : i.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) { if (a && "input" === e.type) i.$selection.off("input.search input.searchcheck");
                        else { var t = e.which;
                            t != c.SHIFT && t != c.CTRL && t != c.ALT && t != c.TAB && i.handleSearch(e) } }) }, e.prototype._transferTabIndex = function(e) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, e.prototype.createPlaceholder = function(e, t) { this.$search.attr("placeholder", t.text) }, e.prototype.update = function(e, t) { var n = this.$search[0] == document.activeElement;
                    this.$search.attr("placeholder", ""), e.call(this, t), this.resizeSearch(), n && this.$search.trigger("focus") }, e.prototype.handleSearch = function() { if (this.resizeSearch(), !this._keyUpPrevented) { var e = this.$search.val();
                        this.trigger("query", { term: e }) }
                    this._keyUpPrevented = !1 }, e.prototype.searchRemoveChoice = function(e, t) { this.trigger("unselect", { data: t }), this.$search.val(t.text), this.handleSearch() }, e.prototype.resizeSearch = function() { this.$search.css("width", "25px"); var e = "100%"; "" === this.$search.attr("placeholder") && (e = .75 * (this.$search.val().length + 1) + "em");
                    this.$search.css("width", e) }, e }), e.define("select2/selection/selectionCss", ["../utils"], function(i) {
                function e() {} return e.prototype.render = function(e) { var t = e.call(this),
                        n = this.options.get("selectionCssClass") || ""; return -1 !== n.indexOf(":all:") && (n = n.replace(":all:", ""), i.copyNonInternalCssClasses(t[0], this.$element[0])), t.addClass(n), t }, e }), e.define("select2/selection/eventRelay", ["jquery"], function(o) {
                function e() {} return e.prototype.bind = function(e, t, n) { var i = this,
                        r = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
                        s = ["opening", "closing", "selecting", "unselecting", "clearing"];
                    e.call(this, t, n), t.on("*", function(e, t) { if (-1 !== r.indexOf(e)) { t = t || {}; var n = o.Event("select2:" + e, { params: t });
                            i.$element.trigger(n), -1 !== s.indexOf(e) && (t.prevented = n.isDefaultPrevented()) } }) }, e }), e.define("select2/translation", ["jquery", "require"], function(t, n) {
                function i(e) { this.dict = e || {} } return i.prototype.all = function() { return this.dict }, i.prototype.get = function(e) { return this.dict[e] }, i.prototype.extend = function(e) { this.dict = t.extend({}, e.all(), this.dict) }, i._cache = {}, i.loadPath = function(e) { if (!(e in i._cache)) { var t = n(e);
                        i._cache[e] = t } return new i(i._cache[e]) }, i }), e.define("select2/diacritics", [], function() { return { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Œ": "OE", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "œ": "oe", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ώ": "ω", "ς": "σ", "’": "'" } }), e.define("select2/data/base", ["../utils"], function(i) {
                function n(e, t) { n.__super__.constructor.call(this) } return i.Extend(n, i.Observable), n.prototype.current = function(e) { throw new Error("The `current` method must be defined in child classes.") }, n.prototype.query = function(e, t) { throw new Error("The `query` method must be defined in child classes.") }, n.prototype.bind = function(e, t) {}, n.prototype.destroy = function() {}, n.prototype.generateResultId = function(e, t) { var n = e.id + "-result-"; return n += i.generateChars(4), null != t.id ? n += "-" + t.id.toString() : n += "-" + i.generateChars(4), n }, n }), e.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, l, c) {
                function n(e, t) { this.$element = e, this.options = t, n.__super__.constructor.call(this) } return l.Extend(n, e), n.prototype.current = function(e) { var t = this;
                    e(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), function(e) { return t.item(c(e)) })) }, n.prototype.select = function(r) { var s = this; if (r.selected = !0, null != r.element && "option" === r.element.tagName.toLowerCase()) return r.element.selected = !0, void this.$element.trigger("input").trigger("change"); if (this.$element.prop("multiple")) this.current(function(e) { var t = [];
                        (r = [r]).push.apply(r, e); for (var n = 0; n < r.length; n++) { var i = r[n].id; - 1 === t.indexOf(i) && t.push(i) }
                        s.$element.val(t), s.$element.trigger("input").trigger("change") });
                    else { var e = r.id;
                        this.$element.val(e), this.$element.trigger("input").trigger("change") } }, n.prototype.unselect = function(r) { var s = this; if (this.$element.prop("multiple")) { if (r.selected = !1, null != r.element && "option" === r.element.tagName.toLowerCase()) return r.element.selected = !1, void this.$element.trigger("input").trigger("change");
                        this.current(function(e) { for (var t = [], n = 0; n < e.length; n++) { var i = e[n].id;
                                i !== r.id && -1 === t.indexOf(i) && t.push(i) }
                            s.$element.val(t), s.$element.trigger("input").trigger("change") }) } }, n.prototype.bind = function(e, t) { var n = this;
                    (this.container = e).on("select", function(e) { n.select(e.data) }), e.on("unselect", function(e) { n.unselect(e.data) }) }, n.prototype.destroy = function() { this.$element.find("*").each(function() { l.RemoveData(this) }) }, n.prototype.query = function(i, e) { var r = [],
                        s = this;
                    this.$element.children().each(function() { if ("option" === this.tagName.toLowerCase() || "optgroup" === this.tagName.toLowerCase()) { var e = c(this),
                                t = s.item(e),
                                n = s.matches(i, t);
                            null !== n && r.push(n) } }), e({ results: r }) }, n.prototype.addOptions = function(e) { this.$element.append(e) }, n.prototype.option = function(e) { var t;
                    e.children ? (t = document.createElement("optgroup")).label = e.text : void 0 !== (t = document.createElement("option")).textContent ? t.textContent = e.text : t.innerText = e.text, void 0 !== e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title); var n = this._normalizeItem(e); return n.element = t, l.StoreData(t, "data", n), c(t) }, n.prototype.item = function(e) { var t = {}; if (null != (t = l.GetData(e[0], "data"))) return t; var n = e[0]; if ("option" === n.tagName.toLowerCase()) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                    else if ("optgroup" === n.tagName.toLowerCase()) { t = { text: e.prop("label"), children: [], title: e.prop("title") }; for (var i = e.children("option"), r = [], s = 0; s < i.length; s++) { var o = c(i[s]),
                                a = this.item(o);
                            r.push(a) }
                        t.children = r } return (t = this._normalizeItem(t)).element = e[0], l.StoreData(e[0], "data", t), t }, n.prototype._normalizeItem = function(e) { e !== Object(e) && (e = { id: e, text: e }); return null != (e = c.extend({}, { text: "" }, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), c.extend({}, { selected: !1, disabled: !1 }, e) }, n.prototype.matches = function(e, t) { return this.options.get("matcher")(e, t) }, n }), e.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, f) {
                function i(e, t) { this._dataToConvert = t.get("data") || [], i.__super__.constructor.call(this, e, t) } return t.Extend(i, e), i.prototype.bind = function(e, t) { i.__super__.bind.call(this, e, t), this.addOptions(this.convertToOptions(this._dataToConvert)) }, i.prototype.select = function(n) { var e = this.$element.find("option").filter(function(e, t) { return t.value == n.id.toString() });
                    0 === e.length && (e = this.option(n), this.addOptions(e)), i.__super__.select.call(this, n) }, i.prototype.convertToOptions = function(e) { var t = this,
                        n = this.$element.find("option"),
                        i = n.map(function() { return t.item(f(this)).id }).get(),
                        r = [];

                    function s(e) { return function() { return f(this).val() == e.id } } for (var o = 0; o < e.length; o++) { var a = this._normalizeItem(e[o]); if (0 <= i.indexOf(a.id)) { var l = n.filter(s(a)),
                                c = this.item(l),
                                u = f.extend(!0, {}, a, c),
                                d = this.option(u);
                            l.replaceWith(d) } else { var p = this.option(a); if (a.children) { var h = this.convertToOptions(a.children);
                                p.append(h) }
                            r.push(p) } } return r }, i }), e.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, s) {
                function n(e, t) { this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), n.__super__.constructor.call(this, e, t) } return t.Extend(n, e), n.prototype._applyDefaults = function(e) { var t = { data: function(e) { return s.extend({}, e, { q: e.term }) }, transport: function(e, t, n) { var i = s.ajax(e); return i.then(t), i.fail(n), i } }; return s.extend({}, t, e, !0) }, n.prototype.processResults = function(e) { return e }, n.prototype.query = function(n, i) { var r = this;
                    null != this._request && (s.isFunction(this._request.abort) && this._request.abort(), this._request = null); var t = s.extend({ type: "GET" }, this.ajaxOptions);

                    function e() { var e = t.transport(t, function(e) { var t = r.processResults(e, n);
                            r.options.get("debug") && window.console && console.error && (t && t.results && Array.isArray(t.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), i(t) }, function() { "status" in e && (0 === e.status || "0" === e.status) || r.trigger("results:message", { message: "errorLoading" }) });
                        r._request = e } "function" == typeof t.url && (t.url = t.url.call(this.$element, n)), "function" == typeof t.data && (t.data = t.data.call(this.$element, n)), this.ajaxOptions.delay && null != n.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(e, this.ajaxOptions.delay)) : e() }, n }), e.define("select2/data/tags", ["jquery"], function(t) {
                function e(e, t, n) { var i = n.get("tags"),
                        r = n.get("createTag");
                    void 0 !== r && (this.createTag = r); var s = n.get("insertTag"); if (void 0 !== s && (this.insertTag = s), e.call(this, t, n), Array.isArray(i))
                        for (var o = 0; o < i.length; o++) { var a = i[o],
                                l = this._normalizeItem(a),
                                c = this.option(l);
                            this.$element.append(c) } } return e.prototype.query = function(e, c, u) { var d = this;
                    this._removeOldTags(), null != c.term && null == c.page ? e.call(this, c, function e(t, n) { for (var i = t.results, r = 0; r < i.length; r++) { var s = i[r],
                                o = null != s.children && !e({ results: s.children }, !0); if ((s.text || "").toUpperCase() === (c.term || "").toUpperCase() || o) return !n && (t.data = i, void u(t)) } if (n) return !0; var a = d.createTag(c); if (null != a) { var l = d.option(a);
                            l.attr("data-select2-tag", !0), d.addOptions([l]), d.insertTag(i, a) }
                        t.results = i, u(t) }) : e.call(this, c, u) }, e.prototype.createTag = function(e, t) { if (null == t.term) return null; var n = t.term.trim(); return "" === n ? null : { id: n, text: n } }, e.prototype.insertTag = function(e, t, n) { t.unshift(n) }, e.prototype._removeOldTags = function(e) { this.$element.find("option[data-select2-tag]").each(function() { this.selected || t(this).remove() }) }, e }), e.define("select2/data/tokenizer", ["jquery"], function(d) {
                function e(e, t, n) { var i = n.get("tokenizer");
                    void 0 !== i && (this.tokenizer = i), e.call(this, t, n) } return e.prototype.bind = function(e, t, n) { e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field") }, e.prototype.query = function(e, t, n) { var i = this;
                    t.term = t.term || ""; var r = this.tokenizer(t, this.options, function(e) { var t = i._normalizeItem(e); if (!i.$element.find("option").filter(function() { return d(this).val() === t.id }).length) { var n = i.option(t);
                            n.attr("data-select2-tag", !0), i._removeOldTags(), i.addOptions([n]) }! function(e) { i.trigger("select", { data: e }) }(t) });
                    r.term !== t.term && (this.$search.length && (this.$search.val(r.term), this.$search.trigger("focus")), t.term = r.term), e.call(this, t, n) }, e.prototype.tokenizer = function(e, t, n, i) { for (var r = n.get("tokenSeparators") || [], s = t.term, o = 0, a = this.createTag || function(e) { return { id: e.term, text: e.term } }; o < s.length;) { var l = s[o]; if (-1 !== r.indexOf(l)) { var c = s.substr(0, o),
                                u = a(d.extend({}, t, { term: c }));
                            null != u ? (i(u), s = s.substr(o + 1) || "", o = 0) : o++ } else o++ } return { term: s } }, e }), e.define("select2/data/minimumInputLength", [], function() {
                function e(e, t, n) { this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n) } return e.prototype.query = function(e, t, n) { t.term = t.term || "", t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e }), e.define("select2/data/maximumInputLength", [], function() {
                function e(e, t, n) { this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n) } return e.prototype.query = function(e, t, n) { t.term = t.term || "", 0 < this.maximumInputLength && t.term.length > this.maximumInputLength ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e }), e.define("select2/data/maximumSelectionLength", [], function() {
                function e(e, t, n) { this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n) } return e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), t.on("select", function() { i._checkIfMaximumSelected() }) }, e.prototype.query = function(e, t, n) { var i = this;
                    this._checkIfMaximumSelected(function() { e.call(i, t, n) }) }, e.prototype._checkIfMaximumSelected = function(e, n) { var i = this;
                    this.current(function(e) { var t = null != e ? e.length : 0;
                        0 < i.maximumSelectionLength && t >= i.maximumSelectionLength ? i.trigger("results:message", { message: "maximumSelected", args: { maximum: i.maximumSelectionLength } }) : n && n() }) }, e }), e.define("select2/dropdown", ["jquery", "./utils"], function(t, e) {
                function n(e, t) { this.$element = e, this.options = t, n.__super__.constructor.call(this) } return e.Extend(n, e.Observable), n.prototype.render = function() { var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return e.attr("dir", this.options.get("dir")), this.$dropdown = e }, n.prototype.bind = function() {}, n.prototype.position = function(e, t) {}, n.prototype.destroy = function() { this.$dropdown.remove() }, n }), e.define("select2/dropdown/search", ["jquery"], function(s) {
                function e() {} return e.prototype.render = function(e) { var t = e.call(this),
                        n = s('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'); return this.$searchContainer = n, this.$search = n.find("input"), this.$search.prop("autocomplete", this.options.get("autocomplete")), t.prepend(n), t }, e.prototype.bind = function(e, t, n) { var i = this,
                        r = t.id + "-results";
                    e.call(this, t, n), this.$search.on("keydown", function(e) { i.trigger("keypress", e), i._keyUpPrevented = e.isDefaultPrevented() }), this.$search.on("input", function(e) { s(this).off("keyup") }), this.$search.on("keyup input", function(e) { i.handleSearch(e) }), t.on("open", function() { i.$search.attr("tabindex", 0), i.$search.attr("aria-controls", r), i.$search.trigger("focus"), window.setTimeout(function() { i.$search.trigger("focus") }, 0) }), t.on("close", function() { i.$search.attr("tabindex", -1), i.$search.removeAttr("aria-controls"), i.$search.removeAttr("aria-activedescendant"), i.$search.val(""), i.$search.trigger("blur") }), t.on("focus", function() { t.isOpen() || i.$search.trigger("focus") }), t.on("results:all", function(e) { null != e.query.term && "" !== e.query.term || (i.showSearch(e) ? i.$searchContainer[0].classList.remove("select2-search--hide") : i.$searchContainer[0].classList.add("select2-search--hide")) }), t.on("results:focus", function(e) { e.data._resultId ? i.$search.attr("aria-activedescendant", e.data._resultId) : i.$search.removeAttr("aria-activedescendant") }) }, e.prototype.handleSearch = function(e) { if (!this._keyUpPrevented) { var t = this.$search.val();
                        this.trigger("query", { term: t }) }
                    this._keyUpPrevented = !1 }, e.prototype.showSearch = function(e, t) { return !0 }, e }), e.define("select2/dropdown/hidePlaceholder", [], function() {
                function e(e, t, n, i) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, i) } return e.prototype.append = function(e, t) { t.results = this.removePlaceholder(t.results), e.call(this, t) }, e.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, e.prototype.removePlaceholder = function(e, t) { for (var n = t.slice(0), i = t.length - 1; 0 <= i; i--) { var r = t[i];
                        this.placeholder.id === r.id && n.splice(i, 1) } return n }, e }), e.define("select2/dropdown/infiniteScroll", ["jquery"], function(n) {
                function e(e, t, n, i) { this.lastParams = {}, e.call(this, t, n, i), this.$loadingMore = this.createLoadingMore(), this.loading = !1 } return e.prototype.append = function(e, t) { this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded()) }, e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), t.on("query", function(e) { i.lastParams = e, i.loading = !0 }), t.on("query:append", function(e) { i.lastParams = e, i.loading = !0 }), this.$results.on("scroll", this.loadMoreIfNeeded.bind(this)) }, e.prototype.loadMoreIfNeeded = function() { var e = n.contains(document.documentElement, this.$loadingMore[0]); if (!this.loading && e) { var t = this.$results.offset().top + this.$results.outerHeight(!1);
                        this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1) <= t + 50 && this.loadMore() } }, e.prototype.loadMore = function() { this.loading = !0; var e = n.extend({}, { page: 1 }, this.lastParams);
                    e.page++, this.trigger("query:append", e) }, e.prototype.showLoadingMore = function(e, t) { return t.pagination && t.pagination.more }, e.prototype.createLoadingMore = function() { var e = n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),
                        t = this.options.get("translations").get("loadingMore"); return e.html(t(this.lastParams)), e }, e }), e.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(f, a) {
                function e(e, t, n) { this.$dropdownParent = f(n.get("dropdownParent") || document.body), e.call(this, t, n) } return e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), t.on("open", function() { i._showDropdown(), i._attachPositioningHandler(t), i._bindContainerResultHandlers(t) }), t.on("close", function() { i._hideDropdown(), i._detachPositioningHandler(t) }), this.$dropdownContainer.on("mousedown", function(e) { e.stopPropagation() }) }, e.prototype.destroy = function(e) { e.call(this), this.$dropdownContainer.remove() }, e.prototype.position = function(e, t, n) { t.attr("class", n.attr("class")), t[0].classList.remove("select2"), t[0].classList.add("select2-container--open"), t.css({ position: "absolute", top: -999999 }), this.$container = n }, e.prototype.render = function(e) { var t = f("<span></span>"),
                        n = e.call(this); return t.append(n), this.$dropdownContainer = t }, e.prototype._hideDropdown = function(e) { this.$dropdownContainer.detach() }, e.prototype._bindContainerResultHandlers = function(e, t) { if (!this._containerResultsHandlersBound) { var n = this;
                        t.on("results:all", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("results:append", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("results:message", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("select", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("unselect", function() { n._positionDropdown(), n._resizeDropdown() }), this._containerResultsHandlersBound = !0 } }, e.prototype._attachPositioningHandler = function(e, t) { var n = this,
                        i = "scroll.select2." + t.id,
                        r = "resize.select2." + t.id,
                        s = "orientationchange.select2." + t.id,
                        o = this.$container.parents().filter(a.hasScroll);
                    o.each(function() { a.StoreData(this, "select2-scroll-position", { x: f(this).scrollLeft(), y: f(this).scrollTop() }) }), o.on(i, function(e) { var t = a.GetData(this, "select2-scroll-position");
                        f(this).scrollTop(t.y) }), f(window).on(i + " " + r + " " + s, function(e) { n._positionDropdown(), n._resizeDropdown() }) }, e.prototype._detachPositioningHandler = function(e, t) { var n = "scroll.select2." + t.id,
                        i = "resize.select2." + t.id,
                        r = "orientationchange.select2." + t.id;
                    this.$container.parents().filter(a.hasScroll).off(n), f(window).off(n + " " + i + " " + r) }, e.prototype._positionDropdown = function() { var e = f(window),
                        t = this.$dropdown[0].classList.contains("select2-dropdown--above"),
                        n = this.$dropdown[0].classList.contains("select2-dropdown--below"),
                        i = null,
                        r = this.$container.offset();
                    r.bottom = r.top + this.$container.outerHeight(!1); var s = { height: this.$container.outerHeight(!1) };
                    s.top = r.top, s.bottom = r.top + s.height; var o = this.$dropdown.outerHeight(!1),
                        a = e.scrollTop(),
                        l = e.scrollTop() + e.height(),
                        c = a < r.top - o,
                        u = l > r.bottom + o,
                        d = { left: r.left, top: s.bottom },
                        p = this.$dropdownParent; "static" === p.css("position") && (p = p.offsetParent()); var h = { top: 0, left: 0 };
                    (f.contains(document.body, p[0]) || p[0].isConnected) && (h = p.offset()), d.top -= h.top, d.left -= h.left, t || n || (i = "below"), u || !c || t ? !c && u && t && (i = "below") : i = "above", ("above" == i || t && "below" !== i) && (d.top = s.top - h.top - o), null != i && (this.$dropdown[0].classList.remove("select2-dropdown--below"), this.$dropdown[0].classList.remove("select2-dropdown--above"), this.$dropdown[0].classList.add("select2-dropdown--" + i), this.$container[0].classList.remove("select2-container--below"), this.$container[0].classList.remove("select2-container--above"), this.$container[0].classList.add("select2-container--" + i)), this.$dropdownContainer.css(d) }, e.prototype._resizeDropdown = function() { var e = { width: this.$container.outerWidth(!1) + "px" };
                    this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e) }, e.prototype._showDropdown = function(e) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, e }), e.define("select2/dropdown/minimumResultsForSearch", [], function() {
                function e(e, t, n, i) { this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, i) } return e.prototype.showSearch = function(e, t) { return !(function e(t) { for (var n = 0, i = 0; i < t.length; i++) { var r = t[i];
                            r.children ? n += e(r.children) : n++ } return n }(t.data.results) < this.minimumResultsForSearch) && e.call(this, t) }, e }), e.define("select2/dropdown/selectOnClose", ["../utils"], function(s) {
                function e() {} return e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), t.on("close", function(e) { i._handleSelectOnClose(e) }) }, e.prototype._handleSelectOnClose = function(e, t) { if (t && null != t.originalSelect2Event) { var n = t.originalSelect2Event; if ("select" === n._type || "unselect" === n._type) return } var i = this.getHighlightedResults(); if (!(i.length < 1)) { var r = s.GetData(i[0], "data");
                        null != r.element && r.element.selected || null == r.element && r.selected || this.trigger("select", { data: r }) } }, e }), e.define("select2/dropdown/closeOnSelect", [], function() {
                function e() {} return e.prototype.bind = function(e, t, n) { var i = this;
                    e.call(this, t, n), t.on("select", function(e) { i._selectTriggered(e) }), t.on("unselect", function(e) { i._selectTriggered(e) }) }, e.prototype._selectTriggered = function(e, t) { var n = t.originalEvent;
                    n && (n.ctrlKey || n.metaKey) || this.trigger("close", { originalEvent: n, originalSelect2Event: t }) }, e }), e.define("select2/dropdown/dropdownCss", ["../utils"], function(i) {
                function e() {} return e.prototype.render = function(e) { var t = e.call(this),
                        n = this.options.get("dropdownCssClass") || ""; return -1 !== n.indexOf(":all:") && (n = n.replace(":all:", ""), i.copyNonInternalCssClasses(t[0], this.$element[0])), t.addClass(n), t }, e }), e.define("select2/i18n/en", [], function() { return { errorLoading: function() { return "The results could not be loaded." }, inputTooLong: function(e) { var t = e.input.length - e.maximum,
                            n = "Please delete " + t + " character"; return 1 != t && (n += "s"), n }, inputTooShort: function(e) { return "Please enter " + (e.minimum - e.input.length) + " or more characters" }, loadingMore: function() { return "Loading more results…" }, maximumSelected: function(e) { var t = "You can only select " + e.maximum + " item"; return 1 != e.maximum && (t += "s"), t }, noResults: function() { return "No results found" }, searching: function() { return "Searching…" }, removeAllItems: function() { return "Remove all items" }, removeItem: function() { return "Remove item" } } }), e.define("select2/defaults", ["jquery", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/selectionCss", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./dropdown/dropdownCss", "./i18n/en"], function(l, s, o, a, c, u, d, p, h, f, g, t, m, v, y, _, b, $, w, x, A, D, S, E, O, C, L, T, q, e) {
                function n() { this.reset() } return n.prototype.apply = function(e) { if (null == (e = l.extend(!0, {}, this.defaults, e)).dataAdapter && (null != e.ajax ? e.dataAdapter = y : null != e.data ? e.dataAdapter = v : e.dataAdapter = m, 0 < e.minimumInputLength && (e.dataAdapter = f.Decorate(e.dataAdapter, $)), 0 < e.maximumInputLength && (e.dataAdapter = f.Decorate(e.dataAdapter, w)), 0 < e.maximumSelectionLength && (e.dataAdapter = f.Decorate(e.dataAdapter, x)), e.tags && (e.dataAdapter = f.Decorate(e.dataAdapter, _)), null == e.tokenSeparators && null == e.tokenizer || (e.dataAdapter = f.Decorate(e.dataAdapter, b))), null == e.resultsAdapter && (e.resultsAdapter = s, null != e.ajax && (e.resultsAdapter = f.Decorate(e.resultsAdapter, E)), null != e.placeholder && (e.resultsAdapter = f.Decorate(e.resultsAdapter, S)), e.selectOnClose && (e.resultsAdapter = f.Decorate(e.resultsAdapter, L))), null == e.dropdownAdapter) { if (e.multiple) e.dropdownAdapter = A;
                        else { var t = f.Decorate(A, D);
                            e.dropdownAdapter = t }
                        0 !== e.minimumResultsForSearch && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, C)), e.closeOnSelect && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, T)), null != e.dropdownCssClass && (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, q)), e.dropdownAdapter = f.Decorate(e.dropdownAdapter, O) }
                    null == e.selectionAdapter && (e.multiple ? e.selectionAdapter = a : e.selectionAdapter = o, null != e.placeholder && (e.selectionAdapter = f.Decorate(e.selectionAdapter, c)), e.allowClear && (e.selectionAdapter = f.Decorate(e.selectionAdapter, u)), e.multiple && (e.selectionAdapter = f.Decorate(e.selectionAdapter, d)), null != e.selectionCssClass && (e.selectionAdapter = f.Decorate(e.selectionAdapter, p)), e.selectionAdapter = f.Decorate(e.selectionAdapter, h)), e.language = this._resolveLanguage(e.language), e.language.push("en"); for (var n = [], i = 0; i < e.language.length; i++) { var r = e.language[i]; - 1 === n.indexOf(r) && n.push(r) } return e.language = n, e.translations = this._processTranslations(e.language, e.debug), e }, n.prototype.reset = function() {
                    function a(e) { return e.replace(/[^\u0000-\u007E]/g, function(e) { return t[e] || e }) }
                    this.defaults = { amdLanguageBase: "./i18n/", autocomplete: "off", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: f.escapeMarkup, language: {}, matcher: function e(t, n) { if (null == t.term || "" === t.term.trim()) return n; if (n.children && 0 < n.children.length) { for (var i = l.extend(!0, {}, n), r = n.children.length - 1; 0 <= r; r--) null == e(t, n.children[r]) && i.children.splice(r, 1); return 0 < i.children.length ? i : e(t, i) } var s = a(n.text).toUpperCase(),
                                o = a(t.term).toUpperCase(); return -1 < s.indexOf(o) ? n : null }, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, scrollAfterSelect: !1, sorter: function(e) { return e }, templateResult: function(e) { return e.text }, templateSelection: function(e) { return e.text }, theme: "default", width: "resolve" } }, n.prototype.applyFromElement = function(e, t) { var n = e.language,
                        i = this.defaults.language,
                        r = t.prop("lang"),
                        s = t.closest("[lang]").prop("lang"),
                        o = Array.prototype.concat.call(this._resolveLanguage(r), this._resolveLanguage(n), this._resolveLanguage(i), this._resolveLanguage(s)); return e.language = o, e }, n.prototype._resolveLanguage = function(e) { if (!e) return []; if (l.isEmptyObject(e)) return []; if (l.isPlainObject(e)) return [e]; var t;
                    t = Array.isArray(e) ? e : [e]; for (var n = [], i = 0; i < t.length; i++)
                        if (n.push(t[i]), "string" == typeof t[i] && 0 < t[i].indexOf("-")) { var r = t[i].split("-")[0];
                            n.push(r) }
                    return n }, n.prototype._processTranslations = function(e, t) { for (var n = new g, i = 0; i < e.length; i++) { var r = new g,
                            s = e[i]; if ("string" == typeof s) try { r = g.loadPath(s) } catch (e) { try { s = this.defaults.amdLanguageBase + s, r = g.loadPath(s) } catch (e) { t && window.console && console.warn && console.warn('Select2: The language file for "' + s + '" could not be automatically loaded. A fallback will be used instead.') } } else r = l.isPlainObject(s) ? new g(s) : s;
                        n.extend(r) } return n }, n.prototype.set = function(e, t) { var n = {};
                    n[l.camelCase(e)] = t; var i = f._convertData(n);
                    l.extend(!0, this.defaults, i) }, new n }), e.define("select2/options", ["jquery", "./defaults", "./utils"], function(d, n, p) {
                function e(e, t) { this.options = e, null != t && this.fromElement(t), null != t && (this.options = n.applyFromElement(this.options, t)), this.options = n.apply(this.options) } return e.prototype.fromElement = function(e) { var t = ["select2"];
                    null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.autocomplete && e.prop("autocomplete") && (this.options.autocomplete = e.prop("autocomplete")), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), p.GetData(e[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), p.StoreData(e[0], "data", p.GetData(e[0], "select2Tags")), p.StoreData(e[0], "tags", !0)), p.GetData(e[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", p.GetData(e[0], "ajaxUrl")), p.StoreData(e[0], "ajax-Url", p.GetData(e[0], "ajaxUrl"))); var n = {};

                    function i(e, t) { return t.toUpperCase() } for (var r = 0; r < e[0].attributes.length; r++) { var s = e[0].attributes[r].name,
                            o = "data-"; if (s.substr(0, o.length) == o) { var a = s.substring(o.length),
                                l = p.GetData(e[0], a);
                            n[a.replace(/-([a-z])/g, i)] = l } }
                    d.fn.jquery && "1." == d.fn.jquery.substr(0, 2) && e[0].dataset && (n = d.extend(!0, {}, e[0].dataset, n)); var c = d.extend(!0, {}, p.GetData(e[0]), n); for (var u in c = p._convertData(c)) - 1 < t.indexOf(u) || (d.isPlainObject(this.options[u]) ? d.extend(this.options[u], c[u]) : this.options[u] = c[u]); return this }, e.prototype.get = function(e) { return this.options[e] }, e.prototype.set = function(e, t) { this.options[e] = t }, e }), e.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(t, c, u, i) { var d = function(e, t) { null != u.GetData(e[0], "select2") && u.GetData(e[0], "select2").destroy(), this.$element = e, this.id = this._generateId(e), t = t || {}, this.options = new c(t, e), d.__super__.constructor.call(this); var n = e.attr("tabindex") || 0;
                    u.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1"); var i = this.options.get("dataAdapter");
                    this.dataAdapter = new i(e, this.options); var r = this.render();
                    this._placeContainer(r); var s = this.options.get("selectionAdapter");
                    this.selection = new s(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, r); var o = this.options.get("dropdownAdapter");
                    this.dropdown = new o(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, r); var a = this.options.get("resultsAdapter");
                    this.results = new a(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown); var l = this;
                    this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) { l.trigger("selection:update", { data: e }) }), e[0].classList.add("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), u.StoreData(e[0], "select2", this), e.data("select2", this) }; return u.Extend(d, u.Observable), d.prototype._generateId = function(e) { return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + u.generateChars(2) : u.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "") }, d.prototype._placeContainer = function(e) { e.insertAfter(this.$element); var t = this._resolveWidth(this.$element, this.options.get("width"));
                    null != t && e.css("width", t) }, d.prototype._resolveWidth = function(e, t) { var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i; if ("resolve" == t) { var i = this._resolveWidth(e, "style"); return null != i ? i : this._resolveWidth(e, "element") } if ("element" == t) { var r = e.outerWidth(!1); return r <= 0 ? "auto" : r + "px" } if ("style" != t) return "computedstyle" != t ? t : window.getComputedStyle(e[0]).width; var s = e.attr("style"); if ("string" != typeof s) return null; for (var o = s.split(";"), a = 0, l = o.length; a < l; a += 1) { var c = o[a].replace(/\s/g, "").match(n); if (null !== c && 1 <= c.length) return c[1] } return null }, d.prototype._bindAdapters = function() { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, d.prototype._registerDomEvents = function() { var t = this;
                    this.$element.on("change.select2", function() { t.dataAdapter.current(function(e) { t.trigger("selection:update", { data: e }) }) }), this.$element.on("focus.select2", function(e) { t.trigger("focus", e) }), this._syncA = u.bind(this._syncAttributes, this), this._syncS = u.bind(this._syncSubtree, this), this._observer = new window.MutationObserver(function(e) { t._syncA(), t._syncS(e) }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 }) }, d.prototype._registerDataEvents = function() { var n = this;
                    this.dataAdapter.on("*", function(e, t) { n.trigger(e, t) }) }, d.prototype._registerSelectionEvents = function() { var n = this,
                        i = ["toggle", "focus"];
                    this.selection.on("toggle", function() { n.toggleDropdown() }), this.selection.on("focus", function(e) { n.focus(e) }), this.selection.on("*", function(e, t) {-1 === i.indexOf(e) && n.trigger(e, t) }) }, d.prototype._registerDropdownEvents = function() { var n = this;
                    this.dropdown.on("*", function(e, t) { n.trigger(e, t) }) }, d.prototype._registerResultsEvents = function() { var n = this;
                    this.results.on("*", function(e, t) { n.trigger(e, t) }) }, d.prototype._registerEvents = function() { var n = this;
                    this.on("open", function() { n.$container[0].classList.add("select2-container--open") }), this.on("close", function() { n.$container[0].classList.remove("select2-container--open") }), this.on("enable", function() { n.$container[0].classList.remove("select2-container--disabled") }), this.on("disable", function() { n.$container[0].classList.add("select2-container--disabled") }), this.on("blur", function() { n.$container[0].classList.remove("select2-container--focus") }), this.on("query", function(t) { n.isOpen() || n.trigger("open", {}), this.dataAdapter.query(t, function(e) { n.trigger("results:all", { data: e, query: t }) }) }), this.on("query:append", function(t) { this.dataAdapter.query(t, function(e) { n.trigger("results:append", { data: e, query: t }) }) }), this.on("keypress", function(e) { var t = e.which;
                        n.isOpen() ? t === i.ESC || t === i.TAB || t === i.UP && e.altKey ? (n.close(e), e.preventDefault()) : t === i.ENTER ? (n.trigger("results:select", {}), e.preventDefault()) : t === i.SPACE && e.ctrlKey ? (n.trigger("results:toggle", {}), e.preventDefault()) : t === i.UP ? (n.trigger("results:previous", {}), e.preventDefault()) : t === i.DOWN && (n.trigger("results:next", {}), e.preventDefault()) : (t === i.ENTER || t === i.SPACE || t === i.DOWN && e.altKey) && (n.open(), e.preventDefault()) }) }, d.prototype._syncAttributes = function() { this.options.set("disabled", this.$element.prop("disabled")), this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, d.prototype._isChangeMutation = function(e) { var t = this; if (e.addedNodes && 0 < e.addedNodes.length)
                        for (var n = 0; n < e.addedNodes.length; n++) { if (e.addedNodes[n].selected) return !0 } else { if (e.removedNodes && 0 < e.removedNodes.length) return !0; if (Array.isArray(e)) return e.some(function(e) { return t._isChangeMutation(e) }) }
                    return !1 }, d.prototype._syncSubtree = function(e) { var t = this._isChangeMutation(e),
                        n = this;
                    t && this.dataAdapter.current(function(e) { n.trigger("selection:update", { data: e }) }) }, d.prototype.trigger = function(e, t) { var n = d.__super__.trigger,
                        i = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting", clear: "clearing" }; if (void 0 === t && (t = {}), e in i) { var r = i[e],
                            s = { prevented: !1, name: e, args: t }; if (n.call(this, r, s), s.prevented) return void(t.prevented = !0) }
                    n.call(this, e, t) }, d.prototype.toggleDropdown = function() { this.isDisabled() || (this.isOpen() ? this.close() : this.open()) }, d.prototype.open = function() { this.isOpen() || this.isDisabled() || this.trigger("query", {}) }, d.prototype.close = function(e) { this.isOpen() && this.trigger("close", { originalEvent: e }) }, d.prototype.isEnabled = function() { return !this.isDisabled() }, d.prototype.isDisabled = function() { return this.options.get("disabled") }, d.prototype.isOpen = function() { return this.$container[0].classList.contains("select2-container--open") }, d.prototype.hasFocus = function() { return this.$container[0].classList.contains("select2-container--focus") }, d.prototype.focus = function(e) { this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"), this.trigger("focus", {})) }, d.prototype.enable = function(e) { this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != e && 0 !== e.length || (e = [!0]); var t = !e[0];
                    this.$element.prop("disabled", t) }, d.prototype.data = function() { this.options.get("debug") && 0 < arguments.length && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var t = []; return this.dataAdapter.current(function(e) { t = e }), t }, d.prototype.val = function(e) { if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length) return this.$element.val(); var t = e[0];
                    Array.isArray(t) && (t = t.map(function(e) { return e.toString() })), this.$element.val(t).trigger("input").trigger("change") }, d.prototype.destroy = function() { this.$container.remove(), this._observer.disconnect(), this._observer = null, this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", u.GetData(this.$element[0], "old-tabindex")), this.$element[0].classList.remove("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), u.RemoveData(this.$element[0]), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null }, d.prototype.render = function() { var e = t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container[0].classList.add("select2-container--" + this.options.get("theme")), u.StoreData(e[0], "element", this.$element), e }, d }), e.define("jquery-mousewheel", ["jquery"], function(e) { return e }), e.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(r, e, s, t, o) { if (null == r.fn.select2) { var a = ["open", "close", "destroy"];
                    r.fn.select2 = function(t) { if ("object" == typeof(t = t || {})) return this.each(function() { var e = r.extend(!0, {}, t);
                            new s(r(this), e) }), this; if ("string" != typeof t) throw new Error("Invalid arguments for Select2: " + t); var n, i = Array.prototype.slice.call(arguments, 1); return this.each(function() { var e = o.GetData(this, "select2");
                            null == e && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), n = e[t].apply(e, i) }), -1 < a.indexOf(t) ? this : n } } return null == r.fn.select2.defaults && (r.fn.select2.defaults = t), s }), { define: e.define, require: e.require } }(),
        t = e.require("jquery.select2"); return u.fn.select2.amd = e, t });
! function(i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function(i) { "use strict"; var e = window.Slick || {};
    (e = function() { var e = 0; return function(t, o) { var s, n = this;
            n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0) } }()).prototype.activateADA = function() { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) { var s = this; if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit() }, e.prototype.animateHeight = function() { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({ height: e }, i.options.speed) } }, e.prototype.animateSlide = function(e, t) { var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function(i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function() { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() { s.disableTransition(), t.call() }, s.options.speed)) }, e.prototype.getNavTarget = function() { var e = this,
            t = e.options.asNavFor; return t && null !== t && (t = i(t).not(e.$slider)), t }, e.prototype.asNavFor = function(e) { var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() { var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0) }) }, e.prototype.applyTransition = function(i) { var e = this,
            t = {};!1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.autoPlay = function() { var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed)) }, e.prototype.autoPlayClear = function() { var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer) }, e.prototype.autoPlayIterator = function() { var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e)) }, e.prototype.buildArrows = function() { var e = this;!0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function() { var e, t, o = this; if (!0 === o.options.dots) { for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active") } }, e.prototype.buildOut = function() { var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable") }, e.prototype.buildRows = function() { var i, e, t, o, s, n, r, l = this; if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) { for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) { var d = document.createElement("div"); for (e = 0; e < l.options.rows; e++) { var a = document.createElement("div"); for (t = 0; t < l.options.slidesPerRow; t++) { var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c)) }
                    d.appendChild(a) }
                o.appendChild(d) }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" }) } }, e.prototype.checkResponsive = function(e, t) { var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width(); if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) { s = null; for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]) } }, e.prototype.changeSlide = function(e, t) { var o, s, n, r = this,
            l = i(e.currentTarget); switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t); break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t); break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus"); break;
            default:
                return } }, e.prototype.checkNavigable = function(i) { var e, t; if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) { if (i < e[o]) { i = t; break }
                t = e[o] }
        return i }, e.prototype.cleanUpEvents = function() { var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition) }, e.prototype.cleanUpSlideEvents = function() { var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.cleanUpRows = function() { var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i)) }, e.prototype.clickHandler = function(i) {!1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function(e) { var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { i(this).attr("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]) }, e.prototype.disableTransition = function(i) { var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.fadeSlide = function(i, e) { var t = this;!1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function() { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function(i) { var e = this;!1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) { var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit()) }, e.prototype.focusHandler = function() { var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) { t.stopImmediatePropagation(); var o = i(this);
            setTimeout(function() { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0) }) }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() { return this.currentSlide }, e.prototype.getDotCount = function() { var i = this,
            e = 0,
            t = 0,
            o = 0; if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll); return o - 1 }, e.prototype.getLeft = function(i) { var e, t, o, s, n = this,
            r = 0; return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e }, e.prototype.getOption = e.prototype.slickGetOption = function(i) { return this.options[i] }, e.prototype.getNavigableIndexes = function() { var i, e = this,
            t = 0,
            o = 0,
            s = []; for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; return s }, e.prototype.getSlick = function() { return this }, e.prototype.getSlideCount = function() { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function(e) { var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay()) }, e.prototype.initADA = function() { var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) { return i >= 0 && i < e.slideCount });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) { var s = o.indexOf(t);
            i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s }) }), e.$dots.attr("role", "tablist").find("li").each(function(s) { var n = o[s];
            i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" }) }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end()); for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA() }, e.prototype.initArrowEvents = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function() { var e = this;!0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function() { var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1))) }, e.prototype.initializeEvents = function() { var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition) }, e.prototype.initUI = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function(i) { var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } })) }, e.prototype.lazyLoad = function() {
        function e(e) { i("img[data-lazy]", e).each(function() { var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() { e.animate({ opacity: 0 }, 100, function() { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function() { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function() { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t }) } var t, o, s, n = this; if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)) }, e.prototype.loadSlider = function() { var i = this;
        i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad() }, e.prototype.next = e.prototype.slickNext = function() { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function() { var i = this;
        i.checkResponsive(), i.setPosition() }, e.prototype.pause = e.prototype.slickPause = function() { var i = this;
        i.autoPlayClear(), i.paused = !0 }, e.prototype.play = e.prototype.slickPlay = function() { var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1 }, e.prototype.postSlide = function(e) { var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus())) }, e.prototype.prev = e.prototype.slickPrev = function() { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function(i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function(e) { e = e || 1; var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function() { e < 3 ? setTimeout(function() { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]) }, e.prototype.refresh = function(e) { var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1) }, e.prototype.registerBreakpoints = function() { var e, t, o, s = this,
            n = s.options.responsive || null; if ("array" === i.type(n) && n.length) { s.respondTo = s.options.respondTo || "window"; for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) { for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings }
            s.breakpoints.sort(function(i, e) { return s.options.mobileFirst ? i - e : e - i }) } }, e.prototype.reinit = function() { var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]) }, e.prototype.resize = function() { var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50)) }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) { var o = this; if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit() }, e.prototype.setCSS = function(i) { var e, t, o = this,
            s = {};!0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s))) }, e.prototype.setDimensions = function() { var i = this;!1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();!1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function() { var e, t = this;
        t.$slides.each(function(o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 }) }, e.prototype.setHeight = function() { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e) } }, e.prototype.setOption = e.prototype.slickSetOption = function() { var e, t, o, s, n, r = this,
            l = !1; if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) { r.options[i] = e });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else { for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t]) }
        l && (r.unload(), r.reinit()) }, e.prototype.setPosition = function() { var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]) }, e.prototype.setProps = function() { var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType }, e.prototype.setSlideClasses = function(i) { var e, t, o, s, n = this; if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) { var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center") } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")); "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad() }, e.prototype.setupInfinite = function() { var e, t, o, s = this; if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) { for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned"); for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() { i(this).attr("id", "") }) } }, e.prototype.interrupt = function(i) { var e = this;
        i || e.autoPlay(), e.interrupted = i }, e.prototype.selectHandler = function(e) { var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s) }, e.prototype.slideHandler = function(i, e, t) { var o, s, n, r, l, d = null,
            a = this; if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
        else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight();!0 !== t ? a.animateSlide(d, function() { a.postSlide(s) }) : a.postSlide(s) } }, e.prototype.startLoad = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function() { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function(i) { var e, t, o = this; if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1; if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1; if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) { switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0; break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1 } "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t])) } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {}) }, e.prototype.swipeHandler = function(i) { var e = this; if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i); break;
            case "move":
                e.swipeMove(i); break;
            case "end":
                e.swipeEnd(i) } }, e.prototype.swipeMove = function(i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function(i) { var e, t = this; if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0 }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() { var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit()) }, e.prototype.unload = function() { var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, e.prototype.unslick = function(i) { var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy() }, e.prototype.updateArrows = function() { var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, e.prototype.updateDots = function() { var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active")) }, e.prototype.visibility = function() { var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1) }, i.fn.slick = function() { var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length; for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o } });

/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier
Copyright (c) 2011 - 2017 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Google Maps API v3 must be included *before* this code
*/
(function() {
    var m, t, w, y, u, z = {}.hasOwnProperty,
        A = [].slice;
    this.OverlappingMarkerSpiderfier = function() {
        function r(a, d) {
            var b, f, e;
            this.map = a;
            null == d && (d = {});
            null == this.constructor.N && (this.constructor.N = !0, h = google.maps, l = h.event, p = h.MapTypeId, c.keepSpiderfied = !1, c.ignoreMapClick = !1, c.markersWontHide = !1, c.markersWontMove = !1, c.basicFormatEvents = !1, c.nearbyDistance = 20, c.circleSpiralSwitchover = 9, c.circleFootSeparation = 23, c.circleStartAngle = x / 12, c.spiralFootSeparation = 26, c.spiralLengthStart = 11, c.spiralLengthFactor =
                4, c.spiderfiedZIndex = h.Marker.MAX_ZINDEX + 2E4, c.highlightedLegZIndex = h.Marker.MAX_ZINDEX + 1E4, c.usualLegZIndex = h.Marker.MAX_ZINDEX + 1, c.legWeight = 1.5, c.legColors = { usual: {}, highlighted: {} }, e = c.legColors.usual, f = c.legColors.highlighted, e[p.HYBRID] = e[p.SATELLITE] = "#fff", f[p.HYBRID] = f[p.SATELLITE] = "#f00", e[p.TERRAIN] = e[p.ROADMAP] = "#444", f[p.TERRAIN] = f[p.ROADMAP] = "#f00", this.constructor.j = function(a) { return this.setMap(a) }, this.constructor.j.prototype = new h.OverlayView, this.constructor.j.prototype.draw = function() {});
            for (b in d) z.call(d, b) && (f = d[b], this[b] = f);
            this.g = new this.constructor.j(this.map);
            this.C();
            this.c = {};
            this.B = this.l = null;
            this.addListener("click", function(a, b) { return l.trigger(a, "spider_click", b) });
            this.addListener("format", function(a, b) { return l.trigger(a, "spider_format", b) });
            this.ignoreMapClick || l.addListener(this.map, "click", function(a) { return function() { return a.unspiderfy() } }(this));
            l.addListener(this.map, "maptypeid_changed", function(a) { return function() { return a.unspiderfy() } }(this));
            l.addListener(this.map,
                "zoom_changed",
                function(a) { return function() { a.unspiderfy(); if (!a.basicFormatEvents) return a.h() } }(this))
        }
        var l, h, m, v, p, c, t, x, u;
        c = r.prototype;
        t = [r, c];
        m = 0;
        for (v = t.length; m < v; m++) u = t[m], u.VERSION = "1.0.3";
        x = 2 * Math.PI;
        h = l = p = null;
        r.markerStatus = { SPIDERFIED: "SPIDERFIED", SPIDERFIABLE: "SPIDERFIABLE", UNSPIDERFIABLE: "UNSPIDERFIABLE", UNSPIDERFIED: "UNSPIDERFIED" };
        c.C = function() { this.a = [];
            this.s = [] };
        c.addMarker = function(a, d) { a.setMap(this.map); return this.trackMarker(a, d) };
        c.trackMarker = function(a, d) {
            var b;
            if (null !=
                a._oms) return this;
            a._oms = !0;
            b = [l.addListener(a, "click", function(b) { return function(d) { return b.V(a, d) } }(this))];
            this.markersWontHide || b.push(l.addListener(a, "visible_changed", function(b) { return function() { return b.D(a, !1) } }(this)));
            this.markersWontMove || b.push(l.addListener(a, "position_changed", function(b) { return function() { return b.D(a, !0) } }(this)));
            null != d && b.push(l.addListener(a, "spider_click", d));
            this.s.push(b);
            this.a.push(a);
            this.basicFormatEvents ? this.trigger("format", a, this.constructor.markerStatus.UNSPIDERFIED) :
                (this.trigger("format", a, this.constructor.markerStatus.UNSPIDERFIABLE), this.h());
            return this
        };
        c.D = function(a, d) { if (!this.J && !this.K) return null == a._omsData || !d && a.getVisible() || this.unspiderfy(d ? a : null), this.h() };
        c.getMarkers = function() { return this.a.slice(0) };
        c.removeMarker = function(a) { this.forgetMarker(a); return a.setMap(null) };
        c.forgetMarker = function(a) {
            var d, b, f, e, g;
            null != a._omsData && this.unspiderfy();
            d = this.A(this.a, a);
            if (0 > d) return this;
            g = this.s.splice(d, 1)[0];
            b = 0;
            for (f = g.length; b < f; b++) e = g[b],
                l.removeListener(e);
            delete a._oms;
            this.a.splice(d, 1);
            this.h();
            return this
        };
        c.removeAllMarkers = c.clearMarkers = function() { var a, d, b, f;
            f = this.getMarkers();
            this.forgetAllMarkers();
            a = 0; for (d = f.length; a < d; a++) b = f[a], b.setMap(null); return this };
        c.forgetAllMarkers = function() { var a, d, b, f, e, g, c, q;
            this.unspiderfy();
            q = this.a;
            a = d = 0; for (b = q.length; d < b; a = ++d) { g = q[a];
                e = this.s[a];
                c = 0; for (a = e.length; c < a; c++) f = e[c], l.removeListener(f);
                delete g._oms }
            this.C(); return this };
        c.addListener = function(a, d) {
            var b;
            (null != (b = this.c)[a] ?
                b[a] : b[a] = []).push(d);
            return this
        };
        c.removeListener = function(a, d) { var b;
            b = this.A(this.c[a], d);
            0 > b || this.c[a].splice(b, 1); return this };
        c.clearListeners = function(a) { this.c[a] = []; return this };
        c.trigger = function() { var a, d, b, f, e, g;
            d = arguments[0];
            a = 2 <= arguments.length ? A.call(arguments, 1) : [];
            d = null != (b = this.c[d]) ? b : [];
            g = [];
            f = 0; for (e = d.length; f < e; f++) b = d[f], g.push(b.apply(null, a)); return g };
        c.L = function(a, d) {
            var b, f, e, g, c;
            g = this.circleFootSeparation * (2 + a) / x;
            f = x / a;
            c = [];
            for (b = e = 0; 0 <= a ? e < a : e > a; b = 0 <= a ? ++e : --e) b =
                this.circleStartAngle + b * f, c.push(new h.Point(d.x + g * Math.cos(b), d.y + g * Math.sin(b)));
            return c
        };
        c.M = function(a, d) { var b, f, e, c, k;
            c = this.spiralLengthStart;
            b = 0;
            k = []; for (f = e = 0; 0 <= a ? e < a : e > a; f = 0 <= a ? ++e : --e) b += this.spiralFootSeparation / c + 5E-4 * f, f = new h.Point(d.x + c * Math.cos(b), d.y + c * Math.sin(b)), c += x * this.spiralLengthFactor / b, k.push(f); return k };
        c.V = function(a, d) {
            var b, f, e, c, k, q, n, l, h;
            (q = null != a._omsData) && this.keepSpiderfied || this.unspiderfy();
            if (q || this.map.getStreetView().getVisible() || "GoogleEarthAPI" ===
                this.map.getMapTypeId()) return this.trigger("click", a, d);
            q = [];
            n = [];
            b = this.nearbyDistance;
            l = b * b;
            k = this.f(a.position);
            h = this.a;
            b = 0;
            for (f = h.length; b < f; b++) e = h[b], null != e.map && e.getVisible() && (c = this.f(e.position), this.i(c, k) < l ? q.push({ R: e, G: c }) : n.push(e));
            return 1 === q.length ? this.trigger("click", a, d) : this.W(q, n)
        };
        c.markersNearMarker = function(a, d) {
            var b, f, e, c, k, q, n, l, h, m;
            null == d && (d = !1);
            if (null == this.g.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearMarker";
            b = this.nearbyDistance;
            n = b * b;
            k = this.f(a.position);
            q = [];
            l = this.a;
            b = 0;
            for (f = l.length; b < f && !(e = l[b], e !== a && null != e.map && e.getVisible() && (c = this.f(null != (h = null != (m = e._omsData) ? m.v : void 0) ? h : e.position), this.i(c, k) < n && (q.push(e), d))); b++);
            return q
        };
        c.F = function() {
            var a, d, b, f, e, c, k, l, n, h, m;
            if (null == this.g.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearAnyOtherMarker";
            n = this.nearbyDistance;
            n *= n;
            var p;
            e = this.a;
            p = [];
            h = 0;
            for (d = e.length; h < d; h++) f = e[h], p.push({
                H: this.f(null != (a = null != (b = f._omsData) ?
                    b.v : void 0) ? a : f.position),
                b: !1
            });
            h = this.a;
            a = b = 0;
            for (f = h.length; b < f; a = ++b)
                if (d = h[a], null != d.getMap() && d.getVisible() && (c = p[a], !c.b))
                    for (m = this.a, d = l = 0, e = m.length; l < e; d = ++l)
                        if (k = m[d], d !== a && null != k.getMap() && k.getVisible() && (k = p[d], (!(d < a) || k.b) && this.i(c.H, k.H) < n)) { c.b = k.b = !0; break }
            return p
        };
        c.markersNearAnyOtherMarker = function() { var a, d, b, c, e, g, k;
            e = this.F();
            g = this.a;
            k = [];
            a = d = 0; for (b = g.length; d < b; a = ++d) c = g[a], e[a].b && k.push(c); return k };
        c.setImmediate = function(a) { return window.setTimeout(a, 0) };
        c.h =
            function() { if (!this.basicFormatEvents && null == this.l) return this.l = this.setImmediate(function(a) { return function() { a.l = null; return null != a.g.getProjection() ? a.w() : null != a.B ? void 0 : a.B = l.addListenerOnce(a.map, "idle", function() { return a.w() }) } }(this)) };
        c.w = function() {
            var a, d, b, c, e, g, k;
            if (this.basicFormatEvents) { e = [];
                d = 0; for (b = markers.length; d < b; d++) c = markers[d], a = null != c._omsData ? "SPIDERFIED" : "UNSPIDERFIED", e.push(this.trigger("format", c, this.constructor.markerStatus[a])); return e }
            e = this.F();
            g = this.a;
            k = [];
            a = b = 0;
            for (d = g.length; b < d; a = ++b) c = g[a], a = null != c._omsData ? "SPIDERFIED" : e[a].b ? "SPIDERFIABLE" : "UNSPIDERFIABLE", k.push(this.trigger("format", c, this.constructor.markerStatus[a]));
            return k
        };
        c.P = function(a) { return { m: function(d) { return function() { return a._omsData.o.setOptions({ strokeColor: d.legColors.highlighted[d.map.mapTypeId], zIndex: d.highlightedLegZIndex }) } }(this), u: function(d) { return function() { return a._omsData.o.setOptions({ strokeColor: d.legColors.usual[d.map.mapTypeId], zIndex: d.usualLegZIndex }) } }(this) } };
        c.W = function(a, d) {
            var b, c, e, g, k, q, n, m, p, r;
            this.J = !0;
            r = a.length;
            b = this.T(function() { var b, d, c;
                c = [];
                b = 0; for (d = a.length; b < d; b++) m = a[b], c.push(m.G); return c }());
            g = r >= this.circleSpiralSwitchover ? this.M(r, b).reverse() : this.L(r, b);
            b = function() {
                var b, d, f;
                f = [];
                b = 0;
                for (d = g.length; b < d; b++) e = g[b], c = this.U(e), p = this.S(a, function(a) { return function(b) { return a.i(b.G, e) } }(this)), n = p.R, q = new h.Polyline({
                    map: this.map,
                    path: [n.position, c],
                    strokeColor: this.legColors.usual[this.map.mapTypeId],
                    strokeWeight: this.legWeight,
                    zIndex: this.usualLegZIndex
                }), n._omsData = { v: n.getPosition(), X: n.getZIndex(), o: q }, this.legColors.highlighted[this.map.mapTypeId] !== this.legColors.usual[this.map.mapTypeId] && (k = this.P(n), n._omsData.O = { m: l.addListener(n, "mouseover", k.m), u: l.addListener(n, "mouseout", k.u) }), this.trigger("format", n, this.constructor.markerStatus.SPIDERFIED), n.setPosition(c), n.setZIndex(Math.round(this.spiderfiedZIndex + e.y)), f.push(n);
                return f
            }.call(this);
            delete this.J;
            this.I = !0;
            return this.trigger("spiderfy", b, d)
        };
        c.unspiderfy =
            function(a) {
                var d, b, c, e, g, k, h;
                null == a && (a = null);
                if (null == this.I) return this;
                this.K = !0;
                h = [];
                g = [];
                k = this.a;
                d = 0;
                for (b = k.length; d < b; d++) e = k[d], null != e._omsData ? (e._omsData.o.setMap(null), e !== a && e.setPosition(e._omsData.v), e.setZIndex(e._omsData.X), c = e._omsData.O, null != c && (l.removeListener(c.m), l.removeListener(c.u)), delete e._omsData, e !== a && (c = this.basicFormatEvents ? "UNSPIDERFIED" : "SPIDERFIABLE", this.trigger("format", e, this.constructor.markerStatus[c])), h.push(e)) : g.push(e);
                delete this.K;
                delete this.I;
                this.trigger("unspiderfy", h, g);
                return this
            };
        c.i = function(a, d) { var b, c;
            b = a.x - d.x;
            c = a.y - d.y; return b * b + c * c };
        c.T = function(a) { var c, b, f, e, g;
            c = e = g = 0; for (b = a.length; c < b; c++) f = a[c], e += f.x, g += f.y;
            a = a.length; return new h.Point(e / a, g / a) };
        c.f = function(a) { return this.g.getProjection().fromLatLngToDivPixel(a) };
        c.U = function(a) { return this.g.getProjection().fromDivPixelToLatLng(a) };
        c.S = function(a, c) {
            var b, d, e, g, k, h;
            e = k = 0;
            for (h = a.length; k < h; e = ++k)
                if (g = a[e], g = c(g), "undefined" === typeof b || null === b || g < d) d = g, b = e;
            return a.splice(b,
                1)[0]
        };
        c.A = function(a, c) { var b, d, e, g; if (null != a.indexOf) return a.indexOf(c);
            b = d = 0; for (e = a.length; d < e; b = ++d)
                if (g = a[b], g === c) return b;
            return -1 };
        return r
    }();
    t = /(\?.*(&|&amp;)|\?)spiderfier_callback=(\w+)/;
    m = document.currentScript;
    null == m && (m = function() { var m, l, h, w, v;
        h = document.getElementsByTagName("script");
        v = [];
        m = 0; for (l = h.length; m < l; m++) u = h[m], null != (w = u.getAttribute("src")) && w.match(t) && v.push(u); return v }()[0]);
    if (null != m && (m = null != (w = m.getAttribute("src")) ? null != (y = w.match(t)) ? y[3] : void 0 : void 0) &&
        "function" === typeof window[m]) window[m]();
    "function" === typeof window.spiderfier_callback && window.spiderfier_callback()
}).call(this);
/* Thu 11 May 2017 09:00:27 BST */

var MarkerClusterer = function() { "use strict";

    function e(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function t(e, t) { for (var i = 0; i < t.length; i++) { var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s) } }

    function i(e, i, s) { return i && t(e.prototype, i), s && t(e, s), e }

    function s(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && r(e, t) }

    function n(e) { return (n = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) { return e.__proto__ || Object.getPrototypeOf(e) })(e) }

    function r(e, t) { return (r = Object.setPrototypeOf || function(e, t) { return e.__proto__ = t, e })(e, t) }

    function a(e, t) { return !t || "object" != typeof t && "function" != typeof t ? function(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e }(e) : t }

    function o(e, t) { return function(e) { if (Array.isArray(e)) return e }(e) || function(e, t) { if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return; var i = [],
                s = !0,
                n = !1,
                r = void 0; try { for (var a, o = e[Symbol.iterator](); !(s = (a = o.next()).done) && (i.push(a.value), !t || i.length !== t); s = !0); } catch (e) { n = !0, r = e } finally { try { s || null == o.return || o.return() } finally { if (n) throw r } } return i }(e, t) || function() { throw new TypeError("Invalid attempt to destructure non-iterable instance") }() } var l = function t() { e(this, t),
                function(e, t) { for (var i in t.prototype) e.prototype[i] = t.prototype[i] }(t, google.maps.OverlayView) },
        u = function(t) {
            function r(t, i) { var s; return e(this, r), (s = a(this, n(r).call(this))).cluster_ = t, s.styles_ = i, s.className_ = s.cluster_.getMarkerClusterer().getClusterClass(), s.center_ = null, s.div_ = null, s.sums_ = null, s.visible_ = !1, s.setMap(t.getMap()), s } return s(r, t), i(r, [{ key: "onAdd", value: function() { var e, t, i = this,
                        s = this.cluster_.getMarkerClusterer(),
                        n = o(google.maps.version.split("."), 2),
                        r = n[0],
                        a = n[1],
                        l = 100 * parseInt(r, 10) + parseInt(a, 10);
                    this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", (function() { t = e })), google.maps.event.addDomListener(this.div_, "mousedown", (function() { e = !0, t = !1 })), l >= 332 && google.maps.event.addDomListener(this.div_, "touchstart", (function(e) { e.stopPropagation() })), google.maps.event.addDomListener(this.div_, "click", (function(n) { if (e = !1, !t) { if (google.maps.event.trigger(s, "click", i.cluster_), google.maps.event.trigger(s, "clusterclick", i.cluster_), s.getZoomOnClick()) { var r = s.getMaxZoom(),
                                    a = i.cluster_.getBounds();
                                s.getMap().fitBounds(a), setTimeout((function() { s.getMap().fitBounds(a), null !== r && s.getMap().getZoom() > r && s.getMap().setZoom(r + 1) }), 100) }
                            n.cancelBubble = !0, n.stopPropagation && n.stopPropagation() } })), google.maps.event.addDomListener(this.div_, "mouseover", (function() { google.maps.event.trigger(s, "mouseover", i.cluster_) })), google.maps.event.addDomListener(this.div_, "mouseout", (function() { google.maps.event.trigger(s, "mouseout", i.cluster_) })) } }, { key: "onRemove", value: function() { this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null) } }, { key: "draw", value: function() { if (this.visible_) { var e = this.getPosFromLatLng_(this.center_);
                        this.div_.style.top = e.y + "px", this.div_.style.left = e.x + "px" } } }, { key: "hide", value: function() { this.div_ && (this.div_.style.display = "none"), this.visible_ = !1 } }, { key: "show", value: function() { if (this.div_) { var e = this.cluster_.getMarkerClusterer().ariaLabelFn(this.sums_.text),
                            t = this.backgroundPosition_.split(" "),
                            i = parseInt(t[0].replace(/^\s+|\s+$/g, ""), 10),
                            s = parseInt(t[1].replace(/^\s+|\s+$/g, ""), 10);
                        this.div_.style.cssText = this.createCss_(this.getPosFromLatLng_(this.center_)); var n = ""; if (this.cluster_.getMarkerClusterer().getEnableRetinaIcons()) n = "width: ".concat(this.width_, "px; height: ").concat(this.height_, "px");
                        else { var r = -1 * s,
                                a = -1 * i + this.width_,
                                o = -1 * s + this.height_,
                                l = -1 * i;
                            n = "clip: rect(".concat(r, "px, ").concat(a, "px, ").concat(o, "px, ").concat(l, "px)") } var u = ["position: absolute", "top: ".concat(s, "px"), "left: ".concat(i, "px"), n].join(";"),
                            h = ["position: absolute", "top: ".concat(this.anchorText_[0], "px"), "left: ".concat(this.anchorText_[1], "px"), "color: ".concat(this.textColor_), "font-size: ".concat(this.textSize_, "px"), "font-family: ".concat(this.fontFamily_), "font-weight: ".concat(this.fontWeight_), "font-style: ".concat(this.fontStyle_), "text-decoration: ".concat(this.textDecoration_), "text-align: center", "width: ".concat(this.width_, "px"), "line-height: ".concat(this.height_, "px")].join(";");
                        this.div_.innerHTML = "\n<img alt='".concat(this.sums_.text, '\' aria-hidden="true" src="').concat(this.url_, '" style="').concat(u, '"/>\n<div aria-label="').concat(e, '" tabindex="0" style="').concat(h, '">\n  <span aria-hidden="true">').concat(this.sums_.text, "</span>\n</div>\n"), void 0 === this.sums_.title || "" === this.sums_.title ? this.div_.title = this.cluster_.getMarkerClusterer().getTitle() : this.div_.title = this.sums_.title, this.div_.style.display = "" }
                    this.visible_ = !0 } }, { key: "useStyle", value: function(e) { this.sums_ = e; var t = Math.max(0, e.index - 1);
                    t = Math.min(this.styles_.length - 1, t); var i = this.styles_[t];
                    this.url_ = i.url, this.height_ = i.height, this.width_ = i.width, this.anchorText_ = i.anchorText || [0, 0], this.anchorIcon_ = i.anchorIcon || [Math.floor(this.height_ / 2), Math.floor(this.width_ / 2)], this.textColor_ = i.textColor || "black", this.textSize_ = i.textSize || 11, this.textDecoration_ = i.textDecoration || "none", this.fontWeight_ = i.fontWeight || "bold", this.fontStyle_ = i.fontStyle || "normal", this.fontFamily_ = i.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = i.backgroundPosition || "0 0" } }, { key: "setCenter", value: function(e) { this.center_ = e } }, { key: "createCss_", value: function(e) { return ["z-index: ".concat(this.cluster_.getMarkerClusterer().getZIndex()), "cursor: pointer", "position: absolute; top: ".concat(e.y, "px; left: ").concat(e.x, "px"), "width: ".concat(this.width_, "px; height: ").concat(this.height_, "px"), "-webkit-user-select: none", "-khtml-user-select: none", "-moz-user-select: none", "-o-user-select: none", "user-select: none"].join(";") } }, { key: "getPosFromLatLng_", value: function(e) { var t = this.getProjection().fromLatLngToDivPixel(e); return t.x = Math.floor(t.x - this.anchorIcon_[1]), t.y = Math.floor(t.y - this.anchorIcon_[0]), t } }]), r }(l),
        h = function() {
            function t(i) { e(this, t), this.markerClusterer_ = i, this.map_ = this.markerClusterer_.getMap(), this.minClusterSize_ = this.markerClusterer_.getMinimumClusterSize(), this.averageCenter_ = this.markerClusterer_.getAverageCenter(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new u(this, this.markerClusterer_.getStyles()) } return i(t, [{ key: "getSize", value: function() { return this.markers_.length } }, { key: "getMarkers", value: function() { return this.markers_ } }, { key: "getCenter", value: function() { return this.center_ } }, { key: "getMap", value: function() { return this.map_ } }, { key: "getMarkerClusterer", value: function() { return this.markerClusterer_ } }, { key: "getBounds", value: function() { for (var e = new google.maps.LatLngBounds(this.center_, this.center_), t = this.getMarkers(), i = 0; i < t.length; i++) e.extend(t[i].getPosition()); return e } }, { key: "remove", value: function() { this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_ } }, { key: "addMarker", value: function(e) { if (this.isMarkerAlreadyAdded_(e)) return !1; if (this.center_) { if (this.averageCenter_) { var t = this.markers_.length + 1,
                                i = (this.center_.lat() * (t - 1) + e.getPosition().lat()) / t,
                                s = (this.center_.lng() * (t - 1) + e.getPosition().lng()) / t;
                            this.center_ = new google.maps.LatLng(i, s), this.calculateBounds_() } } else this.center_ = e.getPosition(), this.calculateBounds_();
                    e.isAdded = !0, this.markers_.push(e); var n = this.markers_.length,
                        r = this.markerClusterer_.getMaxZoom(); if (null !== r && this.map_.getZoom() > r) e.getMap() !== this.map_ && e.setMap(this.map_);
                    else if (n < this.minClusterSize_) e.getMap() !== this.map_ && e.setMap(this.map_);
                    else if (n === this.minClusterSize_)
                        for (var a = 0; a < n; a++) this.markers_[a].setMap(null);
                    else e.setMap(null); return this.updateIcon_(), !0 } }, { key: "isMarkerInClusterBounds", value: function(e) { return this.bounds_.contains(e.getPosition()) } }, { key: "calculateBounds_", value: function() { var e = new google.maps.LatLngBounds(this.center_, this.center_);
                    this.bounds_ = this.markerClusterer_.getExtendedBounds(e) } }, { key: "updateIcon_", value: function() { var e = this.markers_.length,
                        t = this.markerClusterer_.getMaxZoom(); if (null !== t && this.map_.getZoom() > t) this.clusterIcon_.hide();
                    else if (e < this.minClusterSize_) this.clusterIcon_.hide();
                    else { var i = this.markerClusterer_.getStyles().length,
                            s = this.markerClusterer_.getCalculator()(this.markers_, i);
                        this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(s), this.clusterIcon_.show() } } }, { key: "isMarkerAlreadyAdded_", value: function(e) { if (this.markers_.indexOf) return -1 !== this.markers_.indexOf(e); for (var t = 0; t < this.markers_.length; t++)
                        if (e === this.markers_[t]) return !0;
                    return !1 } }]), t }(),
        c = function(e, t, i) { return void 0 !== e[t] ? e[t] : i },
        _ = function(t) {
            function r(t) { var i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}; return e(this, r), (i = a(this, n(r).call(this))).options = o, i.markers_ = [], i.clusters_ = [], i.listeners_ = [], i.activeMap_ = null, i.ready_ = !1, i.ariaLabelFn = i.options.ariaLabelFn || function() { return "" }, i.zIndex_ = i.options.zIndex || google.maps.Marker.MAX_ZINDEX + 1, i.gridSize_ = i.options.gridSize || 60, i.minClusterSize_ = i.options.minimumClusterSize || 2, i.maxZoom_ = i.options.maxZoom || null, i.styles_ = i.options.styles || [], i.title_ = i.options.title || "", i.zoomOnClick_ = c(i.options, "zoomOnClick", !0), i.averageCenter_ = c(i.options, "averageCenter", !1), i.ignoreHidden_ = c(i.options, "ignoreHidden", !1), i.enableRetinaIcons_ = c(i.options, "enableRetinaIcons", !1), i.imagePath_ = i.options.imagePath || r.IMAGE_PATH, i.imageExtension_ = i.options.imageExtension || r.IMAGE_EXTENSION, i.imageSizes_ = i.options.imageSizes || r.IMAGE_SIZES, i.calculator_ = i.options.calculator || r.CALCULATOR, i.batchSize_ = i.options.batchSize || r.BATCH_SIZE, i.batchSizeIE_ = i.options.batchSizeIE || r.BATCH_SIZE_IE, i.clusterClass_ = i.options.clusterClass || "cluster", -1 !== navigator.userAgent.toLowerCase().indexOf("msie") && (i.batchSize_ = i.batchSizeIE_), i.setupStyles_(), i.addMarkers(s, !0), i.setMap(t), i } return s(r, t), i(r, [{ key: "onAdd", value: function() { var e = this;
                    this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.prevZoom_ = this.getMap().getZoom(), this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", (function() { var t = e.getMap(),
                            i = t.minZoom || 0,
                            s = Math.min(t.maxZoom || 100, t.mapTypes[t.getMapTypeId()].maxZoom),
                            n = Math.min(Math.max(e.getMap().getZoom(), i), s);
                        e.prevZoom_ != n && (e.prevZoom_ = n, e.resetViewport_(!1)) })), google.maps.event.addListener(this.getMap(), "idle", (function() { e.redraw_() }))] } }, { key: "onRemove", value: function() { for (var e = 0; e < this.markers_.length; e++) this.markers_[e].getMap() !== this.activeMap_ && this.markers_[e].setMap(this.activeMap_); for (var t = 0; t < this.clusters_.length; t++) this.clusters_[t].remove();
                    this.clusters_ = []; for (var i = 0; i < this.listeners_.length; i++) google.maps.event.removeListener(this.listeners_[i]);
                    this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1 } }, { key: "draw", value: function() {} }, { key: "setupStyles_", value: function() { if (!(this.styles_.length > 0))
                        for (var e = 0; e < this.imageSizes_.length; e++) { var t = this.imageSizes_[e];
                            this.styles_.push({ url: this.imagePath_ + (e + 1) + "." + this.imageExtension_, height: t, width: t }) } } }, { key: "fitMapToMarkers", value: function() { for (var e = this.getMarkers(), t = new google.maps.LatLngBounds, i = 0; i < e.length; i++) !e[i].getVisible() && this.getIgnoreHidden() || t.extend(e[i].getPosition());
                    this.getMap().fitBounds(t) } }, { key: "getGridSize", value: function() { return this.gridSize_ } }, { key: "setGridSize", value: function(e) { this.gridSize_ = e } }, { key: "getMinimumClusterSize", value: function() { return this.minClusterSize_ } }, { key: "setMinimumClusterSize", value: function(e) { this.minClusterSize_ = e } }, { key: "getMaxZoom", value: function() { return this.maxZoom_ } }, { key: "setMaxZoom", value: function(e) { this.maxZoom_ = e } }, { key: "getZIndex", value: function() { return this.zIndex_ } }, { key: "setZIndex", value: function(e) { this.zIndex_ = e } }, { key: "getStyles", value: function() { return this.styles_ } }, { key: "setStyles", value: function(e) { this.styles_ = e } }, { key: "getTitle", value: function() { return this.title_ } }, { key: "setTitle", value: function(e) { this.title_ = e } }, { key: "getZoomOnClick", value: function() { return this.zoomOnClick_ } }, { key: "setZoomOnClick", value: function(e) { this.zoomOnClick_ = e } }, { key: "getAverageCenter", value: function() { return this.averageCenter_ } }, { key: "setAverageCenter", value: function(e) { this.averageCenter_ = e } }, { key: "getIgnoreHidden", value: function() { return this.ignoreHidden_ } }, { key: "setIgnoreHidden", value: function(e) { this.ignoreHidden_ = e } }, { key: "getEnableRetinaIcons", value: function() { return this.enableRetinaIcons_ } }, { key: "setEnableRetinaIcons", value: function(e) { this.enableRetinaIcons_ = e } }, { key: "getImageExtension", value: function() { return this.imageExtension_ } }, { key: "setImageExtension", value: function(e) { this.imageExtension_ = e } }, { key: "getImagePath", value: function() { return this.imagePath_ } }, { key: "setImagePath", value: function(e) { this.imagePath_ = e } }, { key: "getImageSizes", value: function() { return this.imageSizes_ } }, { key: "setImageSizes", value: function(e) { this.imageSizes_ = e } }, { key: "getCalculator", value: function() { return this.calculator_ } }, { key: "setCalculator", value: function(e) { this.calculator_ = e } }, { key: "getBatchSizeIE", value: function() { return this.batchSizeIE_ } }, { key: "setBatchSizeIE", value: function(e) { this.batchSizeIE_ = e } }, { key: "getClusterClass", value: function() { return this.clusterClass_ } }, { key: "setClusterClass", value: function(e) { this.clusterClass_ = e } }, { key: "getMarkers", value: function() { return this.markers_ } }, { key: "getTotalMarkers", value: function() { return this.markers_.length } }, { key: "getClusters", value: function() { return this.clusters_ } }, { key: "getTotalClusters", value: function() { return this.clusters_.length } }, { key: "addMarker", value: function(e, t) { this.pushMarkerTo_(e), t || this.redraw_() } }, { key: "addMarkers", value: function(e, t) { for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && this.pushMarkerTo_(e[i]);
                    t || this.redraw_() } }, { key: "pushMarkerTo_", value: function(e) { var t = this;
                    e.getDraggable() && google.maps.event.addListener(e, "dragend", (function() { t.ready_ && (e.isAdded = !1, t.repaint()) })), e.isAdded = !1, this.markers_.push(e) } }, { key: "removeMarker", value: function(e, t) { var i = this.removeMarker_(e); return !t && i && this.repaint(), i } }, { key: "removeMarkers", value: function(e, t) { for (var i = !1, s = 0; s < e.length; s++) { var n = this.removeMarker_(e[s]);
                        i = i || n } return !t && i && this.repaint(), i } }, { key: "removeMarker_", value: function(e) { var t = -1; if (this.markers_.indexOf) t = this.markers_.indexOf(e);
                    else
                        for (var i = 0; i < this.markers_.length; i++)
                            if (e === this.markers_[i]) { t = i; break } return -1 !== t && (e.setMap(null), this.markers_.splice(t, 1), !0) } }, { key: "clearMarkers", value: function() { this.resetViewport_(!0), this.markers_ = [] } }, { key: "repaint", value: function() { var e = this.clusters_.slice();
                    this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout((function() { for (var t = 0; t < e.length; t++) e[t].remove() }), 0) } }, { key: "getExtendedBounds", value: function(e) { var t = this.getProjection(),
                        i = new google.maps.LatLng(e.getNorthEast().lat(), e.getNorthEast().lng()),
                        s = new google.maps.LatLng(e.getSouthWest().lat(), e.getSouthWest().lng()),
                        n = t.fromLatLngToDivPixel(i);
                    n.x += this.gridSize_, n.y -= this.gridSize_; var r = t.fromLatLngToDivPixel(s);
                    r.x -= this.gridSize_, r.y += this.gridSize_; var a = t.fromDivPixelToLatLng(n),
                        o = t.fromDivPixelToLatLng(r); return e.extend(a), e.extend(o), e } }, { key: "redraw_", value: function() { this.createClusters_(0) } }, { key: "resetViewport_", value: function(e) { for (var t = 0; t < this.clusters_.length; t++) this.clusters_[t].remove();
                    this.clusters_ = []; for (var i = 0; i < this.markers_.length; i++) { var s = this.markers_[i];
                        s.isAdded = !1, e && s.setMap(null) } } }, { key: "distanceBetweenPoints_", value: function(e, t) { var i = (t.lat() - e.lat()) * Math.PI / 180,
                        s = (t.lng() - e.lng()) * Math.PI / 180,
                        n = Math.sin(i / 2) * Math.sin(i / 2) + Math.cos(e.lat() * Math.PI / 180) * Math.cos(t.lat() * Math.PI / 180) * Math.sin(s / 2) * Math.sin(s / 2); return 6371 * (2 * Math.atan2(Math.sqrt(n), Math.sqrt(1 - n))) } }, { key: "isMarkerInBounds_", value: function(e, t) { return t.contains(e.getPosition()) } }, { key: "addToClosestCluster_", value: function(e) { for (var t = 4e4, i = null, s = 0; s < this.clusters_.length; s++) { var n = this.clusters_[s],
                            r = n.getCenter(); if (r) { var a = this.distanceBetweenPoints_(r, e.getPosition());
                            a < t && (t = a, i = n) } } if (i && i.isMarkerInClusterBounds(e)) i.addMarker(e);
                    else { var o = new h(this);
                        o.addMarker(e), this.clusters_.push(o) } } }, { key: "createClusters_", value: function(e) { var t = this; if (this.ready_) { var i;
                        0 === e && (google.maps.event.trigger(this, "clusteringbegin", this), void 0 !== this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), i = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625)); for (var s = this.getExtendedBounds(i), n = Math.min(e + this.batchSize_, this.markers_.length), r = e; r < n; r++) { var a = this.markers_[r];!a.isAdded && this.isMarkerInBounds_(a, s) && (!this.ignoreHidden_ || this.ignoreHidden_ && a.getVisible()) && this.addToClosestCluster_(a) }
                        n < this.markers_.length ? this.timerRefStatic = window.setTimeout((function() { t.createClusters_(n) }), 0) : (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this)) } } }], [{ key: "CALCULATOR", value: function(e, t) { for (var i = 0, s = e.length, n = s; 0 !== n;) n = Math.floor(n / 10), i++; return i = Math.min(i, t), { text: s.toString(), index: i, title: "" } } }]), r }(l); return _.BATCH_SIZE = 2e3, _.BATCH_SIZE_IE = 500, _.IMAGE_PATH = "../images/m", _.IMAGE_EXTENSION = "png", _.IMAGE_SIZES = [53, 56, 66, 78, 90], _ }();
//# sourceMappingURL=markerclustererplus.min.js.map
/* An InfoBox is like an info window, but it displays
 * under the marker, opens quicker, and has flexible styling.
 * @param {GLatLng} latlng Point to place bar at
 * @param {Map} map The map on which to display this InfoBox.
 * @param {Object} opts Passes configuration options - content,
 *   offsetVertical, offsetHorizontal, className, height, width
 */
function InfoBox() {
    google.maps.OverlayView.call(this);
}


/* InfoBox extends GOverlay class from the Google Maps API
 */
InfoBox.prototype = new google.maps.OverlayView();

InfoBox.prototype.open = function(opts) {
    this.latlng_ = opts.latlng;
    this.map_ = opts.map;
    this.html_ = opts.html;
    this.offsetVertical_ = -240;
    this.offsetHorizontal_ = -35;
    this.height_ = 228;
    this.width_ = 227;
    this.number = opts.number || false;
    this.show = opts.show || false;
    var me = this;
    this.boundsChangedListener_ =
        google.maps.event.addListener(this.map_, "bounds_changed", function() {
            return me.panMap.apply(me);
        });
    this.setMap(this.map_);
}

/* Creates the DIV representing this InfoBox
 */
InfoBox.prototype.remove = function() {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function() {
    // Creates the element if it doesn't exist already.
    this.createElement();
    if (!this.div_)
        return;

    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our Bar
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (!pixPosition)
        return;

    // Now position our DIV based on the DIV coordinates of our bounds
    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
    this.div_.style.height = this.height_ + "px";
    this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
    this.div_.style.display = 'block';
    this.div_.className = 'infoWindowWebcam';

    if (this.number) {
        this.span_.style.left = (pixPosition.x + this.offsetHorizontal_ + 28) + "px";
        this.span_.style.top = (pixPosition.y + this.offsetVertical_ + 212) + "px";
        this.span_.style.display = 'block';
        this.span_.style.position = 'absolute';
        this.span_.style.color = '#ffffff';
        this.span_.style.width = '15px';
        this.span_.style.height = '15px';
        this.span_.className = 'number';
        this.span_.style.textAlign = 'center';
    }

};

/* Creates the DIV representing this InfoBox in the floatPane.  If the panes
 * object, retrieved by calling getPanes, is null, remove the element from the
 * DOM.  If the div exists, but its parent is not the floatPane, move the div
 * to the new pane.
 * Called from within draw.  Alternatively, this can be called specifically on
 * a panes_changed event.
 */
InfoBox.prototype.createElement = function() {
    var panes = this.getPanes();
    var div = this.div_;
    var span = this.span_;

    if (this.number) {
        if (!span) {
            var span = this.span_ = document.createElement("span");
            span.innerHTML = '0';
            span.className = 'number';
            panes.floatPane.appendChild(span);
        }
    }

    if (!div) {
        // This does not handle changing panes.  You can set the map to be null and
        // then reset the map to move the div.
        div = this.div_ = document.createElement("div");
        div.style.border = "0px none";
        div.style.position = "absolute";
        //div.style.background = "url('http://gmaps-samples.googlecode.com/svn/trunk/images/blueinfowindow.gif')";
        div.style.width = this.width_ + "px";
        div.style.height = this.height_ + "px";
        var contentDiv = document.createElement("div");
        contentDiv.className = 'inner';
        contentDiv.innerHTML = this.html_;

        //var topDiv = document.createElement("div");
        //topDiv.style.textAlign = "right";
        var closeImg = document.createElement("img");
        closeImg.style.width = "32px";
        closeImg.style.height = "32px";
        closeImg.style.cursor = "pointer";
        closeImg.style.position = "absolute";
        closeImg.style.right = "7px";
        closeImg.style.top = "2px";
        closeImg.src = "http://gmaps-samples.googlecode.com/svn/trunk/images/closebigger.gif";
        contentDiv.appendChild(closeImg);

        function removeInfoBox(ib) {
            return function() {
                ib.setMap(null);
            };
        }

        google.maps.event.addDomListener(closeImg, 'click', removeInfoBox(this));

        //div.appendChild(topDiv);
        div.appendChild(contentDiv);
        div.style.display = 'none';
        panes.floatPane.appendChild(div);

        this.panMap();
    } else if (div.parentNode != panes.floatPane) {
        // The panes have changed.  Move the div.
        div.parentNode.removeChild(div);
        panes.floatPane.appendChild(div);
    } else {
        // The panes have not changed, so no need to create or move the div.
    }

}

/* Pan the map to fit the InfoBox.
 */
InfoBox.prototype.panMap = function() {
    // if we go beyond map, pan map
    var map = this.map_;
    var bounds = map.getBounds();
    if (!bounds) return;

    // The position of the infowindow
    var position = this.latlng_;

    // The dimension of the infowindow
    var iwWidth = this.width_;
    var iwHeight = this.height_;

    // The offset position of the infowindow
    var iwOffsetX = this.offsetHorizontal_;
    var iwOffsetY = this.offsetVertical_;

    // Padding on the infowindow
    var padX = 0;
    var padY = 0;

    // The degrees per pixel
    var mapDiv = map.getDiv();
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boundsSpan = bounds.toSpan();
    var longSpan = boundsSpan.lng();
    var latSpan = boundsSpan.lat();
    var degPixelX = longSpan / mapWidth;
    var degPixelY = latSpan / mapHeight;

    // The bounds of the map
    var mapWestLng = bounds.getSouthWest().lng();
    var mapEastLng = bounds.getNorthEast().lng();
    var mapNorthLat = bounds.getNorthEast().lat();
    var mapSouthLat = bounds.getSouthWest().lat();

    // The bounds of the infowindow
    var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
    var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
    var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
    var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;

    // calculate center shift
    var shiftLng =
        (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
        (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
    var shiftLat =
        (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
        (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);

    // The center of the map
    var center = map.getCenter();

    // The new map center
    var centerX = center.lng() - shiftLng;
    var centerY = center.lat() - shiftLat;

    // center the map to the new shifted center
    // TODO: NOT WORK ZOOM & MOVE
    map.setCenter(new google.maps.LatLng(centerY, centerX));

    // Remove the listener after panning is complete.
    google.maps.event.removeListener(this.boundsChangedListener_);
    this.boundsChangedListener_ = null;
};
/*GOOGLE MAP*/
function createMap(id, lat, lng, zoom, mapTypeId) {
    var map = new google.maps.Map(document.getElementById(id), {
        center: new google.maps.LatLng(lat, lng),
        zoom: zoom,
        mapTypeId: mapTypeId
    });
    return map
}

function createMarker(lat, lng, map, type, html, oms) {
    var icon = customIcons[type] || {};
    var latlng = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: false,
        icon: icon.icon
            //,shadow: icon.shadow
    });
    if (html != "") {
        bindInfoWindow(marker, map, infoWindow, html);
        //customInfoWindow(marker, map, infoWindow, html);
    }
    addMarker(marker, type);

    if (html != "") {
        var iw = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'spider_format', function(status) {
            if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED) {
                infoWindow.close();
            }
        });
        google.maps.event.addListener(marker, 'spider_click', function(e) { // 'spider_click', not plain 'click'
            //iw.setContent(markerData.text);
            //iw.open(map, marker);
        });
    }
    oms.addMarker(marker);

    bounds.extend(latlng);
}

function createCustomMarker(lat, lng, map, type, html, show) {
    var icon = customIcons[type] || {};
    var latlng = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: false,
        icon: icon.icon
            //,shadow: icon.shadow
    });
    if (html != "") {
        //bindInfoWindow(marker, map, infoWindow, html);	
        customInfoWindow(marker, map, html, show);
    }
    addMarker(marker, type);
    bounds.extend(latlng);
}

function openMarker(marker, map, html) {
    infoBox.open({ latlng: marker.getPosition(), map: map, html: html, number: false, show: true });
}

function customInfoWindow(marker, map, html, show) {
    //if (show ) setTimeout("openFirst("+marker+", "+map+", "+html+");",3000);
    google.maps.event.addListener(marker, 'click', function() {
        infoBox.open({ latlng: marker.getPosition(), map: map, html: html, number: false, show: show });
    });
}

function bindInfoWindow(marker, map, infoWindow, html) {
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

function hideMarkers(type) {
    if (infoWindow) {
        infoWindow.close();
    }
    if (markersArray) {
        for (i = 0; i < markersArray.length; i++) {
            if (markersArray[i].type == type) {
                //markersArray[i].marker.setMap(null);
                markersArray[i].marker.setVisible(false);
            }
        }
    }
}

function showMarkers(type, map) {
    if (markersArray) {
        for (i = 0; i < markersArray.length; i++) {
            if (markersArray[i].type == type) {
                //markersArray[i].marker.setMap(map);
                markersArray[i].marker.setVisible(true);
            }
        }
    }
}

function addMarker(marker, type) {
    if (markersArray) {
        var markerObject = new Object();
        markerObject.marker = marker;
        markerObject.type = type;
        markersArray.push(markerObject);
        markersClu.push(marker);
    }
}

function initialize(lat, lng, zoom, type, googleMapId) {
    var latlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: type
    };
    return map = new google.maps.Map(document.getElementById(googleMapId), myOptions);
}

function readOptions(jsonStr) {

    var jsonObj = eval("(" + jsonStr + ")");
    return {
        zoom: parseInt(jsonObj.zoom),
        center: new google.maps.LatLng(jsonObj.lat, jsonObj.lng),
        mapTypeId: jsonObj.mapTypeId,
        scrollwheel: false
    };
}

var map = null;

var infoWindow = new google.maps.InfoWindow;

var infoBox = new InfoBox();

var markersArray = new Array();
var markersClu = new Array();

var bounds = new google.maps.LatLngBounds();

function craeteGMap(googleMapId, startPoint, contacts, showInfoWindow, defaultMarker, markerClusterer) {

    var showInfoWindow = (typeof showInfoWindow === "undefined") ? true : showInfoWindow;
    var defaultMarker = (typeof defaultMarker === "undefined") ? true : defaultMarker;
    var markerClusterer = (typeof markerClusterer === "undefined") ? false : markerClusterer;
    bounds = new google.maps.LatLngBounds();

    markersClu = new Array();
    var mapOptions = readOptions(startPoint);
    var map = new google.maps.Map(document.getElementById(googleMapId), mapOptions);

    var oms = new OverlappingMarkerSpiderfier(map, {
        keepSpiderfied: true,
        circleFootSeparation: 50,
        markersWontMove: true, // we promise not to move any markers, allowing optimizations
        markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
        basicFormatEvents: true // allow the library to skip calculating advanced formatting information
    });

    if (isBrowserMobile()) {
        showInfowindow = false;
    }

    for (var i = 0; i < contacts.length; i++) {
        jsonStr = contacts[i].jsonStr;
        jsonObj = eval("(" + jsonStr + ")");
        if (showInfoWindow) html = contacts[i].html;
        else html = '';
        if (!defaultMarker) {
            createCustomMarker(jsonObj.lat, jsonObj.lng, map, contacts[i].icon, html, showInfoWindow);
        } else {
            createMarker(jsonObj.lat, jsonObj.lng, map, contacts[i].icon, html, oms);
        }
    }

    if (contacts.length > 1) {
        map.fitBounds(bounds);
    }

    if (markerClusterer) {
        var markerClusterer = new MarkerClusterer(map, markersClu, mcOptions);
    }
}

function readGoogleMapPoint(string) {

    returnStr = '{';
    if (string.indexOf('http') >= 0) {
        aString = string.split('/');
        for (i = 0; i < aString.length; i++) {
            if (aString[i].indexOf('@') >= 0) {
                var llz = aString[i].replace('@', '');
                var llz = llz.replace('z', '');
                var allz = llz.split(',');
                if (allz.length > 1) {
                    returnStr += '"lat":"' + allz[0] + '",';
                    returnStr += '"lng":"' + allz[1] + '",';
                }
                if (allz.length > 2) {
                    returnStr += '"zoom":"' + allz[2] + '",';
                }
            }
            if (aString[i].indexOf('place') >= 0) {
                returnStr += '"address":"' + aString[i + 1].replace('+', '') + '",';
            }
        }
        returnStr += '"mapTypeId":"roadmap"}';
        //return eval('(' + returnStr + ')');
        return returnStr;
    } else {
        //return eval("(" + string + ")");
        return string;
    }
}
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto) }(function(a) { var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) { b.ev.on(o + a + p, c) },
        x = function(b, c, d, e) { var f = document.createElement("div"); return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f },
        y = function(c, d) { b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d])) },
        z = function(c) { return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn },
        A = function() { a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b) },
        B = function() { var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"]; if (void 0 !== a.transition) return !0; for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1 };
    t.prototype = { constructor: t, init: function() { var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {} }, open: function(c) { var e; if (c.isObj === !1) { b.items = c.items.toArray(), b.index = 0; var g, h = c.items; for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) { b.index = e; break } } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0; if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() { b.close() }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) { b._checkIfClose(a.target) && b.close() }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading)); var i = a.magnificPopup.modules; for (e = 0; e < i.length; e++) { var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b) }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) { c.close_replaceWith = z(d.type) }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({ overflow: b.st.overflowY, overflowX: "hidden", overflowY: b.st.overflowY }) : b.wrap.css({ top: v.scrollTop(), position: "absolute" }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({ height: d.height(), position: "absolute" }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) { 27 === a.keyCode && b.close() }), v.on("resize" + p, function() { b.updateSize() }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f); var k = b.wH = v.height(),
                n = {}; if (b.fixedContentPos && b._hasScrollBar(k)) { var o = b._getScrollbarSize();
                o && (n.marginRight = o) }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden"); var r = b.st.mainClass; return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() { b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn) }, 16), b.isOpen = !0, b.updateSize(k), y(m), c }, close: function() { b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() { b._close() }, b.st.removalDelay)) : b._close()) }, _close: function() { y(h); var c = r + " " + q + " "; if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) { var e = { marginRight: "" };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e) }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j) }, updateSize: function(a) { if (b.isIOS) { var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize") }, updateItemHTML: function() { var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index)); var d = c.type; if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) { var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0 }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder"); var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange") }, appendContent: function(a, c) { b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content) }, parseEl: function(c) { var d, e = b.items[c]; if (e.tagName ? e = { el: a(e) } : (d = e.type, e = { data: e, src: e.src }), e.el) { for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) { d = f[g]; break }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href")) } return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c] }, addGroup: function(a, c) { var d = function(d) { d.mfpEl = this, b._openClick(d, a, c) };
            c || (c = {}); var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d))) }, _openClick: function(c, d, e) { var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick; if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) { var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn; if (g)
                    if (a.isFunction(g)) { if (!g.call(b)) return !0 } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e) } }, updateStatus: function(a, d) { if (b.preloader) { c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading); var e = { status: a, text: d };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) { a.stopImmediatePropagation() }), b.container.addClass("mfp-s-" + a), c = a } }, _checkIfClose: function(c) { if (!a(c).hasClass(s)) { var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick; if (d && e) return !0; if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0; if (c === b.content[0] || a.contains(b.content[0], c)) { if (d) return !0 } else if (e && a.contains(document, c)) return !0; return !1 } }, _addClassToMFP: function(a) { b.bgOverlay.addClass(a), b.wrap.addClass(a) }, _removeClassFromMFP: function(a) { this.bgOverlay.removeClass(a), b.wrap.removeClass(a) }, _hasScrollBar: function(a) { return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height()) }, _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus() }, _onFocusIn: function(c) { return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1) }, _parseMarkup: function(b, c, d) { var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) { if (void 0 === d || d === !1) return !0; if (e = c.split("_"), e.length > 1) { var f = b.find(p + "-" + e[0]); if (f.length > 0) { var g = e[1]; "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d) } } else b.find(p + "-" + c).html(d) }) }, _getScrollbarSize: function() { if (void 0 === b.scrollbarSize) { var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a) } return b.scrollbarSize } }, a.magnificPopup = { instance: null, proto: t.prototype, modules: [], open: function(b, c) { return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b) }, close: function() { return a.magnificPopup.instance && a.magnificPopup.instance.close() }, registerModule: function(b, c) { c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>', tClose: "Close (Esc)", tLoading: "Loading...", autoFocusLast: !0 } }, a.fn.magnificPopup = function(c) { A(); var d = a(this); if ("string" == typeof c)
            if ("open" === c) { var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({ mfpEl: e }, d, f) } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c); return d }; var C, D, E, F = "inline",
        G = function() { E && (D.after(E.addClass(C)).detach(), E = null) };
    a.magnificPopup.registerModule(F, { options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" }, proto: { initInline: function() { b.types.push(F), w(h + "." + F, function() { G() }) }, getInline: function(c, d) { if (G(), c.src) { var e = b.st.inline,
                        f = a(c.src); if (f.length) { var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready") } else b.updateStatus("error", e.tNotFound), f = a("<div>"); return c.inlineElement = f, f } return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d } } }); var H, I = "ajax",
        J = function() { H && a(document.body).removeClass(H) },
        K = function() { J(), b.req && b.req.abort() };
    a.magnificPopup.registerModule(I, { options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' }, proto: { initAjax: function() { b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K) }, getAjax: function(c) { H && a(document.body).addClass(H), b.updateStatus("loading"); var d = a.extend({ url: c.src, success: function(d, e, f) { var g = { data: d, xhr: f };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() { b.wrap.addClass(q) }, 16), b.updateStatus("ready"), y("AjaxContentAdded") }, error: function() { J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src)) } }, b.st.ajax.settings); return b.req = a.ajax(d), "" } } }); var L, M = function(c) { if (c.data && void 0 !== c.data.title) return c.data.title; var d = b.st.image.titleSrc; if (d) { if (a.isFunction(d)) return d.call(b, c); if (c.el) return c.el.attr(d) || "" } return "" };
    a.magnificPopup.registerModule("image", { options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' }, proto: { initImage: function() { var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() { "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor) }), w(h + d, function() { c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p) }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage) }, resizeImage: function() { var a = b.currItem; if (a && a.img && b.st.image.verticalFit) { var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c) } }, _onImageHasSize: function(a) { a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1)) }, findImageSize: function(a) { var c = 0,
                    d = a.img[0],
                    e = function(f) { L && clearInterval(L), L = setInterval(function() { return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500))) }, f) };
                e(1) }, getImage: function(c, d) { var e = 0,
                    f = function() { c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g())) },
                    g = function() { c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0) },
                    h = b.st.image,
                    i = d.find(".mfp-img"); if (i.length) { var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1) } return b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d) } } }); var N, O = function() { return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N };
    a.magnificPopup.registerModule("zoom", { options: { enabled: !1, easing: "ease-in-out", duration: 300, opener: function(a) { return a.is("img") ? a : a.find("img") } }, proto: { initZoom: function() { var a, c = b.st.zoom,
                    d = ".zoom"; if (c.enabled && b.supportsTransition) { var e, f, g = c.duration,
                        j = function(a) { var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                f = "transition"; return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b },
                        k = function() { b.content.css("visibility", "visible") };
                    w("BuildControls" + d, function() { if (b._allowZoom()) { if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() { f.css(b._getOffset(!0)), e = setTimeout(function() { k(), setTimeout(function() { f.remove(), a = f = null, y("ZoomAnimationEnded") }, 16) }, g) }, 16) } }), w(i + d, function() { if (b._allowZoom()) { if (clearTimeout(e), b.st.removalDelay = g, !a) { if (a = b._getItemToZoom(), !a) return;
                                f = j(a) }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() { f.css(b._getOffset()) }, 16) } }), w(h + d, function() { b._allowZoom() && (k(), f && f.remove(), a = null) }) } }, _allowZoom: function() { return "image" === b.currItem.type }, _getItemToZoom: function() { return b.currItem.hasSize ? b.currItem.img : !1 }, _getOffset: function(c) { var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem); var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f; var h = { width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f }; return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h } } }); var P = "iframe",
        Q = "//about:blank",
        R = function(a) { if (b.currTemplate[P]) { var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none")) } };
    a.magnificPopup.registerModule(P, { options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } }, proto: { initIframe: function() { b.types.push(P), w("BeforeChange", function(a, b, c) { b !== c && (b === P ? R() : c === P && R(!0)) }), w(h + "." + P, function() { R() }) }, getIframe: function(c, d) { var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() { return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0 }); var g = {}; return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d } } }); var S = function(a) { var c = b.items.length; return a > c - 1 ? a - c : 0 > a ? c + a : a },
        T = function(a, b, c) { return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c) };
    a.magnificPopup.registerModule("gallery", { options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" }, proto: { initGallery: function() { var c = b.st.gallery,
                    e = ".mfp-gallery"; return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() { c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() { return b.items.length > 1 ? (b.next(), !1) : void 0 }), d.on("keydown" + e, function(a) { 37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next() }) }), w("UpdateStatus" + e, function(a, c) { c.text && (c.text = T(c.text, b.currItem.index, b.items.length)) }), w(l + e, function(a, d, e, f) { var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : "" }), w("BuildControls" + e, function() { if (b.items.length > 1 && c.arrows && !b.arrowLeft) { var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() { b.prev() }), f.click(function() { b.next() }), b.container.append(e.add(f)) } }), w(n + e, function() { b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() { b.preloadNearbyImages(), b._preloadTimeout = null }, 16) }), void w(h + e, function() { d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null })) : !1 }, next: function() { b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML() }, prev: function() { b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML() }, goTo: function(a) { b.direction = a >= b.index, b.index = a, b.updateItemHTML() }, preloadNearbyImages: function() { var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length); for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a); for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a) }, _preloadItem: function(c) { if (c = S(c), !b.items[c].preloaded) { var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() { d.hasSize = !0 }).on("error.mfploader", function() { d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d) }).attr("src", d.src)), d.preloaded = !0 } } } }); var U = "retina";
    a.magnificPopup.registerModule(U, { options: { replaceSrc: function(a) { return a.src.replace(/\.\w+$/, function(a) { return "@2x" + a }) }, ratio: 1 }, proto: { initRetina: function() { if (window.devicePixelRatio > 1) { var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) { b.img.css({ "max-width": b.img[0].naturalWidth / c, width: "100%" }) }), w("ElementParse." + U, function(b, d) { d.src = a.replaceSrc(d, c) })) } } } }), A() });
! function(t, e, i) {
    function n(t) { return t.replace(/\s*$/, "") }

    function s(t, e) { if (t.innerText) t.innerText = e;
        else if (t.nodeValue) t.nodeValue = e;
        else { if (!t.textContent) return !1;
            t.textContent = e } }

    function o(t, e, i, n) { var o, h = t.parent();
        t.remove(); var r = i ? i.length : 0; if (h.contents().length > r) return o = h.contents().eq(-1 - r), a(o, e, i, n); var l = h.prev(); return o = l.contents().eq(-1), !!o.length && (s(o[0], o.text() + n.ellipsis), h.remove(), i.length && l.append(i), !0) }

    function h(t, e, i, h) { for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length; c <= u;) r = c + (u - c >> 1), l = h.ellipsis + n(p.substr(r - 1, p.length)), s(a, l), e.height() > h.maxHeight ? c = r + 1 : (u = r - 1, d = d.length > l.length ? d : l); return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h) }

    function r(t, e, i, h) { for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length; c <= u;) r = c + (u - c >> 1), l = n(p.substr(0, r + 1)) + h.ellipsis, s(a, l), e.height() > h.maxHeight ? u = r - 1 : (c = r + 1, d = d.length > l.length ? d : l); return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h) }

    function l(t, e, i, h) { for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length, g = u >> 1; c <= g;) r = c + (g - c >> 1), l = n(p.substr(0, r)) + h.ellipsis + p.substr(u - r, u - r), s(a, l), e.height() > h.maxHeight ? g = r - 1 : (c = r + 1, d = d.length > l.length ? d : l); return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h) }

    function a(t, e, i, n) { return "end" === n.position ? r(t, e, i, n) : "start" === n.position ? h(t, e, i, n) : l(t, e, i, n) }

    function p(t, i, n, s) { var o, h, r = t[0],
            l = t.contents(),
            p = l.length,
            d = p - 1,
            u = !1; for (t.empty(); d >= 0 && !u; d--) o = l.eq(d), h = o[0], 8 !== h.nodeType && (r.insertBefore(h, r.firstChild), n.length && (e.inArray(r.tagName.toLowerCase(), g) >= 0 ? t.after(n) : t.append(n)), i.height() > s.maxHeight && (u = 3 === h.nodeType ? a(o, i, n, s) : c(o, i, n, s)), !u && n.length && n.remove()); return u }

    function d(t, i, n, s) { var o, h, r = t[0],
            l = t.contents(),
            p = 0,
            d = l.length,
            u = !1; for (t.empty(); p < d && !u; p++) o = l.eq(p), h = o[0], 8 !== h.nodeType && (r.appendChild(h), n.length && (e.inArray(r.tagName.toLowerCase(), g) >= 0 ? t.after(n) : t.append(n)), i.height() > s.maxHeight && (u = 3 === h.nodeType ? a(o, i, n, s) : c(o, i, n, s)), !u && n.length && n.remove()); return u }

    function c(t, e, i, n) { return "end" === n.position ? d(t, e, i, n) : "start" === n.position ? p(t, e, i, n) : d(t, e, i, n) }

    function u(t, i) { this.element = t, this.$element = e(t), this._name = "truncate", this._defaults = { lines: 1, ellipsis: "…", showMore: "", showLess: "", position: "end", lineHeight: "auto" }, this.config(i), this.original = this.cached = t.innerHTML, this.isTruncated = !1, this.isCollapsed = !0, this.update() } var g = ["table", "thead", "tbody", "tfoot", "tr", "col", "colgroup", "object", "embed", "param", "ol", "ul", "dl", "blockquote", "select", "optgroup", "option", "textarea", "script", "style"];
    u.prototype = { config: function(t) { if (this.options = e.extend({}, this._defaults, t), "auto" === this.options.lineHeight) { var n = this.$element.css("line-height"),
                    s = 18; "normal" !== n && (s = parseInt(n, 10)), this.options.lineHeight = s }
            this.options.maxHeight === i && (this.options.maxHeight = parseInt(this.options.lines, 10) * parseInt(this.options.lineHeight, 10)), "start" !== this.options.position && "middle" !== this.options.position && "end" !== this.options.position && (this.options.position = "end"), this.$clipNode = e(e.parseHTML(this.options.showMore), this.$element), this.original && this.update() }, update: function(t) { var e = !this.isCollapsed; "undefined" != typeof t ? this.original = this.element.innerHTML = t : this.isCollapsed && this.element.innerHTML === this.cached && (this.element.innerHTML = this.original); var i = this.$element.wrapInner("<div/>").children();
            i.css({ border: "none", margin: 0, padding: 0, width: "auto", height: "auto", "word-wrap": "break-word" }), this.isTruncated = !1, i.height() > this.options.maxHeight ? (this.isTruncated = c(i, i, this.$clipNode, this.options), this.isExplicitlyCollapsed && (this.isCollapsed = !0, e = !1)) : this.isCollapsed = !1, i.replaceWith(i.contents()), this.cached = this.element.innerHTML, e && (this.element.innerHTML = this.original) }, expand: function() { var t = !0;
            this.isExplicitlyCollapsed && (this.isExplicitlyCollapsed = !1, t = !1), this.isCollapsed && (this.isCollapsed = !1, this.element.innerHTML = this.isTruncated ? this.original + (t ? this.options.showLess : "") : this.original) }, collapse: function(t) { this.isExplicitlyCollapsed = !0, this.isCollapsed || (this.isCollapsed = !0, t = t || !1, t ? this.update() : this.element.innerHTML = this.cached) } }, e.fn.truncate = function(t) { var i = e.makeArray(arguments).slice(1); return this.each(function() { var n = e.data(this, "jquery-truncate");
            n ? "function" == typeof n[t] && n[t].apply(n, i) : e.data(this, "jquery-truncate", new u(this, t)) }) }, t.Truncate = u }(this, jQuery);

function truncate() { $(".truncate").each(function() { var e = $(this).text(),
            t = $(this).data("title"),
            o = $(this).data("line");
        o = parseInt(o); var n = $(this).data("min-width");
        n = parseInt(n), $(window).width() >= n ? t ? $(this).truncate("collapse") : ($(this).truncate({ lines: o }), $(this).data("title", e)) : t && $(this).truncate("expand") }) }

function minHeight() { $(".minHeight").each(function() { var e = $(this).data("min-height"),
            t = $(this).data("min-width");
        console.log(e), $(this).outerHeight() < e && $(window).width() >= t && (console.log($(this).outerHeight()), $(this).css("min-height", e)) }) }

function minHeightList() { $(".list-style").each(function() { var e = $(this).parent().outerHeight();
        $(this).outerHeight() < e && $(this).css("min-height", e) }) }

function getCookie(e) { var t, o, n, a = document.cookie.split(";"); for (t = 0; t < a.length; t++)
        if (o = a[t].substr(0, a[t].indexOf("=")), n = a[t].substr(a[t].indexOf("=") + 1), (o = o.replace(/^\s+|\s+$/g, "")) == e) return unescape(n) }

function setCookie(e, t, o) { if (0 != o) { var n = new Date;
        n.setDate(n.getDate() + o); var a = escape(t) + (null == o ? "" : "; expires=" + n.toUTCString()) } else a = escape(t);
    document.cookie = e + "=" + a + "; path=/" }

function checkInfoCookie() { cookieAlert = getCookie("cookie-alert"), cookieAlert ? $(".cookie-alert").addClass("d-none") : $(".cookie-alert").removeClass("d-none") }! function(f) { f(document).on("click", ".show-more a", function() { var e = f(this).data("id"); return f(this).addClass("d-none"), f("#" + e).slideToggle(500, function() {}), !1 }), f(document).on("click", ".hide-text a", function() { var e = f(this).data("id"); return f("#" + e).slideToggle(500, function() { f(this).closest(".accordion-location-content").find(".show-more a").removeClass("d-none") }), !1 }); var n = f(window).width(),
        e = f(".header").outerHeight(),
        t = f(window).scrollTop(),
        o = 0; if (e <= t ? f("body").addClass("header-scroll") : (changeHeader = 0, f("body").removeClass("header-scroll")), f(".article-bar").length && (s <= t ? f(".article-bar").addClass("active") : f(".article-bar").removeClass("active"), c = 100 / l * t, f(".article-bar .article-bar-progress span").css("width", c + "%")), f(window).scroll(function() { t = f(window).scrollTop(), e <= t ? f("body").addClass("header-scroll") : f("body").removeClass("header-scroll"), o < t ? f("body").removeClass("up-scroll") : (f("header").addClass("header-animate"), f("body").addClass("up-scroll")), o = t, f(".article-bar").length && (s <= t ? f(".article-bar").addClass("active") : f(".article-bar").removeClass("active"), c = 100 / l * t, f(".article-bar .article-bar-progress span").css("width", c + "%")) }), f(".article-bar").length) { var a = f(".content-article-head").outerHeight(),
            i = f(".content-article-head .detail").outerHeight(),
            r = f(".content-article-head").offset(),
            s = r.top + a - i,
            l = f(".content-article").outerHeight() + r.top - i,
            c = 0;
        f(document).on("click", ".article-bar-content:not(.open-share) .article-bar-share > a", function() { return f(".article-bar-content").addClass("open-share"), !1 }), f(document).on("click", ".article-bar-content.open-share .article-bar-share > a", function() { return f(".article-bar-content").removeClass("open-share"), !1 }) } if (f("#mobile-menu").length) { var d = f("#mobile-menu").attr("data-lang"),
            h = f("#mobile-menu").attr("data-meta-btn"),
            u = f("#mobile-menu").attr("data-meta-href"),
            p = new Array;
        p = "" != u ? ['<a href="#" class="mobile-lang-btn">' + d + "</a>", '<a href="#" class="mobile-group-btn"><i class="icon-efg-world"></i></a>', '<a href="' + u + '" target="_blank" class="btn">' + h + "</a>"] : ['<a href="#" class="mobile-lang-btn">' + d + "</a>", '<a href="#" class="mobile-group-btn"><i class="icon-efg-world"></i></a>'], f("#mobile-menu").mmenu({ extensions: ["position-front", "position-right", "fullscreen"], navbars: [{ content: p }] }); var m = f("#mobile-menu").data("mmenu");

        function g() { 1200 <= f(window).width() && m.close(), f(".mobile-group-layer").removeClass("open"), f(".mobile-group-accordion > div").removeClass("open"), f(".mobile-group-accordion > div > ul").slideUp(300), f(".mobile-lang-layer").removeClass("open") }
        g(), f(".mobile-menu-close").on("click", function() { return m.close(), !1 }), f(".mobile-search-open").on("click", function() { if (f(this).addClass("active"), f(".mobile-search-close").css("display", "block"), f(".header-search input").focus(), 1200 <= n) { var e = f(".header-nav").offset(),
                    t = f(".header-search").offset(),
                    o = Math.round(t.left - e.left + 51);
                f(".header-search div").css("max-width", o) } return f(".header-search").addClass("open"), !1 }), f(".mobile-search-close").on("click", function() { return f(".mobile-search-open").removeClass("active"), f(".mobile-search-close").css("display", "none"), f(".header-search").removeClass("open"), !1 }), f(".mobile-lang-layer").appendTo("body"), f(".mobile-group-layer").appendTo("body") } if (f(".header-search").length && (f(document).on("click", ".header-search .search-btn", function() { if (1200 <= n) { var e = f(".header-nav").offset(),
                    t = f(".header-search").offset(),
                    o = Math.round(t.left - e.left + 51);
                f(".header-search div").css("max-width", o) } return f(".header-search").addClass("open"), f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open"), !1 }), f(document).on("click", ".header-search .search-close", function() { return 1200 <= n && f(".header-search div").css("max-width", "50px"), f(".header-search").removeClass("open"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".header-search");
            t.is(e.target) || 0 !== t.has(e.target).length || 1200 <= n && (f(".header-search div").css("max-width", "50px"), f(".header-search").removeClass("open")) })), f(".group-layer").length && (f(document).on("click", ".group-btn:not(.open)", function() { return f(".group-layer").addClass("open"), f(".group-btn").addClass("open"), !1 }), f(document).on("click", ".group-btn.open", function() { return f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f("header");
            t.is(e.target) || 0 !== t.has(e.target).length || (f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open")) })), f(".mobile-group-btn").length && (f(document).on("click", ".mobile-group-btn", function() { return f(".mobile-group-layer").addClass("open"), !1 }), f(document).on("click", ".mobile-group-layer .btn", function() { return f(".mobile-group-layer").removeClass("open"), f(".mobile-group-accordion > div").removeClass("open"), f(".mobile-group-accordion > div > ul").slideUp(300), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".mobile-group-layer");
            t.is(e.target) || 0 !== t.has(e.target).length || (f(".mobile-group-layer").removeClass("open"), f(".mobile-group-accordion > div").removeClass("open"), f(".mobile-group-accordion > div > ul").slideUp(300)) }), f(".mobile-group-accordion > div > a").on("click", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> ul").slideUp(300)) : (f(this).closest(".mobile-group-accordion").find("> div").removeClass("open"), f(this).closest(".mobile-group-accordion").find("> div > ul").slideUp(300), f(this).parent().addClass("open"), f(this).parent().find("> ul").slideDown(300)), !1 })), f(".header-lang").length && (f(document).on("click", ".header-lang > a", function() { return f(".header-lang").addClass("open"), f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".header-lang");
            t.is(e.target) || 0 !== t.has(e.target).length || f(".header-lang").removeClass("open") })), f(".mobile-lang-btn").length && (f(document).on("click", ".mobile-lang-btn", function() { return f(".mobile-lang-layer").addClass("open"), !1 }), f(document).on("click", ".mobile-lang-layer .btn", function() { return f(".mobile-lang-layer").removeClass("open"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".mobile-lang-layer");
            t.is(e.target) || 0 !== t.has(e.target).length || f(".mobile-lang-layer").removeClass("open") })), f(".header-nav .submenu").length) { var v = 0;
        f(".header-nav .submenu").each(function() { 0, f(this).find("> ul > li.sub").each(function(e) { f(this).attr("data-submenu", e) }) }), f(document).on({ mouseenter: function() { f(this).parent().hasClass("sub") ? (f(this).closest(".submenu").addClass("open"), f(".submenu > ul > li").removeClass("active"), f(".submenu > div > ul").removeClass("active"), v = f(this).parent().attr("data-submenu"), f(this).parent().addClass("active"), f(this).closest(".submenu").find("> div > ul").eq(v).addClass("active")) : (f(this).closest(".submenu").removeClass("open"), f(".submenu > ul > li").removeClass("active"), f(".submenu > div > ul").removeClass("active")) } }, ".header-nav .submenu > ul > li > a"), f(document).on({ mouseleave: function() { f(this).removeClass("open"), f(".submenu > ul > li").removeClass("active"), f(".submenu > div > ul").removeClass("active") } }, ".header-nav .submenu"), f(document).on({ mouseenter: function() { f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open"), f(".header-lang").removeClass("open") } }, ".header-nav > ul > li") }! function() { if (f(".hero-slider").length) { var e = !1,
                t = f(".hero-slider").attr("data-time");
            0 < t && (e = !0), f(".hero-slider").hasClass("slick-initialized") || f(".hero-slider").slick({ dots: !0, appendDots: ".hero-slider-pagination", arrows: !1, infinite: !0, slidesToShow: 1, slidesToScroll: 1, swipe: !0, autoplay: e, autoplaySpeed: t, fade: !0 }) } }(); var b = "";

    function C() { f(".hero-slider").length && f(".hero-slider .slick-slide").each(function() { n <= 576 ? b = f(this).attr("data-bkg-sm") : 576 < n && n < 1e3 ? b = f(this).attr("data-bkg-md") : 1e3 <= n && (b = f(this).attr("data-bkg")), f(this).css("background-image", 'url("' + b + '")') }) }
    C(); var w, k = "";

    function y() { f(".hero-section.image").length && (n <= 576 ? k = f(".hero-section.image").attr("data-bkg-sm") : 576 < n && n < 1e3 ? k = f(".hero-section.image").attr("data-bkg-md") : 1e3 <= n && (k = f(".hero-section.image").attr("data-bkg")), f(".hero-section.image").css("background-image", 'url("' + k + '")')), f(".hero-section.article").length && (n <= 576 ? k = f(".hero-section.article").attr("data-bkg-sm") : 576 < n && n < 1e3 ? k = f(".hero-section.article").attr("data-bkg-md") : 1e3 <= n && (k = f(".hero-section.article").attr("data-bkg")), f(".hero-section.article .article-image").css("background-image", 'url("' + k + '")')) } if (y(), f(".news-slider").length && (f(".news-slider").hasClass("slick-initialized") || f(".news-slider").slick({ dots: !0, appendDots: ".news-slider-pagination", arrows: !1, infinite: !0, slidesToShow: 1, slidesToScroll: 1, swipe: !0, adaptiveHeight: !0, fade: !0 })), f(".form-field input").length && (f(".form-field input").on("change keyup", function() { 0 < f(this).val().length ? f(this).parent().addClass("filled") : f(this).parent().removeClass("filled") }), f(".form-field input").focusin(function() { f(this).parent().addClass("focus") }).focusout(function() { f(this).parent().removeClass("focus") })), f(".form-field textarea").length && (f(".form-field textarea").on("change keyup", function() { 0 < f(this).val().length ? f(this).parent().addClass("filled") : f(this).parent().removeClass("filled") }), f(".form-field textarea").focusin(function() { f(this).parent().addClass("focus") }).focusout(function() { f(this).parent().removeClass("focus") })), f(".form-field select").length && (f(".form-field select").on("change keyup", function() { 0 < f(this).val().length ? f(this).parent().addClass("filled") : f(this).parent().removeClass("filled") }), f(document).on("click", ".form-field.select", function() { return f(".form-field").removeClass("focus"), f(this).addClass("focus"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".form-field.select");
            t.is(e.target) || 0 !== t.has(e.target).length || f(".form-field.select").removeClass("focus") })), f("textarea").length && f("textarea").each(function() { this.setAttribute("style", "height:" + this.scrollHeight + "px;") }).on("input", function() { this.style.height = "60px", this.style.height = this.scrollHeight + "px", 0 == f(this).val().length && (this.style.height = "60px"), 86 == f(this).height() ? this.style.overflow = "auto" : f(this).height() < 86 && (this.style.overflow = "hidden") }), f(".teaser-filter-mobile").length && (f(".teaser-filter").clone().addClass("filter-mobile").appendTo(".content-wrapper"), f(document).on("click", ".teaser-filter-mobile", function() { return f("body").addClass("filter-open"), f(this).closest("section").css("z-index", "3"), !1 }), f(document).on("click", ".teaser-filter .btn", function() { return f("body").removeClass("filter-open"), f(this).closest("section").css("z-index", "2"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".teaser-filter");
            t.is(e.target) || 0 !== t.has(e.target).length || (f("body").removeClass("filter-open"), f(this).closest("section").css("z-index", "2")) }), f(document).bind("mouseup touchstart", function(e) { var t = f(".teaser-filter li");
            t.is(e.target) || 0 !== t.has(e.target).length || (f("body").removeClass("filter-open"), f(this).closest("section").css("z-index", "2")) })), f(".mobile-breadcrumb").length && (f(document).on("click", ".mobile-breadcrumb:not(.open) > a", function() { return f(".mobile-breadcrumb").addClass("open"), !1 }), f(document).on("click", ".mobile-breadcrumb.open > a", function() { return f(".mobile-breadcrumb").removeClass("open"), !1 }), f(document).on("click", ".mobile-breadcrumb > div .btn", function() { return f(".mobile-breadcrumb").removeClass("open"), !1 }), f(document).bind("mouseup touchstart", function(e) { var t = f(".mobile-breadcrumb");
            t.is(e.target) || 0 !== t.has(e.target).length || f(".mobile-breadcrumb").removeClass("open") })), f(".career-accordion-component:not(.no-link)").length && f(".career-accordion-component:not(.no-link) > div > .career-accordion-head").on("click", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> .career-accordion-content").slideUp(300)) : (f(".career-accordion-component:not(.no-link) > div").removeClass("open"), f(".career-accordion-component:not(.no-link) > div > .career-accordion-content").slideUp(300), f(this).parent().addClass("open"), f(this).parent().find("> .career-accordion-content").slideDown(300)), !1 }), f(".event-accordion-component:not(.no-link)").length && f(".event-accordion-component:not(.no-link) > div > .event-accordion-head").on("click", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> .event-accordion-content").slideUp(300)) : (f(".event-accordion-component:not(.no-link) > div").removeClass("open"), f(".event-accordion-component:not(.no-link) > div > .event-accordion-content").slideUp(300), f(this).parent().addClass("open"), f(this).parent().find("> .event-accordion-content").slideDown(300)), !1 }), f(".media-accordion-component").length && f(".media-accordion-component > div > .media-accordion-head").on("click", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> .media-accordion-content").slideUp(300)) : (f(".media-accordion-component > div").removeClass("open"), f(".media-accordion-component > div > .media-accordion-content").slideUp(300), f(this).parent().addClass("open"), f(this).parent().find("> .media-accordion-content").slideDown(300)), !1 }), f(".accordion").length && (f(".accordion > div.open > div").slideDown(300), f(".accordion > div > .accordion-head").on("click", function() { if (f(this).parent().hasClass("open")) f(this).parent().removeClass("open"), f(this).parent().find("> .accordion-content").slideUp(300);
            else { var e = f(this).closest(".accordion");
                e.hasClass("vertical") || (e.parent().find(".accordion > div").removeClass("open"), e.parent().find(".accordion > div > .accordion-content").slideUp(300)), f(this).parent().addClass("open"), f(this).parent().find("> .accordion-content").slideDown(300) } return !1 })), f(".accordion-location").length && (f(".accordion-location > div.open > div").slideDown(300), f(".accordion-location > div > .accordion-location-head").on("click", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> .accordion-location-content").slideUp(300)) : (f(".accordion-location > div").removeClass("open"), f(".accordion-location > div > .accordion-location-content").slideUp(300), f(this).parent().addClass("open"), f(this).parent().find("> .accordion-location-content").slideDown(300)), !1 })), f(".form-wrapper .form-field > select").length) {
        function $() { var e = f.fn.select2.amd.require("select2/defaults");
            f.extend(e.defaults, { dropdownPosition: "auto" }); var t = f.fn.select2.amd.require("select2/dropdown/attachBody");
            t.prototype._positionDropdown;
            t.prototype._positionDropdown = function() { var e = f(window),
                    t = this.$dropdown.hasClass("select2-dropdown--above"),
                    o = this.$dropdown.hasClass("select2-dropdown--below"),
                    n = null,
                    a = this.$container.offset();
                a.bottom = a.top + this.$container.outerHeight(!1); var i = { height: this.$container.outerHeight(!1) };
                i.top = a.top, i.bottom = a.top + i.height; var r = this.$dropdown.outerHeight(!1),
                    s = e.scrollTop(),
                    l = e.scrollTop() + e.height(),
                    c = s < a.top - r,
                    d = l > a.bottom + r,
                    h = { left: a.left, top: i.bottom },
                    u = this.$dropdownParent; "static" === u.css("position") && (u = u.offsetParent()); var p = u.offset();
                h.top -= p.top, h.left -= p.left; var m = this.options.get("dropdownPosition"); "above" === m || "below" === m ? n = m : (t || o || (n = "below"), d || !c || t ? !c && d && t && (n = "below") : n = "above"), ("above" == n || t && "below" !== n) && (h.top = i.top - p.top - r), null != n && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + n), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + n)), this.$dropdownContainer.css(h) }, f(".form-wrapper .form-field > select").each(function() { var e = f(this).parent();
                f(this).select2({ minimumResultsForSearch: 1 / 0, dropdownPosition: "below", dropdownParent: e }) }) }
        $() } if (f(".clear-form").length && f(document).on("click", ".clear-form", function() { return f(".form-field.select").length && f(this).closest(".form-wrapper").find(".form-field.select").attr("class", "form-field select"), f(".form-field:not(.select)").length && f(this).closest(".form-wrapper").find(".form-field:not(.select)").attr("class", "form-field"), f(".form-field > input").length && f(this).closest(".form-wrapper").find(".form-field > input").val(""), f(".form-field > textarea").length && f(this).closest(".form-wrapper").find(".form-field > textarea").val(""), f(".form-field > select").length && (f(this).closest(".form-wrapper").find(".form-field > select").prop("selectedIndex", 0), f(this).closest(".form-wrapper").find(".form-field > select").select2("destroy"), $()), !1 }), f(".legal-message").length && f(document).on("click", ".legal-message > a", function() { return f(this).parent().hasClass("open") ? (f(this).parent().removeClass("open"), f(this).parent().find("> div").slideUp(300)) : (f(this).parent().addClass("open"), f(this).parent().find("> div").slideDown(300)), !1 }), f(".scrollbar-inner").length && jQuery(".scrollbar-inner").scrollbar(), f(".side-contact").length) { var H = 0;

        function x() { f(".side-location").length ? H = parseInt(f(".side-location").outerHeight()) + parseInt(f(".side-contact").css("padding-bottom")) : f(".side-history").length && (H = parseInt(f(".side-history").outerHeight()) + parseInt(f(".side-contact").css("padding-bottom"))), f(".side-contact > span").css("height", H) }
        x() }

    function T() { f(".matchHeight").length && (f(".matchHeight").matchHeight(), f(".matchHeight .matchHeightInner").matchHeight()), f(".teaser-wrapper .teaser:not(.above)").length && (f(".teaser-wrapper .teaser:not(.above) > a > div").matchHeight(), f(".teaser-wrapper .teaser:not(.above) > a > div > h3").matchHeight()), f(".teaser-wrapper .teaser.people").length && f(".teaser-wrapper .teaser.people > div > a").matchHeight(), f(".group-layer").length && f(".group-layer .group-link > div").matchHeight() }

    function U() { n = f(window).width(), windowHeight = f(window).height(), g(), T(), C(), y(), f(".header-search").length && 1200 <= n && (f(".header-search div").css("max-width", "50px"), f(".header-search").removeClass("open")), f(".group-layer").length && (f(".group-layer").removeClass("open"), f(".group-btn").removeClass("open")), f(".header-lang").length && f(".header-lang").removeClass("open"), f(".side-contact").length && x() }
    f(".anchor-btn, [data-anchor='true']").length && f(document).on("click", ".anchor-btn, [data-anchor='true']", function() { var e = f(".header").outerHeight(),
            t = f(this).attr("href"),
            o = ""; return o = 1200 <= n ? f(t).offset().top - e - 20 : f(t).offset().top - 20, f("html,body").animate({ scrollTop: o }, 700), !1 }), T(), f(window).resize(function() { clearTimeout(w), w = setTimeout(U, 500) }), setTimeout(function() { truncate() }, 300), minHeight(), minHeightList(), f(window).resize(function() { minHeight(), minHeightList(), truncate(), T() }) }(jQuery), $(function() { $(".closeCookie").on("click", function() { return cookieAlert = getCookie("cookie-alert"), null != cookieAlert && "" != cookieAlert || setCookie("cookie-alert", "true", 365), $(".cookie-alert").addClass("d-none"), !1 }), checkInfoCookie() });