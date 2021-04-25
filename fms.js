!function (t) {
    var e = {};

    function i(s) {
        if (e[s]) return e[s].exports;
        var n = e[s] = {i: s, l: !1, exports: {}};
        return t[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }

    i.m = t, i.c = e, i.d = function (t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: s});
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0});
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (i.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var n in t) i.d(s, n, function (e) {
            return t[e];
        }.bind(null, n));
        return s;
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default;
        } : function () {
            return t;
        };
        return i.d(e, "a", e), e;
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, i.p = "", i(i.s = 0);
}([function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    const s = i(1), n = i(3);
    const fms = function (t, e, i) {
        s.Beachball.render(t, e, i);
    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports.fms = fms;
        module.exports.Tensor = n.Tensor;
    } else {
        fms.Tensor = n.Tensor;
        (window || this).fms = fms;
    }

},
    function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        const s = i(2), n = Math.PI / 180, r = 1e-16, h = .02, a = 85 * n, o = function (t) {
            const e = 2 * Math.PI;
            for (; t < 0;) t += e;
            for (; t >= e;) t -= e;
            return t;
        }, l = function (t) {
            let e, i;
            return e = Math.PI / 2 - t.vector.azimuth(), (i = t.vector.plunge()) < 0 && (i *= -1, e += Math.PI), {
                a: e = o(e),
                ca: Math.cos(e),
                cp: Math.cos(i),
                p: i,
                sa: Math.sin(e),
                sp: Math.sin(i),
                v: t.eigenvalue
            };
        }, u = function (t, e, i) {
            return t && e in t ? t[e] : i;
        };

        class c {
            constructor(t, e, i) {
                this.tensor = t, this.el = e, this.axisSize = 0, this.bgColor = "#ffffff", this.fillColor = "#dddddd", this.height = 0, this.labelAxes = !0, this.labelAxesFont = "24px Arial", this.labelPlanes = !0, this.labelPlanesFont = "14px Arial", this.lineColor = "#000000", this.lineWidth = .25, this.plotAxes = !1, this.plotPlanes = !0, this.radius = 0, this.size = 200, this.width = 0, this.x0 = 0, this.y0 = 0, this.bgColor = u(i, "bgColor", this.bgColor), this.fillColor = u(i, "fillColor", this.fillColor), this.labelAxes = u(i, "labelAxes", this.labelAxes), this.labelAxesFont = u(i, "labelAxesFont", this.labelAxesFont), this.labelPlanes = u(i, "labelPlanes", this.labelPlanes), this.labelPlanesFont = u(i, "labelPlanesFont", this.labelPlanesFont), this.lineColor = u(i, "lineColor", this.lineColor), this.lineWidth = u(i, "lineWidth", this.lineWidth), this.plotAxes = u(i, "plotAxes", this.plotAxes), this.plotPlanes = u(i, "plotPlanes", this.plotPlanes), this.size = u(i, "size", this.size), this.radius = u(i, "radius", Math.floor((this.size - 2) / 2)), this.axisSize = u(i, "axisSize", Math.floor(this.radius / 12.5)), this.height = u(i, "height", this.size), this.width = u(i, "width", this.size), this.x0 = u(i, "x0", this.width / 2), this.y0 = u(i, "y0", this.height / 2);
            }

            static render(t, e, i) {
                new c(t, e, i).render();
            }

            completePolygon(t) {
                let e, i, s, r, h;
                if (360 === t.x.length) return t;
                if (i = t.startAz.az, s = t.endAz.az, r = t.x, h = t.y, i - s > Math.PI && (i -= 2 * Math.PI), s - i > Math.PI && (i += 2 * Math.PI), i < s) for (e = s - n; e > i; e -= n) r.push(Math.sin(e)), h.push(Math.cos(e)); else for (e = s + n; e < i; e += n) r.push(Math.sin(e)), h.push(Math.cos(e));
                return t;
            }

            computeAzimuthLabel(t) {
                let e, i, s, n, r, h, a;
                return h = (i = this.getPoint(t.azimuth, 0)).x, a = i.y, e = h < 0 ? "right" : "left", n = this.measureText(t.text, t.font), s = (this.radius + 10) / this.radius, r = (this.radius + 5) / this.radius, t.align = e, t.size = n, t.tick = {
                    x: [h, h * r],
                    y: [a, a * r]
                }, t.x = h * s, t.y = a * s, a < 0 && (t.y = a * (this.radius + 10 + Math.abs(a) * n.height / 2) / this.radius), t;
            }

            createCanvas() {
                return new s.Canvas(this.el, this.height, this.width);
            }

            getPlaneLine(t) {
                let e, i, s, h, a, o, l, u;
                if (h = t.strike * n, e = t.dip * n, l = [], u = [], o = Math.abs(e - Math.PI / 2) < r) l.push(Math.sin(h), Math.sin(h + Math.PI)), u.push(Math.cos(h), Math.cos(h + Math.PI)); else for (a = Math.tan(e), i = 0; i <= Math.PI; i += n) e = Math.atan(a * Math.sin(i)), s = this.getPoint(h + i, e), l.push(s.x), u.push(s.y);
                return {x: l, y: u};
            }

            getPoint(t, e) {
                let i, s, n;
                return e < 0 && (e *= -1, t += Math.PI), t = o(t), {
                    x: s = (i = Math.sqrt(1 - Math.sin(e))) * Math.sin(t),
                    y: n = i * Math.cos(t)
                };
            }

            getPolygons(t) {
                let e, i, s, h, u, c, f, m, d, p, g, M, b, x, w, P, y, v, z, T, k, A, C, j, S, N, _, E;
                for (T = l(t.T), g = l(t.N), M = l(t.P), s = [], x = [], C = (T.v + g.v + M.v) / 3, T.v -= C, g.v -= C, M.v -= C, f = -g.v / T.v || r, p = C / T.v || r, z = !1, d = 0; d < 360; d++) m = d * n, v = Math.sin(m), c = Math.cos(m), y = (2 + 2 * p) / (3 + (1 - 2 * f) * Math.cos(2 * m)), Math.abs(1 - y) <= r && (y = 1), y > 1 && (k = T, T = M, M = k, z = !z, f = -g.v / T.v || r, y = (2 + 2 * (p = C / T.v || r)) / (3 + (1 - 2 * f) * Math.cos(2 * m))), e = Math.asin(Math.sqrt(y)), P = Math.sin(e), _ = (u = Math.cos(e)) * T.sp + P * v * g.sp + P * c * M.sp, N = u * T.cp * T.ca + P * v * g.cp * g.ca + P * c * M.cp * M.ca, S = u * T.cp * T.sa + P * v * g.cp * g.sa + P * c * M.cp * M.sa, Math.abs(N) < r && Math.abs(S) < r ? (i = 0, A = 0) : (i = o(Math.atan2(S, N)), (A = Math.acos(_ / Math.sqrt(_ * _ + N * N + S * S))) > Math.PI / 2 && (i = o(i + Math.PI), A = Math.PI - A)), s.push({
                    az: i,
                    takeoff: A
                });
                for (b = null, d = 0; d < s.length; d++) i = s[d], j = (w = Math.SQRT2 * Math.sin(i.takeoff / 2)) * Math.sin(i.az), E = w * Math.cos(i.az), null !== b && (h = s[0 === d ? s.length - 1 : d - 1], Math.abs(Math.abs(i.az - h.az) - Math.PI) < 10 * n && i.takeoff > a && h.takeoff > a && null !== b && (b.endAz = h, x.push(b), b = null)), null === b && (b = {
                    endAz: null,
                    startAz: i,
                    x: [],
                    y: []
                }), b.x.push(j), b.y.push(E);
                return b.endAz = s[s.length - 1], x.push(b), (x = (x = this.mergePolygons(x)).map(t => this.completePolygon(t))).swapColors = z, x;
            }

            getVectorPoint(t) {
                return this.getPoint(Math.PI / 2 - t.azimuth(), t.plunge());
            }

            makeRoomForLabel(t, e, i) {
                let s, n, r, h, a, o;
                if (a = this.projectX(e.x), s = 0, n = 0, r = 0, h = 0, s = (o = this.projectY(e.y)) - t.height, h = o + t.height, "left" === i) n = a, r = a + t.width; else if ("right" === i) n = a - t.width, r = a; else {
                    const e = Math.ceil(t.width / 2);
                    n = a - e, r = a + e;
                }
                s = s < 0 ? Math.abs(s) : 0, h > this.height ? h -= this.height : h = 0, n = n < 0 ? Math.abs(n) : 0, r > this.width ? r -= this.width : r = 0, this.width = this.width + n + r, this.x0 = this.x0 + n, this.height = this.height + h + s, this.y0 = this.y0 + h;
            }

            measureText(t, e) {
                let i, s;
                return (i = document.createElement("div")).setAttribute("style", "height:auto;position:absolute;visibility:hidden;white-space:nowrap;width:auto;font:" + e + ";"), i.innerText = t, document.body.appendChild(i), s = {
                    height: i.scrollHeight,
                    width: i.scrollWidth
                }, i.parentNode.removeChild(i), i = null, s;
            }

            mergePolygons(t) {
                let e, i, s, n, r, a, o, l;
                if (1 === t.length) return t;
                for (e = 0; e < t.length; e++) i = e === t.length - 1 ? 0 : e + 1, n = (s = t[e]).x, r = s.y, o = (a = t[i]).x, l = a.y, Math.abs(n[n.length - 1] - o[0]) < h && Math.abs(r[r.length - 1] - l[0]) < h && (n.push.apply(n, o), r.push.apply(r, l), s.endAz = a.endAz, t.splice(i, 1));
                return t;
            }

            projectX(t) {
                return this.x0 + this.radius * t;
            }

            projectY(t) {
                return this.height - (this.y0 + this.radius * t);
            }

            render() {
                let t, e, i, s, r, h, a;
                t = [], this.labelPlanes && [this.tensor.NP1, this.tensor.NP2].forEach(e => {
                    let i, s;
                    i = e.strike * n, s = "(" + e.strike.toFixed(0) + ", " + e.dip.toFixed(0) + ", " + e.rake.toFixed(0) + ")";
                    const r = this.computeAzimuthLabel({azimuth: i, font: this.labelPlanesFont, text: s});
                    this.makeRoomForLabel(r.size, {x: r.x, y: r.y}, r.align), t.push(r);
                }), this.labelAxes && [this.tensor.T, this.tensor.P].forEach(t => {
                    this.makeRoomForLabel(this.measureText(t.name, this.labelAxesFont), this.getVectorPoint(t.vector), "center");
                }), (e = this.createCanvas()).context.lineWidth = this.lineWidth, (s = this.getPolygons(this.tensor)).swapColors && (r = this.bgColor, this.bgColor = this.fillColor, this.fillColor = r), h = this.projectX(0), a = this.projectY(0), e.circle(h, a, 2 * this.radius, this.lineColor, this.bgColor), s.forEach(t => {
                    e.polygon(t.x.map(t => this.projectX(t)), t.y.map(t => this.projectY(t)), this.lineColor, this.fillColor);
                }), this.plotPlanes && [this.tensor.NP1, this.tensor.NP2].forEach(t => {
                    let i;
                    i = this.getPlaneLine(t), e.line(i.x.map(t => this.projectX(t)), i.y.map(t => this.projectY(t)), this.lineColor, null);
                }), e.circle(h, a, 2 * this.radius, this.lineColor, null), this.labelAxes ? [this.tensor.P, this.tensor.T].forEach(t => {
                    i = this.getVectorPoint(t.vector), e.text(t.name, this.labelAxesFont, this.projectX(i.x), this.projectY(i.y), null, "black", "center");
                }) : this.plotAxes && (i = this.getVectorPoint(this.tensor.P.vector), e.circle(i.x, i.y, this.axisSize, "white", "black"), i = this.getVectorPoint(this.tensor.T.vector), e.circle(i.x, i.y, this.axisSize, "black", "white")), t.forEach(t => {
                    let i;
                    i = t.tick, e.line(i.x.map(t => this.projectX(t)), i.y.map(t => this.projectY(t)), "black", null), e.text(t.text, t.font, this.projectX(t.x), this.projectY(t.y), null, "black", t.align);
                });
            }
        }

        e.Beachball = c, c.zeroToTwoPi = o;
    },
    function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        e.Canvas = class {
            constructor(t = null, e = 100, i = 100) {
                this.canvas = t, this.height = e, this.width = i, this.canvas || (this.canvas = document.createElement("canvas")), this.canvas.height = this.height, this.canvas.width = this.width, this.context = this.canvas.getContext("2d");
            }

            _strokeAndFill(t, e) {
                const i = this.context;
                t && (i.strokeStyle = t, i.stroke()), e && (i.fillStyle = e, i.fill());
            }

            circle(t, e, i, s, n) {
                const r = this.context;
                r.beginPath(), r.arc(t, e, i / 2, 0, 2 * Math.PI, !0), r.closePath(), this._strokeAndFill(s, n);
            }

            clear() {
                this.context.clearRect && this.context.clearRect(0, 0, this.width, this.height);
            }

            line(t, e, i, s) {
                const n = this.context;
                n.beginPath(), n.moveTo(t[0], e[0]);
                for (let i = 1, s = t.length; i < s; i++) n.lineTo(t[i], e[i]);
                this._strokeAndFill(i, s);
            }

            measureText(t, e) {
                const i = this.context;
                return i.font = t, i.measureText(e);
            }

            polygon(t, e, i, s) {
                const n = this.context;
                n.beginPath(), n.moveTo(t[0], e[0]);
                for (let i = 1, s = t.length; i < s; i++) n.lineTo(t[i], e[i]);
                n.closePath(), this._strokeAndFill(i, s);
            }

            text(t, e, i, s, n, r, h = "left") {
                const a = this.context;
                if (a.font = e, "center" === h || "right" === h) {
                    const e = a.measureText(t);
                    i -= "center" === h ? e.width / 2 : e.width;
                }
                n && (a.strokeStyle = n, a.strokeText(t, i, s)), r && (a.fillStyle = r, a.fillText(t, i, s));
            }
        };
    },
    function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        const s = i(4), n = {
            "smi:ci.anss.org/momentTensor/TMTS": "TMTS",
            "smi:nc.anss.org/momentTensor/TMTS": "TMTS",
            "smi:nc.anss.org/momentTensor/TMTS-ISO": "TMTS-ISO",
            "smi:uu.anss.org/momentTensor/TDMT": "TDMT"
        }, r = Math.PI / 180, h = 180 / Math.PI;

        class a {
            constructor(t) {
                let e, i, n, r, h, o, l, u, c, f, m, d, p, g;
                this.product = null, this.units = "N-m", this.mtt = m = t.mtt || t.mxx || 0, this.mpp = o = t.mpp || t.myy || 0, this.mrr = l = t.mrr || t.mzz || 0, this.mrt = u = t.mrt || t.mxz || 0, this.mrp = c = t.mrp || -t.myz || 0, this.mtp = f = t.mtp || -t.mxy || 0, this.units = "N-m", this.moment = r = Math.sqrt(.5 * (l * l + m * m + o * o + 2 * (u * u + c * c + f * f))), this.momentLog10 = h = Math.log(r) / Math.LN10, this.exponent = i = parseInt(h, 10), this.scale = Math.pow(10, i), this.magnitude = 2 / 3 * (h - 9.1), this.matrix = new s.Matrix([m, -f, u, -f, o, -c, u, -c, l], 3, 3), (e = this.matrix.jacobi()).sort(a.sortEigenvalues), this.T = g = e[0], this.N = d = e[1], this.P = p = e[2], this.fCLVD = d.eigenvalue / Math.max(Math.abs(g.eigenvalue), Math.abs(p.eigenvalue)), this.percentDC = Math.abs(1 - Math.abs(this.fCLVD) / .5), this.forceThrust = Math.pow(Math.sin(g.vector.plunge()), 2), this.forceStrikeSlip = Math.pow(Math.sin(d.vector.plunge()), 2), this.forceNormal = Math.pow(Math.sin(p.vector.plunge()), 2), n = g.vector.subtract(p.vector).unit(), d = g.vector.add(p.vector).unit(), this.NP1 = a.calculatePlane(n, d), this.NP2 = a.calculatePlane(d, n), this.T.name = "T", this.N.name = "N", this.P.name = "P", this.NP1.name = "NP1", this.NP2.name = "NP2";
            }

            static calculatePlane(t, e) {
                return t = t.unit(), e = e.unit(), t.z() > 0 && (t = t.multiply(-1), e = e.multiply(-1)), {
                    dip: Math.acos(-t.z()) * h,
                    rake: Math.atan2(-e.z(), e.cross(t).z()) * h,
                    strike: a.range(Math.atan2(-t.x(), t.y()), 0, 2 * Math.PI) * h
                };
            }

            static fromStrikeDipRake(t, e, i, s) {
                let n, h, o, l, u, c, f, m, d, p, g, M, b, x, w, P, y, v, z;
                return x = t * r, z = Math.sin(x), u = Math.cos(x), P = Math.sin(2 * x), h = Math.cos(2 * x), c = e * r, y = Math.sin(c), o = Math.cos(c), w = Math.sin(2 * c), n = Math.cos(2 * c), b = (i % 90 != 0 ? i : i + 1e-15) * r, v = Math.sin(b), l = Math.cos(b), new a({
                    mpp: (p = y * l * P - w * v * u * u) * s,
                    mrp: -(g = -1 * (o * l * z - n * v * u)) * s,
                    mrr: (M = w * v) * s,
                    mrt: (d = -1 * (o * l * u + n * v * z)) * s,
                    mtp: -(m = y * l * h + w * v * P * .5) * s,
                    mtt: (f = -1 * (y * l * P + w * v * z * z)) * s
                });
            }

            static range(t, e, i) {
                const s = i - e;
                for (; t < e;) t += s;
                for (; t >= i;) t -= s;
                return t;
            }

            static sortEigenvalues(t, e) {
                let i, s;
                return (i = t.eigenvalue) < (s = e.eigenvalue) ? 1 : i > s ? -1 : 0;
            }
        }

        e.Tensor = a;
    },
    function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        const s = i(5), n = function (t, e, i, s) {
            let n, r;
            if (s < 0 || s >= i) throw new Error("column " + s + " out of range [0," + i + ")");
            if (1 === i) return t;
            for (r = [], n = 0; n < e; n++) r.push(t[o(e, i, n, s)]);
            return r;
        }, r = function (t, e, i) {
            let s, n;
            s = Math.min(e, i), n = [];
            for (let r = 0; r < s; r++) n.push(t[o(e, i, r, r)]);
            return n;
        }, h = function (t, e, i, s, n) {
            return t[o(e, i, s, n)];
        }, a = function (t) {
            let e, i, s;
            for (e = [], i = 0; i < t; i++) for (s = 0; s < t; s++) e.push(i === s ? 1 : 0);
            return e;
        }, o = function (t, e, i, s) {
            return e * i + s;
        }, l = function (t, e, i, h) {
            let o, l, u, c, f, m, d, p, g, M, b, x, w, P, y, v, z, T, k, A, C, j, S, N, _, E, I, F;
            if (e !== i) throw new Error("Jacobi only works on symmetric, square matrices");
            o = t.slice(0), w = r(t, e, i), N = a(i), j = 0;
            do {
                for (x = !1, z = 0; z < i; z++) for (A = z + 1; A < i; A++) if (f = w[z], g = w[A], d = o[i * z + A], T = .5 * Math.atan2(2 * d, g - f), b = Math.cos(T), M = (S = Math.sin(T)) * S * f + 2 * S * b * d + b * b * g, (m = b * b * f - 2 * S * b * d + S * S * g) !== f || M !== g) {
                    for (x = !0, j++, w[z] = m, w[A] = M, o[i * z + A] = 0, P = 0; P < z; P++) v = i * P + A, l = o[y = i * P + z], u = o[v], o[y] = b * l - S * u, o[v] = b * u + S * l;
                    for (P = z + 1; P < A; P++) v = i * P + A, c = o[k = i * z + P], u = o[v], o[k] = b * c - S * u, o[v] = b * u + S * c;
                    for (P = A + 1; P < i; P++) C = i * A + P, c = o[k = i * z + P], p = o[C], o[k] = b * c - S * p, o[C] = b * p + S * c;
                    for (P = 0; P < i; P++) v = i * P + A, I = N[y = i * P + z], F = N[v], N[y] = b * I - S * F, N[v] = b * F + S * I;
                }
            } while (x && j < h);
            if (x) throw new Error("failed to converge");
            for (E = [], P = 0; P < i; P++) _ = new s.Vector(n(N, e, i, P)), E.push({eigenvalue: w[P], vector: _});
            return E;
        }, u = function (t, e, i, r, h, a) {
            let o, l, u, f, m;
            if (i !== h) throw new Error("wrong combination of rows and cols");
            for (m = [], u = 0; u < e; u++) for (f = c(t, e, i, u), o = 0; o < a; o++) l = n(r, h, a, o), m.push(s.Vector.dot(f, l));
            return m;
        }, c = function (t, e, i, s) {
            let n, r;
            if (s < 0 || s >= e) throw new Error("row " + s + " out of range [0," + e + ")");
            for (r = [], n = 0; n < i; n++) r.push(t[o(e, i, s, n)]);
            return r;
        }, f = function (t, e, i, s, n, r) {
            t[o(e, i, s, n)] = r;
        }, m = function (t, e, i) {
            let s, n, r, h, a;
            for (s = e - 1, n = i - 1, (r = []).push("["), h = 0; h < e; h++) {
                for (a = 0; a < i; a++) r.push(t[i * h + a], a !== n || h !== s ? ", " : "");
                h !== s && r.push("\n ");
            }
            return r.push("]"), r.join("");
        }, d = function (t, e, i) {
            let s, n, r;
            for (s = [], r = 0; r < i; r++) for (n = 0; n < e; n++) s.push(t[o(e, i, n, r)]);
            return s;
        };

        class p {
            constructor(t, e, i) {
                if (this.data = t, this.m = e, this.n = i, !this.m || !this.n) if (this.m || this.n) {
                    if (this.m) {
                        if (this.n = this.data.length / this.m, this.n !== Math.floor(this.n)) throw new Error("wrong number of data elements");
                    } else if (this.m = this.data.length / this.n, this.m !== Math.floor(this.m)) throw new Error("wrong number of data elements");
                } else {
                    const t = Math.sqrt(this.data.length);
                    if (t !== Math.floor(t)) throw new Error("matrix m,n unspecified, and matrix not square");
                    this.m = t, this.n = t;
                }
            }

            add(t) {
                if (this.m !== t.m || this.n !== t.n) throw new Error("matrices must be same size");
                return new p(s.Vector.add(this.data, t.data), this.m, this.n);
            }

            col(t) {
                return n(this.data, this.m, this.n, t);
            }

            diagonal() {
                return r(this.data, this.m, this.n);
            }

            get(t, e) {
                return h(this.data, this.m, this.n, t, e);
            }

            jacobi(t = 100) {
                return l(this.data, this.m, this.n, t);
            }

            multiply(t) {
                return new p(u(this.data, this.m, this.n, t.data, t.m, t.n), this.m, t.n);
            }

            negative() {
                return new p(s.Vector.multiply(this.data, -1), this.m, this.n);
            }

            row(t) {
                return c(this.data, this.m, this.n, t);
            }

            set(t, e, i) {
                f(this.data, this.m, this.n, t, e, i);
            }

            subtract(t) {
                if (this.m !== t.m || this.n !== t.n) throw new Error("matrices must be same size");
                return new p(s.Vector.subtract(this.data, t.data), this.m, this.n);
            }

            toString() {
                return m(this.data, this.m, this.n);
            }

            transpose() {
                return new p(d(this.data, this.m, this.n), this.n, this.m);
            }
        }

        e.Matrix = p, p.col = n, p.diagonal = r, p.get = h, p.identity = a, p.index = o, p.jacobi = l, p.multiply = u, p.row = c, p.set = f, p.stringify = m, p.transpose = d;
    },
    function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        const s = function (t, e) {
            let i, s;
            if (t.length !== e.length) throw new Error("vectors must be same length");
            for (s = [], i = 0; i < t.length; i++) s.push(t[i] + e[i]);
            return s;
        }, n = function (t, e) {
            return Math.acos(a(t, e) / (l(t) * l(e)));
        }, r = function (t) {
            if (t.length < 2) throw new Error("azimuth requires at least 2 dimensions");
            return 0 === t[0] && 0 === t[1] ? 0 : Math.PI / 2 - Math.atan2(t[1], t[0]);
        }, h = function (t, e) {
            if (t.length !== e.length || t.length < 3) throw new Error("cross product requires at least 3 dimensions");
            return [t[1] * e[2] - e[1] * t[2], t[2] * e[0] - e[2] * t[0], t[0] * e[1] - e[0] * t[1]];
        }, a = function (t, e) {
            let i, s;
            for (s = 0, i = 0; i < t.length; i++) s += t[i] * e[i];
            return s;
        }, o = function (t, e) {
            let i;
            if (t.length !== e.length) return !1;
            for (i = 0; i < t.length; i++) if (t[i] !== e[i]) return !1;
            return !0;
        }, l = function (t) {
            let e, i;
            for (i = 0, e = 0; e < t.length; e++) i += t[e] * t[e];
            return Math.sqrt(i);
        }, u = function (t, e) {
            let i, s;
            for (s = [], i = 0; i < t.length; i++) s.push(t[i] * e);
            return s;
        }, c = function (t) {
            if (t.length < 3) throw new Error("__azimuth: vector must have at least 3 dimensions");
            return Math.asin(t[2] / l(t));
        }, f = function (t, e, i, s = [0, 0, 0]) {
            let n, r, h, a, o, l, u, c, f, m, d, p, g, M, b, x, w, P, y, v, z, T, k, A, C, j, S, N, _, E, I, F;
            return n = s[0], o = s[1], f = s[2], b = e[0], [(n * ((z = (v = e[1]) * v) + (j = (C = e[2]) * C)) - b * ((u = o * v) + (p = f * C) - (w = b * (E = t[0])) - (k = v * (I = t[1])) - (_ = C * (F = t[2])))) * (1 - (g = Math.cos(i))) + E * g + (-(d = f * v) + (c = o * C) - (N = C * I) + (A = v * F)) * (M = Math.sin(i)), (o * ((x = b * b) + j) - v * ((r = n * b) + p - w - k - _)) * (1 - g) + I * g + ((m = f * b) - (a = n * C) + (S = C * E) - (y = b * F)) * M, (f * (x + z) - C * (r + u - w - k - _)) * (1 - g) + F * g + (-(l = o * b) + (h = n * v) - (T = v * E) + (P = b * I)) * M];
        }, m = function (t, e) {
            let i, s;
            if (t.length !== e.length) throw new Error("__subtract: vectors must be same length");
            for (s = [], i = 0; i < t.length; i++) s.push(t[i] - e[i]);
            return s;
        }, d = function (t) {
            const e = l(t);
            if (0 === e) throw new Error("__unit: cannot convert zero vector to unit vector");
            return u(t, 1 / e);
        }, p = function (t, e) {
            return "number" == typeof e && (t[0] = e), t[0];
        }, g = function (t, e) {
            return "number" == typeof e && (t[1] = e), t[1];
        }, M = function (t, e) {
            return "number" == typeof e && (t[2] = e), t[2];
        };

        class b {
            constructor(t) {
                this.data = t;
            }

            add(t) {
                return new b(s(this.data, t instanceof b ? t.data : t));
            }

            angle(t) {
                return n(this.data, t instanceof b ? t.data : t);
            }

            azimuth() {
                return r(this.data);
            }

            cross(t) {
                return new b(h(this.data, t instanceof b ? t.data : t));
            }

            dot(t) {
                return a(this.data, t instanceof b ? t.data : t);
            }

            equals(t) {
                return o(this.data, t instanceof b ? t.data : t);
            }

            magnitude() {
                return l(this.data);
            }

            multiply(t) {
                return new b(u(this.data, t));
            }

            plunge() {
                return c(this.data);
            }

            rotate(t, e, i = [0, 0, 0]) {
                return new b(f(this.data, t instanceof b ? t.data : t, e, i instanceof b ? i.data : i));
            }

            subtract(t) {
                return new b(m(this.data, t instanceof b ? t.data : t));
            }

            toString() {
                return "" + this.data;
            }

            unit() {
                return new b(d(this.data));
            }

            x(t) {
                return p(this.data, t);
            }

            y(t) {
                return g(this.data, t);
            }

            z(t) {
                return M(this.data, t);
            }
        }

        e.Vector = b, b.add = s, b.angle = n, b.azimuth = r, b.cross = h, b.dot = a, b.magnitude = l, b.multiply = u, b.plunge = c, b.rotate = f, b.subtract = m, b.unit = d, b.x = p, b.y = g, b.z = M;
    }]);
