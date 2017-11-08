// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'local',
};

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc

config.globals = {
  'process.env'  : {
    NODE_ENV : JSON.stringify(config.env),
  },
  NODE_ENV     : config.env,
  __LOCAL__      : config.env === 'local',  // Git branch - develop : 本地环境
  __DEV__      : config.env === 'dev',      // Git branch - develop : 开发环境
  __QAIF__     : config.env === 'qa_if',    // Git branch - test    : 测试环境 - 接口测试
  __QAFC__     : config.env === 'qa_fc',    // Git branch - test    : 测试环境 - 功能测试
  __PRE__      : config.env === 'pre',      // Git branch - master  : 预发环境
  __ONLINE__  : config.env === 'online',    // Git branch - master  : 线上环境
};

module.exports = config;
