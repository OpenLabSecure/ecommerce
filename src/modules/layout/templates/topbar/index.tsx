import { LocationEditIcon } from "lucide-react"
import React from "react"

export default function Topbar() {
  return (
    <div>
      <div className="bg-secundary-anaranjado text-white text-sm px-4 py-1 flex justify-between h-[30px]">
        <div className="flex items-center">
            <LocationEditIcon size={15}/>
            <span className=" ml-2 text-white text-[13px] flex">Distrito, <p className="font-medium">Provincia</p></span>
        </div>
        <div className="flex gap-4 text-[13px]">
          <button className="px-2 hover:bg-white hover:rounded-xl hover:text-black">Ofertas</button>
          <button className="px-2 hover:bg-white hover:rounded-xl hover:text-black">Nuestras Tiendas</button>
          <button className="px-2 hover:bg-white hover:rounded-xl hover:text-black">Marcas</button>
          <button className="px-2 file:hover:bg-white hover:rounded-xl hover:text-black">Productos</button>
        </div>
      </div>
    </div>
  )
}
