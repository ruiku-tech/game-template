import english from './english'
import chinese_simple from './chinese_simple'
import Indonesia from './Indonesia'
import india from './india'
import viet from './viet'

let _lang=chinese_simple;

let i=0;
let LangTyle={
    cn:i++,
    en:i++,
    cn_tw:i++,
    idnsa:i++,
    id:i++,
    "zh-Hans":i++,
    hi:i++,
	vi:i++
}

let __list=[
    chinese_simple,
    english,
    chinese_simple,
    Indonesia,
    Indonesia,
    chinese_simple,
    india,
	viet
];

function setLanguage(name){
    _lang=__list[LangTyle[name]];
    if(!_lang)
        _lang=chinese_simple;
}
function get(){
    return _lang;
}

export default {
    setLanguage,get
}