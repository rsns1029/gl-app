import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    placeHolderFontColor: string;
  }
}
