import { Svg, Path, Polyline } from 'react-native-svg'

import Colors from '../../src/helpers/Colors'

export const HomeIcon = ({ width = '24', height = '24', color = Colors.gray }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-home">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></Path>
            <Polyline points="9 22 9 12 15 12 15 22"></Polyline>
        </Svg>
    )
}
