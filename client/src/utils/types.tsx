export interface GnbProps {
  type?: string;
}

export interface FlexProps {
  center?: boolean;
}

export interface TabProps {
  current?: boolean;
}

export interface IconProps {
  img: any;
}

export interface RightModalProps {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
}

export interface Message {
  message?: string;
}