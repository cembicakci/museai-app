import { Svg, Path, Polyline, Line } from 'react-native-svg'

export const LogoutIcon = ({ width = '24', height = '24', color = '#bdbdbd' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-log-out">
            <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></Path>
            <Polyline points="16 17 21 12 16 7"></Polyline>
            <Line x1="21" y1="12" x2="9" y2="12"></Line>
        </Svg>
    )
}