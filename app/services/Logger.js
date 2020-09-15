import Config from 'react-native-config';

function Info(message, tag) {
  if (Config.NODE_ENV === 'development') {
    console.info('========= START INFO =========\n');
    console.info(tag);
    console.info('\n');
    console.info(message);
    console.info('========= END INFO =========\n');
  }
}

module.exports = { Info };
