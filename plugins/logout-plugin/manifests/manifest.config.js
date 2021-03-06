const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: "@applicaster/quick-brick-inplayer-logout",
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "inPlayer Hook Plugin Logout QuickBrick",
  description: "InPlayer Hook Plugin Logout",
  type: "general",
  screen: true,
  react_native: true,
  identifier: "quick-brick-inplayer-logout",
  ui_builder_support: true,
  whitelisted_account_ids: ["5c9ce7917b225c000f02dfbc"],
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  npm_dependencies: ["@applicaster/quick-brick-inplayer"],
  preload: true,
  custom_configuration_fields: [],
  targets: ["mobile"],
  ui_frameworks: ["quickbrick"],
  styles: {
    fields: [
      {
        key: "background_color",
        type: "color_picker",
        label: "Background font color",
        initial_value: "#161b29ff",
      },
      {
        key: "title_font_ios",
        type: "ios_font_selector",
        label: "iOS title font",
        initial_value: "Montserrat-Bold",
      },
      {
        key: "title_font_android",
        type: "android_font_selector",
        label: "Android title font",
        initial_value: "Montserrat-Bold",
      },
      {
        key: "title_font_size",
        type: "number_input",
        label: "Title font size",
        initial_value: 15,
      },
      {
        key: "title_font_color",
        type: "color_picker",
        label: "Title font color",
        initial_value: "#ffffffff",
      },
      {
        key: "title_succeed_text",
        type: "text_input",
        label: "Text succeed title",
        initial_value: "Successfully Logged Out",
      },
      {
        key: "title_fail_text",
        type: "text_input",
        label: "Text failed title",
        initial_value: "Logout Failed",
      },
    ],
  },
  custom_configuration_fields: [
    {
      type: "tag_select",
      key: "completion_action",
      tooltip_text: "Defines what action plugin should do after user log out. ",
      options: [
        {
          text: "Go back to previous screen",
          value: "go_back",
        },
        {
          text: "Go back to home screen",
          value: "go_home",
        },
      ],
      initial_value: "go_back",
    },
  ],
};

function createManifest({ version, platform }) {
  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version,
    min_zapp_sdk: min_zapp_sdk[platform],
  };

  return manifest;
}

const min_zapp_sdk = {
  ios: "20.2.0-Dev",
  android: "20.0.0",
};
module.exports = createManifest;
