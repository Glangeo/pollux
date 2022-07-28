/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import moduleAlias from 'module-alias';

/**
 * Loads aliases from tsconfig to require.resolce
 */
export function loadAliases(
  tsConfigPath = path.join(process.cwd(), 'tsconfig.json')
): void {
  const tsconfig = require(tsConfigPath);

  for (const alias in tsconfig.compilerOptions.paths) {
    const aliasName = alias.replace('/*', '');
    const [aliasPath] = tsconfig.compilerOptions.paths[alias];
    const rawAliasPath = aliasPath.replace('/*', '');

    moduleAlias.addAlias(aliasName, path.join(process.cwd(), rawAliasPath));
  }
}
