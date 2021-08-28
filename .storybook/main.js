module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.node = config.node || {};
    config.node.fs = `empty`;
    config.externals = config.externals || {};
    config.externals["react-native-sqlite-storage"] =
      "react-native-sqlite-storage";
    return config;
  },
};

