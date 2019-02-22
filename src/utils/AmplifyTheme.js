/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

export const Container = {
  backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)"
  //marginTop:"-52px"
};

export const FormContainer = {
  textAlign: "center",
  marginTop: "0%"
  //margin: "5% auto 50px"
};

export const FormSection = {
  height: "100%",
  marginTop: "15%",
  position: "relative",
  marginBottom: "20px",
  backgroundColor: "#fff",
  padding: "35px 40px",
  textAlign: "left",
  display: "inline-block",
  borderRadius: "6px",
  boxShadow: "1px 1px 4px 0 rgba(0,0,0,0.15)"
};

export const FormField = {
  marginBottom: "22px"
};

export const NavBar = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)",
    height: "0%"
};
export const NavRight = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)",
    height: "0%"
};
export const Nav = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)",
    height: "0%"
};
export const NavItem = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)",
    height: "0%"
};
export const NavButton = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)",
    height: "0%"
};

//export const Container = {'backgroundImage': "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/background-light.png)"};
//export const FormContainer = {};
//export const FormSection = {};
//export const FormField = {};
export const SectionHeader = {};
export const SectionBody = {};
export const SectionFooter = {};
export const SectionFooterPrimaryContent = {};
export const SectionFooterSecondaryContent = {};
export const Input = {borderColor:"#4286f4"};
export const Button = {backgroundColor:"#4286f4", padding: "10px"};
export const PhotoPickerButton = {};
export const PhotoPlaceholder = {};
export const SignInButton = {};
export const SignInButtonIcon = {};
export const SignInButtonContent = {};
export const Strike = {};
export const StrikeContent = {};
export const ActionRow = {};
export const FormRow = {};
export const A = {color:"#4286f4"};
export const Hint = {};
export const Radio = {};
export const InputLabel = {};
export const AmazonSignInButton = {};
export const FacebookSignInButton = {};
export const GoogleSignInButton = {};
export const OAuthSignInButton = {};
export const Toast = {};
// export const NavBar = {};
// export const NavRight = {};
// export const Nav = {};
// export const NavItem = {};
// export const NavButton = {};

const AmplifyTheme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formField: FormField,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  photoPickerButton: PhotoPickerButton,
  photoPlaceholder: PhotoPlaceholder,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  amazonSignInButton: AmazonSignInButton,
  facebookSignInButton: FacebookSignInButton,
  googleSignInButton: GoogleSignInButton,
  oAuthSignInButton: OAuthSignInButton,

  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,

  hint: Hint,
  radio: Radio,
  inputLabel: InputLabel,
  toast: Toast,

  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton
};

export default AmplifyTheme;
