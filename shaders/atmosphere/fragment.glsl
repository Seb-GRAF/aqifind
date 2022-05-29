varying vec3 vertexNormal;

void main() {
  float intensity = pow(0.3 - dot(vertexNormal, vec3(0.5, -0.5, 1.0)), 2.0);
  gl_FragColor = vec4(0.4, 0.5, 1.0, 2.0) * intensity;
}