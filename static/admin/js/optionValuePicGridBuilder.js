/**
 * SKU编辑Builder对象
 *
 * @type {Function}
 */
var Grid = BUI.Grid;
var Data = BUI.Data;
var Store = Data.Store;
var optionValuePicGridColumnDataIndexPrefix = "option_value_pic_";
var optionValuePicGridColumnDataValueIndexPrefix = "value_id_";
function OptionValuePicGridBuilder(renderTarget, optionId, optionLabel){
    this.render = renderTarget;
    this.optionId = optionId;
    this.optionLabel = optionLabel;
    this.columns  = [];
    this.optionValuePicGridStore = [];
    this.optionValuePicGrid = null;
    this.optionValuePicGridData = [];
};

OptionValuePicGridBuilder.prototype.reset = function(){
    this.resetStore();
    this.resetColumns();
    this.optionValuePicGridData = [];
    this.optionValuePicGrid = null;
};

OptionValuePicGridBuilder.prototype.resetStore = function(){
    this.skuGridStore = [];
};

OptionValuePicGridBuilder.prototype.resetColumns = function(){
    this.columns = [];
};

OptionValuePicGridBuilder.prototype.buildGridColumn = function(){
    var idColumnStr = "{ title : 'ID', dataIndex :'id', visible:false}";
    this.columns.push(eval('(' + idColumnStr + ')'));

    var dataValueColumnDataIndex = optionValuePicGridColumnDataIndexPrefix + optionValuePicGridColumnDataValueIndexPrefix + this.optionId;
    var dataValueLabel = optionValuePicGridColumnDataValueIndexPrefix + this.optionLabel;
    var dataValueColumnStr = "  { title : '" + dataValueLabel + "', dataIndex :'" + dataValueColumnDataIndex + "', visible:false}";
    this.columns.push(eval('(' + dataValueColumnStr + ')'));

    var firstColumnDataIndex = optionValuePicGridColumnDataIndexPrefix + this.optionId;
    var firstColumnStr = "  { title : '" + this.optionLabel + "', dataIndex :'" + firstColumnDataIndex + "', width:120}";
    this.columns.push(eval('(' + firstColumnStr + ')'));

    var secondColumnUploadStr = "renderer : function(val, obj){" +
        "val = val || '0';" +
        "return '<input type=\"file\" id=\"uploader_'+val+'\" name=\"file\" onchange=\"javascript:doUploadOptionValuePic(\\''+val+'\\',this);\">'}";
    var secondColumnStr = "{ title : '操 作', dataIndex :'id', width:250, " + secondColumnUploadStr + "}";
    this.columns.push(eval('(' + secondColumnStr + ')'));

    var thirdColumnShowStr = "renderer : function(value, obj){" +
        "value = value || '';" +
        "return '<img style=\"width:35px;height:35px;\" src=\"' + value +'\"/><a href=\"javascript:deleteOptionValuePic(\\''+obj.id+'\\');\">删除</a>'}";
    var thirdColumnStr = "{ title : '图片', dataIndex :'url', width:80, " + thirdColumnShowStr + "}";
    this.columns.push(eval('(' + thirdColumnStr + ')'));
};

/**
 * 构造表格
 *
 */
OptionValuePicGridBuilder.prototype.buildGrid = function(){
    this.optionValuePicGridStore = new Store({
        data : this.optionValuePicGridData,
        autoLoad:true
    });
    this.optionValuePicGrid = new Grid.Grid({ //使用简单表格
        render:'#' + this.render,
        width:'80%',//这个属性一定要设置
        columns : this.columns,
        store : this.optionValuePicGridStore
    });
};

OptionValuePicGridBuilder.prototype.renderGrid = function(){
    this.optionValuePicGrid.render();
};

OptionValuePicGridBuilder.prototype.loadStore = function(data){
    var targetNewDataIds = {};
    for(var i = 0; i < data.length; i++){
        var newId = data[i].id;
        targetNewDataIds[newId] = newId;
    }
    var storeResultArray = this.optionValuePicGridStore.getResult();
    var deletedRecords = [];
    for(var i = 0; i < storeResultArray.length; i++){
        var storeResult = storeResultArray[i];
        var compareId = storeResult.id;
        if(!targetNewDataIds[compareId]){
            deletedRecords.push(storeResult);
        }
    }
    this.optionValuePicGridStore.remove(deletedRecords);

    var count = this.optionValuePicGridStore.getCount();
    this.optionValuePicGridStore.addAt(data, count, true, function(obj1,obj2){
        return obj1.id == obj2.id;
    });
};

OptionValuePicGridBuilder.prototype.containRecord = function(optionValueId){
    var obj = new Object();
    obj.id = this.optionId + "-" + optionValueId;
    this.optionValuePicGridStore.contains(obj,function(obj1,obj2){ //使用匹配函数
        return obj1.id == obj2.id;
    });
};

OptionValuePicGridBuilder.prototype.getAllRecords = function(){
    return this.optionValuePicGridStore.getResult();
};

OptionValuePicGridBuilder.prototype.updateRecordPic = function(id, assetUrl, assetId){
    var targetUpdateObj = this.optionValuePicGridStore.find('id', id);
    if(targetUpdateObj){
        targetUpdateObj.url = ("admin" + assetUrl);
        targetUpdateObj.assetId = assetId;
        this.optionValuePicGridStore.update(targetUpdateObj);
    }
};

OptionValuePicGridBuilder.prototype.updateOptionLabel = function(optionId, optionValueId, newOptionValueLabel) {
    var key = optionValuePicGridColumnDataIndexPrefix + optionValuePicGridColumnDataValueIndexPrefix + optionId;
    var labelKey = optionValuePicGridColumnDataIndexPrefix + optionId;
    var records = this.optionValuePicGridStore.findAll(key, optionValueId);
    if(records != null && records.length > 0){
        for(var i = 0; i < records.length; i++){
            var record = records[i];
            record[labelKey] = newOptionValueLabel;
            this.optionValuePicGridStore.update(record);
        }
    }
}

OptionValuePicGridBuilder.prototype.deleteRecordPic = function(id){
    var targetUpdateObj = this.optionValuePicGridStore.find('id', id);
    if(targetUpdateObj){
        targetUpdateObj.url = "";
        targetUpdateObj.assetId = "";
        this.optionValuePicGridStore.update(targetUpdateObj);
    }
};