const MAXIMUM_NUMBER_OF_FILE_CHANGES = 5

const ESLINT_COMMAND = 'eslint --max-warnings 10'
const PRETTIER_COMMAND = 'prettier --write'
const TYPESCRIPT_COMMAND = 'tsc -p tsconfig.json --noEmit'

module.exports = {
  '**/*.js?(x)': filenames => `${ESLINT_COMMAND} ${filenames.join(' ')}`,
  '**/*.ts?(x)': filenames => {
    console.log(`Total number of file changes before committing: ${filenames.length}`)
    if (filenames.length > MAXIMUM_NUMBER_OF_FILE_CHANGES) {
      console.log(
        `Changes has been made more than threshold(${MAXIMUM_NUMBER_OF_FILE_CHANGES}), running pre-commit command for the whole project`,
      )

      return [TYPESCRIPT_COMMAND, `${ESLINT_COMMAND} './src/**/*.{js,ts}'`]
    }

    return [TYPESCRIPT_COMMAND, `${ESLINT_COMMAND} ${filenames.join(' ')}`, `${PRETTIER_COMMAND} ${filenames.join(' ')}`]
  },
}
