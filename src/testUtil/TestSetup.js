/**
 * Script that is called when the testing framework is setup
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});