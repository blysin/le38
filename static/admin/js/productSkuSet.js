function convertToGridDataStore(mergedArray) {
    var gridDataArray = [];

    for (var i = 0; i < mergedArray.length; i++) {
        var gridData = new Object();
        var selfSku = mergedArray[i];
        var selfOptionValue = selfSku.split(',');
        var idArray = [];
        for (var j = 0; j
            < selfOptionValue.length; j++) {
            var tempOptionId = selfOptionValue[j].split('-')[0];
            var tempOptionDataIndex = gridColumnDataIndexPrefix + tempOptionId;
            var tempOptionDataValueIndex = gridColumnDataIndexPrefix + gridColumnDataValueIndexPrefix + tempOptionId;
            var tempOptionValueId = selfOptionValue[j].split('-')[1];
            var tempOptionValueLabel = selfOptionValue[j].split('-')[2];
            //idArray.push(tempOptionId);
            idArray.push(tempOptionValueId);
            gridData[tempOptionDataIndex] = tempOptionValueLabel;
            gridData[tempOptionDataValueIndex] = tempOptionValueId;
        }
        idArray.sort(function (a, b) {
            var aInt = parseInt(a);
            var bInt = parseInt(b);
            return aInt - bInt;
        });
        gridData.id = idArray.join('-');

        if (skuQuantityMap && skuQuantityMap[gridData.id]) {
            gridData.serverSku = true;
            gridData.count = skuQuantityMap[gridData.id];
        }
        if (skuSalePriceMap && skuSalePriceMap[gridData.id]) {
            gridData.salePrice = skuSalePriceMap[gridData.id];
        }
        if (skuOuterIdMap && skuOuterIdMap[gridData.id]) {
            gridData.outerId = skuOuterIdMap[gridData.id];
        }
        gridDataArray.push(gridData);
    }

    return gridDataArray;
}

function buildSku(allOptionValueArray) {

    var skuArray = [];
    if (allOptionValueArray.length == 1) {
        skuArray = allOptionValueArray[0];
    } else if (allOptionValueArray.length > 1) {
        skuArray = arrayCombine(allOptionValueArray);
    }

    return skuArray;
}

function arrayCombine(items) {
    var base = items[0]

    return mulit(base, items.slice(1))

    function mulit(base, leftArr) {
        var multiplier = leftArr[0];

        var newBase = [];
        for (var i = 0, len = base.length; i < len; i++) {
            var b = base[i];
            for (var j = 0, len2 = multiplier.length; j < len2; j++) {
                var m = multiplier[j];
                newBase.push(b + ',' + m);
            }
        }

        var _left = leftArr.slice(1);
        if (_left.length) {
            return mulit(newBase, _left);
        } else {
            return newBase;
        }
    }
}

function collectAllSelectedOptionValue() {
    var optionArray = [];
    var optionDomArray = $("div[name='product_option']");
    for (var i = 0; i < optionDomArray.length; i++) {
        var optionValueArray = [];
        var optionAllowUploadPic = $(optionDomArray[i]).attr("data-option-pic");
        var picOptionLabel = $(optionDomArray[i]).attr("data-option-label");
        $(optionDomArray[i]).find("input[type='checkbox']").each(function () {
            var checked = $(this).attr('checked');
            if (checked) {
                //var optionValueLabel = $(this).attr('data-option-value-label');
                var optionIdAndOptionValueId = $(this).attr('id');
                var optionValueLabel = $("#optionValueInput-" + optionIdAndOptionValueId).val();
                optionValueArray.push(optionIdAndOptionValueId + "-" + optionValueLabel + "-" + optionAllowUploadPic + "-" + picOptionLabel);
            }
        });
        optionArray.push(optionValueArray);
    }
    return optionArray;
}
function setUpProductOptionValue(callback) {
    var doAfterGetResultFormServer;
    if (!callback || !(callback instanceof Function)) {
        doAfterGetResultFormServer = function (data) {
            loadProductOptionValue(data);
        };
    } else {
        doAfterGetResultFormServer = function (data) {
            loadProductOptionValue(data);
            callback();
        }
    }
    app.ajax('${ctx}/admin/adminProductOption/optionValue', {optionId: selectedProductOptionIdArray, productId: productId}, doAfterGetResultFormServer, {
        type: 'GET',
        dataType: 'text'
    });
}

function loadProductOptionValue(data) {
    $("#optionContainer").html(data);
}

function buildSkuGridWithoutData(options, optionIds) {
    if (!skuBuilder) {
        skuBuilder = new YrSkuBuilder('Sku_Grid');
    } else {
        $("#Sku_Grid").html("");
        skuBuilder.reset();
    }
    skuBuilder.addOptions(options, optionIds);
    skuBuilder.buildGridColumn();
    skuBuilder.buildGrid();
    skuBuilder.renderGrid();
}


function collectData(){
    /*if(selectedProductOptionIdArray.length == 0){
     BUI.Message.Alert("请选择产品规格!");
     return false;
     }*/
    var validResult = true;

    $("input[name='optionId']").val(selectedProductOptionIdArray.join(','));

    var selectedOptionValueIdArray = [];
    var selectedOptionValueLabelArray = [];
    $(".optionValueCheckbox").each(function(){
        var checked = $(this).attr("checked");
        if(checked){
            var checkboxId = $(this).attr("id");
            selectedOptionValueIdArray.push($(this).val());
            var newOptionValueLabel = $("#optionValueInput-" + checkboxId).val();
            newOptionValueLabel = YrValidator.replaceAllSpace(newOptionValueLabel);
            if(newOptionValueLabel == ""){
                BUI.Message.Alert("产品规格值名称不能为空!");
                validResult = false;
                return false;
            }

            selectedOptionValueLabelArray.push(newOptionValueLabel);
        }
    });

    if(!validResult){
        return false;
    }

    $("input[name='optionValueId']").val(selectedOptionValueIdArray.join(","));
    $("input[name='optionValueLabel']").val(selectedOptionValueLabelArray.join(","));

    var optionValueUploaderId = [];
    var optionValueUploaderAssetId = [];
    for(var uploaderBuilderKey in optionValuePicBuilder){
        var uploaderBuilder = optionValuePicBuilder[uploaderBuilderKey];
        var partyOptionValuePicRecords = uploaderBuilder.getAllRecords();
        for(var i = 0; i < partyOptionValuePicRecords.length; i++){
            var optionValuePicRecord = partyOptionValuePicRecords[i];
            optionValueUploaderId.push(optionValuePicRecord.id.split("-")[1]);
            var assetId = optionValuePicRecord.assetId ? optionValuePicRecord.assetId : "";
            optionValueUploaderAssetId.push(assetId);
        }
    }

    $("input[name='optionValuePicUploaderId']").val(optionValueUploaderId.join(","));
    $("input[name='optionValuePicUploaderAssetId']").val(optionValueUploaderAssetId.join(","));

    var fakedSkuIdArray = [];
    var fakedSkuCountArray = [];
    var fakedSkuOuterIdArray = [];
    var fakedSkuSalePriceArray = [];
    if(skuBuilder){
        var allSkus = skuBuilder.getAllRecords();
        if(allSkus){
            for(var i = 0; i < allSkus.length; i++){
                var fakedSkuId = allSkus[i].id;
                var skuCount = YrValidator.replaceAllSpace($("#sku_count_"+fakedSkuId).val());
                var skuOuterId = YrValidator.replaceAllSpace($("#sku_outerId_"+fakedSkuId).val());
                var skuSalePrice = YrValidator.replaceAllSpace($("#sku_salePrice_"+fakedSkuId).val());

                if(skuCount != "" && !YrValidator.isNotNegativeInteger(skuCount)){
                    BUI.Message.Alert("货品库存必须为正整数!");
                    validResult = false;
                    break;
                }

                if(skuSalePrice != "" && !YrValidator.isPositiveFloatingPointNumber(skuSalePrice)){
                    BUI.Message.Alert("货品销售价格必须为正数!");
                    validResult = false;
                    break;
                }

                fakedSkuIdArray.push(fakedSkuId);
                fakedSkuCountArray.push(skuCount);
                fakedSkuOuterIdArray.push(skuOuterId);
                fakedSkuSalePriceArray.push(skuSalePrice);
            }
        }
    }

    if(!validResult){
        return false;
    }

    $("input[name='fakedSkuId']").val(fakedSkuIdArray.join(','));
    $("input[name='fakedSkuQuantity']").val(fakedSkuCountArray.join(','));
    $("input[name='fakedSkuSalePrice']").val(fakedSkuSalePriceArray.join(','));
    $("input[name='fakedSkuOuterId']").val(fakedSkuOuterIdArray.join(','));

    return true;
}