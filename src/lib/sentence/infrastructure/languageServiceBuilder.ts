import { LanguagesService } from '../../language/application'
import { NoSqlLanguageAdapter } from './adapters/NoSql/language'
import { SqlLanguageAdapter } from './adapters/Sql/language'
import { Helper } from '../../shared/application'

export class SentenceLanguageServiceBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}

	public build ():LanguagesService {
		return new LanguagesService()
			.add(new SqlLanguageAdapter(this.helper))
			.add(new NoSqlLanguageAdapter(this.helper))
	}
}
