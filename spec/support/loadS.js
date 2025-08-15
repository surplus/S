// install S in global namespace
//(eval || null)("this").S = require('../../dist/withsubclocks');
import S from '../../dist/S.js';
(eval || null)('this').S = S;
