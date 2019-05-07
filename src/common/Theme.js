import {Platform} from "react-native";
import {Dimensions} from "react-native"

const {width, height} = Dimensions.get('window');

export const ThemeColor = '#13B8BF';
export const ThemeDarkColor = '#01888D';
export const ThemePinkColor = '#FF61AB';
export const GrayTextColor = '#7E7E8F';
export const GrayImageColor = '#BBBCCD';
export const GrayBackgroundColor = '#F8F8F8';
export const GrayDividerColor =  '#E7E7F0';
export const WhiteBackgroundColor = '#FCFCFC';

export const HeaderIconSize = 28;

export const Container = {
  flex: 1, backgroundColor: 'white',
};
export const ContainerWithPadding = {
  flex: 1, backgroundColor: 'white', paddingRight: 15, paddingLeft: 15,
};
export const RightwardBiasedBackButton = {
  backgroundColor: 'white', width: width * 0.15
};
export const ItemMargin = {
  marginBottom: 5,
  marginTop: 5,
};
export const ListMargin = {
  marginLeft: 15,
  marginRight: 15,
};

export const DebugLayout = {
  borderWidth: 1, borderColor: 'black',
};

export const DebugLayoutBlue = {
  borderWidth: 1, borderColor: 'blue',
};

export const TitleText = {
  fontSize: 24,
  color: 'black',
  fontFamily: 'NanumSquareEB',
};

export const LargeSubtitleText = {
  fontSize: 21,
  color: 'black',
  fontFamily: 'NanumSquareB',
};

export const SubtitleText = {
  fontSize: 18,
  color: 'black',
  fontFamily: 'NanumSquareB',
};

export const RetrieveTitle = {
  fontSize: 20,
  color: 'black',
  fontFamily: 'NanumSquareB'
};
export const ContentText = {
  fontSize: 14,
  color: 'black',
  fontFamily: 'NanumSquareR',
};

export const ContentTextBold = {
  ...ContentText,
  fontFamily: 'NanumSquareB',
};


export const SmallContentText = {
  fontSize: 12,
  color: 'black',
  fontFamily: 'NanumSquareL',
};

export const SmallContentTextBold = {
  ...SmallContentText,
  fontFamily: 'NanumSquareB',
};


export const BoldShadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
    },
    android: {
      elevation: 12,
    },
  }),
};
export const Shadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 20,
    },
    android: {
      elevation: 7,
    },
  }),
};

export const LightShadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
    },
    android: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
  }),
};
