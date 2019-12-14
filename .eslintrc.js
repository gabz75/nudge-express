module.exports = {
    "extends": [
      "airbnb-base",
    ],
    "env": {
      jest: true,
    },
    "ignorePatterns": [
      "src/models/index.js",
    ],
    "settings": {
      "import/resolver": {
        "babel-plugin-root-import": [
          {
            "rootPathPrefix": "~",
            "rootPathSuffix": "./src",
          },
          {
            "rootPathPrefix": "tests",
            "rootPathSuffix": "./__tests__",
          },
        ]
      },
    },
    "rules": {
      "no-param-reassign": ["error", { "props": false }],
      "max-len": [1, 120],
    }
};
