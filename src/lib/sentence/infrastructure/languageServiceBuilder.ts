import { LanguagesService } from '../../language/application'
import { NoSqlLanguageAdapter } from './adapters/NoSql/language'
import { SqlLanguageAdapter } from './adapters/Sql/language'

export class SentenceLanguageServiceBuilder {
	public build ():LanguagesService {
		return new LanguagesService()
			.add(new SqlLanguageAdapter())
			.add(new NoSqlLanguageAdapter())
	}
}
