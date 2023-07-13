import { Svg, Circle, Line } from 'react-native-svg'

import Colors from '../../src/helpers/Colors'

export const ExploreIcon = ({ width = '24', height = '24', color = Colors.gray }) => {

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-search">
            <Circle cx="11" cy="11" r="8"></Circle>
            <Line x1="21" y1="21" x2="16.65" y2="16.65"></Line>
        </Svg>
    )
}
