// Verify a fresh copy against its public Git-pinned runtime dependency.
import {cpSync,lstatSync,mkdirSync,mkdtempSync,readdirSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,relative,sep} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const runtimeName='@intelligent-iterations/ii-agent-runtime';
const root=fileURLToPath(new URL('../',import.meta.url));
const spec=JSON.parse(readFileSync(join(root,'package.json'),'utf8')).dependencies[runtimeName];
assert.match(spec,/^git\+https:\/\/github\.com\/intelligent-iterations\/ii-agent-runtime\.git#[a-f0-9]{40}$/);
const excluded=new Set(['.git','node_modules','dist','config.json','.env','results','.runtime']);
const copied=path=>{const parts=relative(root,path).split(sep);return !excluded.has(parts[0])&&!parts.includes('node_modules')&&!parts.includes('results');};
const temp=mkdtempSync(join(tmpdir(),'agentic-video-standalone-'));
const env={...process.env,GIT_CONFIG_GLOBAL:'/dev/null',GIT_CONFIG_NOSYSTEM:'1',GIT_TERMINAL_PROMPT:'0',npm_config_cache:join(temp,'npm-cache')};
delete env.OPENAI_API_KEY;
const run=(command,args,cwd)=>execFileSync(command,args,{cwd,env,stdio:'inherit',timeout:600000});
try{
  const destination=join(temp,'demo');
  cpSync(root,destination,{recursive:true,filter:copied});
  for(const name of readdirSync(join(destination,'src')).filter(name=>name.endsWith('.ts'))){
    const source=readFileSync(join(destination,'src',name),'utf8');
    assert.ok(!/ii-agent-runtime(?:-internal)?\/src/.test(source),'consume installed package exports only');
  }
  run('npm',['ci','--no-audit','--no-fund'],destination);
  assert.ok(!lstatSync(join(destination,'node_modules',runtimeName)).isSymbolicLink(),'runtime must be installed, not linked to a parent checkout');
  for(const args of [['run','check'],['run','build']])run('npm',args,destination);
  const output=args=>execFileSync('node',args,{cwd:destination,env,encoding:'utf8',timeout:120000});
  assert.match(output(['dist/src/cli.js','--help']),/npm run demo/);
  assert.match(output(['dist/src/demo.js','--help']),/npm run demo -- --editor remotion/);
  run('node',['--test','dist/test/demo.test.js','dist/test/launcher.test.js'],destination);
  const missing=spawnSync('node',['dist/src/cli.js','--config','missing.json'],{cwd:destination,env,encoding:'utf8'});
  assert.equal(missing.status,1);assert.match(missing.stderr,/config: supply a readable JSON file/);assert.ok(!missing.stderr.includes(' at '));
  console.log('Fresh standalone copy: public runtime install, checks, build, compiled CLIs and demo tests passed.');
}finally{rmSync(temp,{recursive:true,force:true});}
