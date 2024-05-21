import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
   type: string,
   placeholder: string,
   name: string,
   register: UseFormRegister<any>,
   error?: string,
   rules?: RegisterOptions,
   readOnly: boolean
}

export function Input({type, placeholder, name, error, readOnly, register, rules}: InputProps) {
   return (
      <div className="relative w-full">
         <input 
            className="w-full border-2 rounded-md h-11 px-2 outline-none"
            type={type}
            placeholder={placeholder}
            id={name}
            {...register(name, rules)}
            readOnly={readOnly}
         />
         {error && <p className="absolute top-0 right-2 text-red-600">{error}</p>}
      </div>
   )
}