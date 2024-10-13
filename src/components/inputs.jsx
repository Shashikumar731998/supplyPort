export const Input = (props) => {
    return <div className='form-group'>
        <label className="label">{props.label}</label>
        <input
                className="form-control"
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
    </div>
}
export const Select = (props) => {
    return <div className='form-group'>
        <label className="label">{props.label}</label>
        <select
                className="form-control"
                value={props.value}
                onChange={props.onChange}
            >
                {props.children}
            </select>
    </div>
}
// export const Div = (props) => { 
//     return <div className='bg-danger'>
//         {props.children}
//     </div>
// }