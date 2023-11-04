module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: [{ rules: { ticket: ({header,raw}) => {
                    const re = /^#\d+$/
                    const lines = raw.replace(header, '').trim().split('\n')                    
                    return [ lines.some((line) => re.test(line)), 'ticket number is required, example #235' ]
                }}}],
    rules: {
        'header-max-length': [1, 'always', 72],
        'type-enum': [2, 'always', [ 'ci', 'feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'revert', 'chore']],
        ticket: [2, 'always']
    }
}
