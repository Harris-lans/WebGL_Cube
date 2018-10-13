///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////////////////

"use strict";

/**
    WebGL shader.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLShader} shader The shader.
*/
class Shader {
    
    constructor(gl, type, source) {
        this.gl = gl;
        this.shader = gl.createShader(type);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);

        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            let i, lines;

            console.error(gl.getShaderInfoLog(this.shader));
            lines = source.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error(`${i + 1}: ${lines[i]}`);
            }
        }
    }

    /**
        Delete this shader.

        @method
        @return {Shader} The Shader object.
    */
    delete() {
        if (this.shader) {
            this.gl.deleteShader(this.shader);
            this.shader = null;
        }

        return this;
    }

}

module.exports = Shader;
