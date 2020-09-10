import TextField from '@material-ui/core/TextField'


const Input = ({ meta, ...props }) =>  {
    return (
        <TextField 
            variant="filled" 
            {...props} 
            {...meta.touched && meta.error && { helperText: meta.error, error: true }}
        />
    )
}

export default Input
