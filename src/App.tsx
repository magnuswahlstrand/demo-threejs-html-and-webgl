import {Canvas} from '@react-three/fiber'
import {Mesh} from 'three'
import React, {Suspense, useRef} from 'react'

import {Clone, ContactShadows, Html, OrbitControls, useGLTF} from '@react-three/drei'

function Page({onClick}: { onClick: () => void }) {

    return <div className="wrapper h-48">
        <div className="relative h-full overflow-auto">
            <div className="sticky top-0 h-full flex flex-col items-center justify-center bg-green-400">
                <h2 className="text-6xl font-bold text-center">Scroll</h2>
                <svg className="w-12 h-12 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="2.5"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/>
                </svg>
            </div>
            <div className="sticky top-0 h-full flex flex-col items-center justify-center bg-indigo-600 text-white p-4">
                <h2 className="text-6xl font-bold text-center">I am HTML</h2>
            </div>
            <div className="sticky top-0 h-full flex flex-col items-center justify-center bg-purple-600 text-white p-4">
                <h2 className="text-6xl text-center">I can contain <a
                    href="https://en.wikipedia.org/wiki/Hyperlink" className="underline font-semibold">links</a> and be
                    styled with <b>CSS</b></h2>
            </div>
            <div className="sticky top-0 h-full flex flex-col items-center justify-center bg-amber-600 text-white p-4">
                <h2 className="text-6xl text-center">... or images</h2>
                <img className={"rounded-xl mb-10"}
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_March_2010-1.jpg/320px-Cat_March_2010-1.jpg"/>
            </div>
            <div
                className="sticky top-0 h-full flex flex-col items-center justify-center bg-neutral-800 text-white p-4">
                <h2 className="text-6xl text-center">I can even interact with WebGL</h2>
                <button className="rounded-xl bg-white text-5xl text-black p-4 mt-5" onClick={() => onClick()}>Click
                    me
                </button>
            </div>
        </div>
    </div>
}

function Model() {
    const ref = useRef<Mesh>()

    const scene = useGLTF('/low-poly_macintosh_plus.glb')

    const handleClick = () => {
        if (!ref.current) return
        ref.current.rotation.x += 0.1
    }



    return (
        // @ts-ignore TODO: Fix
        <group ref={ref} rotation={[Math.PI, 0, Math.PI]} scale={2}>
            {/*@ts-ignore TODO: Fix */}
            <Clone object={scene.scene}/>
            <Html className="content" rotation-y={Math.PI / 2} position={[0.925, 0.80, 0.01]} transform occlude
                  scale={0.105}>
                <Page onClick={handleClick}/>
            </Html>
        </group>
    )
}

export default function App() {

    return (
        <>
            <Canvas camera={{position: [0, 9, 0], fov: 55}} color={"red"}>
                {/*<axesHelper args={[5]}/>*/}
                <pointLight position={[10, 10, 10]} intensity={1.5}/>
                <Suspense fallback={null}>
                    <group rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
                        <Model/>
                    </group>
                </Suspense>
                {/*@ts-ignore TODO: Fix*/}
                <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5}/>
                <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2}
                               maxPolarAngle={Math.PI / 2.2}/>
            </Canvas>
        </>
    )
}
