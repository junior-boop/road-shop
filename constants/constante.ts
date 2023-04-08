import { Dimensions } from "react-native";

const _w = Dimensions.get('screen').width
const _h = Dimensions.get('screen').height

export default {
    borderRadius : 18,
    borderRadius_2 : 56,
    icon_size : 24,
    icon_back : 150,
    h1 : 24,
    h2 : 20,
    h3 : 18,
    h4 : 16,
    p_size : 18,

    width : _w,
    height: _h,
    backgroundColor : '#F6F6F6',

    color_primary : '#004CFF',
    color_primary_10 : '#F0F4FF',
    color_primary_30 : '#CCDBFF',
    color_primary_50 : '#99B7FF',
    color_primary_70 : '#6694FF',
    color_primary_90 : '#3370FF',
    color_primary_130 : '#003DCC',
    color_primary_150 : '#001E66',
    color_secondary : '#f1f1f1',

    color_gray : '#191919',
    color_gray_primary : '#747474',
    color_gray_second : "#C4C4C4"
}