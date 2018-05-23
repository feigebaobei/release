
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
})