module.exports = {
    "extends": [
      "airbnb-base",
    ],
    "env": {
      jest: true,
    },
    "ignorePatterns": [
      "models/index.js",
    ],
    "rules": {
      "no-param-reassign": ["error", { "props": false }],
      "max-len": [1, 120],
    }
};
