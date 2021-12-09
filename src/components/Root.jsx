import {useState} from 'react'
import Timer from './Timer.jsx'
import Modal from './Modal.jsx'

export default function Root(){
    const [open, setOpen] = useState(false)
    return(
        <div className="mt-8 sm:w-full md:w-full lg:full flex flex-col items-center">
            <p className="font-bold text-3xl md:text-5xl ">Tecnica pomodoro</p>
            <Timer />
            <button className="mb-8" onClick={()=>setOpen(true)}>Mas informacion de Pomodoro</button>
            {
                open ? <Modal /> : null
            }
            <div className="bg-red-500 w-full h-11 flex flex-row justify-center items-center">
                <p className="text-white font-light text-sm">Coded by Rigoberto Alcantar</p>
            </div>
        </div>
    )
}