const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "inPlayer Hook Plugin",
  description: "InPlayer Hook Plugin",
  type: "general",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  preload: true,
  npm_dependencies: [
    "react-native-dropdownalert@4.2.1",
    "@applicaster/applicaster-iap@0.1.4",
  ],
  styles: {
    fields: [
      {
        key: "title_font_ios",
        type: "ios_font_selector",
        label: "iOS title font",
      },
      {
        key: "title_font_android",
        type: "android_font_selector",
        label: "Android title font",
      },
      {
        key: "title_font_size",
        type: "number_input",
        label: "Title font size",
      },
      {
        key: "title_font_color",
        type: "color_picker",
        label: "Title font color",
      },
      {
        key: "title_font_text",
        type: "text_input",
        label: "Text title",
      },
      {
        key: "fields_font_ios",
        type: "ios_font_selector",
        label: "iOS title font",
      },
      {
        key: "fields_font_android",
        type: "android_font_selector",
        label: "Android title font",
      },
      {
        key: "fields_font_size",
        type: "number_input",
        label: "Title font size",
      },
      {
        key: "fields_font_color",
        type: "color_picker",
        label: "Title font color",
      },
      {
        key: "fields_email_text",
        type: "text_input",
        label: "Email field placeholder text",
      },
      {
        key: "fields_password_text",
        type: "text_input",
        label: "Password field placeholder text",
      },
      {
        key: "fields_password_confirmation_text",
        type: "text_input",
        label: "Password field confirmation placeholder text",
      },
      {
        key: "fields_name_text",
        type: "text_input",
        label: "Name field placeholder text",
      },
      {
        key: "forgot_password_font_ios",
        type: "ios_font_selector",
        label: "iOS forgot password font",
      },
      {
        key: "forgot_password_font_android",
        type: "android_font_selector",
        label: "Android forgot password font",
      },
      {
        key: "forgot_password_font_size",
        type: "number_input",
        label: "Forgot password font size",
      },
      {
        key: "forgot_password_font_color",
        type: "color_picker",
        label: "Forgot password font color",
      },
      {
        key: "forgot_password_text",
        type: "text_input",
        label: "Forgot password title",
      },
      {
        key: "action_button_font_ios",
        type: "ios_font_selector",
        label: "iOS action button font",
      },
      {
        key: "action_button_font_android",
        type: "android_font_selector",
        label: "Android action button font",
      },
      {
        key: "action_button_font_size",
        type: "number_input",
        label: "Action button font size",
      },
      {
        key: "action_button_font_color",
        type: "color_picker",
        label: "Action button font Color",
      },
      {
        key: "action_button_login_text",
        type: "text_input",
        label: "Action button login title",
      },
      {
        key: "action_button_signin_text",
        type: "text_input",
        label: "Action button sign in title",
      },
      {
        key: "create_account_link_font_ios",
        type: "ios_font_selector",
        label: "iOS Create account link font",
      },
      {
        key: "create_account_link_font_android",
        type: "android_font_selector",
        label: "Android Create account link font",
      },
      {
        key: "create_account_link_font_size",
        type: "number_input",
        label: "Create account link font size",
      },
      {
        key: "create_account_link_font_color",
        type: "color_picker",
        label: "Create account link font color",
      },
      {
        key: "create_account_link_text",
        type: "text_input",
        label: "Create account link title",
      },
    ],
  },
  custom_configuration_fields: [
    {
      type: "text",
      key: "in_player_client_id",
      tooltip_text: "In Player Client ID",
      default: "",
    },
    {
      type: "text",
      key: "in_player_referrer",
      tooltip_text: "In Player Referrer URL",
      default: "",
    },
  ],
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"],
};

function createManifest({ version, platform }) {
  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version,
    api: api[platform],
    project_dependencies: project_dependencies[platform],
    min_zapp_sdk: min_zapp_sdk[platform],
    extra_dependencies: extra_dependencies[platform],
  };

  return manifest;
}

const api = {
  ios: {},
  android: {
    require_startup_execution: false,
    class_name: "com.applicaster.reactnative.plugins.APReactNativeAdapter",
    react_packages: [
      "com.applicaster.quickbrickinplayer.reactnative.InPlayerPackage",
    ],
  },
};

const project_dependencies = {
  ios: [],
  android: [
    {
      InPlayerLogin:
        "./quick_brick/node_modules/@applicaster/quick-brick-inplayer/android",
    },
  ],
};

const extra_dependencies = {
  ios: [
    {
      InPlayerLogin:
        ":path => './quick_brick/node_modules/@applicaster/quick-brick-inplayer/InPlayerLogin.podspec'",
    },
    {
      ApplicasterIAP:
        ":path => 'node_modules/@applicaster/applicaster-iap/iOS/ApplicasterIAP.podspec'",
    },
  ],
  android: [],
};
const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
};

module.exports = createManifest;
