const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`);

if(!webgl)
{
    throw new Error('webgl not supported by the browser.');
}

//RGB COLOR - Background Canvas
webgl.clearColor(0.1, 0.1, 0.2, 1.0);
webgl.clear(webgl.COLOR_BUFFER_BIT);

let z = 0;

//Define vertices - triangle
const vertices = new Float32Array(
    [
        //TRIANGLE 3D (x, y, z)
        0.5, 1, z,  //vertex 1: (x=0.5, y=1, z=0)
        0.5, -1, z,  //vertex 2: (x=0.5, y=-1, z=0)
        -1, -1, z,  //vertex 3: (x=-1, y=-1, z=0)
    ]
);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShaderSource = `
    attribute vec3 position;
    void main()
    {
        gl_Position = vec4(position, 2);
    }

`;

const fragmentShaderSource = `
    void main()
    {
        gl_FragColor = vec4(1, 0, 0, 1);   //red color Trangle
    }
`;

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vertexShaderSource);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fragmentShaderSource);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionAttributeLocation = webgl.getAttribLocation(program, 'position');
webgl.enableVertexAttribArray(positionAttributeLocation);
webgl.vertexAttribPointer(positionAttributeLocation, 3, webgl.FLOAT, false, 0, 0);
webgl.useProgram(program);


//Draw 3D triangles
webgl.drawArrays(webgl.TRIANGLES, 0, 3);








