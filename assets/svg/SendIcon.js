import { Svg, Line, Polygon } from 'react-native-svg'
import Colors from '../../src/helpers/Colors'

export const SendIcon = ({ width = '24', height = '24', color = Colors.gray }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-send">
            <Line x1="22" y1="2" x2="11" y2="13"></Line>
            <Polygon points="22 2 15 22 11 13 2 9 22 2"></Polygon>
        </Svg>
    )
}