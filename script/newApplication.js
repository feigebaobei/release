
//表单元素对象 获取val
let formObj = {}
$(document).ready(function () {
  $('#selectDown').dropdown()
  //点击产品添加权限
  $("#addProduct").on('click',function(){
    console.log('addProduct')
  })
  //点击研发添加权限
  $("#addresearch").on('click',function(){
    console.log('addresearch')
  })
  //点击设计添加权限
  $("#addDesign").on('click',function(){
    console.log('addDesign')
  })
  //点击测试添加权限
  $("#addtest").on('click',function(){
    console.log('addtest')
  })

  //点击提交按钮
  $('#submit').on('click',function(){
    console.log('提交')
  })
  //点击取消按钮
  $('#cancel').on('click',function(){
    console.log('取消')
  })

  $('#submit').click(function () {  
        var formGroupExampleInput = $('#formGroupExampleInput').val().trim();
        if (formGroupExampleInput == '') {
            alert('应用名称不能为空');
            return;
        };
        var online = $('#online').val().trim();
        if (online == '') {
            alert('应用描述不能为空');
            return;
        };
        // if (tag_version.indexOf('v') == -1) {
        //     alert('tag版本不符合规范');
        //     return;
        // };
        // var detail = $('#detail').val().trim();
        // if (detail == '') {
        //     alert('项目详情不能为空');
        //     return;
        // };
        // var online_tag = $('#online_tag').val().trim();
        // if ($('.CA_list li').length == 1 ) {
        //     alert('审批人不能为空，请补全审批人');
        //     return;
        // };
      })


      //格式化名字
    function formatUsername (pm) {
        var PM = [],
            PM_C = [],
            PM_ID = [],
            PM_GROUP_ID = [];
        for (var i = 0; i < $(pm).find('li').length - 1; i ++) {
            PM.push($(pm).find('li').eq(i).find('.name_e').text());
            PM_C.push($(pm).find('li').eq(i).find('.name_c').text());
            PM_ID.push($(pm).find('li').eq(i).find('.user_id').val());
            PM_GROUP_ID.push($(pm).find('li').eq(i).find('.group_id').val());
        }
        return [ PM_C,PM,PM_ID,PM_GROUP_ID];
    }



    // ops.textareaClickInit("#online_tag","#tag_version");
    $('body').on('click', '.add_person_icon' , function () {
        var groupName = '';
        groupKey = '';
        var parentUl = $(this).parent();
        var groupArr = {'PM':'pm','PG':'tech', 'TT':'test','SE':'yunwei','DA':'data' ,'CC_list':'all','CA_list':'all'};//产品，技术，测试，抄送
        for(var key in groupArr) {
            if (parentUl.hasClass(key)) {
                groupKey = key;
                groupName = groupArr[key];
                break;
            };
        }
        //把已经选中的人员传给选择窗
        // var seleArr = [];
        // for (var i = 0; i < $("."+groupKey).find('li').length - 1; i ++) {
        //     var color = $('.'+groupKey).find('li').eq(i).find('.avator').css('background-color');
        //     var name_c = $('.'+groupKey).find('li').eq(i).find('.name_c').text();
        //     var name_e = $('.'+groupKey).find('li').eq(i).find('.name_e').text();
        //     seleArr.push([color,name_c,name_e]);
        // }
        
        var res = [{"text":"\u4ea7\u54c1\u90e8","nodes":[{"tags":["85"],"text":"UED\u7ec4"},{"tags":["86"],"text":"\u5b66\u4e60\u4ea7\u54c1\u7ec4"},{"tags":["88"],"text":"\u7528\u6237\u7814\u7a76\u7ec4"}]},{"text":"\u6280\u672f\u7814\u53d1\u90e8","nodes":[{"tags":["24"],"text":"\u524d\u7aef\u9879\u76ee\u7ec4"},{"tags":["26"],"text":"\u8fd0\u7ef4\u7ec4"},{"tags":["27"],"text":"\u6d4b\u8bd5\u9879\u76ee\u7ec4"},{"tags":["35"],"text":"\u8fd0\u8425\u9879\u76ee\u7ec4"},{"tags":["56"],"text":"\u4e2d\u53f0\u9879\u76ee\u7ec4"},{"tags":["57"],"text":"\u6570\u636e\u6316\u6398\u7ec4"},{"tags":["58"],"text":"\u7406\u79d1\u6559\u5b66\u9879\u76ee\u7ec4"},{"tags":["59"],"text":"\u670d\u52a1\u9879\u76ee\u7ec4"},{"tags":["60"],"text":"\u6587\u79d1\u6559\u5b66\u9879\u76ee\u7ec4"},{"tags":["62"],"text":"\u5e73\u53f0\u67b6\u6784\u7ec4"},{"tags":["63"],"text":"\u57fa\u7840\u67b6\u6784\u7ec4"},{"tags":["68"],"text":"\u667a\u80fd\u6559\u5b66\u7ec4"},{"tags":["203"],"text":"12"},{"tags":["206"],"text":"\u7a7a\u683c"},{"tags":["207"],"text":"\u6d4b\u8bd5"},{"tags":["209"],"text":"stest001"},{"tags":["210"],"text":"stest002"}]}]
        $("."+groupKey).personTree({
            treeStruct: res,
            selePerson: formatUsername($("."+groupKey))
        });

    });






})