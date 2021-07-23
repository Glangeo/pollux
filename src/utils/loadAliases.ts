/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import moduleAlias from 'module-alias';

export function loadAliases(): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const tsconfig = require(path.join(process.cwd(), 'tsconfig.json'));

  for (const alias in tsconfig.compilerOptions.paths) {
    const aliasName = alias.replace('/*', '');
    const [aliasPath] = tsconfig.compilerOptions.paths[alias];
    const rawAliasPath = aliasPath.replace('/*', '');

    moduleAlias.addAlias(aliasName, path.join(process.cwd(), rawAliasPath));
  }
}
