declare module 'react-native-vector-icons/Ionicons' {
  import React from 'react';
    import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
    // other props as needed
  }

  const Ionicons: React.ComponentType<IconProps>;

  export default Ionicons;
}
