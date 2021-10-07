#!/usr/bin/env node
// eslint-disable-next-line no-unused-expressions
// require('yargs/yargs')(process.argv.slice(2))
// .commandDir('cmd')
// .demandCommand()
// .help()
// .argv

import yargs from 'yargs'
import { InitCommand } from './cli/cmd/init'
import { VersionCommand } from './cli/cmd/version'

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv

require('yargonaut')
	.style('blue')
	.style('yellow', 'required')
	.helpStyle('green')
	.errorsStyle('red')
