import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { AnimationMixer, Clock, Box3 } from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-human',
  standalone: true,
  imports: [],
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.scss'],
})
export class HumanComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private mixer!: AnimationMixer;
  private clock = new Clock();
  private controls!: OrbitControls;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initThree();
      this.loadModel();
      this.animate();
    }
  }

  // Добавляем HostListener для обработки изменения размеров окна
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // Получаем новый размер окна
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Обновляем размеры камеры
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Обновляем размеры рендера
    this.renderer.setSize(width, height);
  }

  private initThree() {
    // Создаём рендерер
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // Прозрачный фон
    if (this.rendererContainer) {
      this.rendererContainer.nativeElement.appendChild(
        this.renderer.domElement
      );
    }

    // Настраиваем камеру
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15); // Изначально размещаем камеру
    this.camera.lookAt(0, 0, 0);

    // Добавляем свет
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Настроим контроллеры камеры
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.update();
    this.controls.enableRotate = false; // Отключаем вращение
    this.controls.enableZoom = false; // Отключаем зум
  }

  private loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/supeprBeerman.glb', // Убедитесь, что путь к модели правильный
      (gltf) => {
        this.scene.add(gltf.scene);

        // Вычисляем размеры модели
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());

        // Центрируем модель
        gltf.scene.position.sub(center); // Перемещаем модель в (0, 0, 0)
        gltf.scene.position.y += 10;
        // Масштабируем модель, если нужно
        gltf.scene.scale.set(1.0, 1.0, 1.0); // Попробуйте уменьшить или увеличить масштаб, если нужно

        // Обновляем камеру
        const size = box.getSize(new THREE.Vector3()).length();
        const offset = size * 2.5; // Увеличиваем расстояние камеры от модели
        this.camera.position.set(0, 0, offset); // Ставим камеру на оптимальное расстояние
        this.camera.lookAt(0, 0, 0); // Камера смотрит в центр модели

        // Если есть анимации
        if (gltf.animations.length) {
          this.mixer = new THREE.AnimationMixer(gltf.scene);
          const action = this.mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки модели:', error);
      }
    );
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();

    // Обновляем анимации
    if (this.mixer) {
      this.mixer.update(delta);
    }

    // Обновляем рендеринг сцены
    this.renderer.render(this.scene, this.camera);

    // Обновляем контроллер камеры
    this.controls.update();
  };
}
