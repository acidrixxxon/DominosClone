import EnzymeAdapter from '@cfaester/enzyme-adapter-react-18';
import { configure } from 'enzyme';

configure({ adapter: new EnzymeAdapter() });
