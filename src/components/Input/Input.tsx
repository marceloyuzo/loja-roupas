import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
   type: string,
   placeholder: string,
   name: string,
   register: UseFormRegister<any>,
   error?: string,
   rules?: RegisterOptions
}

export function Input({type, placeholder, name, error, register, rules}: InputProps) {
   return (
      <div>
         <input 
            className="w-full border-2 rounded-md h-11 px-2"
            type={type}
            placeholder={placeholder}
            id={name}
            {...register(name, rules)}
         />
         {error && <p className="ml-1 mb-2 text-red-600">{error}</p>}
      </div>
   )
}