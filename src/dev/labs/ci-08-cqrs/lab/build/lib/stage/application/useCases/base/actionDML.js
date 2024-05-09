"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageActionDML = void 0;
class StageActionDML {
    constructor(stageMappingService, domain, expressionFacade, executor, options) {
        // protected sentenceService: SentenceService
        this.arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o'];
        this.stageMappingService = stageMappingService;
        this.domain = domain;
        this.expressionFacade = expressionFacade;
        this.executor = executor;
        this.options = options;
        // this.sentenceService = sentenceService
    }
    sentence() {
        return __awaiter(this, void 0, void 0, function* () {
            const sentences = [];
            const queries = this.queries();
            for (const query of queries) {
                sentences.push(query.sentence);
            }
            return sentences;
        });
    }
    queries() {
        const queries = [];
        for (const i in this.domain.entities) {
            const entity = this.domain.entities[i];
            if (!this.domain.isChild(entity.name)) {
                const query = this.createQuery(entity);
                queries.push(query);
            }
        }
        return queries;
    }
    createInclude(entity, level = 0) {
        const arrowVariable = this.arrowVariables[level];
        const includes = [];
        for (const i in entity.relations) {
            const relation = entity.relations[i];
            if (relation.composite) {
                const childEntity = this.domain.getEntity(relation.entity);
                if (childEntity !== undefined) {
                    const childInclude = this.createInclude(childEntity, level + 1);
                    includes.push(`${arrowVariable}.${relation.name}${childInclude}`);
                }
            }
        }
        return includes.length === 0
            ? ''
            : `.include(${arrowVariable}=>[${includes.join(',')}])`;
    }
    getAllEntities(queries) {
        const entities = [];
        for (const p in queries) {
            const query = queries[p];
            entities.push(query.entity);
            if (query.includes && query.includes.length > 0) {
                const include = query.includes.map(q => q.query);
                const childrenEntities = this.getAllEntities(include);
                for (const i in childrenEntities) {
                    entities.push(childrenEntities[i]);
                }
            }
        }
        return entities;
    }
}
exports.StageActionDML = StageActionDML;
//# sourceMappingURL=actionDML.js.map