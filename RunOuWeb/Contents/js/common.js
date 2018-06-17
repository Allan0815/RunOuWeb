var baseUrl = '';

function DoOnMsoNumberFormat(cell, row, col) {
    var result = "";
    if (row > 0 && col == 0)
        result = "\\@@";
    return result;
}
/*******生成表格 包含导出功能*********/
function GetBtTable_Exp(tableId, aoColumn, actionUrl, serverParams, isExport, exportName, ignoreColumn, callback_dblclickRow) {

    if (null == exportName || "" == exportName) {
        exportName = "导出报表";
    }
    var $btTable = $('#' + tableId);
    $btTable.bootstrapTable({
        url: actionUrl,
        //toolbar: "#toolbar",
        sidePagination: "server",//设置在哪进行分页，默认”client”，可选”server”，如果设置 “server”，则必须设置url或者重写ajax方法
        pagination: true,//底部工具栏是否显示分页条
        striped: true,//是否显示列表背景色
        mobileResponsive: true,
        showRefresh: true,//是否显示刷新按钮
        showColumns: true,//是否显示 字段支持隐藏的下拉选择
        showToggle: true,//是否显示试图2
        sortable: false,//是否允许排序
        search: false,//是否显示查询框
        formatLoadingMessage: function () {
            return "<img src='/content/image/loading.gif' />";
        },
        queryParams: function queryParams(params) {
            if (null != serverParams && "" != serverParams) {
                var dataObj = eval(serverParams);
                $.each(dataObj, function (idx, item) {
                    params[item.name] = item.value;
                    // params.push({ "name": item.name, "value": item.value });
                });
            }
            return params;
        },

        columns: aoColumn,//列表字段
        pageList: "[25, 50, 100,200]",
        pageSize: 25,
        paginationFirstText: "第一页",
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationLastText: "最后页",
        showExport: isExport,  //是否显示导出按钮  
        buttonsAlign: "right",  //按钮位置  
        exportTypes: ['excel'],  //导出文件类型  
        Icons: 'glyphicon-export',
        exportDataType: 'all', //默认basic：只导出当前页的表格数据；all：导出所有数据；selected：导出选中的数据
        exportOptions: {
            ignoreColumn: ignoreColumn,  //忽略某些列 索引数组  [0,10]
            fileName: exportName,  //文件名称设置  
            worksheetName: 'sheet1',  //表格工作区名称  
            tableName: exportName,
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
            onMsoNumberFormat: DoOnMsoNumberFormat
        },
        onDblClickRow: function (row) {
            if (callback_dblclickRow != undefined) {
                callback_dblclickRow(row);
            }
        }
    });

    return $btTable;
}

/*******生成表格*********/
function GetBtTable_Data(tableId, aoColumn, actionUrl, serverParams) {

    var $btTable = $('#' + tableId);
    $btTable.bootstrapTable({
        url: actionUrl,
        //toolbar: "#toolbar",
        sidePagination: "server",//设置在哪进行分页，默认”client”，可选”server”，如果设置 “server”，则必须设置url或者重写ajax方法
        pagination: true,//底部工具栏是否显示分页条
        striped: true,//是否显示列表背景色
        mobileResponsive: true,
        showRefresh: true,//是否显示刷新按钮
        showColumns: true,//是否显示 字段支持隐藏的下拉选择
        showToggle: true,//是否显示试图2
        sortable: false,//是否允许排序
        search: false,//是否显示查询框
        formatLoadingMessage: function () {
            return "<img src='/content/image/loading.gif' />";
        },
        queryParams: function queryParams(params) {
            if (null != serverParams && "" != serverParams) {
                var dataObj = eval(serverParams);
                $.each(dataObj, function (idx, item) {
                    params[item.name] = item.value;
                    // params.push({ "name": item.name, "value": item.value });
                });
            }
            return params;
        },

        columns: aoColumn,//列表字段
        pageList: "[25, 50, 100,200]",
        pageSize: 25,
        paginationFirstText: "第一页",
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationLastText: "最后页",
    });

    return $btTable;
}

/*******清除表单数据*********/
function ClearForm(obj) {
    obj.find(':input').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
    obj.find("select").prop('selectedIndex', 0);

    //判断是否存在省市联动存在则只保留第一项
    obj.find(".dropDownCity:not(.dontClear) option:not(:first)").remove();
    obj.find(".dropDownArea:not(.dontClear) option:not(:first)").remove();

}

function layer_show(title, url, w, h) {
    if (title == null || title == '') {
        title = false;
    };
    if (url == null || url == '') {
        url = "404.html";
    };
    if (w == null || w == '') {
        w = '800px';
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50) + 'px';
    };
    layer.open({
        type: 2,
        area: [w, h],
        fix: false, //不固定
        maxmin: true,
        shade: 0.4,
        title: title,
        content: url
    });
}

/*关闭弹出框口*/
function layer_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

/*******注册验证脚本*********/
function RegisterForm() {
    $('#modal-content').removeData('validator');
    $('#modal-content').removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse('#modal-content');
}

function ReloadDataTable(obj, refreshUrl) {
    obj.bootstrapTable('refresh', { url: refreshUrl });
}

/*******弹出表单*********/
function ShowModal(actionUrl, param, title, modalclass, flag) {

    //表单初始化
    $(".modal-title").html(title);
    $("#modal-content").attr("action", actionUrl);

    if (actionUrl.indexOf('?') > 0) {
        actionUrl = actionUrl + "&rand=" + Math.random();
    }
    else {
        actionUrl = actionUrl + "?rand=" + Math.random();
    }

    $.ajax({
        type: "GET",
        url: actionUrl,
        data: param,
        beforeSend: function () {
            $(".wrapper").showLoading();//打开弹出框

        },
        success: function (result) {
            $(".wrapper").hideLoading();//关闭弹出框
            $(".modal-footer ").show();
            if (flag != null && flag == true) {
                $(".modal-footer").html('<button type="button" class="btn btn-default" onclick="CloseModal()">返回列表</button>');
            } else {
                if (flag == "next") {
                    //下一步弹窗需要隐藏原按钮样式。
                    $(".modal-footer ").hide();
                } else {
                    $(".modal-footer").html('<button type="button" class="btn btn-primary" onclick="Save()">保存</button><button type="button" class="btn btn-default" onclick="CloseModal()">取消</button>')
                }
            }

            $("#modal-content").html(result);
            $('#modal-form').modal('show');
            //设置弹出框宽度
            if (modalclass != null) {
                $("#modal-form .modal-dialog").removeClass().addClass("modal-dialog modal-" + modalclass);
            }

            RegisterForm();
        },
        error: function () {
            //
        },
        complete: function () {
            //
        }
    });
}

/*******保存表单*********/
function SaveModal(oTable, refreshUrl) {
    var actionUrl = $("#modal-content").attr("action");
    var $form = $("#modal-content");

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: $form.serialize(),
        beforeSend: function () {
            if (!$form.valid()) {
                return false;
            }
            $(".modal-content").showLoading();
        },
        success: function (data) {
            $(".modal-content").hideLoading();
            //判断返回值，若为Object类型，即操作成功
            var result = ((typeof (data) == 'object') && (data.constructor == Object));
            if (result) {
                swal(data.Message);
                $('#modal-form').modal('hide');
                ReloadDataTable(oTable, refreshUrl);//页面刷新表单
            }
            else {
                $("#modal-content").html(data);
            }
        }
    });
}

/*******关闭弹出框*********/
function CloseModal() {
    $('#modal-form').modal('hide');
    $("#modal-content").html("");
    $(".modal-content").hideLoading();
}

/*******删除操作*********/
function DeleteRecord(actionUrl, param, oTable, refreshUrl) {
    swal({
        title: "您确定要删除这条信息吗?",
        text: "删除后将无法恢复，请谨慎操作！",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: param,
            beforeSend: function () {
                $(".sweet-alert").hide();
                $(".sweet-overlay").hide();
                $(".sweet-overlay").showLoading();
            },
            success: function (result) {
                $(".sweet-overlay").hideLoading();
                if (result.ResultType == 0) {
                    ReloadDataTable(oTable, refreshUrl);
                    swal({ title: result.Message, text: "", type: "success", timer: 1000, showConfirmButton: false });
                } else {
                    swal(result.Message, "", "error");
                }
            },
            error: function () {
                //
            },
            complete: function () {
                //
            }
        });
    });

    //bootbox.confirm("确定删除此记录?", function (result) {
    //    if (result) {
    //        $.ajax({
    //            type: "POST",
    //            url: actionUrl,
    //            data: param,
    //            beforeSend: function () {
    //                //
    //            },
    //            success: function (result) {
    //                bootbox.alert(result.Message);
    //                if (result.ResultType == 0) {
    //                    ReloadDataTable(oTable);
    //                }
    //            },
    //            error: function () {
    //                //
    //            },
    //            complete: function () {
    //                //
    //            }
    //        });
    //    } else {
    //    }
    //});
}

/*******删除全部操作*********/
function DeleteAllRecord(actionUrl, oTable, refreshUrl) {
    swal({
        title: "您确定要删除这条信息吗",
        text: "删除后将无法恢复，请谨慎操作！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                url: actionUrl,
                beforeSend: function () {
                    //
                },
                success: function (result) {
                    swal("删除成功！", "您已经永久删除了这条信息。", "success");
                    if (result.ResultType == 0) {
                        ReloadDataTable(oTable, refreshUrl);
                    }
                },
                error: function () {
                    //
                },
                complete: function () {
                    //
                }
            });
        } else {
            swal("已取消", "您取消了删除操作", "error");
        }
    });




    //bootbox.confirm("确定删除此记录?", function (result) {
    //    if (result) {
    //        $.ajax({
    //            type: "POST",
    //            url: actionUrl,
    //            beforeSend: function () {
    //                //
    //            },
    //            success: function (result) {
    //                bootbox.alert(result.Message);
    //                if (result.ResultType == 0) {
    //                    ReloadDataTable(oTable);
    //                }
    //            },
    //            error: function () {
    //                //
    //            },
    //            complete: function () {
    //                //
    //            }
    //        });
    //    } else {

    //    }
    //});
}

/*******初始化日期控件(layDate)*********/
function InitLayDate(start, end) {
    if (start == undefined) {
        start = {
            elem: '#layer-date-start', //需显示日期的元素选择器
            event: 'click', //触发事件
            format: 'YYYY-MM-DD', //日期格式
            istime: false, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: true, //是否显示今天
            issure: true, //是否显示确认
            festival: true, //是否显示节日
            min: '1900-01-01', //最小日期
            max: laydate.now(), //最大日期
            //start: '2014-6-15 23:00:00',    //开始日期
            //fixed: false, //是否固定在可视区域
            //zIndex: 99999999, //css z-index
            choose: function (dates) { //选择好日期的回调
                end.min = dates; //开始日选好后，重置结束日的最小日期
                end.start = dates //将结束日的初始值设定为开始日
            }
        };
    }
    if (end == undefined) {
        end = {
            elem: '#layer-date-end', //需显示日期的元素选择器
            event: 'click', //触发事件
            format: 'YYYY-MM-DD', //日期格式
            istime: false, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: true, //是否显示今天
            issure: true, //是否显示确认
            festival: true, //是否显示节日
            min: '1900-01-01', //最小日期
            max: laydate.now(), //最大日期
            choose: function (dates) { //选择好日期的回调
                //start.min = datas; //开始日选好后，重置结束日的最小日期
                start.start = dates //将结束日的初始值设定为开始日
            }
        };
    }
    laydate(start);
    laydate(end);
}

/*******ajax Post 提交数据到后台 *********/
$.submit = function (data) {
    if (data.url == undefined || data.url == "") {
        alert("url不能为空！");
        return
    }
    $.ajax({
        url: data.url,
        type: "POST",
        data: data.paramData,
        beforeSend: function () {
            $(".wrapper").showLoading();//打开弹出框
        },
        success: function (result) {
            try {
                $(".wrapper").hideLoading();//关闭弹出框
            }
            catch (e) {

            }

            if (data.func) {
                data.func(result)
            } else {
                alert("提交成功！")
            }
        },
        complete: function () {
            try {
                $(".wrapper").hideLoading();//关闭弹出框
            }
            catch (e) {

            }
        }
    })
};

//图片地址切换
function ImageUrl(imgurl) {
    if (imgurl == null || imgurl == undefined || imgurl == '') {
        imgurl = baseUrl + 'Content/image/noimage.png';
    }
    else {
        imgurl = "http://bi.bailuntec.com" + imgurl;
    }

    return imgurl;
}
