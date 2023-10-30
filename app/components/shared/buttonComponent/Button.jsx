/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { cls } from '../../helpers/utils'

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-300',
  disabled: 'opacity-50 cursor-not-allowed',
  pill: 'rounded',
  size: {
    small: 'px-2 py-1 text-sm',
    normal: 'px-4 py-2',
    large: 'px-8 py-3 text-lg'
  },
  variant: {
    primary: 'outline-none bg-swBlue hover:bg-swBlue text-white',
    secondary: 'outline-none bg-gray-100 hover:bg-swBlue focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
    danger: 'outline-none bg-red-400 hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white'
  }
}

const Button = forwardRef(
  (
    {
      children,
      type = 'button',
      className,
      variant = 'primary',
      size = 'normal',
      pill,
      disabled = false,
      ...props
    }, ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  ));

export default Button;