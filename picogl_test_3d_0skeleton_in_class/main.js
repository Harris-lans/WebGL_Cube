
// Documentation links: https://tsherif.github.io/picogl.js/ http://glmatrix.net/ 

var canvas = document.getElementById("webgl-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var app = PicoGL.createApp(canvas);
app.clearColor(1.0, 1.0, 0.0, 1.0);

// Now we create our GPU resources -----------------------------------

var vertexPositions = new Float32Array([
    //front
    -1, -1, 1, 1, -1, 1, -1, 1, 1,
    -1, 1, 1, 1, -1, 1, 1, 1, 1,
    //right
    1, -1, 1, 1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, 1, 1, -1,
    //back
    1, -1, -1, -1, -1, -1, 1, 1, -1,
    1, 1, -1, -1, -1, -1, -1, 1, -1,
    //left
    -1, -1, -1, -1, -1, 1, -1, 1, -1,
    -1, 1, -1, -1, -1, 1, -1, 1, 1,
    //top
    -1, 1, 1, 1, 1, 1, -1, 1, -1,
    -1, 1, -1, 1, 1, 1, 1, 1, -1,
    //bottom
    -1, -1, -1, 1, -1, -1, -1, -1, 1,
    -1, -1, 1, 1, -1, -1, 1, -1, 1
]);
var positions = app.createVertexBuffer( PicoGL.FLOAT, 3, vertexPositions );

var vertexNormals = new Float32Array([
    // front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 
    0, 0, 1, 0, 0, 1, 0, 0, 1,
    // right
    1, 0, 0, 1, 0, 0, 1, 0, 0, 
    1, 0, 0, 1, 0, 0, 1, 0, 0,
    // back 
    0, 0, -1, 0, 0, -1, 0, 0, -1, 
    0, 0, -1, 0, 0, -1, 0, 0, -1, 
    // left
    -1, 0, 0, -1, 0, 0, -1, 0, 0, 
    -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // top 
    0, 1, 0, 0, 1, 0, 0, 1, 0, 
    0, 1, 0, 0, 1, 0, 0, 1, 0,
    // bottom
    0, -1, 0, 0, -1, 0, 0, -1, 0, 
    0, -1, 0, 0, -1, 0, 0, -1, 0
]);
var normals = app.createVertexBuffer( PicoGL.FLOAT, 3, vertexNormals );

var vertexArray = app.createVertexArray()
 .vertexAttributeBuffer(0, positions)
 .vertexAttributeBuffer(1, normals); 
 


var vertexArray = app.createVertexArray()
 .vertexAttributeBuffer(0, positions)
 .vertexAttributeBuffer(1, normals);
 //.indexBuffer(indices) // var triangleIndices = new Uint16Array(num_indices); var indices =  app.createIndexBuffer(PicoGL.UNSIGNED_SHORT, 3, triangleIndices );

var vertexShaderSource = document.getElementById("test_vs").text.trim();
var fragmentShaderSource = document.getElementById("test_fs").text.trim();
var shaders = app.createProgram( vertexShaderSource, fragmentShaderSource );

var uniformBuffer = app.createUniformBuffer([ PicoGL.FLOAT_MAT4, PicoGL.FLOAT_MAT4, PicoGL.FLOAT_MAT4]);
// ... TODO ...

var drawObject = app.createDrawCall( shaders, vertexArray );

// Binding the uniform to the draw call
drawObject.uniformBlock("ShaderGlobals", uniformBuffer );

// Compute the transform matrices -----------------------------------

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projectionMatrix = mat4.create();

// Making the view Matrix
var cameraPosition = vec3.fromValues(2, 2, -3);
var cameraLookAt = vec3.fromValues(0, 0, 0);
var cameraUp = vec3.fromValues(0, 1, 0);
mat4.lookAt( viewMatrix, cameraPosition, cameraLookAt, cameraUp ); 

// Making the projection Matrix
mat4.perspective( projectionMatrix, 3.14 * 0.5, canvas.width / canvas.height, 0.1, 10.0 ); 

// ... TODO ...

// Frame drawing -----------------------------------

var time = 0.0;
app.depthTest();
app.drawBackfaces();
//app.cullBackfaces();

// Now we actually send commands to the GPU
// This time we want an animation, to we create a render-loop via requestAnimationFrame!

function frameDraw() {
    time += 0.01; // we could actually grab seconds via windows.performance.now()...
    app.clear();
    
    uniformBuffer.set(0, modelMatrix);
    uniformBuffer.set(1, viewMatrix);
    uniformBuffer.set(2, projectionMatrix);
    uniformBuffer.update();

    drawObject.draw();

    mat4.rotateX(modelMatrix, modelMatrix, 1);
    uniformBuffer.set(0, modelMatrix);
    uniformBuffer.update();

    drawObject.draw();

    requestAnimationFrame( frameDraw );
}

requestAnimationFrame( frameDraw );