interface BaseUserTypes {
  role: string;
  name: string;
  isMarketing: boolean;
}

export interface NewUserDataTypes extends BaseUserTypes {
  email: string;
  password: string;
}

export interface NewSocialUserTypes extends BaseUserTypes {
  phone: string;
}
