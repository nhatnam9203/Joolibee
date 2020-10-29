import Config from 'react-native-config';

/**
 * Logger info
 * @param {*} message : info message
 * @param {*} tag : info tag
 */
function info(message, tag) {
  if (Config.NODE_ENV !== 'production') {
    console.log('\n');
    console.info('[Jollibee]  ', tag);
    console.info(
      typeof message !== 'string' ? JSON.stringify(message) : message,
    );
    console.log('\n');
  }
}

/**
 * Logger log
 * @param {*} message : log message
 * @param {*} tag : log tag
 */
function log(message, tag) {
  if (Config.NODE_ENV !== 'production') {
    console.log('\n');
    console.log('[Jollibee]  ', tag);
    console.log(
      typeof message !== 'string' ? JSON.stringify(message) : message,
    );
    console.log('\n');
  }
}

/**
 * Logger debug
 * @param {*} message : log message
 * @param {*} tag : log tag
 */
function debug(message, tag) {
  if (Config.NODE_ENV !== 'production') {
    console.log('\n');
    console.log('[Jollibee]  ', tag);
    console.debug(
      typeof message !== 'string' ? JSON.stringify(message) : message,
    );
    console.log('\n');
  }
}

/**
 * Logger error
 * @param {*} message : log message
 * @param {*} tag : log tag
 */
function error(message, tag) {
  if (Config.NODE_ENV !== 'production') {
    console.log('\n');
    console.log('[Jollibee]  ', tag);
    console.error(
      typeof message !== 'string' ? JSON.stringify(message) : message,
    );
    console.log('\n');
  }
}

module.exports = { info, log, debug, error };
