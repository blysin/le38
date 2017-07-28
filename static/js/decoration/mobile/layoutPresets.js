define(['jquery','common','decoration/mobile/preset_layout_list'],function ($,common,presetLayouts) {
    var btnBack = $("#J_btn_back"),
        btnNext = $("#J_btn_next"),
        currentLayoutId;

    btnBack.on("click", function () {
        history.back();
    });
    btnNext.on("click", function () {
        if(!currentLayoutId){
            alert("请选择模板");
            return;
        }
        location.href = "/admin/layoutManage/toEditLayout/0?type=preset&layoutId="+currentLayoutId+"&platform=m";
    });

    presetLayouts(".dcm-container-preset", function (layoutId) {
        currentLayoutId = layoutId;
    });
});