import React,{useId} from 'react'

 const input=React.forwardRef( function input({
    label,
    type="text",
    classname="",
    ...props
 },ref){
    const id=useId();
    return(
        <div className='w-full'>
            
                {label&&<label htmlFor={props.id}>{label}</label> }                                                                                      
            <input type={type}
            className={`${classname}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
 }
 )
export default input
