import { createIconSet } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';

const glyphMap: { [key: string]: number } = {};
icoMoonConfig.icons.forEach(icon => {
  glyphMap[icon.properties.name] = icon.properties.code;
});

const fontName = 'IcoMoon';
const fontFile = require('../assets/fonts/app_icons.ttf');

const Icon = createIconSet(glyphMap, fontName, fontFile);
export default Icon;
