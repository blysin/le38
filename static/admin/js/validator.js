var YrValidator = (function($) {
    return {};
})($);

YrValidator.replaceAllSpace = function(val){
    if(!val){
        return "";
    }
    return val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

YrValidator.isNotNegativeInteger = function(val){
    var positiveIntegerRegex = /^0|[1-9]\d*$/;
    return positiveIntegerRegex.test(val);
}

YrValidator.isPositiveFloatingPointNumber = function(val){
    var positiveFloatingPointNumberRegex = /^[1-9]\d*|[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
    return positiveFloatingPointNumberRegex.test(val);
}

