const winston = require('winston');
const tsFormat = () => new Date().toLocaleString();


winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
			timestamp: tsFormat
        })
    ],
    exitOnError: false
});

logger.info('Logger started');

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
