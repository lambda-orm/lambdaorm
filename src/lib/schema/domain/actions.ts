
export enum ObservableAction {
	select = 'select',
	insert = 'insert',
	bulkInsert = 'bulkInsert',
	update = 'update',
	delete = 'delete',
	ddl = 'ddl'
}

export enum SentenceCrudAction {
	undefined = 'undefined',
	select = 'select',
	insert = 'insert',
	update = 'update',
	delete = 'delete'
}
export enum SentenceAction {
	select = 'select',
	insert = 'insert',
	bulkInsert = 'bulkInsert',
	update = 'update',
	delete = 'delete',
	truncateEntity = 'truncateEntity',
	createEntity = 'createEntity',
	createSequence = 'createSequence',
	createFk = 'createFk',
	createIndex = 'createIndex',
	alterProperty = 'alterProperty',
	addProperty = 'addProperty',
	addPk = 'addPk',
	addUk = 'addUk',
	addFk = 'addFk',
	dropSequence = 'dropSequence',
	dropEntity = 'dropEntity',
	dropProperty = 'dropProperty',
	dropPk = 'dropPk',
	dropUk = 'dropUk',
	dropFk = 'dropFk',
	dropIndex = 'dropIndex',
	ddl = 'ddl'
}
