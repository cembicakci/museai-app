import { Svg, Circle, Path, Line } from 'react-native-svg'
import Colors from '../../src/helpers/Colors'

export const HelpIcon = ({ width = '24', height = '24', color = Colors.gray }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-help-circle">
            <Circle cx="12" cy="12" r="10"></Circle>
            <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></Path>
            <Line x1="12" y1="17" x2="12.01" y2="17"></Line>
        </Svg>
    )
}