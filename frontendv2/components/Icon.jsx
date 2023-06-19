import { Icon } from '@rneui/themed';

export default function(props) {
    const type = props.props[0];
    const name = props.props[1];
    const size = props.props[2];
    const color = props.props[3];
    return (
        <Icon 
            type = {type}
            name = {name}
            size = {size}
            color = {color}
        />
    ) 
}