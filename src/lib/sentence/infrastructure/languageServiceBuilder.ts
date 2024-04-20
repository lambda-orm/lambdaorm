import { LanguagesService } from '../../language/application'
import { NoSqlLanguageAdapter } from './adapters/NoSql/language'
import { SqlLanguageAdapter } from './adapters/Sql/language'
import { OrmH3lp } from '../../shared/infrastructure'

export class SentenceLanguageServiceBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:OrmH3lp) {}

	public build ():LanguagesService {
		return new LanguagesService()
			.add(new SqlLanguageAdapter(this.helper))
			.add(new NoSqlLanguageAdapter(this.helper))
	}
}
