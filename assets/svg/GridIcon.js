import { Svg, Rect } from 'react-native-svg'

import Colors from '../../src/helpers/Colors'

export const GridIcon = ({ width = '24', height = '24', color = Colors.gray }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-grid">
            <Rect x="3" y="3" width="7" height="7"></Rect>
            <Rect x="14" y="3" width="7" height="7"></Rect>
            <Rect x="14" y="14" width="7" height="7"></Rect>
            <Rect x="3" y="14" width="7" height="7"></Rect>
        </Svg>
    )
}