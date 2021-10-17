#!/usr/bin/env node
import yargs from 'yargs'
import { InitCommand } from './cli/init'
import { VersionCommand } from './cli/version'
import { DropCommand } from './cli/drop'
import { SyncCommand } from './cli/sync'
import { ImportCommand } from './cli/import'
import { ExportCommand } from './cli/export'
import { RunCommand } from './cli/run'
// import { ModelCommand } from './cli/model'
import { UpdateCommand } from './cli/update'

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.command(new DropCommand())
	.command(new SyncCommand())
	.command(new ImportCommand())
	.command(new ExportCommand())
	.command(new RunCommand())
	// .command(new ModelCommand())
	.command(new UpdateCommand())
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
