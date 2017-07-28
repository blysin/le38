/**
 * SKU编辑Builder对象
 *
 * @type {Function}
 */
var Grid = BUI.Grid;
var Data = BUI.Data;
var Store = Data.Store;
var gridColumnDataIndexPrefix = "option_";
var gridColumnDataValueIndexPrefix = "value_id_";
function YrSkuBuilder(renderTarget){
    this.render = renderTarget;
    this.skuOptionArray = [];
    this.columns  = [];
    this.skuGridStore = [];
    this.skuGrid = null;
    this.skuGridData = [];
};

YrSkuBuilder.prototype.addOption = function(label, dataIndex, dataValueIndex){
    if(!dataIndex){
        dataIndex = label;
    }
    var option = {
        label : label,
        dataIndex : dataIndex,
        dataValueIndex : dataValueIndex
    }

    this.skuOptionArray.push(option);
};

YrSkuBuilder.prototype.addOptions = function(labels, optionIds) {
    for(var i = 0; i < labels.length; i++){
        var label = labels[i];
        var dataIndex;
        var dataValueIndex;
        if(optionIds){
            dataIndex = gridColumnDataIndexPrefix + optionIds[i];
            dataValueIndex = gridColumnDataIndexPrefix + gridColumnDataValueIndexPrefix + optionIds[i];
        } else {
            dataIndex = label;
            dataValueIndex = gridColumnDataValueIndexPrefix + label;
        }
        this.addOption(label, dataIndex, dataValueIndex);
    }
};

YrSkuBuilder.prototype.reset = function(){
   this.resetOptionArray();
   this.resetStore();
   this.resetColumns();
};

YrSkuBuilder.prototype.resetStore = function(){
    this.skuGridStore = [];
};

YrSkuBuilder.prototype.resetColumns = function(){
    this.columns = [];
};

/**
 *重置规格数组
 *
 */
YrSkuBuilder.prototype.resetOptionArray = function(){
    this.skuOptionArray = [];
};

YrSkuBuilder.prototype.getOptions = function() {
    return this.skuOptionArray;
};

YrSkuBuilder.prototype.getOptionsCount = function(){
    return this.skuOptionArray.length;
};

YrSkuBuilder.prototype.getOptionByIndex = function(index){
    return this.skuOptionArray[index];
};

YrSkuBuilder.prototype.buildGridColumn = function(onlyShowSkuColumn, disAllowEditStock){
    var idColumnStr = "{ id : 'sku_id', title : 'ID', dataIndex :'id', visible:false}";
    this.columns.push(eval('(' + idColumnStr + ')'));
    for(var i = 0; i < this.getOptionsCount(); i++){
        var optionObj = this.getOptionByIndex(i);
        var titleTip = optionObj.label;
        var dataIndex = optionObj.dataIndex;
        var optionValueTitleTip = "value_" + titleTip;
        var dataValueIndex = optionObj.dataValueIndex;

        var columnIdStr = "  { title : '" + optionValueTitleTip + "', dataIndex :'" + dataValueIndex + "', visible:false}";
        this.columns.push(eval('(' + columnIdStr + ')'));
        var columnTipStr = "renderer : function(value, obj){" +
            "value = value || '';" +
            "return '<label data-tip=\"' + value +'\" title=\"' + value +'\">'+value+'</label>'}";
        var columnStr = "  { title : '" + titleTip + "', dataIndex :'" + dataIndex + "', width:120,"  + columnTipStr + "}";
        this.columns.push(eval('(' + columnStr + ')'));
    }
    if(!onlyShowSkuColumn){
    var salePriceColumnEditStr = "renderer : function(value, obj){" +
        "value = value || '';" +
        "return '<input type=\"text\" style=\"width:60px;\" id=\"sku_salePrice_' + obj.id + '\" value=\"' + value +'\"/>'}";
    var salePriceColumnStr = "{ title : '销售价格', dataIndex :'salePrice', width:80, " + salePriceColumnEditStr + "}";
    this.columns.push(eval('(' + salePriceColumnStr + ')'));
    }

    if(disAllowEditStock){
        var countColumnEditStr = "renderer : function(value, obj){" +
            "value = value || '0';" +
            "return value+'<input type=\"hidden\" style=\"width:90px;\" id=\"sku_count_' + obj.id + '\" class=\"sku_count\" value=\"' + value +'\"/>'}";
//            "return value;}";
        var countColumnStr = "{ title : '货品库存', dataIndex :'count', width:120, " + countColumnEditStr + "}";
        this.columns.push(eval('(' + countColumnStr + ')'));
    } else {
        var countColumnEditStr = "renderer : function(value, obj){" +
            "value = value || '0';" +
            "return '<input type=\"text\" style=\"width:90px;\" id=\"sku_count_' + obj.id + '\" class=\"sku_count\" value=\"' + value +'\"/>'}";
        var countColumnStr = "{ title : '货品库存', dataIndex :'count', width:120, " + countColumnEditStr + "}";
        this.columns.push(eval('(' + countColumnStr + ')'));
    }

    if(!onlyShowSkuColumn){
    var outerIdColumnEditStr = "renderer : function(value, obj){" +
        "value = value || '';" +
        "return '<input type=\"text\" style=\"width:130px;\" id=\"sku_outerId_' + obj.id + '\" value=\"' + value +'\"/>'}";
    var outerIdColumnStr = "{ title : '外部ID', dataIndex :'outerId', width:120, " + outerIdColumnEditStr + "}";
    this.columns.push(eval('(' + outerIdColumnStr + ')'));
    }

    if(!onlyShowSkuColumn){
    var commodityCodeColumnEditStr = "renderer : function(value, obj){" +
        "value = value || '';" +
        "return '<input type=\"text\" style=\"width:160px;\" id=\"sku_commodityCode_' + obj.id + '\" value=\"' + value +'\"/>'}";
    var commodityCodeColumnStr = "{ title : '商品条码', dataIndex :'commodityCode', width:150, " + commodityCodeColumnEditStr + "}";
    this.columns.push(eval('(' + commodityCodeColumnStr + ')'));
    }

    /*var operatorColumnDiffStr = "renderer : function(value,obj){" +
        "if\(obj.serverSku\){return '--';} else { return '<span class=\"grid-command btn-del\" title=\"删除该货品\">删除</span>';}";
    alert(operatorColumnDiffStr);*/
    /*var operatorColumnStr = "{ title : '操作', dataIndex: 'id', width:80, " + operatorColumnDiffStr + "}";
    this.columns.push(eval('(' + operatorColumnStr + ')'));*/
};

/**
 * 构造表格
 *
 */
YrSkuBuilder.prototype.buildGrid = function(){
    this.skuGridStore = new Store({
            data : this.skuGridData,
            autoLoad:true
        });
    this.skuGrid = new Grid.Grid({ //使用简单表格
            render:'#' + this.render,
            width:'100%',//这个属性一定要设置
            columns : this.columns,
            /*tableCls:'table table-bordered',  //定义表格样式*/
            store : this.skuGridStore
        });
};

YrSkuBuilder.prototype.renderGrid = function(){
    this.skuGrid.render();
};

YrSkuBuilder.prototype.loadStore = function(data){
    var targetNewDataIds = {};
    for(var i = 0; i < data.length; i++){
        var newId = data[i].id;
        targetNewDataIds[newId] = newId;
    }
    var storeResultArray = this.skuGridStore.getResult();
    
    var deletedRecords = [];
    for(var i = 0; i < storeResultArray.length; i++){
        var storeResult = storeResultArray[i];
        var compareId = storeResult.id;
        if(!targetNewDataIds[compareId] && !storeResult.serverSku){
            deletedRecords.push(storeResult);
        }
    }
    this.skuGridStore.remove(deletedRecords);

    var count = this.skuGridStore.getCount();
    this.skuGridStore.addAt(data, count, true, function(obj1,obj2){
        return obj1.id == obj2.id;
    });
};

YrSkuBuilder.prototype.containRecord = function(skuId){
    var obj = new Object();
    obj.id = skuId;
    this.skuGridStore.contains(obj,function(obj1,obj2){ //使用匹配函数
        return obj1.id == obj2.id;
    });
};

YrSkuBuilder.prototype.getAllRecords = function(){
	
    return this.skuGridStore.getResult();
};

YrSkuBuilder.prototype.updateOptionLabel = function(optionId, optionValueId, newOptionValueLabel){
    var key = gridColumnDataIndexPrefix + gridColumnDataValueIndexPrefix + optionId;
    var labelKey = gridColumnDataIndexPrefix + optionId;
    var records = this.skuGridStore.findAll(key, optionValueId);
    if(records != null && records.length > 0){
        for(var i = 0; i < records.length; i++){
            var record = records[i];
            record[labelKey] = newOptionValueLabel;
            this.skuGridStore.update(record);
        }
    }
};