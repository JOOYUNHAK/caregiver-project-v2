import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import { join } from "path";
const YAML_CONFIG = 'config.yaml';

export default () => {
    console.log(__dirname)
    return yaml.load (
        readFileSync(join('C:\\Users\\user\\backend\\backend\\src\\config', YAML_CONFIG), 'utf8'),
    )as Record<string, any>
}