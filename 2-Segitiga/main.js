function main() {
  let canvas = document.getElementById("myCanvas");
  let gl = canvas.getContext("webgl");

  /**
   * Definisikan vertex-vertex
   */
  let vertices = [
    0.0, 0.5,    //titik A
    0.5, -0.5,   //titik B
    // 0.5, -0.5,   //titik B
    -0.5, -0.5,   //titik C
    // -0.5, -0.5,   //titik C
    // // 0.0, 0.5,    //titik A
    // -0.5, 0.5    //titik D
  ];

  // Definisikan buffer untuk 3 vertices
  let positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  let vertextShaderCode =`
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
  `;

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertextShaderCode);
  gl.compileShader(vertexShader);

  // Definisi fragment
  let fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `;

  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Definisi shader program
  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Bind buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  let aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1.0, 1.0, 1.0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Gambar titik berpola segitigas
  // gl.drawArrays(gl.POINTS, 0, 6);

  /**
   * Gambar segitiga (konekin garis secara berurutan)
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
   */
  // gl.drawArrays(gl.LINES, 0, 6);     // 1 titik terlibat dlm 1 garis
  // gl.drawArrays(gl.LINE_LOOP, 0, 3); // 1 titik terlibat dlm >1 garis
  // gl.drawArrays(gl.LINE_STRIP, 0, 4);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3); // kanan-kiri
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 3); // atas-bawah
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
