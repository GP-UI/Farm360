import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor: string
  children: ReactNode
}

function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-medium text-stone-700">
        {label}
      </label>
      {children}
    </div>
  )
}

export default FormField
