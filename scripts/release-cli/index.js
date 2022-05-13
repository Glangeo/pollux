const { program } = require('commander');
const { publishCmd, prepareCmd, setVersionCmd } = require('./commands');

program.addCommand(publishCmd).addCommand(prepareCmd).addCommand(setVersionCmd);

program.parse();
