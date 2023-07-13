import { Svg, Polyline } from 'react-native-svg'
import Colors from '../../src/helpers/Colors'

export const ArrowDownIcon = ({ width = '18', height = '18', color = '#000' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-chevron-down">
            <Polyline points="6 9 12 15 18 9"></Polyline>
        </Svg>
    )
}