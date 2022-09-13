const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setClearColor(0x00000, 1);
        renderer.clear();

        //new new THREE.PerspectiveCamera(FOV, viewAspectRatio, zNear, zFar)
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const width = 5;  // ui: width
		const height = 5;  // ui: height

        const planegeometry = new THREE.PlaneGeometry(width, height);
		const textureFront = new THREE.TextureLoader().load('./images/board.jpg');
		const textureBack = new THREE.TextureLoader().load('./images/brown.jpg');
        const planematerial = [
            new THREE.MeshBasicMaterial({map: textureFront , side: THREE.FrontSide }),
            new THREE.MeshBasicMaterial({map: textureBack , side: THREE.BackSide})
        ];

        
         Shader_material = new THREE.ShaderMaterial({
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            side: THREE.BackSide,
         

        });

        //width', 'height', and 'depth'
        const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
        const texture1 = new THREE.TextureLoader().load('./images/1.png');
        const texture2 = new THREE.TextureLoader().load('./images/2.png');
        const texture3 = new THREE.TextureLoader().load('./images/3.png');
        const texture4 = new THREE.TextureLoader().load('./images/4.png');
        const texture5 = new THREE.TextureLoader().load('./images/5.png');
        const texture6 = new THREE.TextureLoader().load('./images/6.png');
        const material = [
            new THREE.MeshBasicMaterial({map: texture1}),
            new THREE.MeshBasicMaterial({map: texture2}),
            new THREE.MeshBasicMaterial({map: texture3}),
            new THREE.MeshBasicMaterial({map: texture4}),
            new THREE.MeshBasicMaterial({map: texture5}),
            new THREE.MeshBasicMaterial({map: texture6})
        ];
        
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = 0.5;
        cube.position.z = 1.5;
        scene.add(cube);
        

		const color = 0x00FFFF;
        const intensity = 10;
        const distance = 100;
        
        const light = new THREE.DirectionalLight(color, intensity, distance);
		light.position.set(10, 10, 10);
        scene.add(light);

        const mesh = new THREE.Mesh( planegeometry, planematerial[0] );
		const mesh2 = new THREE.Mesh( planegeometry, planematerial[1] );

        scene.add( mesh );
		scene.add( mesh2 );

        scene.rotateX(-1.05);
        scene.rotateY(-0.02);

 
        renderer.render(scene, camera);

        document.onkeydown = function(event) {
            if (event.keyCode == 37) {
                scene.rotateZ(0.05);
                scene.position.x += 0.4;
                camera.position.x += 0.4;
            }
            else if (event.keyCode == 38) {
                scene.rotateX(0.05);
            }
            else if (event.keyCode == 39) {
                scene.rotateZ(-0.05);
                scene.position.x -= 0.4;
                camera.position.x -= 0.4;
            }
            else if (event.keyCode == 40) {
                scene.rotateX(-0.05);
            }
            else if (event.keyCode == 109) {
                camera.position.z += 0.5;
            }
            else if (event.keyCode == 107) {
                camera.position.z -= 0.5;
            }
        };

        var screenW = window.innerWidth;
        var screenH = window.innerHeight; 
        var speedx = 0, speedy = 0; 
		var mouseX = 0, mouseY = 0, mouseDown = false, mousemove = false; 

        var click=0;

        document.onmousemove = function(event){
            mouseX = event.clientX;
            mouseY = event.clientY;
            mousemove = true;
         }
        document.onmousedown = function(event){
                mouseDown = true;
                click++;
                console.log(click);
        
                if(click%2==0)
                {
                    const planematerial = [
                        new THREE.MeshBasicMaterial({map: textureFront , side: THREE.BackSide }),
                        new THREE.MeshBasicMaterial({map: textureBack , side: THREE.FrontSide})
                    ];
                        const mesh = new THREE.Mesh( planegeometry, planematerial[0] );
                        const mesh2 = new THREE.Mesh( planegeometry,  planematerial[1] );
                        scene.add( mesh );
                        scene.add( mesh2 );
                }
                else
                {
                    const planematerial = [
                        new THREE.MeshBasicMaterial({map: textureFront , side: THREE.FrontSide }),
                        new THREE.MeshBasicMaterial({map: textureBack , side: THREE.BackSide})
                    ];
                        const mesh = new THREE.Mesh( planegeometry, planematerial[1] );
                        const mesh2 = new THREE.Mesh( planegeometry,  planematerial[0] );
                        scene.add( mesh );
                        scene.add( mesh2 );
                }
        };

        document.onmouseup = function(event){
             mouseDown = false;
        };

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            

            speedy =  (screenH / 2 - mouseY) / 40;
            speedx =  (screenW / 2 - mouseX) / 40;
            if (mouseDown && mousemove){
                scene.rotation.x = speedy;
                scene.rotation.y = speedx;
            }
           
            renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
            renderer.render( scene, camera );
        };

        animate();