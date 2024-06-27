import * as THREE from 'three'
import fragmentShader from '../glsl/main.frag'
import vertexShader from '../glsl/main.vert'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap';
import Card from './card';
import Raycaster from './raycaster';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class World {

  constructor(container) {
    this.clock = new THREE.Clock()
    // Scene
    this.scene = new THREE.Scene()

    // sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    this.camera.position.set(0, 0, 0)
    this.scene.add(this.camera)

    this.uniforms = {
      time: { value: 1.0 }
    }

    const ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff , 2.0)
    // this.scene.add(directionalLight) 

    const loader = new THREE.CubeTextureLoader()
    loader.setPath('https://threejs.org/examples/textures/cube/Bridge2/')
    const textureCube = loader.load([ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ])

    // this.scene.background = textureCube
    // this.scene.background.setColorName('white')

    this.addObjects()

    this.renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    })
    this.renderer.setSize(sizes.width, sizes.height)


    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // this.raycaster = new Raycaster(this.scene, this.camera)
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    const t = this.clock.getElapsedTime() * 2
    this.uniforms.time.value = t
    this.controls.update()

    const rotationY = t * 0.1
    this.camera.rotateY(rotationY)

    // this.scene.traverse((obj) => {
    //   if (obj.render) obj.render(t)
    // })

    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)

  }

  addObjects() {

    const scene = this.scene

    const gltfLoader = new GLTFLoader()
    
    gltfLoader.load('model/room.glb', function(glb) {
      console.log(glb)
      console.log("loaded")
      
      // const scene = glb.scene
      // console.log(scene)
      
      glb.scene.position.x = 0.5
      glb.scene.position.y = -0.5
      glb.scene.position.z = -0.5
      glb.scene.scale.set(1.5, 1.5, 1.5)

      scene.add(glb.scene)
      // this.scene.add(glb.scene)
    })

  }

}

export default World