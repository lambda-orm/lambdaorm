#!/usr/bin/env node
import yargs from 'yargs'
import { InitCommand } from './cli/cmd/init'
import { VersionCommand } from './cli/cmd/version'
import { DropCommand } from './cli/cmd/drop'
import { SyncCommand } from './cli/cmd/sync'
import { ImportCommand } from './cli/cmd/import'
import { ExportCommand } from './cli/cmd/export'
import { ExpressionCommand } from './cli/cmd/expression'
import { ModelCommand } from './cli/cmd/model'

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.command(new DropCommand())
	.command(new SyncCommand())
	.command(new ImportCommand())
	.command(new ExportCommand())
	.command(new ExpressionCommand())
	.command(new ModelCommand())
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
