var layerMsg = function (o) {
  /*o = {
    message: 'string',
    statusNumber: number,
    time: number
  }*/
  laery.msg(o.message, {
    icon: o.statusNumber,
    time: o.time
  })
}
var table = {
  init: function ($table, tableParams) {
    $table.bootstrapTable(tableParams)
  },
  refreshData: function ($table, ajaxParams) {
    $.ajax({
      url: ajaxParams.url,
      type: ajaxParams.type,
      data: ajaxParams.data,
      success: function (response) {
        if (!response.status) {
          $table.bootstrapTable('refreshOptions', {
            data: response.data
          })
        } else {
          layer.msg(
            '刷新表格数据时出错。请手动刷新页面。',
            {
              icon: 2,
              time: 800
            }
          )
        }
      },
      error: function (error) {
        layer.msg(
          '刷新表格数据时出错。请手动刷新页面。',
          {
            icon: 2,
            time: 800
          }
        )
      }
    })
  }
}